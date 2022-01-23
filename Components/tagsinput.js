import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { useRecoilState } from "recoil";
import { newListingState } from "../atoms/modalAtom";

export default function TagsInput() {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState("");
  const [maxTagsReached, setMaxTagsReached] = useState(false);

  const [_, setFormState] = useRecoilState(newListingState);

  useEffect(() => {
    if (maxTagsReached) setMaxTagsReached(false);

    if (tags.length === 0) {
      setFormState(prevstate => ({
        ...prevstate,
        tags: [[], false],
      }));

      return;
    }

    setFormState(prevstate => ({
      ...prevstate,
      tags: [[...tags], true],
    }));
  }, [tags]);

  useEffect(() => {
    if (input === "" || input.length < 2) return;
    const onCommaPress = ({ keyCode }) => {
      if (keyCode === 44) {
        if (tags?.length === 6) {
          setMaxTagsReached(true);
          setInput("");
          return;
        }
        let tagToAdd = input.length > 7 ? input.slice(0, 4) + "..." : input;
        tagToAdd = tagToAdd.replace(",", "").trim();
        setTags(prevstate => Array.from(new Set([...prevstate, tagToAdd])));
        setInput("");
      }
    };

    window.addEventListener("keypress", onCommaPress);
    return () => window.removeEventListener("keypress", onCommaPress);
  }, [input]);

  useEffect(() => setInput(""), [tags]);

  return (
    <div>
      <div className="grid grid-cols-3 mr-[100px] w-11/12">
        {tags.length > 0 &&
          tags.map(tag => (
            <li
              className="bg-gray-300 rounded-2xl p-[7px] flex items-center justify-between mb-[10px] mr-[5px]"
              key={tag}>
              {tag}
              <MdClose
                onClick={() => setTags(ps => ps.filter(existingtag => existingtag !== tag))}
                className="text-lg cursor-pointer"
              />
            </li>
          ))}
      </div>
      {maxTagsReached && <div>Max tags reached!</div>}
      <input
        placeholder="Enter Tags"
        className="form-control mb-[30px]"
        value={input.replace(",", "")}
        onChange={({ target: { value } }) => setInput(value)}
      />
    </div>
  );
}
