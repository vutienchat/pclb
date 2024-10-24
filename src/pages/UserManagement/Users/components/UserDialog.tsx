import { useForm } from 'react-hook-form'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material'
import { useIsMutating } from '@tanstack/react-query'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SyncOutlinedIcon from '@mui/icons-material/SyncOutlined'

import type { DialogRef, DialogType, User } from '@src/types'

import sleep from '@src/utils/sleep'
import Validation from '@src/utils/Validation'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import DialogContainer from '@src/components/shared/Dialog/DialogContainer'
import DialogHeader from '@src/components/shared/Dialog/DialogHeader'
import DialogBody from '@src/components/shared/Dialog/DialogBody'
import DialogFooter from '@src/components/shared/Dialog/DialogFooter'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import MBFButton from '@src/components/shared/Button/MBFButton'
import { useTypedSelector } from '@src/store'
import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import { useDeleteUser, useEditUser, useGetDepartment, useGetTeam, useSystemRole, useUserInfo } from '@src/queries'
import MBFActionIconButton from '@src/components/shared/Button/MBFActionIconButton'
import { TEditUser } from '@src/services'
import MBFFormMultipleAutocomplete from '@src/components/shared/Form/MBFFormMultipleAutocomplete'
import useNotification from '@src/hooks/useNotification'

type TProps = {
  refresh: () => void
}

const schema = Validation.shape({
  username: Validation.string()
    .required('Tên nguời dùng không được để trống')
    .max(200, 'Tên nguời dùng không được vượt quá 200 ký tự'),
  fullName: Validation.string()
    .required('Họ và tên không được để trống')
    .max(200, 'Họ và tên không được vượt quá 200 ký tự'),
  email: Validation.string().email('Email không hợp lệ').required('Email không được để trống'),
  mobile: Validation.phone()
    .required('Số điện thoại không được để trống')
    .max(15, 'Số điện thoại không được vượt quá 15 ký tự'),
  departmentId: Validation.number().min(1, 'Phòng/Đài ban không được để trống'),
  positionId: Validation.number().min(1, 'Chức vụ không được để trống'),
  centerId: Validation.number().min(1, 'Đơn vị không được để trống'),
  teamId: Validation.number().min(1, 'Tổ không được để trống'),
  systemRoleIdList: Validation.array().of(Validation.number()).default([])
})

type UserForm = typeof schema.__outputType

