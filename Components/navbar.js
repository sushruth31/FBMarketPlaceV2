import { useRouter } from "next/router";
import { useRef, useState, useEffect } from "react";
import MainNav from "./mainnav";
import CreateNavBar from "./createNavBar";

export default function NavBar() {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <div className="w-[350px] h-screen bg-white fixed top-[50px] left-0 flex flex-col  px-[10px] pt-[30px]">
      {pathName === "/home" ? <MainNav /> : <CreateNavBar />}
    </div>
  );
}
