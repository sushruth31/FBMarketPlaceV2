import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import useLocalStorage from "../hooks/useLocalStorage";
import SearchModal from "./searchmodal";
import Link from "next/link";

export default function MainNav() {
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const turnSearchOff = () => setIsSearchOn(false);
  const router = useRouter();
  const activeClassLi = "bg-neutral-100 py-[15px] rounded-2xl px-[10px] flex items-center justify-left mb-[10px]";
  const inActiveClassLi =
    "py-[15px] px-[10px] flex items-center justify-left cursor-pointer mb-[10px] hover:bg-neutral-100 rounded-2xl";
  const activeClassA = "no-underline  whitespace-nowrap";
  const inActiveClassA = "no-underline whitespace-nowrap";
  const [recentSearches, setRecentSearches, clearRecentSearches] = useLocalStorage("recentsearches");
  const inputRef = useRef();

  useEffect(() => {
    if (inputRef?.current && isSearchOn) inputRef.current.focus();
  }, [isSearchOn, searchInput]);

  useEffect(() => {
    if (!isSearchOn && searchInput.length > 0) setIsSearchOn(true);
  }, [searchInput]);

  function Li({ title }) {
    const pathname =
      "/" +
      title
        .split("")
        .map((char, i) => (char === " " ? "" : char))
        .join("")
        .toLowerCase();

    return (
      <Link href={pathname}>
        <li className={router.pathname === pathname ? activeClassLi : inActiveClassLi}>
          <a className={router.pathname === pathname ? activeClassA : inActiveClassA}>{title}</a>
        </li>
      </Link>
    );
  }

  function SearchInput() {
    return (
      <form
        className="flex justify-center items-center w-full"
        onSubmit={e => {
          e.preventDefault();
          setRecentSearches({ keyword: searchInput.trim() });
          setSearchInput("");
          turnSearchOff();
        }}>
        <input
          ref={inputRef}
          onChange={e => setSearchInput(e.target.value)}
          onClick={e => {
            e.stopPropagation();
            setIsSearchOn(true);
          }}
          value={searchInput}
          placeholder="Search"
          className="bg-gray-100 text-gray-500 w-full h-[40px] flex items-center rounded-2xl px-[10px]"
        />
      </form>
    );
  }

  return (
    <>
      <SearchInput />
      {isSearchOn && (
        <SearchModal
          clearRecentSearches={clearRecentSearches}
          recentSearches={recentSearches}
          ref={inputRef}
          turnSearchOff={turnSearchOff}
          searchInput={searchInput}
        />
      )}
      <ul className="my-[20px] w-full px-[10px]">
        <Li title="Home" />
        <Li title={"Saved"} />
        <Li title={"My Listings"} />
      </ul>
      <div className="w-full flex items-center justify-center">
        <button onClick={() => router.push("/create")} className="bg-blue-500 p-[10px] rounded-3xl text-white w-5/6">
          New Listing
        </button>
      </div>
    </>
  );
}
