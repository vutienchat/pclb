import { getCenter, getDepartment, getPosition, getTeam, uploadImage } from '@src/services'
import { useMutation, useQuery } from '@tanstack/react-query'

export const useGetPosition = () =>
  useMutation({
    mutationKey: ['useGetPosition'],
    mutationFn: getPosition
  })

export const useGetCenter = () =>
  useMutation({
    mutationKey: ['useGetCenter'],
    mutationFn: getCenter
  })

export const useGetDepartment = (centerId: number) =>
  useQuery({
    queryKey: ['useGeDepartment'],
    queryFn: async () => getDepartment(centerId),
    enabled: !!centerId
  })

export const useGetTeam = ({ centerId, departmentId }: { centerId: number; departmentId: number }) =>
  useQuery({
    queryKey: ['useGetTeam'],
    queryFn: async () => getTeam(centerId, departmentId),
    enabled: !!centerId && !!departmentId
  })

export const useUploadImage = () =>
  useMutation({
    mutationKey: ['useUploadImage'],
    mutationFn: async (param: { file: File; folder: string }) => uploadImage(param.file, param.folder)
  })
