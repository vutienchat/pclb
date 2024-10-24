import { useMutation, useQuery } from '@tanstack/react-query'

import { apiCreateWork, apiDeleteWork, apiEditWork, apiGetDetailWork, apiSearchWork } from '@src/services'

export const useSearchWork = () =>
  useMutation({
    mutationKey: ['useSearchWork'],
    mutationFn: apiSearchWork
  })

export const useCreateNewWork = () =>
  useMutation({
    mutationKey: ['useCreateNewWork'],
    mutationFn: apiCreateWork
  })

export const useGetDetailWork = (workId: number) =>
  useQuery({
    queryKey: ['useGetDetailWork'],
    queryFn: async () => apiGetDetailWork(workId),
    enabled: !!workId
  })

export const useEditWork = () =>
  useMutation({
    mutationKey: ['useEditWork'],
    mutationFn: apiEditWork
  })

export const useDeleteWork = () =>
  useMutation({
    mutationKey: ['useDeleteWork'],
    mutationFn: apiDeleteWork
  })
