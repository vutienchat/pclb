import { Box, Container } from '@mui/material'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import { useGetDetailNew } from '@src/queries'

const index = () => {
  const { postId } = useParams()

  const { data, isLoading } = useGetDetailNew(Number(postId))

  useEffect(() => {
    const ele = document.getElementById('top-container')
    if (ele) {
      ele.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (data?.responseData?.contentHtml) {
      const ele = document.getElementById('new-container')
      if (ele) {
        ele.innerHTML = data.responseData.contentHtml.split('<!-------------POP UP--------------->')[0]
      }
    }
  }, [data])

  return (
    <Box p={2} id='top-container'>
      <Container maxWidth='lg' id='new-container' />
      <Link to={data?.responseData?.detailUrl || ''} target='_blank'>
        Nguồn: Trung tâm dự báo khí tượng thuỷ văn Quốc gia
      </Link>
    </Box>
  )
}

export default index
