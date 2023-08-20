import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
         baseUrl: 'http://localhost:3001/stock_product',
        // prepareHeaders: (headers) => {
        //     headers.set(
        //         'Access-Control-Allow-Origin', 'OPTIONS'
        //     )
        //     return headers
        //   },
    
    }),
        
        endpoints: builder => ({
            onlineAll: builder.query({
                query: () =>  '/',
                method: 'GET'
            })
        }) 
})

export const {useOnlineAllQuery} = apiSlice;