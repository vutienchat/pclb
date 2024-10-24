import { Option } from '@src/types'

export enum StationType {
  MLL = 'mll',
  MD = 'md',
  MFD = 'mfd'
}

export enum ConveyingEquipmentType {
  MTC = 'mtc',
  AGG = 'agg',
  CSG = 'csg'
}

export enum Direction {
  North = '1',
  East = '2',
  South = '3',
  West = '4'
}

export const DirectionLabel: Record<Direction, string> = {
  [Direction.North]: 'Bắc',
  [Direction.East]: 'Đông',
  [Direction.South]: 'Nam',
  [Direction.West]: 'Tây'
}

export const DirectionOption: Option<string>[] = [
  {
    label: DirectionLabel[Direction.North],
    value: Direction.North
  },
  {
    label: DirectionLabel[Direction.East],
    value: Direction.East
  },
  {
    label: DirectionLabel[Direction.South],
    value: Direction.South
  },
  {
    label: DirectionLabel[Direction.West],
    value: Direction.West
  }
]

export enum StormStatus {
  Active = 0,
  Inactive = 1
}

export const StormStatusLabel: Record<StormStatus, string> = {
  [StormStatus.Active]: 'Hoạt động',
  [StormStatus.Inactive]: 'Không hoạt động'
}

export const StormStatusOption: Option<number>[] = [
  {
    label: StormStatusLabel[StormStatus.Active],
    value: StormStatus.Active
  },
  {
    label: StormStatusLabel[StormStatus.Inactive],
    value: StormStatus.Inactive
  }
]

export enum NotificationMethod {
  Email = '1',
  SMS = '0',
  System = '2'
}

export const NotificationMethodLabel: Record<NotificationMethod, string> = {
  [NotificationMethod.Email]: 'Email',
  [NotificationMethod.SMS]: 'SMS',
  [NotificationMethod.System]: 'Thông báo hệ thống'
}

export const NotificationMethodOption: Option<string>[] = [
  {
    label: NotificationMethodLabel[NotificationMethod.Email],
    value: NotificationMethod.Email
  },
  {
    label: NotificationMethodLabel[NotificationMethod.SMS],
    value: NotificationMethod.SMS
  },
  {
    label: NotificationMethodLabel[NotificationMethod.System],
    value: NotificationMethod.System
  }
]

export enum ERegion {
  North = 'Mien Bac',
  Center = 'Mien Trung',
  South = 'Mien Nam'
}

export const RegionLabel: Record<ERegion, string> = {
  [ERegion.North]: 'Miền Bắc',
  [ERegion.Center]: 'Miền Trung',
  [ERegion.South]: 'Miền Nam'
}

export const RegionOption: Option<string>[] = [
  {
    label: RegionLabel[ERegion.North],
    value: ERegion.North
  },
  {
    label: RegionLabel[ERegion.Center],
    value: ERegion.Center
  },
  {
    label: RegionLabel[ERegion.South],
    value: ERegion.South
  }
]

export enum EShowType {
  Base = 0,
  Advantage = 1
}

export const ShowTypeLabel: Record<EShowType, string> = {
  [EShowType.Base]: 'Cơ bản',
  [EShowType.Advantage]: 'Nâng cao'
}

export const ShowTypeOption: Option<number>[] = [
  {
    label: ShowTypeLabel[EShowType.Base],
    value: EShowType.Base
  },
  {
    label: ShowTypeLabel[EShowType.Advantage],
    value: EShowType.Advantage
  }
]
