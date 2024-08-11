"use client";
import { SearchContext } from "@/contexts/SearchContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Search = () => {
  const [value, setValue, setItem] = useLocalStorage(
    "tarasovcadLocalStorage",
    "",
  );

  const { setTerm, setCurrentPage } = useContext(SearchContext);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTerm(value);
    setItem(value);
    setCurrentPage(1);
    router.push("/search/1");
    setTimeout(() => {
      window.location.href = "/search/1";
    }, 0);
  }
  function onInputChange(e: React.FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  return (
    <form className="search-wrapper" onSubmit={handleSubmit} role="form">
      <input
        value={value}
        onChange={onInputChange}
        className="search"
        type="text"
        placeholder="Search character...."
      />
      <button className="search-button m1l-[-14px]">
        <Image src="/images/search.svg" alt="Search" width={20} height={20} />
      </button>
    </form>
  );
};

export default Search;
