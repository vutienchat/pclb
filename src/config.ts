const __CORE_URL__ = 'http://103.178.231.211:9981/'
const __AUTH_URL__ = 'http://103.178.231.211:9980/'
const __CDN_URL__ = 'http://103.178.231.211:9983/'

export const __URL_SERVICE__ = {
  __CORE_URL__,
  __AUTH_URL__,
  __CDN_URL__
}

export const __DEV__ = import.meta.env.VITE_DEV === 'development'
export const __TITLE__ = import.meta.env.VITE_APP_TITLE || 'Mobifone Weather Forecast'
