import { Box, styled } from '@mui/material'
import * as Map from 'leaflet'
import { useEffect, useState } from 'react'

type TProps = Map.MapOptions & {
  center?: Map.LatLngExpression
  maker?: { position: Map.LatLngExpression; name: string }[]
  makerOptions?: Map.MarkerOptions
}

const MapContainer = (props: TProps) => {
  const { center = [15.834536, 110.880273], maker, makerOptions, ...options } = props
  const [position, setPosition] = useState<Map.LatLngExpression>(center)
  const [map, setMap] = useState<Map.Map | null>()

  useEffect(() => {
    const map = Map.map('mapid', options).setView(position, 6)
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
    if (maker && map) {
      maker.forEach((item) => {
        Map.marker(item.position, {
          ...makerOptions
        })
          .bindTooltip(item.name, {
            className: 'maker-tooltip'
          })
          .addTo(map)
      })
    }
  }, [maker, map])

  return <MapContainerCus id='mapid' height={1000} width={1} my={4} />
}

const MapContainerCus = styled(Box)(({ theme }) => ({
  '& .leaflet-bottom.leaflet-right': {
    display: 'none'
  }
}))

export default MapContainer
