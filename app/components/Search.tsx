import { useNavigate } from '@remix-run/react';
import { useContext, useEffect, useState } from 'react';
import { SearchContext } from '~/contexts/SearchContext';
import useLocalStorage from '~/hooks/useLocalStorage';
import Cookies from 'js-cookie';
const Search = () => {
  const [value, setValue, setItem] = useLocalStorage('tarasovcadLocalStorage', '');
  const [cookieValue, setCookieValue] = useState('');
  const { setTerm, setCurrentPage } = useContext(SearchContext);
  const navigate = useNavigate();

  const handleSubmit = (
    event?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event) {
      event.preventDefault();
    }
    setTerm(value);
    setItem(value);
    setCurrentPage(1);
    Cookies.set('tarasovcadCookieAppRemix', value);
    navigate('/search/1');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    const savedValue = Cookies.get('tarasovcadCookieAppRemix');
    if (savedValue) {
      setCookieValue(savedValue);
    }
  }, [setValue, cookieValue]);

  return (
    <div className="search-wrapper">
      <input
        onKeyPress={onKeyPress}
        value={value}
        onChange={onInputChange}
        className="search"
        type="text"
        placeholder="Search character...."
      />
      <button type="submit" className="search-button m1l-[-14px]" onClick={handleSubmit}>
        <img
          src="/images/search.svg"
          alt="Search"
          width={20}
          height={20}
          style={{ width: '20px', height: '20px' }}
        />
      </button>
    </div>
  );
};

export default Search;
