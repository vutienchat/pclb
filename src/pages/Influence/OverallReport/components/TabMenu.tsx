import React from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Stack, styled, Tab, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import PluginIcon from '@src/components/shared/Icons/PluginIcon'
import StationIcon from '@src/components/shared/Icons/StationIcon'
import StationReport from './StationReport'
import TransmissionEquipmentReport from './TransmissionEquipmentReport'
import Validation from '@src/utils/Validation'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'

const schema = Validation.shape({
  region: Validation.string().required(),
  provinceId: Validation.number().required(),
  state: Validation.string().notRequired()
})

export type OverallReportForm = typeof schema.__outputType

const TabMenu = () => {
  const [value, setValue] = React.useState('1')

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      region: '',
      provinceId: 0,
      state: ''
    }
  })

  const onSearching = (data: OverallReportForm) => {
    console.log(data)
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <MBFFormProvider form={form} onFinish={onSearching}>
      <TabContext value={value}>
        <TabListCustom>
          <TabList onChange={handleChange} aria-label='transmission-equipment-report'>
            <Tab
              label={
                <Stack justifyContent='space-between' alignItems='center'>
                  <StationIcon />
                  <Typography>Trạm</Typography>
                </Stack>
              }
              value='1'
              sx={{ marginRight: 4 }}
            />
            <Tab
              label={
                <Stack justifyContent='space-between' alignItems='center'>
                  <PluginIcon />
                  <Typography>Thiết bị dẫn truyền</Typography>
                </Stack>
              }
              value='2'
            />
          </TabList>
        </TabListCustom>
        <TabPanelCustom value='1'>
          <StationReport />
        </TabPanelCustom>
        <TabPanelCustom value='2'>
          <TransmissionEquipmentReport />
        </TabPanelCustom>
      </TabContext>
    </MBFFormProvider>
  )
}

const TabListCustom = styled(Box)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 0
  },
  '& .MuiButtonBase-root': {
    minHeight: 36,
    height: 36,
    backgroundColor: '#d5e7fb',
    padding: '0 16px',
    borderRadius: 16,
    color: theme.palette.primary.main,
    textTransform: 'none',
    '& div > svg': {
      fill: '#000'
    }
  },
  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText + '!important',
    '& div > svg': {
      fill: theme.palette.primary.contrastText
    }
  }
}))

const TabPanelCustom = styled(TabPanel)(({ theme }) => ({
  padding: '8px 0'
}))

export default TabMenu
