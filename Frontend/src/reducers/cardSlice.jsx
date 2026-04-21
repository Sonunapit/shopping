import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    loadcard: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export default cardSlice.reducer
export const {loadcard} = cardSlice.actions 

