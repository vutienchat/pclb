import { Box, styled } from '@mui/material'
import * as Map from 'leaflet'
import { useEffect, useState } from 'react'

type TProps = Map.MapOptions & {
  center?: Map.LatLngExpression
  maker?: { position: Map.LatLngExpression; name: string; id: number; options: Map.MarkerOptions }[]
  id: string
  handleMarkerClick: (
    marker: { position: Map.LatLngExpression; name: string; id: number; options: Map.MarkerOptions },
    map: Map.Map
  ) => void
}

const DigitalMap = (props: TProps) => {
  const { center, maker, id, handleMarkerClick, ...options } = props
  const [map, setMap] = useState<Map.Map | null>()

  useEffect(() => {
    const map = Map.map(id, options).setView([15.834536, 110.880273], 6)
    Map.tileLayer('https://khituongvietnam.gov.vn/mapvn/map/{z}/{x}/{y}.png', {
      tms: false,
      minZoom: 5,
      maxZoom: 14
    }).addTo(map)

    setMap(map)

    return () => {
      map.remove()
    }
  }, [])

  useEffect(() => {
    if (map && center) {
      map.setView(center, 10)
    }
  }, [center, map])

  useEffect(() => {
    if (maker?.length && map) {
      // remove all marker
      map?.eachLayer((layer) => {
        if (layer instanceof Map.Marker) {
          map.removeLayer(layer)
        }
      })

      // add new marker
      maker.forEach((item) => {
        Map.marker(item.position, {
          ...item.options
        })
          .addTo(map)
          .on('click', () => {
            handleMarkerClick(item, map)
          })
      })
    } else {
      map?.eachLayer((layer) => {
        if (layer instanceof Map.Marker) {
          map.removeLayer(layer)
        }
      })
    }
  }, [maker, map])

  return <MapContainerCus id={id} />
}

const MapContainerCus = styled(Box)(({ theme }) => ({
  height: 600,
  width: '100%',
  my: 4,
  '& .leaflet-bottom.leaflet-right': {
    display: 'none'
  },
  '& .leaflet-popup-content': {
    height: 'auto',
    width: '320px !important'
  }
}))

export default DigitalMap
