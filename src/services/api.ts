import { isInApp } from "@/lib/native";
import { Result, request } from "./index";

const withUrl = isInApp()
  ? JSON.parse(localStorage.getItem("commonParams")!)
  : { format: "json" };

export type RoomInfoData = {
  rid: number;
  name: string;
  icon: string;
  user_name: string;
  level: number;
  level_list: number[];
  next_level_exp: number;
  room_exp: number;
  today_exp: number;
};

export function getRoomInfo(params: { rid: number }) {
  return request<{
    data: Result<RoomInfoData>;
  }>({
    method: "post",
    url: "/bravo/api/h5/roomLevelInfo",
    params: { ...withUrl },
    data: params,
  });
}

export function getWeekStar(params: { type: number }) {
  return request<{
    data: Result<RoomInfoData>;
  }>({
    method: "get",
    url: `/bravo/api/weekstar/shiningStars?format=json&type=${params.type}`,
    params: { ...withUrl },
  });
}
