import * as Map from 'leaflet'
import {Stack} from '@mui/material'
import {
  useEffect,
  useState
} from 'react'
import {useFormContext} from 'react-hook-form'

import {
  TDevice,
  TStationType
} from '@src/types'
import EquipmentBox from './EquipmentBox'
import SearchingInfluence from './SearchingInfluence'
import MapContainer from '@src/components/map'
import {useGetTransmissionDeviceMap} from '@src/queries'
import {OverallReportForm} from './TabMenu'

const TRANSMISSION_TYPE: TStationType[] = ['MTC', 'AGG', 'CSG']

const TransmissionEquipmentReport = () => {
  const [deviceMap, setDeviceMap] = useState<TDevice[]>([])

  const {watch} = useFormContext<OverallReportForm>()
  const provinceId = watch('provinceId')

  const getTransmissionDeviceMap = useGetTransmissionDeviceMap()

  useEffect(() => {
    try {
      if (provinceId) {
        getTransmissionDeviceMap
          .mutateAsync(provinceId)
          .then((data) => {
            setDeviceMap(data?.responseData || [])
          })
          .catch((error) => {
            console.log(error)
          })
      }
    }
    catch (error) {
      console.log(error)
    }
  }, [provinceId])

  return (
    <>
      <Stack justifyContent='flex-start'
             spacing={4}
             flexWrap='wrap'>
        {TRANSMISSION_TYPE.map((type) => (
          <EquipmentBox key={type}
                        type={type}
                        count={6} />
        ))}
      </Stack>
      <SearchingInfluence />
      <MapContainer
        maker={deviceMap.map((d) => (
          {
            position: [+d.lat, +d.lon],
            name: d.deviceName
          }
        ))}
        makerOptions={{
          icon: Map.divIcon({
            className: 'custom-div-icon',
            html: `<div style='background-color: #f00; border-radius: 50%; width: 10px; height: 10px;'></div>`,
            iconSize: [14, 14],
            iconAnchor: [5, 5]
          })
        }}
      />
    </>
  )
}

export default TransmissionEquipmentReport
