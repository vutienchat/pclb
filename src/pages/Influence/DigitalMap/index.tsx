import { Box, Typography } from '@mui/material'
import { Fragment } from 'react/jsx-runtime'

import PageWrapper from '@src/components/shared/Page/PageWrapper'
import TabMenu from './components/TabMenu'

const DigitalMapPage = () => {
  return (
    <Fragment>
      <PageWrapper title='Bản đồ số'>
        <Typography color='primary.main' fontSize={24} fontWeight={700}>
          Bản đồ số
        </Typography>
        <Box>
          <TabMenu />
        </Box>
      </PageWrapper>
    </Fragment>
  )
}

export default DigitalMapPage
