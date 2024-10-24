import { useMutation, useQuery } from '@tanstack/react-query'
import {
  apiAddMemberGroupUser,
  apiCreateGroupUser,
  apiDeleteGroupUser,
  apiEditGroupUser,
  apiGetAllGroupUser,
  apiGetListMemberGroupUser,
  apiSearchGroupUser
} from '@src/services'

export const useSearchGroupUser = () =>
  useMutation({
    mutationKey: ['useSearchGroupUser'],
    mutationFn: apiSearchGroupUser
  })

export const useGetListMemberGroupUser = (groupUserId: number) =>
  useQuery({
    queryKey: ['useGetListMemberGroupUser'],
    queryFn: async () => apiGetListMemberGroupUser(groupUserId),
    enabled: !!groupUserId
  })

export const useEditGroupUser = () =>
  useMutation({
    mutationKey: ['useEditGroupUser'],
    mutationFn: async (params: {
      groupId: number
      data: {
        name: string
        description: string
      }
    }) => apiEditGroupUser(params.groupId, params.data)
  })

export const useAddMemberGroupUser = () =>
  useMutation({
    mutationKey: ['useAddMemberGroupUser'],
    mutationFn: async (params: {
      groupId: number
      data: {
        addUserIdList: number[]
        removeUserIdList: number[]
      }
    }) => apiAddMemberGroupUser(params.groupId, params.data)
  })

export const useDeleteGroupUser = () =>
  useMutation({
    mutationKey: ['useDeleteGroupUser'],
    mutationFn: apiDeleteGroupUser
  })

export const useCreateGroupUser = () =>
  useMutation({
    mutationKey: ['useCreateGroupUser'],
    mutationFn: apiCreateGroupUser
  })

export const useGetAllGroupUser = (enable?: boolean) =>
  useQuery({
    queryKey: ['useGetAllGroupUser'],
    queryFn: apiGetAllGroupUser,
    enabled: !!enable
  })
