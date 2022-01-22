import { useEffect, useState } from "react";

export default function useDebounce(val, time) {
  const [returnVal, setReturnVal] = useState(null);

  useEffect(
    () =>
      setTimeout(() => {
        setReturnVal(val);
      }, time),

    [val, time]
  );

  return [returnVal];
}
