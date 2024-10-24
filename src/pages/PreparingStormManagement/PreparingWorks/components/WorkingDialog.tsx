import { useFieldArray, useForm } from 'react-hook-form'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Grid, Stack, Tooltip, Typography } from '@mui/material'
import { useIsMutating } from '@tanstack/react-query'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

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
import MBFFormMultipleAutocomplete from '@src/components/shared/Form/MBFFormMultipleAutocomplete'
import useNotification from '@src/hooks/useNotification'
import MBFFormAutocomplete from '@src/components/shared/Form/MBFFormAutocomplete'
import { useCreateNewWork, useDeleteWork, useEditWork, useGetDetailWork } from '@src/queries'
import { CreateWorkParams, EditWorkParams } from '@src/services'
import MBFFormUserGroupInput from '@src/components/shared/Form/MBFFormUserGroupInput'
import { EUserGroupType } from '@src/types/service/masterdata'

type TProps = {
  refresh: () => void
}

const schema = Validation.shape({
  groupUserIds: Validation.array().of(Validation.number()).min(1, 'Bắt buộc').required('Bắt buộc').default([]),
  name: Validation.string()
    .min(1, 'Tên công việc không được để trống')
    .required('Bắt buộc')
    .max(200, 'Tên công việc không được vượt quá 200 ký tự'),
  taskDetails: Validation.array().of(
    Validation.shape({
      description: Validation.string()
        .min(1, 'Chi tiết công việc không được để trống')
        .required('Bắt buộc')
        .max(200, 'Chi tiết công việc không được vượt quá 200 ký tự'),
      valueType: Validation.number().required('Bắt buộc'),
      expectation: Validation.optionString().max(200, 'Kết quả mong muốn không được vượt quá 200 ký tự')
    })
  ),
  note: Validation.optionString().max(200, 'Ghi chú không được vượt quá 200 ký tự')
})

export type WorkingForm = typeof schema.__outputType

const DEFAULT_VALUES: WorkingForm = {
  groupUserIds: [],
  name: '',
  taskDetails: [
    {
      description: '',
      expectation: '',
      valueType: 0
    }
  ],
  note: ''
}

