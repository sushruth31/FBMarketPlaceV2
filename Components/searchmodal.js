import { useRouter } from "next/router";
import { useRef, useEffect, forwardRef } from "react";
import { useState } from "react/cjs/react.development";
import useWindowClick from "../hooks/useWindowClick";
import { MdAccessTime } from "react-icons/md";

const SearchModal = forwardRef(({ searchInput, turnSearchOff, recentSearches, clearRecentSearches }, ref) => {
  const router = useRouter();
  const modalRef = useRef();
  const [highLightIdx, setHighLightIdx] = useState(0);

  useWindowClick(turnSearchOff, [modalRef, ref]);

  useEffect(() => {
    const arrayLength = recentSearches.length;
    if (arrayLength === 0) return;
    const onKeyDown = ({ key }) => {
      if (key === "ArrowUp") {
        if (highLightIdx === 1) {
          setHighLightIdx(arrayLength);
        } else {
          setHighLightIdx(ps => ps - 1);
        }
      }

      if (key === "ArrowDown") {
        if (highLightIdx < arrayLength) {
          setHighLightIdx(ps => ps + 1);
        } else {
          setHighLightIdx(1);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [recentSearches, highLightIdx]);

  function SearchListItem(props) {
    return (
      <li
        className={
          highLightIdx - 1 === props.idx
            ? "flex items-center rounded-xl mb-[10px] bg-gray-100 cursor-pointer hover:bg-gray-100 h-[40px]"
            : "flex items-center rounded-xl mb-[10px] cursor-pointer hover:bg-gray-100 h-[40px]"
        }>
        <div className="text-2xl mr-[5px]">{props.icon}</div>
        <div>{props.keyword}</div>
      </li>
    );
  }

  return (
    <div
      ref={modalRef}
      onClick={e => {
        e.stopPropagation();
      }}
      className="w-[350px] bg-white rounded-xl flex flex-col items-start p-[20px] mb-[300px] absolute top-[90px] left-0 shadow">
      {recentSearches.length === 0 && !searchInput ? (
        <div>No Recent Searches</div>
      ) : recentSearches.length > 0 && !searchInput ? (
        <div className="w-full">
          <div className="text-xl mb-[10px] text-black">Recent Searches</div>

          <ul className="-ml-[30px]">
            {recentSearches?.map((el, i) => (
              <SearchListItem {...el} key={i} idx={i} icon={<MdAccessTime />} />
            ))}
          </ul>
          <button onClick={clearRecentSearches} className="bg-gray-300 w-[100%] rounded h-[40px] hover:bg-gray-200">
            Clear Recent Searches
          </button>
        </div>
      ) : (
        <div>Search Contents</div>
      )}
    </div>
  );
});

export default SearchModal;
