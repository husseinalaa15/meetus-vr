import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tasksResponse, type User, type loginResponse, Task } from './types';

// Define a service using a base URL and expected endpoints
export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (build) => ({
    Signup: build.mutation<User, User>({
      query: ({ email, password }) => ({
        url: '/signup',
        method: 'POST',
        body: { email: email, password: password },
      }),
    }),
    Login: build.mutation<loginResponse, User>({
      query: ({ email, password }) => ({
        url: '/login',
        method: 'POST',
        body: { email: email, password: password },
      }),
    
    }),
    getTasks: build.query<tasksResponse,void>({
        query:()=>({
            url:'/tasks',
            method:'GET',
            headers:{
              "authentication":localStorage.getItem('token') || ''
          },
        }),
        providesTags: ['tasks']  as never[],
      }),
    addTask:build.mutation<void,string>({
        query:(task)=>({
            url:"/tasks",
            method:"POST",
            headers:{
                "authentication":localStorage.getItem('token') || ''
            },
            body:{task:task}
        }),
        invalidatesTags: [ 'tasks'] as never[],
      }),

    updateTask : build.mutation<void,{taskId:string,updatedTask?:string,status?:'completed' | 'pending'}>({
        query:({taskId,updatedTask,status})=>({
            url:"/tasks",
            method:"PUT",
            headers:{
                "authentication":localStorage.getItem('token') || ''

            },
            body:{taskId,updatedTask,status}
        }),
        invalidatesTags: [ 'tasks'] as never[],

    }),
    
    deleteTask : build.mutation<void,string>({
        query:(taskId)=>({
            url:"/tasks",
            method:"DELETE",
            headers:{
                "authentication":localStorage.getItem('token') || ''
            },
            body:{taskId}
        }),
        invalidatesTags: [ 'tasks'] as never[],

    })

  
  }),
});


export const { useSignupMutation, useLoginMutation ,useGetTasksQuery,useAddTaskMutation ,useDeleteTaskMutation,useUpdateTaskMutation } = backendApi;
