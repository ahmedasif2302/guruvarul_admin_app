import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signInWithGoogle } from '../../firebase/firebase';


const initialState = {
  loading: false,
  user: null,
  error: null
};

export const loginWithGoogle = createAsyncThunk(
  'loginWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const response = await signInWithGoogle();
      return response
    } catch (error) {
      return rejectWithValue({ error })
    }
  });


export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetLoginState(state, { }) {
      state.loading = false;
      state.user = null;
      state.error = null
    },
    logoutAction(state, { }) {
      state.loading = false;
      state.user = null;
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder.addCase("loginWithGoogle/pending", (state, { payload }) => {
      state.loading = true
    });
    builder.addCase("loginWithGoogle/fulfilled", (state, { payload }) => {
      state.loading = false;
      state.user = payload
      state.error = null
    });
    builder.addCase("loginWithGoogle/rejected", (state, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = payload
    });
  }
});

export const { resetLoginState, logoutAction } = loginSlice.actions

export default loginSlice.reducer;