import CustomHead from "../Components/head";
import ProtectedPage from "../Components/protectedpage";

export default function Home() {
  return (
    <ProtectedPage>
      <CustomHead title="Home" />
      <div className="font-bold text-xl">What's New</div>
    </ProtectedPage>
  );
}
