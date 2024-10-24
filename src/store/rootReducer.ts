import { combineReducers } from '@reduxjs/toolkit'
import counterReducer from '@src/slices/counter'
import menuReducer from '@src/slices/menu'
import metadataReducer from '@src/slices/metadata'
import notificationReducer from '@src/slices/notification'
import masterReducer from '@src/slices/masterdata'

const rootReducer = combineReducers({
  counter: counterReducer,
  menu: menuReducer,
  notification: notificationReducer,
  metadata: metadataReducer,
  masterdata: masterReducer
})

export default rootReducer
