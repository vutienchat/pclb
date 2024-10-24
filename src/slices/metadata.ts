import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import type { ICenter, IPosition } from '@src/types'

interface MetadataState {
  positions: IPosition[] // Chức vụ
  centers: ICenter[] // Trung tâm/ đơn vị
}

const initialState: MetadataState = {
  positions: [],
  centers: []
}

const metadataSlice = createSlice({
  name: '@metadata',
  initialState,
  reducers: {
    setPositions(state, action: PayloadAction<MetadataState['positions']>) {
      state.positions = action.payload || []
    },
    setCenters(state, action: PayloadAction<MetadataState['centers']>) {
      state.centers = action.payload || []
    }
  }
})

export const { setPositions, setCenters } = metadataSlice.actions
export default metadataSlice.reducer
