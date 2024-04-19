import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    post: {
      "Content-Type": "application/json",
    },
  },
  // transformRequest: [qs.stringify],
});

export const devTestToken = "test token";

instance.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(sessionStorage.getItem("UserInfo") as string);
    const commonHeader = JSON.parse(
      localStorage.getItem("commonHeader") as string
    );

    const headers: unknown = {
      Accept: "application/json",
      "Content-Type": "application/json",
      "user-token":
        process.env.NODE_ENV !== "development" ? userInfo?.token : devTestToken,
      "User-Did": commonHeader && commonHeader["User-Did"],
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

export interface Result<T = any> {
  data: T;
  success: boolean;
  msg: string;
}

export async function request<D>(config: AxiosRequestConfig) {
  try {
    const res = await instance.request<Result<D>>(config);
    return res.data;
  } catch (error) {
    console.log("request:", error);
    return error as any;
  }
}
