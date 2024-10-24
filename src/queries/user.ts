import { useMutation, useQuery } from '@tanstack/react-query'

import {
  apiDeleteUser,
  apiGetSystemRole,
  apiGetUserInfo,
  apiSearchUser,
  editUser,
  editUserProfile,
  getUserProfile,
  TEditUser
} from '@src/services'

export const useUserProfile = () =>
  useMutation({
    mutationKey: ['useUserProfile'],
    mutationFn: getUserProfile
  })

export const useEditUserProfile = () =>
  useMutation({
    mutationKey: ['useEditUserProfile'],
    mutationFn: editUserProfile
  })

export const useSearchUser = () =>
  useMutation({
    mutationKey: ['useSearchUser'],
    mutationFn: apiSearchUser
  })

export const useEditUser = () =>
  useMutation({
    mutationKey: ['useEditUser'],
    mutationFn: async (params: { userId: number; data: TEditUser }) => editUser(params.userId, params.data)
  })

export const useDeleteUser = () =>
  useMutation({
    mutationKey: ['useDeleteUser'],
    mutationFn: apiDeleteUser
  })

export const useSystemRole = (enable?: boolean) =>
  useQuery({
    queryKey: ['useSystemRole'],
    queryFn: apiGetSystemRole,
    enabled: !!enable
  })

export const useUserInfo = (userId: number) =>
  useQuery({
    queryKey: ['useUserInfo'],
    queryFn: async () => apiGetUserInfo(userId),
    enabled: !!userId
  })
