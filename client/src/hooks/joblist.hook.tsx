import { useCallThreadToStartScrape, useGetScrapeData } from '@/hooks/api.hook'
import { useState } from 'react'
import { jobType } from '@/hooks/api.hook'


const ITEMS_PER_PAGE = 12

export function useJobList() {
    
    const [currentPage, setCurrentPage] = useState(1)
    const [callData, setCallData] = useState<boolean>(false)
    const { mutate} = useCallThreadToStartScrape()
    const { jobs,isLoading } = useGetScrapeData(callData)

  

    const totalPages = 10
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const currentJobs:jobType[]|undefined = jobs?.slice(startIndex, endIndex)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
        setCallData(true)
    }

    const handleCallData = () => {
        mutate(1)
        setCallData(true)
    }


    const handleRedirection = (link: string) => {
        window.location.href = `https://wellfound.com${link}`
    }

    return { totalPages, currentJobs, handlePageChange, handleCallData, handleRedirection, callData, currentPage,isLoading }
}