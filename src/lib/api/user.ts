import api from ".";
import Users from "../models/Users";

export async function getUserDetail(userId: string) {
  const res = await api.get<Users>(`/user?id=${userId}`);
  return res.data;
}
