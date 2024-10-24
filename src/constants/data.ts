import { EUserGroupType } from '@src/types/service/masterdata'

export const GROUP_USER_TYPE = [
  {
    label: 'Nhóm người dùng nhận công việc',
    value: EUserGroupType.AssignWork
  },
  {
    label: 'Nhóm người dùng nhận thông báo',
    value: EUserGroupType.Notify
  }
]

export const PRIORITIES = [
  {
    label: 'Ưu tiên 1',
    value: 1
  },
  {
    label: 'Ưu tiên 2',
    value: 2
  },
  {
    label: 'Ưu tiên 3',
    value: 3
  }
]

export const DEVICE_TYPE = [
  {
    label: 'MLL',
    value: 1
  },
  {
    label: 'MĐ',
    value: 2
  },
  {
    label: 'MFĐ',
    value: 3
  },
  {
    label: 'MLL SITE',
    value: 4
  }
]
