import { useEffect, useState } from "react";

export default function useDebounce(val, time) {
  const [returnVal, setReturnVal] = useState(null);

  useEffect(() => {
    const id = setTimeout(() => {
      setReturnVal(val);
    }, time);

    return () => clearTimeout(id);
  }, [val, time]);

  return [returnVal];
}
