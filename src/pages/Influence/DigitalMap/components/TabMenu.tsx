import React, { useEffect, useState } from 'react'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Stack, styled, Tab, Tooltip, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import PluginIcon from '@src/components/shared/Icons/PluginIcon'
import StationIcon from '@src/components/shared/Icons/StationIcon'
import Validation from '@src/utils/Validation'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import SiteMap from './SiteMap'
import DeviceMap from './DeviceMap'

type TMapType = 'SITE' | 'DEVICE'

const schema = Validation.shape({
  region: Validation.string().default(''),
  provinceId: Validation.number().nullable().default(null),
  status: Validation.number().nullable().default(null)
})

export type DigitalMapForm = typeof schema.__outputType

const TabMenu = () => {
  const [mapType, setMapType] = useState<TMapType>('SITE')

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      region: '',
      status: null
    }
  })

  useEffect(() => {
    form.reset({
      region: '',
      status: null
    })
  }, [mapType])

  const handleChange = (event: React.SyntheticEvent, newValue: TMapType) => {
    setMapType(newValue)
  }

  const onSearching = (data: DigitalMapForm) => {
    console.log(data)
  }

  return (
    <MBFFormProvider form={form} onFinish={onSearching}>
      <TabContext value={mapType}>
        <TabListCustom>
          <TabList
            onChange={handleChange}
            aria-label='transmission-equipment-report'
            sx={{
              backgroundColor: '#5196c4',
              display: 'inline-block',
              height: 36,
              minHeight: 36,
              borderRadius: 1
            }}
          >
            <Tab
              label={
                <Stack justifyContent='space-between' alignItems='center'>
                  <Tooltip title='Trạm'>
                    <Box>
                      <StationIcon />
                    </Box>
                  </Tooltip>
                </Stack>
              }
              value='SITE'
            />
            <Tab
              label={
                <Stack justifyContent='space-between' alignItems='center'>
                  <Tooltip title='Thiết bị truyền dẫn'>
                    <Box>
                      <PluginIcon />
                    </Box>
                  </Tooltip>
                </Stack>
              }
              value='DEVICE'
            />
          </TabList>
        </TabListCustom>
        <TabPanelCustom value='SITE'>
          <SiteMap />
        </TabPanelCustom>
        <TabPanelCustom value='DEVICE'>
          <DeviceMap />
        </TabPanelCustom>
      </TabContext>
    </MBFFormProvider>
  )
}

const TabListCustom = styled(Box)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 0,
    display: 'none',
    visibility: 'hidden'
  },
  '& .MuiButtonBase-root': {
    minHeight: 36,
    height: 36,
    backgroundColor: '#d5e7fb',
    padding: '0 16px',
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
