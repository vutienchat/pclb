import { Box, Button, Container, Typography } from '@mui/material'
import Page from '../shared/Page'

const errors: Record<number, string> = {
  401: 'Bạn không được phép truy cập trang này. Vui lòng đăng nhập để tiếp tục.',
  404: 'Trang web không thể tìm thấy hoặc không tồn tại.',
  403: 'Bạn không có quyền truy cập vào trang này',
  500: 'Máy chủ đang gặp sự cố, vui lòng thử lại sau.',
  503: 'Máy chủ không thể sử lý yêu cầu của bạn tại thời điểm này. Vui lòng thử lại sau.'
}

interface Props {
  code?: number
  statusText: string
}

const ErrorIndicator = (props: Props) => {
  const { code, statusText } = props

  return (
    <Page title={`Error: ${statusText}`}>
      <Container
        sx={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Box
          sx={{
            maxWidth: '600px',
            maxHeight: '600px',
            border: '1px solid #121828',
            borderRadius: 1,
            p: 6
          }}
        >
          <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, mb: 1 }}>
            {code && code in errors ? `${code}: ${statusText}` : 'Lỗi!'}
          </Typography>
          <Typography sx={{ mb: 1 }}>
            {code && code in errors ? errors[code] : 'Một lỗi không xác định đã xảy ra!'}
          </Typography>
          <Box>
            <Button onClick={() => window.location.replace('/')}>Quay vể trang chủ</Button>
          </Box>
        </Box>
      </Container>
    </Page>
  )
}

export default ErrorIndicator
