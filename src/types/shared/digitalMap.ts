export type IMapSite = {
  lat: string
  lon: string
  siteId: number
  siteName: string
  status: number
}

export type IIssue = {
  '2g': number
  '3g': number
  '4g': number
  '5g': number
  csg: number
  mdf: number
  mfd: number
  mtc: number
  site: number
  total: number
  agg?: number
}

export type ISiteDetail = {
  centerId: number
  cktd: number
  createdAt: string
  cshtCode: number
  cshtType: string
  dateAdd: string
  dateId: string
  departmentId: number
  districtId: number
  id: number
  lat: string
  lon: string
  provinceId: number
  siteName: string
  siteType: string
  status: string
  teamId: number
  traffic: number
  trafficDate: string
  trafficThoai: number
  ttml: string
  updatedAt: string
}

export type ITransmissionDevice = {}
