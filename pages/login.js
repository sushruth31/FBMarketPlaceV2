import CustomHead from "../Components/head";
import { signIn, getProviders } from "next-auth/react";

export default function Login({ providers }) {
  return (
    <>
      <CustomHead title={"Login"} />
      <div className="flex w-screen bg-gray-200 h-screen justify-center items-center flex-col">
        <div className="flex w-[400px] h-[400px] bg-white justify-center rounded-xl items-center flex-col">
          <div className="font-bold text-xl">Welcome to MarketPlace!</div>
          <div className="mb-[100px]">Sign in below to get started</div>
          {Object.values(providers).map(provider => (
            <div key={provider.name}>
              <button
                className="bg-sky-600 hover:bg-sky-700 text-white p-[15px] rounded-3xl"
                onClick={() => signIn(provider.id, { callbackUrl: "/home" })}>
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
