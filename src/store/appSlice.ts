import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  token: string;
}

const initialState: InitialState = {
  token: "",
};

export const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {
    addToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      return state;
    },
  },
});

export const appActions = appSlice.actions;
