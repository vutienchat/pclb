import { Box, Stack, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import * as Map from 'leaflet'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import { useGetTransmissionDeviceDetail, useGetTransmissionDeviceMap } from '@src/queries'
import DigitalMap from './DigitalMap'
import { TDevice } from '@src/types'
import { DigitalMapForm } from './TabMenu'
import SearchingDevice from './SearchingDevice'
import useMasterdata from '@src/hooks/useMasterdata'

type TPopupProps = {
  title: string
}

const Popup = ({ title }: TPopupProps) => {
  return (
    <Stack alignItems={'center'} maxWidth={400} maxHeight={500} overflow={'auto'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ECB040',
          width: 14,
          height: 14,
          borderRadius: '50%'
        }}
      />
      <Typography>{title}</Typography>
    </Stack>
  )
}

const DeviceMap = () => {
  const [devices, setDevices] = useState<TDevice[]>([])
  const [center, setCenter] = useState<Map.LatLngExpression | undefined>(undefined)
  const { provinceLatLong } = useMasterdata()

  const { getValues } = useFormContext<DigitalMapForm>()

  const getDeviceMap = useGetTransmissionDeviceMap()
  const getTransmissionDeviceDetail = useGetTransmissionDeviceDetail()

  const handleSearchDevice = () => {
    try {
      const { provinceId } = getValues()
      if (!provinceId) return
      getDeviceMap
        .mutateAsync(provinceId)
        .then((res) => {
          setDevices(res?.responseData || [])
          const province = provinceLatLong.find((d) => d.value === provinceId)
          if (province) {
            const center: Map.LatLngExpression = [parseFloat(province.lat), parseFloat(province.lon)]
            setCenter(center)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleSearchDevice()
  }, [])

  const handleMarkerClick = async (
    marker: { position: Map.LatLngExpression; name: string; id: number; options: Map.MarkerOptions },
    map: Map.Map
  ) => {
    // Call API get site detail
    if (marker.id) {
      const res = await getTransmissionDeviceDetail.mutateAsync(marker.id)

      const container = document.createElement('div')

      ReactDOM.createRoot(container).render(<Popup title={marker.name} />)

      const popup = Map.popup().setLatLng(marker.position).setContent(container)
      // .on('popupopen', function (e) {
      //   var px = map.project(e.target._popup._latlng) // find the pixel location on the map where the popup anchor is
      //   px.y -= e.target._popup._container.clientHeight / 2 // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
      //   map.panTo(map.unproject(px), { animate: true }) // pan to new center
      // })

      popup.openOn(map)
    }
  }

  return (
    <Box sx={{ display: 'grid', gridTemplateRows: '1fr auto', height: 1 }}>
      <SearchingDevice onSearching={handleSearchDevice} />
      <DigitalMap
        center={center}
        id='device-map'
        maker={devices.map((d) => {
          return {
            position: [parseFloat(d.lat), parseFloat(d.lon)],
            name: d.deviceName,
            id: d.deviceId,
            options: {
              icon: Map.divIcon({
                className: 'custom-div-icon',
                html: `<div style='background-color: #ED1C24; border-radius: 50%; width: 14px; height: 14px;'></div>`,
                iconSize: [14, 14],
                iconAnchor: [5, 5]
              })
            }
          }
        })}
        handleMarkerClick={handleMarkerClick}
      />
    </Box>
  )
}

export default DeviceMap
