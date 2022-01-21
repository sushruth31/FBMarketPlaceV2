import { useRef, useState, useEffect } from "react";

export default function CitiesDropDown({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef();

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
      />
      {isOpen && (
        <ul className="list-group">
          {data.map(({ cities }) =>
            cities.filter(city => city.toLowerCase().includes(input.toLowerCase())).map(city => <li>{city}</li>)
          )}
        </ul>
      )}
    </>
  );
}
