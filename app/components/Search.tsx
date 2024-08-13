import { Form, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import { SearchContext } from "~/contexts/SearchContext";
import useLocalStorage from "~/hooks/useLocalStorage";

const Search = () => {
  const [value, setValue, setItem] = useLocalStorage(
    "tarasovcadLocalStorage",
    ""
  );

  const { setTerm, setCurrentPage } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.preventDefault();
    setTerm(value);
    setItem(value);
    setCurrentPage(1);
    navigate("/search/1");
    window.location.reload();
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };

  return (
    <Form
      className="search-wrapper"
      onSubmit={handleSubmit}
      role="form"
      method="post"
    >
      <input
        value={value}
        onChange={onInputChange}
        className="search"
        type="text"
        placeholder="Search character...."
      />
      <button type="submit" className="search-button m1l-[-14px]">
        <img
          src="/images/search.svg"
          alt="Search"
          width={20}
          height={20}
          style={{ width: "20px", height: "20px" }}
        />
      </button>
    </Form>
  );
};

export default Search;
