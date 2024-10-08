import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL, UPLOAD_URL } from "../constants";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword, pageNumber})=> ({
                url : PRODUCTS_URL,
                params : {keyword, pageNumber}
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Product']
        }),
        getProductDetails: builder.query({
            query: (productId)=> ({
                url : PRODUCTS_URL + productId
            }),
            keepUnusedDataFor: 5
        }), 
        createProduct: builder.mutation({
            query: () => ({
                url : PRODUCTS_URL,
                method : 'POST'
            }), 
            invalidatesTags: ['Product']
        }), 
        updateProduct: builder.mutation({
            query: (data) => ({
                url : PRODUCTS_URL + data._id, 
                method: 'PUT',
                body: data
            }), 
            invalidatesTags: ['Product']
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
                url : UPLOAD_URL,
                method : 'POST', 
                body: data
            })
        }), 
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url : `${PRODUCTS_URL}/${productId}`,
                method : 'DELETE'
            })
        }), 
        createProductReview: builder.mutation({
            query: (data) => ({
                url : `${PRODUCTS_URL}${data.productId}/review`,
                method : "POST", 
                body: data
            }), 
            invalidatesTags: ['Product']
        }), 
        getTopRatedProducts: builder.query({
            query: () => ({
                url: `${PRODUCTS_URL}/top`, 
                method: 'GET'
            })
        })
    })
})

export const {useGetProductsQuery,
        useGetProductDetailsQuery,
        useCreateProductMutation,
        useUpdateProductMutation,
        useUploadProductImageMutation,
        useDeleteProductMutation, 
        useCreateProductReviewMutation,
        useGetTopRatedProductsQuery
    } = productsApiSlice