import useAsync from "./useAsync";
import axios from "axios";

export default function useFetch(url, dependencies) {
  return useAsync(() => {
    return axios.get(url).then(res => {
      return res.data;
    });
  }, dependencies);
}
