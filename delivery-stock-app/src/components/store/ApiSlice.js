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
                      url: `/${id}`,
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
                      url: `/${id}`,
                      method: 'PATCH',
                      body,
                    };
                  },
                invalidatesTags: ['Stock']
            }),
            triggerAllOnline: builder.mutation({
                query(data) {
                    const { id, ...body } = data;
                    return {
                      url: `/${id}`,
                      method: 'PATCH',
                      body,
                    };
                  },
                invalidatesTags: ['Stock']
            })
            ,
            triggerStockOnline: builder.mutation({
                query(data) {
                    const { id, ...body } = data;
                    return {
                      url: `/stock`,
                      method: 'PATCH',
                      body,
                    };
                  },
                invalidatesTags: ['Stock']
            })
        }) 
})

export const {
    useGetAllStockQuery,
    useTriggerItemDeliveryMutation, 
    useTriggerItemOnlineMutation,
    useTriggerAllOnlineMutation,
    useTriggerStockOnlineMutation
} = apiSlice;