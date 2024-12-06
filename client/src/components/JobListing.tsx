import { JobCard } from "@/components/JobCard"
import { Pagination } from "@/components/Pagination"
import { Button } from "./ui/button"
import { useJobList } from "@/hooks/joblist.hook"


export function JobList() {
  const { handleCallData, currentJobs, callData, currentPage, totalPages, handlePageChange, handleRedirection, isLoading } = useJobList()


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

            {currentJobs && currentJobs?.length > 0 ? <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentJobs.map((job) => (
                <JobCard
                  key={job.id}
                  companyName={job.company_name}
                  jobTitle={job.job_title}
                  onViewCompany={() => handleRedirection(job.company_link)}
                  onViewJob={() => handleRedirection(job.job_link)}
                />
              ))}
            </div> : <div className="text-xl font-bold text-center"><h2>Wait Data Loading...</h2></div>}
          </div > : <section className="flex items-center justify-center min-h-[50vh]"><Button className="px-6 py-8 text-2xl font-bold" onClick={handleCallData} disabled={isLoading}>{isLoading ? 'Loading Jobs List' : 'Get Jobs List'}</Button></section>
      }</>
  )
}
