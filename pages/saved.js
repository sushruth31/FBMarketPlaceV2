import { useState, useEffect } from "react";
import CustomHead from "../Components/head";
import ProtectedPage from "../Components/protectedpage";

export default function Saved() {
  return (
    <ProtectedPage>
      <CustomHead title="Home" />
      <div className="font-bold text-xl">Saved Items</div>
    </ProtectedPage>
  );
}
