import { useMutation } from '@tanstack/react-query'
import {
  apiCreateStorm,
  apiDeleteStorm,
  apiEditStorm,
  apiGetDirectHistories,
  apiGetStormById,
  apiGetStormList
} from '@src/services/storm'
import { StormData } from '@src/types/service/storm'

export const useGetStormList = () =>
  useMutation({
    mutationKey: ['getStormList'],
    mutationFn: apiGetStormList
  })

export const useCreateStorm = () =>
  useMutation({
    mutationKey: ['createStorm'],
    mutationFn: apiCreateStorm
  })

export const useEditStorm = () =>
  useMutation({
    mutationKey: ['editStorm'],
    mutationFn: async (params: { id: number, data: StormData }) => apiEditStorm(params.id, params.data)
  })

export const useDeleteStorm = () =>
  useMutation({
    mutationKey: ['deleteStorm'],
    mutationFn: apiDeleteStorm
  })

export const useGetStormById = () =>
  useMutation({
    mutationKey: ['getStormById'],
    mutationFn: apiGetStormById
  })

export const useGetDirectHistory = () =>
  useMutation({
    mutationKey: ['getDirectHistory'],
    mutationFn: apiGetDirectHistories
  })