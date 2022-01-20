import { useState, useEffect } from "react";

export default function TagsInput() {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const onCommaPress = ({ keyCode }) => {
      if (keyCode !== 44) return;
      const tagToAdd = input.replace(",", "").trim();
      setTags(prevstate => [...prevstate, tagToAdd]);
      setInput("");
    };

    window.addEventListener("keypress", onCommaPress);
    return () => window.removeEventListener("keypress", onCommaPress);
  }, [input]);

  useEffect(() => setInput(""), [tags]);

  return (
    <div>
      <div className="flex items-center justify-start flex-wrap">
        {tags.length > 0 &&
          tags.map(tag => (
            <ul className="">
              <li className="bg-gray-300 rounded-2xl p-[7px]" key={tag}>
                {tag}
              </li>
            </ul>
          ))}
      </div>
      <input
        placeholder="Enter Tags"
        className="form-control"
        value={input.replace(",", "")}
        onChange={({ target: { value } }) => setInput(value)}
      />
    </div>
  );
}
