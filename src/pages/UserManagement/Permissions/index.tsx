import { Fragment, useRef, useState } from 'react'
import { Box, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import PageWrapper from '@src/components/shared/Page/PageWrapper'
import MBFTable from '@src/components/shared/Table'
import type { DialogRef } from '@src/types'
import SearchingPermissions from './components/SearchingPermissions'
import usePermissionTable from './table/columns'
import usePagination from '@src/hooks/usePagination'

export type SearchingPermissionsFormValues = {
  username: string
  department: string
  role: string
}

const PERMISSIONS = [
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  },
  {
    roleCode: 'VT1',
    roleName: 'Vai trò 1',
    description: 'FO'
  }
]

const PermissionsPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [permissions, setPermissions] = useState<[]>([])
  const {
    paginationStates: { pageNumber, pageSize, total },
    onPageChange,
    onPageSizeChange
  } = usePagination()

  const permissionDialogRef = useRef<DialogRef<any>>(null)

  const form = useForm<SearchingPermissionsFormValues>({
    mode: 'onChange',
    defaultValues: {
      role: ''
    }
  })

  const handleEditUser = (permission: any) => () => {
    console.log(permission)
    permissionDialogRef?.current?.open('edit', permission)
  }

  const handleShowUserDetail = (permission: any) => () => {
    console.log(permission)
    permissionDialogRef?.current?.open('detail', permission)
  }

  const { columns } = usePermissionTable({
    pageIndex: pageNumber,
    pageSize: pageSize,
    onEdit: handleEditUser,
    onShowDetail: handleShowUserDetail
  })

  const handleSearchingUsers = (values: SearchingPermissionsFormValues) => {
    console.log(values)
  }

  return (
    <Fragment>
      <PageWrapper title='Danh mục vai trò'>
        <Typography color='primary.main' fontSize={24} fontWeight={700}>
          Danh mục vai trò
        </Typography>
        <Box
          sx={{
            height: 1,
            display: 'grid',
            gridTemplateRows: 'auto 1fr'
          }}
        >
          <MBFFormProvider form={form} onFinish={handleSearchingUsers}>
            <SearchingPermissions />
          </MBFFormProvider>
          <MBFTable<any>
            loading={loading}
            columns={columns}
            data={PERMISSIONS}
            pagination={{
              page: pageNumber,
              total,
              pageSize: pageSize,
              onPageChange,
              onPageSizeChange
            }}
            initialState={{
              columnPinning: { left: ['username'], right: ['actions'] }
            }}
          />
        </Box>
      </PageWrapper>
    </Fragment>
  )
}

export default PermissionsPage
