import {
  FieldValues,
} from "react-hook-form";
import type {TextFieldProps} from "@mui/material/TextField";
import useMasterdata from "@src/hooks/useMasterdata";
import MBFFormAutocompleteMultiple from "@src/components/shared/Form/MBFFormAutocompleteMultiple";
import {
  ERegion,
  RegionOption
} from "@src/constants/common";

interface MBFFormRegionInputProps<O extends FieldValues, V extends string>
  extends Omit<TextFieldProps, 'name' | 'onSelect'> {
  name: string
  renderLabel?: (option: O) => string
  renderValue?: (option: O) => V
  getOptionDisabled?: (option: O) => boolean
  onSelect?: (value: V) => void
  placeholder?: string
  actionText?: string // Like placeholder, but for instruction
  labelVariant?: 'standard' | 'outlined'
  onSearch?: (value: any) => void
  multiple?: boolean
}

const MBFFormRegionInput = <O extends FieldValues, V extends string>(props: MBFFormRegionInputProps<O, V>) => {
  const {
    multiple = false,
    ...rest
  } = props
  const {
    getProvinces
  } = useMasterdata()

  if (multiple) {
    return (
      <MBFFormAutocompleteMultiple
        options={RegionOption as unknown as O[]}
        onChangeAutoInput={(value) => getProvinces({regions: value as ERegion[]})}
        {...rest}
      />
    )
  }

  return <></>
}
export default MBFFormRegionInput