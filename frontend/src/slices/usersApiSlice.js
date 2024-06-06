import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST'
            })
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        profile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`, 
                method: 'PUT', 
                body: data
            }) 
        }), 
        getUsers: builder.query({
            query: () => ({
                url: USERS_URL,
                method: 'GET',
            }),
            keepUnusedDataFor: 5, 
            invalidatesTags: ['User']
        }), 
        deleteUsers: builder.mutation({
            query: (userId) => ({
                url : `${USERS_URL}/${userId}`,
                method : "DELETE"
            })
        }),
        getUserDetails: builder.query({
            query: (userId)=> ({
                url : `${USERS_URL}/${userId}`,
                method: "GET"
            }),
            keepUnusedDataFor: 5
        }), 
        updateUserDetails: builder.mutation({
            query: (data) => ({
                url : `${USERS_URL}/${data._id}`, 
                method: "PUT", 
                body: data
            }), 
            keepUnusedDataFor: 5, 
            invalidatesTags: ['User']
        })
    })
})

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useProfileMutation, useGetUsersQuery, useDeleteUsersMutation, useGetUserDetailsQuery, useUpdateUserDetailsMutation} = usersApiSlice