import type { IProvince, Option } from '@src/types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface MasterdataState {
  provinces: Option<number>[]
  userGroupNotify: Option<number>[]
  userGroupAssignWork: Option<number>[]
  districts: Option<number>[]
  provinceLatLong: IProvince[]
}

const initialState: MasterdataState = {
  provinces: [],
  userGroupNotify: [],
  userGroupAssignWork: [],
  districts: [],
  provinceLatLong: []
}

const masterdataSlice = createSlice({
  name: '@masterdata',
  initialState,
  reducers: {
    setProvinces(state, action: PayloadAction<MasterdataState['provinces']>) {
      state.provinces = action.payload || []
    },
    setUserGroupNotify(state, action: PayloadAction<MasterdataState['userGroupNotify']>) {
      state.userGroupNotify = action.payload || []
    },
    setUserGroupAssignWork(state, action: PayloadAction<MasterdataState['userGroupAssignWork']>) {
      state.userGroupAssignWork = action.payload || []
    },
    setDistricts(state, action: PayloadAction<MasterdataState['districts']>) {
      state.districts = action.payload || []
    },
    setProvinceLonLat(state, action: PayloadAction<MasterdataState['provinceLatLong']>) {
      state.provinceLatLong = action.payload || []
    }
  }
})

export const { setProvinces, setUserGroupNotify, setUserGroupAssignWork, setDistricts, setProvinceLonLat } =
  masterdataSlice.actions
export default masterdataSlice.reducer
