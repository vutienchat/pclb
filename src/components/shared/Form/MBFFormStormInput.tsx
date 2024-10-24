import type {FieldValues} from "react-hook-form";
import type {TextFieldProps} from "@mui/material/TextField";
import MBFFormAutocomplete from "@src/components/shared/Form/MBFFormAutocomplete";
import {
  useGetStormById,
  useGetStormList
} from "@src/queries/storm";
import {useState} from "react";
import {Option} from "@src/types";
import useDebounce from "@src/hooks/useDebounce";
import {StormDetail} from "@src/types/service/storm";

interface MBFFormStormInputProps<O extends FieldValues, V extends number>
  extends Omit<TextFieldProps, 'name' | 'onSelect'> {
  name: string
  labelVariant?: 'standard' | 'outlined'
  onSelectStorm: (value: StormDetail | null) => void
}

const MBFFormStormInput = <O extends FieldValues, V extends number>(props: MBFFormStormInputProps<O, V>) => {
  const {
    name,
    onSelectStorm,
    ...rest
  } = props;
  const [storms, setStorms] = useState<Option<number>[]>([]);
  const getStorm = useGetStormList();
  const getStormDetail = useGetStormById()
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = useDebounce((searchText: string) => {
    setLoading(true)
    getStorm.mutate({
      searchText,
      pageSize: 10,
      pageNumber: 1,
    }, {
      onSuccess: (res) => {
        if (res.responseData.content) {
          setStorms([
            {
              label: searchText,
              value: 0
            }
          ].concat(res.responseData.content.map(i => (
            {
              label: i.name,
              value: i.id
            }
          ))))
        }
      },
      onSettled: () => {
        setLoading(false)
      }
    })
  }, 300)

  const handleSelect = (value: number | null) => {
    if (value !== 0 && value) {
      getStormDetail.mutate(value, {
        onSuccess: (res) => {
          if (res.responseData) {
            onSelectStorm(res.responseData)
          }
        }
      })
    } else if (value === 0) {
      const storm = storms.find(i => i.value === 0)
      onSelectStorm({id: 0, name: storm?.label || ''} as StormDetail)
    } else {
      onSelectStorm(null)
    }
  }

  return <MBFFormAutocomplete
    name={name}
    options={storms}
    renderLabel={(option) => option.label}
    renderValue={(option) => option.value}
    onSearch={handleSearch}
    onSelect={handleSelect}
    loading={loading}
    {...rest}
  />
}
export default MBFFormStormInput