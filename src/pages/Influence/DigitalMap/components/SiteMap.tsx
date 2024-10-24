import { Box, Stack, Typography } from '@mui/material'
import SearchingSite from './SearchingSite'
import { useFormContext } from 'react-hook-form'
import * as Map from 'leaflet'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'

import { useGetMapSite, useGetSiteDetail } from '@src/queries'
import DigitalMap from './DigitalMap'
import { IMapSite } from '@src/types'
import { DigitalMapForm } from './TabMenu'
import useNotification from '@src/hooks/useNotification'
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

const SiteMap = () => {
  const [sites, setSites] = useState<IMapSite[]>([])
  const { getValues } = useFormContext<DigitalMapForm>()
  const [center, setCenter] = useState<Map.LatLngExpression | undefined>(undefined)
  const { provinceLatLong } = useMasterdata()

  const notification = useNotification()

  const getSiteMap = useGetMapSite()
  const getSiteDetail = useGetSiteDetail()

  const handleSearchSiteMap = () => {
    try {
      const { provinceId, status } = getValues()
      if (!provinceId) {
        notification({
          error: 'Vui lòng chọn tỉnh/thành phố'
        })
      } else {
        getSiteMap
          .mutateAsync({ provinceId, status, priority: null })
          .then((res) => {
            setSites(res?.responseData || [])
            const province = provinceLatLong.find((d) => d.value === provinceId)
            if (province) {
              const center: Map.LatLngExpression = [parseFloat(province.lat), parseFloat(province.lon)]
              setCenter(center)
            }
          })
          .catch((error) => {
            console.log(error)
          })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const { provinceId, status } = getValues()
    getSiteMap
      .mutateAsync({ provinceId, status, priority: null })
      .then((res) => {
        setSites(res?.responseData || [])
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleMarkerClick = async (
    marker: { position: Map.LatLngExpression; name: string; id: number; options: Map.MarkerOptions },
    map: Map.Map
  ) => {
    // Call API get site detail
    if (marker.id) {
      const res = await getSiteDetail.mutateAsync(marker.id)

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
    <Box sx={{ display: 'grid', gridTemplateRows: '1fr auto', height: 1, position: 'relative' }}>
      <SearchingSite onSearching={handleSearchSiteMap} />
      <DigitalMap
        id='site-map'
        center={center}
        maker={sites.map((d) => {
          return {
            position: [parseFloat(d.lat), parseFloat(d.lon)],
            name: d.siteName,
            id: d.siteId,
            options: {
              icon: Map.divIcon({
                className: 'custom-div-icon',
                html: `<div style='background-color: ${d.status === 2 ? '#DA834E' : d.status === 3 ? '#ECB040' : '#ED1C24'}; border-radius: 50%; width: 14px; height: 14px;'></div>`,
                iconSize: [14, 14],
                iconAnchor: [5, 5]
              })
            }
          }
        })}
        handleMarkerClick={handleMarkerClick}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          zIndex: 99999,
          backgroundColor: 'white',
          p: 2,
          borderRadius: 1
        }}
      >
        <Stack alignItems={'center'}>
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
          <Typography>Trạm máy phát điện</Typography>
        </Stack>
        <Stack alignItems={'center'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#DA834E',
              width: 14,
              height: 14,
              borderRadius: '50%'
            }}
          />
          <Typography>Trạm mất điện</Typography>
        </Stack>
        <Stack alignItems={'center'}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#ED1C24',
              width: 14,
              height: 14,
              borderRadius: '50%'
            }}
          />
          <Typography>Trạm mất liên lạc</Typography>
        </Stack>
      </Box>
    </Box>
  )
}

export default SiteMap
