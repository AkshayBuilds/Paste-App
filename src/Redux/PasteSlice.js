import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
}

export const PasteSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addtopaste: (state, action) => {
      const paste = action.payload
      state.pastes.push(paste)
      localStorage.setItem("paste", JSON.stringify(state.pastes))
      toast.success("Paste Added Successfully");
    },
    updatetopaste: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => {
        return item._id === paste._id;
      });

      if (index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem("paste", JSON.stringify(state.pastes));

        toast.success("Paste Updated Successfully");
      }

    },
    resetallpaste: (state, action) => {

      state.pastes = []
      localStorage.removeItem("pastes")
      toast.success("All Paste Removed Successfully");

    },
    removefrompaste: (state, action) => {
      const pasteId = action.payload
      const index = state.pastes.findIndex((item) =>
        item._id === pasteId
      )
      if (index >= 0) {
        state.pastes.splice(index, 1)
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Removed Successfully");
      }
    },
  },
})

export const { addtopaste, updatetopaste, resetallpaste, removefrompaste } =
  PasteSlice.actions;

export default PasteSlice.reducer