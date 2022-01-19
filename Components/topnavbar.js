import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import SearchModal from "./searchmodal";
import { useRouter } from "next/router";

export default function TopNavbar() {
  const session = useSession();
  const setModalOpen = useSetRecoilState(modalState);
  const router = useRouter();

  return (
    <div className="w-screen h-[50px] bg-white fixed top-0 left-0 flex justify-between items-center pr-[30px]">
      <div className="flex items-center justify-center">
        <Image
          className="cursor-pointer"
          onClick={() => router.push("/home")}
          src="/fblogo.png"
          width={85}
          height={50}
        />
        <div className="font-bold">MarketPlace V2</div>
      </div>

      <Image
        width={40}
        height={40}
        src={session.data.user.image}
        onClick={signOut}
        className="cursor-pointer text-3xl rounded-3xl p-[10px]"
      />
    </div>
  );
}
