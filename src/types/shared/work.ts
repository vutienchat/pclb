export interface IWork {
  description: string
  expectation: string
  id: number
  name: string
  note: string
  userGroups: null
  userGroupsStr: string
  valueType: number
}

export interface IWorkDetail {
  id: number
  name: string
  note: string
  userGroupIds: number[]
  subTasks: {
    expectation: string
    id: number
    name: string
    valueType: number
  }[]
}
