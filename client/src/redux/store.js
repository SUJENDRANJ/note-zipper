import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import notesReducer from "./notesSlice";

export const store = configureStore({
  reducer: {
    auth: userReducer,
    notes: notesReducer,
  },
});

export default store;
