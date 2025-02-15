import { FormControl, MenuItem, Select, SelectChangeEvent, selectClasses, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Pagination from '@mui/material/Pagination'

import type { ChangeEvent } from 'react'

export interface ProTablePaginationProps {
  pageSize: number
  page: number
  rowsPerPageOptions?: number[]
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

const MBFTablePagination = (props: ProTablePaginationProps) => {
  const { pageSize, page, total, onPageChange, onPageSizeChange, rowsPerPageOptions = [10, 25, 50, 100] } = props

  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    onPageChange(value)
  }

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    onPageSizeChange(Number(event.target.value))
    onPageChange(1)
  }

  const count = Math.ceil(total / pageSize)

  return (
    <Box
      sx={{
        p: 1.5,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1.5,
        alignItems: 'center',
        flexDirection: {
          xs: 'column',
          md: 'row'
        }
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ mx: 1.5 }}>
            <Select<number>
              size='small'
              variant='standard'
              value={pageSize}
              onChange={handlePageSizeChange}
              MenuProps={{
                MenuListProps: { dense: true }
              }}
              disableUnderline
              sx={{
                [`& .${selectClasses.select}`]: {
                  display: 'flex',
                  alignItems: 'center',
                  pb: 0
                }
              }}
            >
              {rowsPerPageOptions.map((rowsPerPage) => (
                <MenuItem key={rowsPerPage} value={rowsPerPage}>
                  <Typography variant='subtitle2'>{rowsPerPage}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Typography variant='subtitle2'>
          {count === 0 ? 0 : (page - 1) * pageSize + 1}-{page * pageSize} {'/'} {total}
        </Typography>
      </Box>
      <Pagination
        color='primary'
        shape='rounded'
        variant='outlined'
        size='medium'
        count={count}
        page={page}
        onChange={handleChange}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '6px',
            color: 'text.primary',
            borderColor: '#dee1e6',
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: 'primary.main',
              borderColor: 'primary.main'
            }
          }
        }}
      />
    </Box>
  )
}

export default MBFTablePagination
