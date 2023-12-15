import { randomString } from "../utils";
import * as QueryString from "qs";

type UserInfo = {
  uid: number;
  token: string;
  icon: string;
  emulatorInfo: any;
  isRooted: string;
  package: string;
  version_code: string;
  server_env: string;
  lan: string;
  sex: number;
  reportInfo: any;
};

export function isInApp(): boolean {
  if (typeof window !== "undefined") {
    return Boolean((window as any).NativeProxy);
  }
  return false;
}

export function callAppFunc<T>(
  appFunc: string,
  param?: { [key: string]: any }
): Promise<T> {
  if (!isInApp()) {
    console.error(`当前环境不支持Native方法${appFunc}`);
    return Promise.reject("当前环境不支持Native方法");
  }

  const cb = `nativeCB${randomString()}`;
  const data = { cb, param: JSON.stringify(param) };
  const message = `micu://${appFunc}?${QueryString.stringify(data)}`;

  return new Promise((resolve) => {
    (window as any)[cb] = function (result: T) {
      console.log(`Native方法${appFunc}调用成功; result:`, result);
      delete (window as any)[cb];
      resolve(result);
    };
    (window as any).NativeProxy.postMessage(message);
  });
}

export function listenAppMethod<T>(
  appFunc: string,
  callback: (result: T) => void
) {
  (window as any)[appFunc] = function (result: T) {
    if (callback) callback(result);
  };
}

export function getUserInfo(): Promise<UserInfo> {
  return callAppFunc("getUserInfo");
}

export const initFetchData = async () => {
  if (typeof window !== "undefined") {
    const commonParams = await callAppFunc("calSign");
    const commonHeader = await callAppFunc("getCommonPara");
    localStorage.setItem("commonParams", JSON.stringify(commonParams));
    localStorage.setItem("commonHeader", JSON.stringify(commonHeader));
  } 
};

export function login() {
  return callAppFunc("login");
}

export function openRoom(rid: string) {
  return callAppFunc("openRoom", {
    rid: Number(rid),
  });
}

export function onReturnToWeb(callback: any) {
  return listenAppMethod("onReturnToWeb", callback);
}