const UserDialog = forwardRef<DialogRef<User>, TProps>((props, ref) => {
  const { refresh } = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [user, setUser] = useState<User | null>(null)
  const [type, setType] = useState<DialogType | null>(null)
  const { centers, positions } = useTypedSelector((state) => state.metadata)
  const notification = useNotification()

  const { data: systemRole } = useSystemRole(!!type && type !== 'delete')
  const { data: detailUser } = useUserInfo(user?.id || 0)

  const editUser = useEditUser()
  const deleteUser = useDeleteUser()

  const isEditing = useIsMutating({
    mutationKey: ['useEditUser']
  })
  const isDeleting = useIsMutating({
    mutationKey: ['useDeleteUser']
  })

  const form = useForm<UserForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      fullName: '',
      email: '',
      mobile: '',
      departmentId: 0,
      teamId: 0,
      centerId: 0,
      positionId: 0,
      systemRoleIdList: []
    }
  })

  const handleOpen = (type: DialogType, data?: User) => {
    setOpenDialog(true)
    setType(type)
    setUser(data || null)
  }

  const handleClose = async () => {
    setOpenDialog(false)
    setUser(null)
    setType(null)
    form.reset({
      username: '',
      fullName: '',
      email: '',
      mobile: '',
      departmentId: 0,
      teamId: 0,
      centerId: 0,
      positionId: 0,
      systemRoleIdList: []
    })
    await sleep(350)
  }

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }))

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

  useEffect(() => {
    const userInfo = detailUser?.responseData
    if (userInfo && openDialog && (type === 'detail' || type === 'edit')) {
      form.reset({
        username: userInfo.username,
        fullName: userInfo.fullName,
        email: userInfo.email,
        mobile: userInfo.mobile,
        departmentId: userInfo.departmentId || 0,
        teamId: userInfo.teamId || 0,
        centerId: userInfo.centerId || 0,
        positionId: userInfo.positionId,
        systemRoleIdList: userInfo.userRoleInfoList.map((role) => role.systemRoleId)
      })
    }
  }, [detailUser, openDialog, type])

  const handleEditUser = (param: { userId: number; data: TEditUser }) => {
    editUser.mutate(param, {
      onSuccess(data) {
        if (data.responseData && data.responseCode === '200') {
          handleClose()
          refresh()
          notification({
            message: 'Cập nhật người thông tin dùng thành công',
            severity: 'success'
          })
        }
      }
    })
  }

  const handleCreateUser = () => {}

  const onSubmitForm = async (values: UserForm) => {
    if (type === 'edit') {
      handleEditUser({
        userId: user?.id || 0,
        data: {
          avatarUrl: user?.avatarUrl || '',
          fullName: values.fullName,
          email: values.email,
          mobile: values.mobile,
          teamId: values.teamId,
          positionId: values.positionId,
          systemRoleIdList: values.systemRoleIdList
        }
      })

      return void 0
    }

    if (type === 'create') {
      handleCreateUser()
      return void 0
    }
  }

  const handleDeleteUser = async () => {
    if (user) {
      await deleteUser.mutateAsync(user.id)
      handleClose()
      refresh()
      notification({
        message: 'Xoá người dùng thành công',
        severity: 'success'
      })
    }
  }

  const isDisableFields = type === 'detail'

  const getHeadingTitle = () => {
    if (type === 'create') return 'Thêm người dùng'
    if (type === 'edit') return 'Cập nhật thông tin người dùng'
    if (type === 'detail') return 'Xem chi tiết người dùng'

    return 'Xoá người dùng'
  }

  return (
    <DialogContainer open={openDialog} onClose={handleClose} maxWidth={type === 'delete' ? 'xs' : 'md'} fullWidth>
      <MBFFormProvider<any> form={form} onFinish={onSubmitForm}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: '1fr auto 1fr'
          }}
        >
          <DialogHeader onClose={handleClose}>{getHeadingTitle()}</DialogHeader>
          <DialogBody disableGutters loading={form.formState.isSubmitting || Boolean(isEditing)}>
            {type === 'delete' ? (
              <Stack justifyContent='center' alignItems='center' flexDirection='column' spacing={2} p={2}>
                <DeleteOutlineOutlinedIcon
                  sx={{
                    width: 80,
                    height: 80,
                    fill: '#ED1C24'
                  }}
                />
                <Typography variant='body1' color='error.main' mt={1}>
                  Bạn có muốn xoá người dùng{' '}
                  <Typography component='span' fontWeight={700}>
                    {user?.username}
                  </Typography>{' '}
                  không?
                </Typography>
              </Stack>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  {type === 'create' ? (
                    <Grid container spacing={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <Grid item xs={10} md={10}>
                        <MBFFormItem>
                          <MBFFormInput name='username' label='Tên người dùng:' required />
                        </MBFFormItem>
                      </Grid>
                      <Grid item xs={2} md={2}>
                        <Tooltip title='Đồng bộ dữ liệu người dùng'>
                          <Box>
                            <MBFActionIconButton>
                              <SyncOutlinedIcon />
                            </MBFActionIconButton>
                          </Box>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  ) : (
                    <MBFFormItem>
                      <MBFFormInput name='username' label='Tên người dùng:' disabled required />
                    </MBFFormItem>
                  )}
                </Grid>
                <Grid item xs={12} md={12}>
                  <MBFFormItem>
                    <MBFFormInput name='fullName' label='Họ và tên:' disabled={isDisableFields} required />
                  </MBFFormItem>
                </Grid>
                <Grid item xs={12} md={6}>
                  <MBFFormInput name='mobile' label='Số điện thoại:' disabled={isDisableFields} required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MBFFormInput name='email' label='Email:' disabled={type === 'edit' || type === 'detail'} required />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MBFFormAutocomplete
                    name='positionId'
                    options={positions.map((position) => ({
                      value: position.id,
                      label: position.name
                    }))}
                    label='Chức vụ:'
                    disabled={isDisableFields}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MBFFormAutocomplete
                    name='centerId'
                    options={centers.map((center) => ({
                      value: center.id,
                      label: `${center.region}-${center.name}`
                    }))}
                    label='Đơn vị:'
                    disabled={isDisableFields}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MBFFormAutocomplete
                    name='departmentId'
                    options={
                      department?.responseData?.map((de) => ({
                        value: de.id,
                        label: de.name
                      })) || []
                    }
                    label='Phòng/Đài:'
                    disabled={isDisableFields}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MBFFormAutocomplete
                    name='teamId'
                    options={
                      team?.responseData?.map((te) => ({
                        value: te.id,
                        label: te.name || te.code
                      })) || []
                    }
                    label='Tổ:'
                    disabled={isDisableFields}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <MBFFormItem>
                    <MBFFormMultipleAutocomplete
                      name='systemRoleIdList'
                      options={
                        systemRole?.responseData?.map((sys) => ({
                          value: sys.id,
                          label: sys.name
                        })) || []
                      }
                      label='Nhóm người dùng:'
                      disabled={isDisableFields}
                    />
                  </MBFFormItem>
                </Grid>
              </Grid>
            )}
          </DialogBody>
          {type === 'delete' ? (
            <Stack justifyContent='center' my={2}>
              <MBFButton actionType='cancel' onClick={handleClose}>
                Hủy
              </MBFButton>
              <MBFButton actionType='delete' onClick={handleDeleteUser} loading={Boolean(isDeleting)}>
                Đồng ý
              </MBFButton>
            </Stack>
          ) : (
            <DialogFooter>
              <MBFButton actionType='cancel' onClick={handleClose}>
                Thoát
              </MBFButton>
              {type === 'edit' || type === 'create' ? (
                <MBFButton type='submit' actionType='edit' loading={Boolean(isEditing)}>
                  Lưu
                </MBFButton>
              ) : null}
            </DialogFooter>
          )}
        </Box>
      </MBFFormProvider>
    </DialogContainer>
  )
})

export default UserDialog
