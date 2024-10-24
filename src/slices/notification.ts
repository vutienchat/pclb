import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface NotificationState {
  message: string | null;
}

const initialState: NotificationState = {
  message: null,
};

const notificationSlice = createSlice({
  name: '@notification',
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<NotificationState['message']>) {
      state.message = action.payload || null;
    },
  },
});

export const { setMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
