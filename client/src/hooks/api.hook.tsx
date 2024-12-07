import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
export type jobType = {
    id: number,
    company_name: string,
    company_size: string,
    company_link: string,
    job_title: string,
    job_link: string
}

export function useCallThreadToStartScrape() {
    const queryClient = useQueryClient()

    const value = useMutation({
        mutationKey: ["threadCalling"],
        mutationFn: async (page: number) => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/${page}`)
                return { data }
            } catch (error) {
                console.log('Error while calling the thread ' + error)
                return null

            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["getScrapeData"], exact: true,
                refetchType: 'active',

            }, { throwOnError: true, cancelRefetch: true })
        }

    })
    return value

}


export function useGetScrapeData(callData: boolean) {
    const [jobs, setJobs] = useState<jobType[] | null>(null)
    const value = useQuery({
        queryKey: ["getScrapeData"],
        queryFn: async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/get_data`)
                setJobs(data.content)
                return data
            } catch (error) {
                console.error('Error while getting data ' + error)
                return null
            }
        },
        enabled: callData
    })
    return { ...value, jobs }
}