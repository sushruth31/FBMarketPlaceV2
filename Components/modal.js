import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";

function BackDrop({ children, onClick }) {
  return (
    <div
      onClick={onClick}
      className="w-screen h-screen bg-[#000000a1] fixed top-0 left-0 flex justify-center items-center -z-1">
      {children}
    </div>
  );
}

export default function Modal({ onClick }) {
  const Component = useRecoilValue(modalState);

  return <BackDrop onClick={onClick}>{Component}</BackDrop>;
}
