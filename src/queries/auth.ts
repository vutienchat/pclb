import { signIn, signOut } from '@src/services'
import { useMutation } from '@tanstack/react-query'

export const useLogin = () =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: signIn
  })

export const useLogout = () =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: signOut
  })
