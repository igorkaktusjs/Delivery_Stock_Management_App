import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hook/useHttp";

const initialState = {
    filters: [],
    filtersStock : 'All',
    filtersLoadingStatus: 'idle',
}

export const fetchFiltersStock = createAsyncThunk(
    'filterStock/fetchFiltersStock',
    async () => {
        const { request } = useHttp();
        return await request("http://localhost:3001/filtersStock")
    }
)

const allProductsStockSlice = createSlice({
    name: 'filterStock',
    initialState,
    reducers: {
        currentFilterStockTags: (state,action) => {
            state.filtersStock = action.payload;
        }
    },
    extraReducers : (builder) => {
        builder
          .addCase(fetchFiltersStock.pending,  state => {state.filtersLoadingStatus = 'loading'})
          .addCase(fetchFiltersStock.fulfilled, (state, action)  => {
              state.filtersLoadingStatus = 'idle';
              state.filters = action.payload;
      })
          .addCase(fetchFiltersStock.rejected, state => { state.filtersLoadingStatus = 'error'})
          .addDefaultCase (() => {})

    }
}
)

const {actions, reducer} = allProductsStockSlice;

export default reducer; 

export const {
    currentFilterStockTags
} = actions;