export interface ICenter {
  id: number
  deleted: boolean
  region: string
  name: string
}

export interface IPosition {
  id: number
  deleted: boolean
  name: string
}

export interface ITeam {
  id: number
  deleted: boolean
  centerId: number
  departmentId: number
  name: string
  code: string
}

export interface IDepartment {
  id: number
  deleted: boolean
  centerId: number
  name: string
}

export interface IUploadImageRes {
  dataUrl: string
}

export interface IProvince {
  value: number
  name: string
  lon: string
  lat: string
}
