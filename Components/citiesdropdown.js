import { useRef, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import useDebounce from "../hooks/useDebounce";
import { useRecoilState } from "recoil";
import { newListingState } from "../atoms/modalAtom";
import { useEffect } from "react/cjs/react.development";

export default function CitiesDropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef();
  const [debouncedInput] = useDebounce(input, 250);
  const fetcher = url => axios.get(url).then(res => res.data);
  const [_, setFormState] = useRecoilState(newListingState);

  function CityList() {
    const { data, error } = useSWR(
      () => (debouncedInput && debouncedInput.length > 2 ? `/api/cities?query=${debouncedInput}` : null),
      fetcher
    );

    const selectCity = city => {
      setInput(city);
      setIsOpen(false);

      setFormState(prevstate => {
        const origState = { ...prevstate };

        for (const [key, value] of Object.entries(origState)) {
          origState[key] = [value?.[0], false];
        }

        return origState;
      });

      setFormState(prevState => ({
        ...prevState,
        city: [city, true],
      }));
    };

    useEffect(() => {
      const handler = ({ keyCode }) => {
        if (keyCode !== 13 || data.length > 1) return;
        const city = data[0];
        selectCity(city);
      };

      window.addEventListener("keypress", handler);
      return () => window.removeEventListener("keypress", handler);
    }, [data]);

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
                  }}
                  ref={node => node?.scrollIntoView({ behavior: "smooth" })}
                  key={city}
                  className={className}>
                  {city}
                </li>
              );
            } else {
              return (
                <li onClick={() => selectCity(city)} key={city} className={className}>
                  {city}
                </li>
              );
            }
          })
        )}
      </ul>
    );
  }

  return (
    <>
      <input
        onChange={({ target: { value } }) => {
          setInput(value);
          if (value.length > 2) setIsOpen(true);
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
