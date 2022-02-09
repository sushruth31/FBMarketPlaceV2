import CustomHead from "../Components/head";
import ProtectedPage from "../Components/protectedpage";
import useSWR from "swr";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const fetcher = url => axios.get(url).then(res => res.data);

  const { data, error } = useSWR("/api/getlistings", fetcher);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <ProtectedPage>
      <CustomHead title="Home" />
      <div className="font-bold text-xl">What's New</div>
      {!data && <div>Loading</div>}
      {data && JSON.stringify(data)}
    </ProtectedPage>
  );
}
