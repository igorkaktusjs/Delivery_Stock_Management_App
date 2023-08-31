import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/'}),
         tagTypes:['Stock'],
        endpoints: builder => ({
            getAllStock: builder.query({
                query: () =>  '/stock_product', 
                providesTags:['Stock']
            }),
            triggerItemDelivery: builder.mutation({
                query(data) {
                    const { id, ...body } = data;
                    return {
                      url: `stock_product/${id}`,
                      method: 'PATCH',
                      body,
                    };
                  },
                invalidatesTags: ['Stock']
            }),
            triggerItemOnline: builder.mutation({
                query(data) {
                    const { id, ...body } = data;
                    return {
                      url: `stock_product/${id}`,
                      method: 'PATCH',
                      body,
                    };
                  },
                invalidatesTags: ['Stock']
            }),
            getCurrentData: builder.query({
                query: () =>  '/stock_product', 
                providesTags:['Stock']
            })
        }) 
})

export const {
    useGetAllStockQuery,
    useTriggerItemDeliveryMutation, 
    useTriggerItemOnlineMutation,
    useGetCurrentDataQuery
} = apiSlice;