const WorkingDialog = forwardRef<DialogRef<User>, TProps>((props, ref) => {
  const { refresh } = props
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [workingId, setWorkingId] = useState<number | null>(null)
  const [type, setType] = useState<DialogType | null>(null)

  const notification = useNotification()

  const { data: workingDetail } = useGetDetailWork(workingId || 0)

  const editWork = useEditWork()
  const deleteWork = useDeleteWork()
  const createWork = useCreateNewWork()

  const isEditing = useIsMutating({
    mutationKey: ['useEditWork']
  })
  const isDeleting = useIsMutating({
    mutationKey: ['useDeleteWork']
  })
  const isCreating = useIsMutating({
    mutationKey: ['useCreateNewWork']
  })

  const form = useForm<WorkingForm>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: DEFAULT_VALUES
  })

  const {
    remove: removeWork,
    append: appendWork,
    fields
  } = useFieldArray<WorkingForm>({
    name: 'taskDetails',
    control: form.control
  })

  const handleAddWork = () => {
    appendWork({
      description: '',
      expectation: '',
      valueType: 0
    })
  }

  const handleRemoveWork = (index: number) => () => {
    removeWork(index)
  }

  const handleOpen = (type: DialogType, data?: any) => {
    setOpenDialog(true)
    setType(type)
    setWorkingId(data || null)
  }

  const handleClose = async () => {
    setOpenDialog(false)
    setWorkingId(null)
    setType(null)
    form.reset(DEFAULT_VALUES)
    await sleep(350)
  }

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose
  }))

  useEffect(() => {
    const work = workingDetail?.responseData
    if (work && (type === 'edit' || type === 'detail')) {
      form.reset({
        groupUserIds: work.userGroupIds,
        name: work.name,
        taskDetails: work.subTasks.map((task) => ({
          description: task.name,
          expectation: task.expectation,
          valueType: task.valueType
        })),
        note: work.note
      })
    }
  }, [workingDetail, type])

  const handleEditWork = (params: any) => {
    editWork.mutate(params, {
      onSuccess(data) {
        if (data.responseData && data.responseCode === '200') {
          handleClose()
          refresh()
          notification({
            message: 'Cập nhật công việc thành công',
            severity: 'success'
          })
        }
      }
    })
  }

  const handleCreateWork = (params: CreateWorkParams) => {
    createWork.mutate(params, {
      onSuccess(data) {
        if (data.responseData && data.responseCode === '200') {
          handleClose()
          refresh()
          notification({
            message: 'Thêm mới công việc thành công',
            severity: 'success'
          })
        }
      }
    })
  }

  const onSubmitForm = async (values: WorkingForm) => {
    if (type === 'edit' && workingDetail?.responseData?.id) {
      const params: EditWorkParams = {
        userGroupIds: values.groupUserIds,
        taskDetails: {
          id: workingDetail.responseData.id,
          name: values.name,
          note: values.note || '',
          children:
            values.taskDetails?.map((task) => ({
              name: task.description,
              expectation: task.expectation || '',
              valueType: task.valueType
            })) || []
        }
      }
      handleEditWork(params)
      return void 0
    }

    if (type === 'create') {
      const params: CreateWorkParams = {
        userGroupIds: values.groupUserIds,
        taskDetails: {
          name: values.name,
          note: values.note || '',
          children:
            values.taskDetails?.map((task) => ({
              name: task.description,
              expectation: task.expectation || '',
              valueType: task.valueType
            })) || []
        }
      }
      handleCreateWork(params)
      return void 0
    }
  }

  const handleDeleteWork = async () => {
    if (workingDetail?.responseData?.id) {
      await deleteWork.mutateAsync(workingDetail?.responseData?.id)
      handleClose()
      refresh()
      notification({
        message: 'Xoá công việc thành công',
        severity: 'success'
      })
    }
  }

  const isDisableFields = type === 'detail'

  const getHeadingTitle = () => {
    if (type === 'create') return 'Thêm công việc'
    if (type === 'edit') return 'Cập nhật thông tin công việc'
    if (type === 'detail') return 'Xem chi tiết công việc'

    return 'Xoá công việc'
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
                  Bạn có muốn xoá công việc{' '}
                  <Typography component='span' fontWeight={700}>
                    {workingDetail?.responseData?.name || ''}
                  </Typography>{' '}
                  không?
                </Typography>
              </Stack>
            ) : (
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                  <MBFFormItem>
                    <MBFFormUserGroupInput
                      label='Nhóm người nhận công việc:'
                      name='groupUserIds'
                      disabled={isDisableFields}
                      required
                      userGroupType={EUserGroupType.AssignWork}
                      multiple
                    />
                  </MBFFormItem>
                </Grid>
                <Grid item xs={12} md={12}>
                  <MBFFormItem>
                    <MBFFormInput name='name' label='Tên công việc:' disabled={isDisableFields} required />
                  </MBFFormItem>
                </Grid>

                <>
                  {fields.map((field, index) => {
                    return (
                      <Grid item xs={12} md={12} key={field.id}>
                        <MBFFormItem>
                          <Grid container spacing={2}>
                            <Grid item xs={6} md={type === 'detail' ? 4 : 3.5}>
                              <MBFFormItem>
                                <MBFFormInput
                                  name={`taskDetails[${index}].description`}
                                  label='Chi tiết công việc:'
                                  disabled={isDisableFields}
                                  required
                                />
                              </MBFFormItem>
                            </Grid>
                            <Grid item xs={6} md={type === 'detail' ? 4 : 3.5}>
                              <MBFFormItem>
                                <MBFFormAutocomplete
                                  name={`taskDetails[${index}].valueType`}
                                  label='Kiểu khai báo:'
                                  disabled={isDisableFields}
                                  options={[
                                    {
                                      label: 'Radio',
                                      id: 0,
                                      value: 0
                                    },
                                    {
                                      label: 'Textbox',
                                      id: 1,
                                      value: 1
                                    }
                                  ]}
                                  required
                                />
                              </MBFFormItem>
                            </Grid>
                            <Grid item xs={6} md={type === 'detail' ? 4 : 3.5}>
                              <MBFFormItem>
                                <MBFFormInput
                                  name={`taskDetails[${index}].expectation`}
                                  label='Kết quả mong muốn:'
                                  disabled={isDisableFields}
                                />
                              </MBFFormItem>
                            </Grid>
                            {type === 'create' || type === 'edit' ? (
                              <Grid
                                item
                                xs={6}
                                md={1.5}
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                mb={0}
                              >
                                <MBFFormItem
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                  }}
                                >
                                  {index === 0 ? (
                                    <Tooltip title='Thêm chi tiết công việc'>
                                      <AddCircleOutlineOutlinedIcon
                                        color='primary'
                                        sx={{
                                          '&:hover': {
                                            cursor: 'pointer'
                                          }
                                        }}
                                        fontSize='large'
                                        onClick={handleAddWork}
                                      />
                                    </Tooltip>
                                  ) : (
                                    <Tooltip title='Xóa chi tiết công việc'>
                                      <DeleteForeverOutlinedIcon
                                        color='error'
                                        sx={{
                                          '&:hover': {
                                            cursor: 'pointer'
                                          }
                                        }}
                                        fontSize='large'
                                        onClick={handleRemoveWork(index)}
                                      />
                                    </Tooltip>
                                  )}
                                </MBFFormItem>
                              </Grid>
                            ) : null}
                          </Grid>
                        </MBFFormItem>
                      </Grid>
                    )
                  })}
                </>
                <Grid item xs={12} md={12}>
                  <MBFFormItem>
                    <MBFFormInput
                      name='note'
                      label='Ghi chú:'
                      placeholder='Nhập ghi chú'
                      disabled={isDisableFields}
                      multiline
                      rows={4}
                    />
                  </MBFFormItem>
                </Grid>
              </Grid>
            )}
          </DialogBody>
          {type === 'delete' ? (
            <Stack justifyContent='center' my={2}>
              <MBFButton type='button' actionType='cancel' onClick={handleClose}>
                Hủy
              </MBFButton>
              <MBFButton type='button' actionType='delete' onClick={handleDeleteWork} loading={Boolean(isDeleting)}>
                Đồng ý
              </MBFButton>
            </Stack>
          ) : (
            <DialogFooter>
              <MBFButton type='button' actionType='cancel' onClick={handleClose}>
                Thoát
              </MBFButton>
              {type === 'edit' || type === 'create' ? (
                <MBFButton type='submit' actionType='edit' loading={Boolean(isEditing) || Boolean(isCreating)}>
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

export default WorkingDialog
