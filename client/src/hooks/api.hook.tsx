import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


export function useCallThreadToStartScrape() {
    const queryClient = useQueryClient()

    const value = useMutation({
        mutationKey: ["threadCalling"],
        mutationFn: async (page: number) => {
            try {
                const { data } = await axios.get('http://localhost:8000/' + page)
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
    const value = useQuery({
        queryKey: ["getScrapeData"],
        queryFn: async () => {
            try {
                const { data } = await axios.get('http://localhost:8000/get_data')
                return data
            } catch (error) {
                console.error('Error while getting data ' + error)
                return null
            }
        },
        enabled: callData
    })
    return value
}