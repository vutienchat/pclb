import { useQuery } from '@tanstack/react-query'

import { apiGetDetailNew, apiGetNew } from '@src/services'

export const useGetAllNew = () =>
  useQuery({
    queryKey: ['useGelAllNew'],
    queryFn: apiGetNew
  })

export const useGetDetailNew = (postId: number) =>
  useQuery({
    queryKey: ['useGetDetailNew'],
    queryFn: async () => apiGetDetailNew(postId),
    enabled: !!postId
  })
