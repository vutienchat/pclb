type UserRoleInfoList = {
  systemRoleCode: string
  systemRoleDescription: string
  systemRoleId: number
  systemRoleName: string
}

export interface User {
  id: number
  fullName: string
  username: string
  email: string
  mobile: string
  positionId: number
  positionName: string
  centerId: null | number
  centerName: null | string
  departmentId: null | number
  departmentName: null | string
  teamId: null | number
  teamName: null | string
  avatarUrl: string | null
  region: string | null
  userRoleInfoList: UserRoleInfoList[]
}

export interface ISystemRole {
  code: string
  createdAt: string
  description: string
  id: number
  name: string
  roleType: number
  updatedAt: string
}
