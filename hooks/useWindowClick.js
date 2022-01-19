import { useEffect } from "react";

export default function useWindowClick(cb, refs = []) {
  useEffect(() => {
    const onClick = e => {
      if (refs.some(ref => ref?.current?.contains(e.target))) {
        return;
      }
      cb();
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, [cb, refs]);
}
