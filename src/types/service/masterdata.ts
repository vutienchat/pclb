import { ERegion } from '@src/constants/common'

export interface MasterdataUserGroupParams {
  keyword?: string
  groupType?: EUserGroupType
}

export interface MasterdataProvincesParams {
  keyword?: string
  regions?: ERegion[]
}

export interface MasterdataDistrictsParams {
  keyword?: string
  provinceId: number
}

export interface TDropdown {
  value: number
  name: string
}

export enum EUserGroupType {
  Notify = 0,
  AssignWork = 1
}
