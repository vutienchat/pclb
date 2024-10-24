import { createBrowserRouter } from 'react-router-dom'

import authRoutes from './auth'
import mainRoutes from './main'

const router = createBrowserRouter([authRoutes, mainRoutes])

export default router
