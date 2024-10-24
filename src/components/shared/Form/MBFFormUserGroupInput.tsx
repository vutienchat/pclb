import type {FieldValues} from 'react-hook-form'
import type {TextFieldProps} from '@mui/material/TextField'
import MBFFormAutocompleteMultiple from '@src/components/shared/Form/MBFFormAutocompleteMultiple'
import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import useMasterdata from '@src/hooks/useMasterdata'
import {EUserGroupType} from '@src/types/service/masterdata'
import {useMemo} from 'react'
import {Option} from '@src/types'
import useDebounce from '@src/hooks/useDebounce'

interface MBFFormUserGroupInputProps<O extends FieldValues, V extends string | number>
  extends Omit<TextFieldProps, 'name' | 'onSelect'> {
  name: string
  renderLabel?: (option: O) => string
  renderValue?: (option: O) => V
  getOptionDisabled?: (option: O) => boolean
  onSelect?: (value: V | null) => void
  placeholder?: string
  actionText?: string // Like placeholder, but for instruction
  labelVariant?: 'standard' | 'outlined'
  onSearch?: (value: any) => void
  multiple?: boolean
  initOption?: Option<number>[]
  fixedSelect?: Option<number>[]
  userGroupType: EUserGroupType
}

const MBFFormUserGroupInput = <O extends FieldValues, V extends string | number>(
  props: MBFFormUserGroupInputProps<O, V>
) => {
  const {
    multiple = false,
    initOption = [],
    fixedSelect = [],
    userGroupType,
    ...rest
  } = props
  const {
    getUserGroupsAssignWork,
    getUserGroupsNotify,
    loadingUserGroupAssignTask,
    loadingUserGroupNotify,
    userGroupAssignWork,
    userGroupNotify
  } = useMasterdata()

  const options = useMemo(() => {
    if (userGroupType === EUserGroupType.AssignWork) {
      return userGroupAssignWork as unknown as O[]
      // return removeDuplicates(userGroupAssignWork.concat(initOption), ['value']) as unknown as O[]
    }
    return userGroupNotify as unknown as O[]
    // return removeDuplicates(userGroupNotify.concat(initOption), ['value']) as unknown as O[]
  }, [userGroupType, userGroupAssignWork, userGroupNotify, initOption])

  const handleSearch = useDebounce((key: string) => {
    if (userGroupType === EUserGroupType.AssignWork) {
      getUserGroupsAssignWork({keyword: key})
    } else {
      getUserGroupsNotify({keyword: key})
    }
  }, 300)

  if (multiple) {
    return (
      <MBFFormAutocompleteMultiple
        options={options}
        onSearch={handleSearch}
        initOptions={initOption as unknown as O[]}
        fixedSelect={fixedSelect as unknown as O[]}
        loading={userGroupType === EUserGroupType.Notify ? loadingUserGroupNotify : loadingUserGroupAssignTask}
        {...rest}
      />
    )
  }

  return (
    <MBFFormAutocomplete
      loading={userGroupType === EUserGroupType.Notify ? loadingUserGroupNotify : loadingUserGroupAssignTask}
      options={options}
      onSearch={handleSearch}
      initOptions={initOption as unknown as O[]}
      {...rest}
    />
  )
}
export default MBFFormUserGroupInput
