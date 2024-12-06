import { useState } from "react"
import { JobCard } from "@/components/JobCard"
import { Pagination } from "@/components/Pagination"
import { Button } from "./ui/button"
import { useCallThreadToStartScrape, useGetScrapeData } from '@/hooks/api.hook'


type jobType = {
  id: number,
  company_name: string,
  company_size: string,
  company_link: string,
  job_title: string,
  job_link: string
}

const ITEMS_PER_PAGE = 12

export function JobList() {
  const [jobs, setJobs] = useState<jobType[] | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [callData, setCallData] = useState<boolean>(false)
  const { mutate } = useCallThreadToStartScrape()
  const { data } = useGetScrapeData(callData)

  console.log(data)

  const totalPages = 10
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentJobs = jobs?.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setJobs(data)
    setCallData(true)
  }

  const handleCallData = () => {
    mutate(1)
  }


  const handleViewCompany = (companyName: string) => {
    window.location.href = `https://wellfound.com${companyName}`
  }

  const handleViewJob = (job: string) => {
    window.location.href = `https://wellfound.com${job}`
  }

  return (
    <>
      {
        callData ?
          <div className="container p-6 mx-auto">
            <h2 className="mb-6 text-2xl font-semibold text-center md:text-left sm:text-3xl">Latest Job Openings</h2>
            < Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentJobs?.map((job) => (
                <JobCard
                  key={job.id}
                  companyName={job.company_name}
                  jobTitle={job.job_title}
                  onViewCompany={() => handleViewCompany(job.company_link)}
                  onViewJob={() => handleViewJob(job.job_link)}
                />
              ))}
            </div>
          </div > : <section className="flex items-center justify-center min-h-[50vh]"><Button className="px-6 py-8 text-2xl font-bold" onClick={handleCallData}>Get Jobs List</Button></section>
      }</>
  )
}
