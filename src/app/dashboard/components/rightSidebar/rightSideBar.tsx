import { useAuthStore } from "@/store/auth.store";
import Follow from "./folllow";
import { GoogleOauth } from "./googleoauth";
import Trending from "./trending";

const RightSideBar = () => {
  return (
    <div className="flex h-full max-w-sm flex-col gap-4 p-2 pt-10">
      <GoogleOauth></GoogleOauth>
      <Trending />
      <Follow></Follow>
    </div>
  );
};

export default RightSideBar;
