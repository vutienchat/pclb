import { useForm } from 'react-hook-form'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack, Typography } from '@mui/material'
import { useIsMutating } from '@tanstack/react-query'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import type { DialogRef, DialogType, GroupUser, User } from '@src/types'

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
import {
  useAddMemberGroupUser,
  useCreateGroupUser,
  useDeleteGroupUser,
  useEditGroupUser,
  useGetListMemberGroupUser
} from '@src/queries'
import MemberTable from './MemberTable'
import useNotification from '@src/hooks/useNotification'
import DetailMemberTable from './DetailMemberTable'
import { GROUP_USER_TYPE } from '@src/constants/data'
import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import { EUserGroupType } from '@src/types/service/masterdata'

type TProps = {
  refresh: () => void
}

const schema = Validation.shape({
  name: Validation.string().required('Tên nhóm không được để trống').max(200, 'Tên nhóm không được vượt quá 200 ký tự'),
  description: Validation.string().max(200, 'Họ và tên không được vượt quá 200 ký tự').default('').notRequired(),
  addUserIdList: Validation.array().of(Validation.number()).default([]),
  groupType: Validation.number().required('Loại nhóm không được để trống').default(1)
})

type UserForm = typeof schema.__outputType

const GroupUserDialog = forwardRef<DialogRef<GroupUser>, TProps>((props, ref) => {
  const { refresh } = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [groupUser, setGroupUser] = useState<GroupUser | null>(null)
  const [type, setType] = useState<DialogType | null>(null)
  const notification = useNotification()

  const { data: detailGroupUser } = useGetListMemberGroupUser(groupUser?.id || 0)

  const editGroupUser = useEditGroupUser()
  const addMemberGroupUser = useAddMemberGroupUser()
  const deleteGroupUser = useDeleteGroupUser()
  const createGroupUser = useCreateGroupUser()

  const isEditing = useIsMutating({
    mutationKey: ['useEditGroupUser']
  })
  const isAddingMembers = useIsMutating({
    mutationKey: ['useAddMemberGroupUser']
  })
  const isDeleting = useIsMutating({
    mutationKey: ['useDeleteGroupUser']
  })
  const isCreating = useIsMutating({
    mutationKey: ['useCreateGroupUser']
  })

  const form = useForm<UserForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      addUserIdList: [],
      groupType: EUserGroupType.AssignWork
    }
  })

  const handleOpen = (type: DialogType, data?: GroupUser) => {
    setOpenDialog(true)
    setType(type)
    setGroupUser(data || null)
  }

  const handleClose = async () => {
    setOpenDialog(false)
    setGroupUser(null)
    setType(null)
    form.reset({
      name: '',
      description: '',
      addUserIdList: [],
      groupType: EUserGroupType.AssignWork
    })
    await sleep(350)
  }

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }))

  const addedUserIds = form.watch('addUserIdList')

  useEffect(() => {
    if (detailGroupUser?.responseData?.length && openDialog) {
      if (type !== 'create' && type !== 'delete') {
        const currentAddedUserIds = detailGroupUser.responseData.map((item) => item.id)
        form.setValue('addUserIdList', currentAddedUserIds)
      }
    }
  }, [detailGroupUser?.responseData, openDialog])

  useEffect(() => {
    if (groupUser && openDialog) {
      form.setValue('name', groupUser.name)
      form.setValue('description', groupUser.description)
      form.setValue('groupType', groupUser.groupType)
    }
  }, [groupUser, openDialog])

  const handleCreateGroupUser = async () => {
    try {
      const { name, description, addUserIdList } = form.getValues()
      const res = await createGroupUser.mutateAsync({
        name,
        description: description || ''
      })

      if (addUserIdList.length && res.responseData) {
        await addMemberGroupUser.mutateAsync({
          groupId: res.responseData.id,
          data: {
            addUserIdList,
            removeUserIdList: []
          }
        })
      }
      handleClose()
      refresh()
      notification({
        message: 'Tạo mới nhóm người dùng thành công',
        severity: 'success'
      })
    } catch (err) {
      console.log(err)
    }
  }

  const handleDeleteGroupUser = async () => {
    if (groupUser) {
      await deleteGroupUser.mutateAsync(groupUser.id)
      handleClose()
      refresh()
      notification({
        message: 'Xoá nhóm người dùng thành công',
        severity: 'success'
      })
    }
  }

  const handleAddingMembers = async () => {
    try {
      if (groupUser) {
        const { addUserIdList } = form.getValues()
        const currentAddedUserIds = detailGroupUser?.responseData?.map((item) => item.id) || []
        const removeUserIdList = currentAddedUserIds.filter((item) => !addUserIdList.includes(item))
        await addMemberGroupUser.mutateAsync({
          groupId: groupUser.id,
          data: {
            addUserIdList,
            removeUserIdList
          }
        })
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onChangeAddedUserIds = (id: number) => {
    const newAddedUserIds = addedUserIds.includes(id)
      ? addedUserIds.filter((item) => item !== id)
      : [...addedUserIds, id]
    form.setValue('addUserIdList', newAddedUserIds)
  }

  const handleEditGroupUser = async () => {
    try {
      const { name, description } = form.getValues()
      if (groupUser) {
        editGroupUser.mutate(
          {
            groupId: groupUser.id,
            data: {
              name,
              description: description || ''
            }
          },
          {
            onSuccess: () => {
              handleAddingMembers()
              handleClose()
              refresh()
              notification({
                message: 'Cập nhật nhóm người dùng thành công',
                severity: 'success'
              })
            }
          }
        )
      }
    } catch (err) {
      console.log(err)
    }
  }

  const onSubmitForm = async () => {
    if (type === 'create') {
      await handleCreateGroupUser()
      return void 0
    }

    if (type === 'edit') {
      await handleEditGroupUser()
      return void 0
    }
  }

  const isDisableFields = type === 'detail'

  const getHeadingTitle = () => {
    if (type === 'create') return 'Thêm nhóm người dùng'
    if (type === 'edit') return 'Cập nhật thông tin nhóm người dùng'
    if (type === 'detail') return 'Xem chi tiết nhóm người dùng'

    return 'Xoá nhóm người dùng'
  }

  return (
    <DialogContainer
      open={openDialog}
      onClose={handleClose}
      maxWidth={type === 'delete' ? 'xs' : 'md'}
      fullWidth
      sx={{
        height: '80%'
      }}
    >
      <MBFFormProvider<any> form={form} onFinish={onSubmitForm}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateRows: '1fr auto 1fr',
            height: '100%'
          }}
        >
          <DialogHeader onClose={handleClose}>{getHeadingTitle()}</DialogHeader>
          <DialogBody
            disableGutters
            loading={Boolean(isEditing) || Boolean(isCreating) || Boolean(isAddingMembers) || Boolean(isDeleting)}
          >
            {type === 'delete' ? (
              <Stack justifyContent='center' alignItems='center' flexDirection='column' spacing={2} p={2}>
                <DeleteOutlineOutlinedIcon
                  sx={{
                    width: 80,
                    height: 80,
                    fill: '#ED1C24'
                  }}
                />
                <Typography variant='body1' color='error.main' mt={1} textAlign='center'>
                  Bạn có muốn xoá nhóm người dùng{' '}
                  <Typography component='span' fontWeight={700}>
                    {groupUser?.name || ''}
                  </Typography>{' '}
                  không?
                </Typography>
              </Stack>
            ) : (
              <Box>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <MBFFormItem>
                      <MBFFormInput
                        name='name'
                        label='Tên nhóm:'
                        placeholder='Nhập tên nhóm'
                        required
                        disabled={type === 'detail' || type === 'edit'}
                      />
                    </MBFFormItem>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MBFFormItem>
                      <MBFFormAutocomplete
                        name='groupType'
                        label='Loại nhóm'
                        placeholder='Loại nhóm người dùng'
                        options={GROUP_USER_TYPE}
                        required
                        disabled
                      />
                    </MBFFormItem>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <MBFFormItem>
                      <MBFFormInput
                        name='description'
                        label='Mô tả nhóm:'
                        placeholder='Nhập mô tả nhóm'
                        disabled={isDisableFields}
                      />
                    </MBFFormItem>
                  </Grid>
                </Grid>
                {type === 'detail' ? (
                  <DetailMemberTable addedUsers={detailGroupUser?.responseData?.map((item) => item) || []} />
                ) : null}
                {type === 'create' || type === 'edit' ? (
                  <MemberTable type={type} addedUserIds={addedUserIds} onChangeAddedUserIds={onChangeAddedUserIds} />
                ) : null}
              </Box>
            )}
          </DialogBody>
          {type === 'delete' ? (
            <Stack justifyContent='center' my={2}>
              <MBFButton actionType='cancel' onClick={handleClose}>
                Hủy
              </MBFButton>
              <MBFButton actionType='edit' onClick={handleDeleteGroupUser} loading={Boolean(isDeleting)}>
                Đồng ý
              </MBFButton>
            </Stack>
          ) : (
            <DialogFooter>
              <MBFButton actionType='cancel' onClick={handleClose}>
                Thoát
              </MBFButton>
              {type === 'edit' || type === 'create' ? (
                <MBFButton
                  type='submit'
                  actionType='edit'
                  loading={Boolean(isEditing) || Boolean(isCreating) || Boolean(isAddingMembers)}
                >
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

export default GroupUserDialog
