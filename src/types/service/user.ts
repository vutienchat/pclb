export interface UserProfile {
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
}

export interface Permission {}
