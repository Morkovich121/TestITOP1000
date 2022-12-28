import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getExchange = createAsyncThunk(
    'exchange/getExchange',
    async () => {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');

        const data = await response.json();

        return data;
    }
);

const exchangeSlice = createSlice({
    name: "exchange",
    initialState: {
        exchange: [],
        status: null,
        error: null
    },
    reducers: {
    },
    extraReducers: {
        [getExchange.pending]: (state, action) => {
            state.status = "pending";
            state.error = null;
        },
        [getExchange.fulfilled]: (state, action) => {
            state.status = "fulfilled";
            state.error = null;
            state.exchange = action.payload;
        },
        [getExchange.rejected]: (state, action) => {
            state.status = "rejected";
            state.error = action.payload;
        }
    }
});

export default exchangeSlice.reducer;