import { Box, Stack, Typography } from '@mui/material'
import { Fragment } from 'react/jsx-runtime'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined'

import PageWrapper from '@src/components/shared/Page/PageWrapper'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import DateTime from '@src/utils/DateTime'
import ListIssueReport from './components/ListIssueReport'
import TabMenu from '../DigitalMap/components/TabMenu'

const OverallReportPage = () => {
  const currentDate = DateTime.currentDateTime()
  const hour = new Date().getHours()
  const minute = new Date().getMinutes()

  return (
    <Fragment>
      <PageWrapper title='Báo cáo tổng hợp'>
        <Stack justifyContent='space-between' alignItems='center'>
          <Typography color='primary.main' fontSize={24} fontWeight={700}>
            Báo cáo tình hình mạng lưới
          </Typography>
          <Stack alignItems='center' ml={4} spacing={4}>
            <Stack alignItems='center'>
              <Typography color='primary.main' fontWeight={700}>
                Cập nhật gần nhất:
              </Typography>
              <Typography>{currentDate}</Typography>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: 999999,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: 14,
                  color: '#fff',
                  backgroundColor: 'primary.main'
                }}
              >
                {hour < 10 ? `0${hour}` : hour}:{minute < 10 ? `0${minute}` : minute}
              </Box>
            </Stack>
            <MBFActionButton
              variant='outlined'
              sx={{ backgroundColor: '#FFF !important', color: 'primary.main', borderRadius: 16 }}
              startIcon={<QuestionAnswerOutlinedIcon sx={{ fill: 'primary.main' }} />}
              endIcon={
                <Box
                  sx={{
                    width: 26,
                    height: 26,
                    borderRadius: 999999,
                    backgroundColor: 'error.main',
                    color: '#FFF',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 8
                  }}
                >
                  <Typography>9+</Typography>
                </Box>
              }
            >
              Trao đổi thông tin bão lũ
            </MBFActionButton>
          </Stack>
        </Stack>
        <Box>
          <ListIssueReport />
          <TabMenu />
          {/* <TabMenu /> */}
        </Box>
      </PageWrapper>
    </Fragment>
  )
}

export default OverallReportPage
