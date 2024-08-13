import {SearchContext} from "@/contexts/SearchContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import Image from "next/image";
import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from "react";
import {getCookie, setCookie} from "cookies-next";

const Search = () => {
  const [value, setValue, setItem] = useLocalStorage(
    "tarasovcadLocalStorage",
    "",
  );
  const [cookieValue, setCookieValue] = useState("");

  const {setTerm, setCurrentPage} = useContext(SearchContext);
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTerm(value);
    setItem(value);
    setCurrentPage(1);
    setCookie("tarasovcadCookie", value, {maxAge: 60 * 60 * 24 * 7});
    router.push("/search/1").then(() => router.reload());
  }
  function onInputChange(e: React.FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  useEffect(() => {
    // Retrieve the value from cookies when the component mounts
    const savedValue = getCookie("tarasovcadCookie");
    if (savedValue) {
      setCookieValue(savedValue);
    }
  }, [setValue, cookieValue]);

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
