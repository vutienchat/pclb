import type { FCC } from '@src/types'
import { Fragment } from 'react'
import { Helmet } from 'react-helmet-async'

interface Props {
  title?: string
}

const Page: FCC<Props> = (props) => {
  const { title = 'Mobifone', children } = props

  return (
    <Fragment>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Fragment>
  )
}

export default Page
