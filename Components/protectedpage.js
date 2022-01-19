import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import NavBar from "./navbar";
import TopNavbar from "./topnavbar";
import Modal from "./modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const session = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  useEffect(() => {
    //console.log(session);

    if (session.status !== "loading") {
      if (session.status !== "authenticated") {
        router.push("/");
      }
    }
  }, [session]);

  if (session.status === "loading") return <div>Loading</div>;

  if (session.status === "authenticated")
    return (
      <>
        <TopNavbar />
        <NavBar />
        {modalOpen && <Modal onClick={() => setModalOpen()} />}
        <div className="flex flex-col w-screen bg-gray-200 h-screen pl-[400px] pt-[70px] items-start"> {children}</div>
      </>
    );

  return null;
}
