import {
  ERegion,
  StormStatus
} from '@src/constants/common'
import {EUserGroupType} from "@src/types/service/masterdata";

export interface SearchStormParams {
  searchText?: string
  level?: number
  startImpactTime?: string
  endImpactTime?: string
  completedTime?: string
  startReportingTime?: string
  endReportingTime?: string
  status?: number
  pageNumber: number
  pageSize: number
}

export interface StormData {
  name: string
  level: number
  startImpactTime: string
  endImpactTime: string
  reportingTime: string
  preparationCompletionTimeBeforeStorm: string
  stormDetailsRequests: StormDetailsRequest[]
  notificationMethods?: string[]
  provinceIds: number[]
  receivedNotificationGroups?: number[]
  assignedTaskGroups?: number[]
  status: StormStatus
  regions: ERegion[]
}

export interface StormList {
  id: number
  name: string
  level: number
  startImpactTime: string
  endImpactTime: string
  reportingTime: string
  preparationCompletionTimeBeforeStorm: string
  provinces: string
  notificationMethod: number
  status: StormStatus
  groupNames: string
}

export interface StormDetailsRequest {
  longitude?: number | null
  latitude?: number | null
  windStrength?: number | null
  direction?: string | null
  velocity?: number | null
  temperature?: number | null
  gusts?: number | null
  movingDate?: string | null
}

export interface StormDetail {
  id: number
  name: string
  level: number
  startImpactTime: string
  endImpactTime: string
  reportingTime: string
  preparationCompletionTimeBeforeStorm: string
  notificationMethods: number[]
  provinces: Province[]
  userGroups: UserGroup[]
  numberOfSubTasks: number
  numberOfCompleteTasks: number
  percentageOfCompleteTasks: number
  status: StormStatus
  regions: ERegion[]
  regionsStr: string
}

interface Province {
  id: number
  name: string
}

interface UserGroup {
  id: number
  name: string
  groupType: EUserGroupType
}

export interface StormDirectionHistory {
  id: number
  stormId?: number | null
  longitude?: number | null
  latitude?: number | null
  windStrength?: number | null
  gusts?: number | null
  direction?: number | null
  velocity?: number | null
  temperature?: number | null
  movingDate?: string | null
  level?: number | null
}