import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { isInApp } from "@/lib/native";

type BaseURL = {
  development: string;
  uat: string;
  production: string;
};

const baseURL: BaseURL = {
  development: "https://test.xx.vip",
  uat: "https://test.xx.vip",
  production: "https://api.test.vip",
};

const UserDid = isInApp()
  ? JSON.parse(localStorage.getItem("commonHeader")!)["User-Did"]
  : "DuRlx9yTJKsXs0QvZ4UUY1c2wOjEr9dkE07a7dvVqiY1EzONMGU4KIbaqyFJNjINDjRVx2eU31O5AJ1NoowFjWTA";

export const instance = axios.create({
  baseURL: baseURL[process.env.NODE_ENV as keyof BaseURL],
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
  // transformRequest: [qs.stringify],
});

instance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo") as string);
    const headers: unknown = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "user-token": userInfo?.token,
      "User-Language": userInfo?.lan,
      "User-Did": UserDid,
      ...config.headers,
    };

    config.headers = headers as AxiosRequestHeaders;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export type Result<D> = D & { success: boolean; msg: string; data: D };

export async function request<D>(config: AxiosRequestConfig) {
  try {
    const res = await instance.request<Result<D>>(config);
    return res.data;
  } catch (error) {
    return error as any;
  }
}
