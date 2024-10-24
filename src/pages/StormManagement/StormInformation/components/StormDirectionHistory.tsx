import {Fragment} from 'react'
import Grid from '@mui/material/Grid'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFFormLabel from '@src/components/shared/Form/MBFFormLabel'
import MBFFormDateTimePicker from '@src/components/shared/Form/MBFFormDateTimePicker'
import MBFFormSelect from '@src/components/shared/Form/MBFFormSelect'
import Typography from '@mui/material/Typography'
import {DirectionOption} from '@src/constants/common'

interface StormDirectionHistoryProps {
  disabled?: boolean
  fields: any[]
  showFull?: boolean
  maxHeight?: number
}

const StormDirectionHistory = (props: StormDirectionHistoryProps) => {
  const {
    disabled = false,
    fields,
    showFull = false,
    maxHeight
  } = props

  return (
    <Grid container
          spacing={1}>
      <Grid item
            xs={12}>
        <Typography fontSize={18}
                    fontWeight={500}
                    color={'primary.main'}>
          Tiến trình cơn bão/lụt
        </Typography>
      </Grid>
      <Grid item
            xs={12}>
        <Grid container
              columns={17}
              spacing={1}>
          <Grid item
                xs={12}
                md={3}>
            <MBFFormLabel title={'Thời gian'}
                          name={'movingDate'} />
          </Grid>
          <Grid item
                xs={12}
                md={2}>
            <MBFFormLabel title={'Mức độ'}
                          name={'level'} />
          </Grid>
          <Grid item
                xs={12}
                md={2}>
            <MBFFormLabel title={'Kinh độ'}
                          name={'longitude'} />
          </Grid>
          <Grid item
                xs={12}
                md={2}>
            <MBFFormLabel title={'Vĩ độ'}
                          name={'latitude'} />
          </Grid>
          <Grid item
                xs={12}
                md={2}>
            <MBFFormLabel title={'Sức gió'}
                          name={'windStrength'} />
          </Grid>
          <Grid item
                xs={12}
                md={2}>
            <MBFFormLabel title={'Sức giật'}
                          name={'gusts'} />
          </Grid>
          <Grid item
                xs={12}
                md={2}>
            <MBFFormLabel title={'Hướng'}
                          name={'direction'} />
          </Grid>
          <Grid item
                xs={12}
                md={2}>
            <MBFFormLabel title={'Vận tốc (km/h)'}
                          name={'velocity'} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item
            xs={12}
            overflow={!showFull ? 'auto' : 'unset'}
            maxHeight={!showFull ? maxHeight || 190 : undefined}>
        <Grid container
              columns={17}
              columnSpacing={1}
              rowSpacing={2}>
          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <Grid item
                    xs={12}
                    md={3}>
                <MBFFormItem>
                  <MBFFormDateTimePicker
                    name={`stormDetailsRequests.${index}.movingDate`}
                    disabled={disabled || Boolean(field.stormId)}
                  />
                </MBFFormItem>
              </Grid>
              <Grid item
                    xs={12}
                    md={2}>
                <MBFFormItem>
                  <MBFFormInput
                    name={`stormDetailsRequests.${index}.level`}
                    placeholder="Nhập mức độ"
                    disabled={disabled || Boolean(field.stormId)}
                    type={'number'}
                  />
                </MBFFormItem>
              </Grid>
              <Grid item
                    xs={12}
                    md={2}>
                <MBFFormItem>
                  <MBFFormInput
                    name={`stormDetailsRequests.${index}.longitude`}
                    placeholder="Nhập kinh độ"
                    disabled={disabled || Boolean(field.stormId)}
                    type={'number'}
                  />
                </MBFFormItem>
              </Grid>
              <Grid item
                    xs={12}
                    md={2}>
                <MBFFormItem>
                  <MBFFormInput
                    name={`stormDetailsRequests.${index}.latitude`}
                    placeholder="Nhập vĩ độ"
                    disabled={disabled || Boolean(field.stormId)}
                    type={'number'}
                  />
                </MBFFormItem>
              </Grid>
              <Grid item
                    xs={12}
                    md={2}>
                <MBFFormItem>
                  <MBFFormInput
                    name={`stormDetailsRequests.${index}.windStrength`}
                    placeholder="Nhập sức gió"
                    disabled={disabled || Boolean(field.stormId)}
                    type={'number'}
                  />
                </MBFFormItem>
              </Grid>
              <Grid item
                    xs={12}
                    md={2}>
                <MBFFormItem>
                  <MBFFormInput
                    name={`stormDetailsRequests.${index}.gusts`}
                    placeholder="Nhập sức giật"
                    disabled={disabled || Boolean(field.stormId)}
                    type={'number'}
                  />
                </MBFFormItem>
              </Grid>
              <Grid item
                    xs={12}
                    md={2}>
                <MBFFormItem>
                  <MBFFormSelect
                    name={`stormDetailsRequests.${index}.direction`}
                    options={DirectionOption}
                    disabled={disabled || Boolean(field.stormId)}
                  />
                </MBFFormItem>
              </Grid>
              <Grid item
                    xs={12}
                    md={2}>
                <MBFFormItem>
                  <MBFFormInput
                    name={`stormDetailsRequests.${index}.velocity`}
                    placeholder="Nhập vận tốc"
                    disabled={disabled || Boolean(field.stormId)}
                    type={'number'}
                  />
                </MBFFormItem>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}
export default StormDirectionHistory