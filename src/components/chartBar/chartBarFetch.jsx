import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTransactionsReports } from '../api';

// Асинхронна функція для отримання звіту про транзакції
export const fetchTransactionsReports = createAsyncThunk(
  'expenses/fetchReports',
  async (date, thunkAPI) => {
    try {
      const response = await getTransactionsReports(date);
      return response.expenses;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  total: 0,
  incomesData: {},
  loading: false,
  error: null,
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsReports.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.total = action.payload.total;
        state.incomesData = action.payload.incomesData;
      })
      .addCase(fetchTransactionsReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default expensesSlice.reducer;
