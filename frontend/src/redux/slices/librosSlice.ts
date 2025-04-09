import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Libro } from "../../types/libro";
import { getLibros } from "../../api/axios";

interface LibrosState {
  data: Libro[];
  loading: boolean;
  error: string | null;
}

const initialState: LibrosState = {
  data: [],
  loading: false,
  error: null,
};

const librosSlice = createSlice({
  name: "libros",
  initialState,
  reducers: {
    setLibros: (state, action: PayloadAction<Libro[]>) => {
      state.data = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setLibros, setLoading, setError } = librosSlice.actions;

export default librosSlice.reducer;
