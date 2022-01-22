import { useRef, useState, useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import useDebounce from "../hooks/useDebounce";

export default function CitiesDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const [debouncedInput] = useDebounce(input, 250);
  const fetcher = url => axios.get(url).then(res => res.data);

  function CityList() {
    const { data, error } = useSWR(
      () => (debouncedInput && debouncedInput.length > 2 ? `/api/cities?query=${debouncedInput}` : null),
      fetcher
    );

    const className = "list-group py-[5px] cursor-pointer hover:bg-slate-100";

    return (
      <ul className="list-group">
        {data === undefined && input.length > 2 ? (
          <div>loading</div>
        ) : data?.length === 0 ? (
          <div>No results</div>
        ) : (
          data?.map((city, idx) => {
            if (idx === data?.length - 1) {
              return (
                <li
                  onClick={() => {
                    setInput(city);
                    setIsOpen(false);
                  }}
                  ref={node => node?.scrollIntoView({ behavior: "smooth" })}
                  key={city}
                  className={className}>
                  {city}
                </li>
              );
            } else {
              return (
                <li
                  onClick={() => {
                    setInput(city);
                    setIsOpen(false);
                  }}
                  key={city}
                  className={className}>
                  {city}
                </li>
              );
            }
          })
        )}
      </ul>
    );
  }

  useEffect(() => {
    input.length > 0 ? setIsOpen(true) : setIsOpen(false);
  }, [input]);

  return (
    <>
      <input
        onChange={({ target: { value } }) => {
          setInput(value);
          scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        }}
        className="form-control"
        placeholder="City"
        value={input}
      />
      {isOpen && <CityList />}
    </>
  );
}
