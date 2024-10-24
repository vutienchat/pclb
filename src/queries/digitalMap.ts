import { useMutation, useQuery } from '@tanstack/react-query'

import {
  apiGetIssue,
  apiGetMapSite,
  apiGetSiteDetail,
  apiGetTransmissionDeviceDetail,
  apiGetTransmissionDeviceMap
} from '@src/services'

export const useGetMapSite = () =>
  useMutation({
    mutationKey: ['useGetMapSite'],
    mutationFn: apiGetMapSite
  })

export const useGetTransmissionDeviceMap = () =>
  useMutation({
    mutationKey: ['useGetTransmissionDeviceMap'],
    mutationFn: apiGetTransmissionDeviceMap
  })

export const useGetIssue = () =>
  useQuery({
    queryKey: ['useGetIssue'],
    queryFn: apiGetIssue
  })

export const useGetSiteDetail = () =>
  useMutation({
    mutationKey: ['useGetSiteDetail'],
    mutationFn: apiGetSiteDetail
  })

export const useGetTransmissionDeviceDetail = () =>
  useMutation({
    mutationKey: ['useGetTransmissionDeviceDetail'],
    mutationFn: apiGetTransmissionDeviceDetail
  })
