import { useQuery } from "react-query";
import api from "./api";
import type Users from "./models/Users";

const getUserDetail = async (userID: string) => {
  const user = await api.get<Users>(`/user?id=${userID}`);
  return user.data;
};

export default getUserDetail;
