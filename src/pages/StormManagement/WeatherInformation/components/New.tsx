import { Box, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SquareRoundedIcon from '@mui/icons-material/SquareRounded'

import Image from '@src/components/core/Image'
import LoadingComponent from '@src/components/core/LoadingComponent'
import { useGetAllNew } from '@src/queries'
import NavLink from '@src/components/core/NavLink'
import MBFButton from '@src/components/shared/Button/MBFButton'
import { EndPoints } from '@src/constants/paths'

const New = () => {
  const [isMore, setIsMore] = useState(false)
  const navigate = useNavigate()
  const { data, isLoading, refetch } = useGetAllNew()

  useEffect(() => {
    if (Number(data?.responseData?.length) > 5) {
      setIsMore(true)
    }
  }, [data])

  useEffect(() => {
    const refetchTimer = setInterval(() => {
      refetch()
    }, 900000) // 15 minutes

    return () => {
      clearInterval(refetchTimer)
    }
  }, [])

  const goToDetail = (id: number) => () => {
    navigate(`${EndPoints.weather.weather}/${id}`)
  }

  const onExpandMore = () => {
    setIsMore(!isMore)
  }

  const news = useMemo(() => {
    return data?.responseData?.slice(0, isMore ? 5 : data.responseData.length) || []
  }, [isMore, data])

  return (
    <Box mb={2}>
      <Typography
        component='h2'
        sx={{
          textTransform: 'uppercase',
          textAlign: 'center',
          fontSize: 20,
          fontWeight: 600,
          padding: '8px 0',
          color: 'primary.contrastText',
          backgroundColor: 'primary.main',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8
        }}
      >
        Tin cảnh báo thiên tai
      </Typography>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: 'background.default',
              borderBottomLeftRadius: 8,
              borderBottomRightRadius: 8,
              mb: 4
            }}
          >
            <Image
              alt='thien-tai-image'
              src={data?.responseData?.[0]?.imagePostUrl}
              sx={{
                width: '100%',
                maxWidth: '620px',
                aspectRatio: '16/9'
              }}
            />
          </Box>
          <List>
            {news.map((item) => {
              return (
                <ListItem
                  sx={{
                    cursor: 'pointer',
                    position: 'relative',
                    mb: 1,
                    ':hover': {
                      color: 'primary.main',
                      textDecoration: 'underline'
                    }
                  }}
                  key={item.id}
                  onClick={goToDetail(item.id)}
                >
                  <SquareRoundedIcon sx={{ fill: 'red', position: 'absolute', top: 14, left: 0 }} fontSize='small' />
                  <ListItemText sx={{ mr: 6, ml: 3 }}>{item.title}</ListItemText>
                  {item?.imageTagUrl ? (
                    <Image
                      src={item.imageTagUrl}
                      alt='new'
                      width={56}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: -4
                      }}
                    />
                  ) : null}
                </ListItem>
              )
            })}
          </List>
          {isMore ? (
            <Stack justifyContent='center'>
              <MBFButton actionType='expandMore' onClick={onExpandMore}>
                Xem thêm
              </MBFButton>
            </Stack>
          ) : null}
        </>
      )}
    </Box>
  )
}

export default New
