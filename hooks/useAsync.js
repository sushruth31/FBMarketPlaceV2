import { useCallback, useEffect, useState } from "react";

export default function useAsync(cb, dependencies = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  const cbMemoized = useCallback(() => {
    cb()
      .then(res => setData(res))
      .catch(err => setErr(err))
      .finally(setLoading(true));
  });

  useEffect(() => {
    cbMemoized();
  }, dependencies);

  return [data, loading, err];
}
