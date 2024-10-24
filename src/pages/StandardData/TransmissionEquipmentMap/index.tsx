import { Box, Typography } from '@mui/material'
import PageWrapper from '@src/components/shared/Page/PageWrapper'
import { Fragment } from 'react/jsx-runtime'

const TransmissionEquipmentMapPage = () => {
  return (
    <Fragment>
      <PageWrapper title='Quản lý, chuẩn hóa danh sách thiết bị truyền dẫn ảnh hưởng'>
        <Typography color='primary.main' fontSize={24} fontWeight={700}>
          Quản lý, chuẩn hóa danh sách thiết bị truyền dẫn ảnh hưởng
        </Typography>
      </PageWrapper>
    </Fragment>
  )
}

export default TransmissionEquipmentMapPage