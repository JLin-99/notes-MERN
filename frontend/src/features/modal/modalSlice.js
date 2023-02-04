import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalType: "",
  modalNote: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    resetModal: (_) => initialState,
    openModal: (state) => {
      state.isModalOpen = true;
    },
    setModalType: (state, action) => {
      state.modalType = action.payload;
    },
    setModalNote: (state, action) => {
      state.modalNote = action.payload;
    },
  },
});

export const { resetModal, openModal, setModalNote, setModalType } =
  modalSlice.actions;
export default modalSlice.reducer;
