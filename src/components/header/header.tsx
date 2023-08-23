import _ from 'lodash';
import './header.css';
import { useMemo } from 'react';

const Header = ({ setSearchText = null }) => {
  const searchDebounce = useMemo(
    () =>
      _.debounce(
        (e) => {
          setSearchText(e.target.value);
        },
        250,
        { maxWait: 1000 }
      ),
    []
  );

  return (
    <div className='header'>
      {setSearchText && (
        <div className='search-input'>
          <input className='search-button' placeholder='Search' onChange={searchDebounce}></input>
        </div>
      )}
    </div>
  );
};

export default Header;
