import React from "react";
import {useContext} from "react";
import {SearchContext} from "../App";
import useLocalStorage from "../hooks/useLocalStorage";
import {useNavigate} from "react-router-dom";
function Search() {
  const [value, setValue, setItem] = useLocalStorage(
    "tarasovcadLocalStorage",
    "",
  );

  const {setTerm, setCurrentPage} = useContext(SearchContext);

  const navigate = useNavigate();

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setTerm(value);
    setItem(value);
    setCurrentPage(1);
    navigate("/search/1");
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
        <img src="../images/search.svg" alt="" />
      </button>
    </form>
  );
}

export default Search;
