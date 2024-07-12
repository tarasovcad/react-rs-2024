import React, {useState} from "react";
import {useContext} from "react";
import {SearchContext} from "../App";
function Search() {
  const [value, setValue] = useState("");

  const {term, setTerm} = useContext(SearchContext);

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setTerm(value);
    console.log(term);
  }
  function onInputChange(e: React.FormEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
    console.log(value);
  }
  return (
    <form className="search-wrapper" onSubmit={handleSubmit}>
      <input
        value={value}
        onChange={onInputChange}
        className="search"
        type="text"
        placeholder="Search character...."
      />
      <button className="search-button m1l-[-14px]">
        <img src="./images/search.svg" alt="" />
      </button>
    </form>
  );
}

export default Search;
