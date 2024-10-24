import { Box, Grid, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useMemo, useState } from 'react'

import PageWrapper from '@src/components/shared/Page/PageWrapper'
import Validation from '@src/utils/Validation'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFButton from '@src/components/shared/Button/MBFButton'
import UploadableAvatar from '@src/components/shared/UploadableAvatar'
import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import { useTypedSelector } from '@src/store'
import { useEditUserProfile, useGetDepartment, useGetTeam, useUploadImage } from '@src/queries'
import { TEditUserProfile } from '@src/services'
import { __URL_SERVICE__ } from '@src/config'
import useAuthState from '@src/hooks/useAuthState'
import useNotification from '@src/hooks/useNotification'

const schema = Validation.shape({
  username: Validation.string()
    .required('Tên đăng nhập không được để trống')
    .max(200, 'Tên đăng nhập không được vượt quá 200 ký tự'),
  email: Validation.string().email('Email không hợp lệ').required('Email không được để trống'),
  fullName: Validation.string().required('Tên nguời dùng không được để trống'),
  mobile: Validation.phone()
    .required('Số điện thoại không được để trống')
    .max(15, 'Số điện thoại không được vượt quá 15 ký tự'),
  departmentId: Validation.number().required('Phòng/Đài không được để trống'),
  positionId: Validation.number().required('Chức vụ không được để trống'),
  centerId: Validation.number().required('Đơn vị không được để trống'),
  teamId: Validation.number().required('Tổ không được để trống')
})

type UserDetailForm = typeof schema.__outputType
type FormType = 'edit' | 'view'

const AccountPage = () => {
  const { user } = useAuthState()
  const [formType, setFormType] = useState<FormType>('view')
  const [image, setImage] = useState<File | null>(null)
  const { centers, positions } = useTypedSelector((state) => state.metadata)

  const editUserProfile = useEditUserProfile()
  const uploadImage = useUploadImage()

  const notification = useNotification()

  const defaultValues = useMemo(() => {
    if (!user) return {}
    return {
      username: user?.username || '',
      email: user?.email || '',
      fullName: user?.fullName || '',
      mobile: user?.mobile || '',
      departmentId: user?.departmentId || 0,
      teamId: user?.teamId || 0,
      centerId: user?.centerId || 0,
      positionId: user?.positionId || 0
    }
  }, [user])

  const form = useForm<UserDetailForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const centerId = form.watch('centerId')
  const departmentId = form.watch('departmentId')

  const { data: department, refetch: refetchDepartment } = useGetDepartment(centerId)
  const { data: team, refetch: refetchTeam } = useGetTeam({
    centerId,
    departmentId
  })

  useEffect(() => {
    if (centerId) {
      refetchDepartment()
    }
  }, [centerId, refetchDepartment])

  useEffect(() => {
    if (departmentId && centerId) {
      refetchTeam()
    }
  }, [departmentId, centerId, refetchTeam])

  const onChangeFormType = () => {
    setFormType((type) => (type === 'view' ? 'edit' : 'view'))
  }

  const handleSubmit = (param: TEditUserProfile) => {
    editUserProfile.mutate(param, {
      onSuccess(data) {
        if (data.responseData && data.responseCode === '200') {
          notification({
            message: 'Cập nhật thông tin thành công',
            severity: 'success'
          })
          setFormType('view')
        }
      }
    })
  }

  const onSubmitEditProfile = async (values: UserDetailForm) => {
    if (image) {
      uploadImage.mutate(
        { file: image, folder: 'avatar' },
        {
          onSuccess: (data) => {
            if (data.responseData?.dataUrl) {
              handleSubmit({
                avatarUrl: data.responseData.dataUrl,
                fullName: values.fullName,
                email: values.email,
                mobile: values.mobile,
                teamId: values.teamId,
                positionId: values.positionId
              })
            }
          }
        }
      )
    } else {
      handleSubmit({
        avatarUrl: user?.avatarUrl || '',
        fullName: values.fullName,
        email: values.email,
        mobile: values.mobile,
        teamId: values.teamId,
        positionId: values.positionId
      })
    }
  }

  return (
    <PageWrapper title='Thông tin cá nhân'>
      <Typography color='primary.main' fontSize={24} fontWeight={700}>
        Thông tin người dùng
      </Typography>
      <MBFFormProvider form={form} onFinish={onSubmitEditProfile}>
        <Box
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: 4,
            p: 4,
            height: '100%'
          }}
        >
          <UploadableAvatar
            mb={3}
            enableUpload={formType === 'edit'}
            setImage={setImage}
            src={user?.avatarUrl ? `${__URL_SERVICE__.__CDN_URL__}${user.avatarUrl.slice(1)}` : ''}
          />
          <Grid container rowSpacing={2} columnSpacing={8}>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormInput name='username' label='Username' placeholder='Tên đăng nhập' disabled />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormInput name='email' label='Email' placeholder='Hiển thị email' disabled />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormInput
                  name='fullName'
                  label='Họ và tên'
                  placeholder='Hiển thị tên người dùng'
                  disabled={formType === 'view'}
                />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormInput
                  name='mobile'
                  label='Số điện thoại'
                  placeholder='Hiển thị số điện thoại'
                  disabled={formType === 'view'}
                />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormAutocomplete
                  name='positionId'
                  label='Chức vụ'
                  placeholder='Hiển thị chức vụ'
                  disabled={formType === 'view'}
                  options={positions.map((position) => ({
                    label: position.name,
                    value: position.id
                  }))}
                />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormAutocomplete
                  name='centerId'
                  label='Đơn vị'
                  placeholder='Hiển thị đươn vị'
                  disabled={formType === 'view'}
                  options={centers.map((center) => ({
                    label: `${center.region}-${center.name}`,
                    value: center.id
                  }))}
                />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormAutocomplete
                  name='departmentId'
                  label='Phòng/Đài'
                  placeholder='Hiển thị Phòng/Đài'
                  disabled={formType === 'view'}
                  options={
                    department?.responseData?.map((dep) => ({
                      label: dep.name,
                      value: dep.id
                    })) || []
                  }
                />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={6}>
              <MBFFormItem>
                <MBFFormAutocomplete
                  name='teamId'
                  options={
                    team?.responseData?.map((t) => ({
                      label: t.name,
                      value: t.id
                    })) || []
                  }
                  label='Tổ'
                  placeholder='Hiển thị tổ'
                  disabled={formType === 'view'}
                />
              </MBFFormItem>
            </Grid>
            <Grid item xs={12} md={12} justifyContent='flex-end' display='flex' mt={2}>
              {formType === 'view' ? (
                <MBFButton actionType='edit' onClick={onChangeFormType}>
                  Chỉnh sửa
                </MBFButton>
              ) : null}

              {formType === 'edit' ? (
                <>
                  <MBFButton actionType='cancel' onClick={onChangeFormType}>
                    Thoát
                  </MBFButton>
                  <MBFButton type='submit' actionType='save' sx={{ ml: 2 }} loading={form.formState.isSubmitting}>
                    Lưu
                  </MBFButton>
                </>
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </MBFFormProvider>
    </PageWrapper>
  )
}

export default AccountPage
