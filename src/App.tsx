import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'

import ErrorBoundary from '@src/components/core/ErrorBoundary'
import SplashScreen from './components/core/SplashScreen'
import { AuthProvider } from './contexts/Auth'
import { SettingsProvider } from './contexts/Settings'
import DialogProvider from './contexts/Dialog'
import { NotificationProvider } from './contexts/Notification'

// Routes
import router from './routes'

// Redux
import store from './store'

// Global CSS
import GlobalCssBaseline from './components/core/GlobalCssBaseline'
import { MasterdataProvider } from '@src/contexts/Masterdata'

// Leaflet
// import '@src/components/map/leaflet'

// React query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
})

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <MasterdataProvider>
                <SettingsProvider>
                  <NotificationProvider>
                    <DialogProvider>
                      <CssBaseline enableColorScheme />
                      <GlobalCssBaseline />
                      <RouterProvider router={router} fallbackElement={<SplashScreen />} />
                    </DialogProvider>
                  </NotificationProvider>
                </SettingsProvider>
              </MasterdataProvider>
            </AuthProvider>
          </QueryClientProvider>
        </Provider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
