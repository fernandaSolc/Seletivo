import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  access: string | null;
  refresh: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  access: null,
  refresh: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: User; access: string; refresh: string }>) {
      state.user = action.payload.user;
      state.access = action.payload.access;
      state.refresh = action.payload.refresh;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;
    },
    refreshAccess(state, action: PayloadAction<string>) {
      state.access = action.payload;
    },
  },
});

export const { login, logout, refreshAccess } = authSlice.actions;
export default authSlice.reducer;

