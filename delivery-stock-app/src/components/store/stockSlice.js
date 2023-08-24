import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hook/useHttp";
import axios from 'axios';

const API_URL = 'http://localhost:3001/stock_product';

const initialState = {
    data: [],
    currentData: true,
    stockOnline: true,
    stockDelivery: true,
    searchProduct: '',
    filterProduct: [],
    currentFilterTag: 'All',
    statusLoiding: '',
    statusUpdate: '',
    currentStatusFoundProduct: true
}
 
 export const fetchStock = createAsyncThunk(
    'stock/fetchStock',
    async (thunkAPI) => {
        try{
            const getAllStock = await axios (API_URL);
            return getAllStock.data;
        } catch (err) {
            return thunkAPI.rejectWithValue({error: err.message})
        }
        // const {request} = useHttp();
        // return await request(API_URL);
    }
);

// export const changeStockItem = createAsyncThunk(
//     'stock/changeStockItem',
//     async (id,delivery, thunkAPI) => {
//         try {
            
//             let updateChangeStockItemOnline = {
//                 'delivery': 888
//             };

//             const changeStockItemOnline = await axios.patch(API_URL + '/' + id,
//         updateChangeStockItemOnline
//         );
//             return id;
//         }catch (err) {
//             return thunkAPI.rejectWithValue({error: err.message})
//         }
//     }
// )

const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
        onlineAll: state => {
            state.stockOnline = !state.stockOnline;
            state.data.map(item => item.online = state.stockOnline);
        }
        ,
        onlineItemTrigger: (state, action) => {
            const itemFound = state.data.find(item => item.id === action.payload)
            itemFound.online = !itemFound.online;
        },

        deliveryAll: state => {
            state.stockDelivery = !state.stockDelivery;
            state.data.map(item => item.delivery = state.stockDelivery);
        },
        deliveryItemTrigger: (state,action) => {
            const itemFound = state.data.find(item => item.id === action.payload)
            itemFound.delivery = !itemFound.delivery;
        },
        searchProduct: (state, action) => {
            state.searchProduct = action.payload;
        },
        filterTags: (state,action) => {
            state.currentFilterTag = action.payload;
        },
        filterStock: (state,action) => {
            state.filterStock = action.payload;
        },
        statusFoundProduct: (state,action) => {
            state.currentStatusFoundProduct = action.payload;
        },
        currentUpdateData : (state, action) => {
            state.currentData = action.payload
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchStock.pending, state => {state.statusLoiding = 'pending'})
            .addCase(fetchStock.fulfilled, (state, action) => {
                    state.statusLoiding = 'idle';
                    state.data = action.payload;
                    state.currentData = action.payload;
                })
            .addCase(fetchStock.rejected, state => {state.statusLoiding = 'error'; })
            // .addCase(changeStockItem.fulfilled, (state, action) => {
            //     const itemFound = state.currentData.find(item => item.id === action.payload)
            //     console.log(itemFound.delivery);
            //     itemFound.delivery = !itemFound.delivery
                
            // } )
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} =  stockSlice;

export default reducer;

export const {
    onlineAll,
    onlineItemTrigger,
    deliveryAll,
    deliveryItemTrigger,
    searchProduct,
    filterTags,
    statusFoundProduct,
    filterStock,
    currentUpdateData
} = actions;