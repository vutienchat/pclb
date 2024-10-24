import Stack from '@mui/material/Stack'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFTable from '@src/components/shared/Table'
import useTaskCheckListTable from '@src/pages/PreparingStormManagement/BeforeStorm/Unit/table/taskChecklistColumns'

interface UnitTaskTableProps {
  fields: any[]
}

const UnitTaskTable = (props: UnitTaskTableProps) => {
  const { fields } = props
  const { columns } = useTaskCheckListTable()
  return (
    <Stack direction={'column'} spacing={1}>
      <MBFFormItem>
        <MBFFormInput
          name={'a'}
          label={'Đối tượng'}
        />
      </MBFFormItem>
      <MBFTable<any>
        columns={columns}
        data={fields}
      />
    </Stack>
  )
}
export default UnitTaskTable