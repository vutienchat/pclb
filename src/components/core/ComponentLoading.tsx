import NProgress from 'nprogress'
import { useEffect } from 'react'

import type { FC } from 'react'

const ComponentLoading: FC = () => {
  useEffect(() => {
    NProgress.start()

    return (): void => {
      NProgress.done()
    }
  }, [])

  return null
}

export default ComponentLoading
