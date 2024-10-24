import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import ErrorIndicator from './ErrorIndicator'

const RouteError = () => {
  const error = useRouteError()

  if (!isRouteErrorResponse(error)) {
    throw error
  }

  const { status, statusText } = error

  return <ErrorIndicator code={status} statusText={statusText} />
}

export default RouteError
