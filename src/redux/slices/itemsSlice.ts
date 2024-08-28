import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Item {
  id: string;
  name: string;
  category: string;
  price: number;
  createdAt: string;
}

interface ItemsState {
  items: Item[];
  loading: boolean;
}

const initialState: ItemsState = {
  items: [],
  loading: false,
};

export const fetchItems = createAsyncThunk('items/fetchItems', async () => {
  const response = await axios.get('https://63d304794abff88834170d21.mockapi.io/items');
  return response.data;
});

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default itemsSlice.reducer;
