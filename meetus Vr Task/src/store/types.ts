import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type User = {
    email:string,
    password:string
}
export type loginResponse = {
    token(token: any): unknown;
    data?: {
      token?: string;
    };
    error?: {
      status?: number;
    };
  };
  
export type Task = {
    id:string,
    task:string,
    status:'completed' | 'pending'
}

export type tasksResponse = {
    tasks : Task[]
}
