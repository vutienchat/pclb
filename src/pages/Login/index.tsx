import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import Page from '@src/components/shared/Page'
import MBFFormProvider from '@src/components/shared/Form/MBFFormProvider'
import Logger from '@src/utils/Logger'
import MBFFormItem from '@src/components/shared/Form/MBFFormItem'
import MBFFormLabel from '@src/components/shared/Form/MBFFormLabel'
import MBFFormInput from '@src/components/shared/Form/MBFFormInput'
import Validation from '@src/utils/Validation'
import MBFActionButton from '@src/components/shared/Button/MBFActionButton'
import MBFCheckbox from '@src/components/shared/Form/MBFCheckbox'
import Image from '@src/components/core/Image'

import type { MouseEvent, SignInParams } from '@src/types'

import LogoUrl from '@src/assets/images/logo2.png'
import { useLogin, useUserProfile } from '@src/queries'
import useAuthDispatch from '@src/hooks/useAuthDispatch'
import SessionStorage from '@src/utils/SessionStorage'
import { Typography } from '@mui/material'

interface FormValues {
  username: string
  password: string
  savePassword: boolean
}

const LoginPage = () => {
  const dispatch = useAuthDispatch()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<FormValues>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
      savePassword: false
    }
  })

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  }

  const handleMouseDownPassword: MouseEvent = (event) => {
    event.preventDefault()
  }

  const loginMutation = useLogin()
  const getUserMutation = useUserProfile()

  const fetchUser = () => {
    getUserMutation.mutate(undefined, {
      onSuccess(data) {
        if (data.responseData) {
          dispatch({ type: 'AUTHORIZED', payload: { user: data.responseData, permissions: [] } })
        }
      },
      onError: () => {
        dispatch({ type: 'UNAUTHORIZED' })
      }
    })
  }

  const login = async (params: SignInParams) => {
    loginMutation.mutate(params, {
      onSuccess(data) {
        if (data.responseData) {
          const { accessToken, refreshToken } = data.responseData

          if (accessToken && refreshToken) {
            SessionStorage.set('mbfAccessToken', accessToken)
            SessionStorage.set('mbfRefreshToken', refreshToken)
            // Fetch user data
            fetchUser()
          } else {
            dispatch({ type: 'UNAUTHORIZED' })
          }
        }
      }
    })
  }

  const handleLogin = (values: FormValues) => {
    try {
      login(values)
    } catch (error) {
      Logger.log(error)
    }
  }

  return (
    <Page title='Đăng nhập'>
      <Container
        maxWidth='xs'
        sx={({ palette, shadows }) => ({
          p: 6,
          borderRadius: '6px',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: palette.divider,
          boxShadow: shadows[2],
          backgroundColor: palette.background.paper
        })}
      >
        <Stack justifyContent='center' alignItems='center' flexDirection='column' mt={2} mb={4}>
          <Image src={LogoUrl} alt='logo' width={260} />
          <Typography color='primary.main' textAlign='center'>
            Hệ thống báo cáo, điều hành phòng chống lụt bão MobiFone
          </Typography>
        </Stack>
        <MBFFormProvider form={form} onFinish={handleLogin}>
          <MBFFormItem>
            <MBFFormLabel required title='Tài khoản (Ví dụ:tuan.pvan10)' name='username'>
              <MBFFormInput
                name='username'
                validate={Validation.string().required()}
                type='text'
                placeholder='Tên tài khoản'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PersonOutlineOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
            </MBFFormLabel>
          </MBFFormItem>
          <MBFFormItem>
            <MBFFormLabel required title='Mật khẩu' name='password'>
              <MBFFormInput
                name='password'
                validate={Validation.string().length(8, 'Mật khẩu tối thiểu 8 ký tự')}
                type={showPassword ? 'text' : 'password'}
                placeholder='Mật khẩu tối thiểu 8 ký tự'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge='end'>
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockOutlinedIcon />
                    </InputAdornment>
                  )
                }}
              />
            </MBFFormLabel>
          </MBFFormItem>
          <Stack justifyContent='space-between' mt={2}>
            <Box
              sx={{
                pl: 1
              }}
            >
              <MBFCheckbox label='Ghi nhớ đăng nhập' name='savePassword' />
            </Box>
          </Stack>

          <Box sx={{ mt: 3 }}>
            <MBFActionButton
              size='large'
              type='submit'
              fullWidth
              actionType='login'
              loading={form.formState.isSubmitting}
            >
              Đăng nhập
            </MBFActionButton>
          </Box>
          {/* <Box
            sx={{
              mt: 4,
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              '&:before, &:after': {
                content: '""',
                flex: 1,
                borderBottom: '1px solid #000'
              },
              ':not(:empty)::before': {
                marginRight: '0.25em'
              },
              ':not(:empty)::after': {
                marginLeft: '0.25em'
              }
            }}
          >
            Hoặc
          </Box> */}
        </MBFFormProvider>
      </Container>
    </Page>
  )
}

export default LoginPage
