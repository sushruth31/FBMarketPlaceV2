import { useState, useEffect } from "react";

export default function useLocalStorage(key) {
  const [data, setData] = useState(JSON.parse(localStorage.getItem(key)) || []);

  const clear = () => {
    localStorage.removeItem(key);
    setData([]);
  };

  useEffect(() => {
    if (data.length > 0) localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  const addData = entry => {
    if (data.length === 0) {
      const array = [];
      array.push(entry);
      setData(array);
      return;
    }

    //check if entry already exists
    if (
      data.some(el =>
        Object.values(el).every(value => {
          return Object.values(entry).every(entryval => value === entryval);
        })
      )
    ) {
      return;
    }

    setData(prevstate => [entry, ...prevstate]);
  };

  return [data, addData, clear];
}
