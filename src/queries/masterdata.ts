import { useMutation } from '@tanstack/react-query'
import {
  getDistricts,
  getProvinces,
  getUserGroup
} from '@src/services/masterdata'

export const useGetMasterDataProvinces = () =>
  useMutation({
    mutationKey: ['get-masterdata-provinces'],
    mutationFn: getProvinces
  })

export const useGetMasterDataUserGroup = () =>
  useMutation({
    mutationKey: ['get-masterdata-user-group'],
    mutationFn: getUserGroup
  })

export const useGetMasterDataDistricts = () =>
  useMutation({
    mutationKey: ['get-masterdata-districts'],
    mutationFn: getDistricts
  })