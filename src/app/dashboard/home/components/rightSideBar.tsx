import { useAuthStore } from "@/store/auth.store";
import Follow from "../../components/rightSidebar/folllow";
import { GoogleOauth } from "../../components/rightSidebar/googleoauth";
import Trending from "../../components/rightSidebar/trending";

const RightSideBar = () => {
  return (
    <div className="flex h-full w-full max-w-md flex-col gap-4 p-2 pt-10">
      <GoogleOauth></GoogleOauth>
      <Trending />
      <Follow></Follow>
    </div>
  );
};

export default RightSideBar;
