import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import noteReducer from "../features/notes/noteSlice";
import modalReducer from "../features/modal/modalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    modal: modalReducer,
  },
});
