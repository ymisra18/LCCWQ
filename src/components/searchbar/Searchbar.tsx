import searchDark from 'assets/icons/searchDark.svg';
import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

export const Searchbar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  //   const [searchText, setSearchText] = useState(defaultValue ?? '');
  //   const handleKeyDown = (event: { key: string }) => {
  //     if (event.key === 'Enter') fetchResults(searchText);
  //   };

  //   useEffect(() => {
  //     if (defaultValue === '') setSearchText('');
  //   }, [defaultValue]);

  return (
    <div data-testid="Searchbar" className="flex flex-row items-center">
      <input
        type="text"
        name="search"
        // value={searchText}
        className={
          'w-[312px] h-[32px] font-roboto text-searchText py-2 rounded-lg bg-tableRowEven border-white text-ellipsis whitespace-nowrap'
        }
        placeholder={'  Search Questions'}
        // onChange={(event) => setSearchText(event.target.value)}
        // onKeyDown={handleKeyDown}
        // ref={searchRef}
      />
      <label htmlFor="search">
        <button
          onClick={() => {
            searchRef?.current?.focus();
            // fetchResults(searchText);
          }}
        >
          <img
            className="h-4 relative right-[2rem] top-[2px]"
            src={searchDark}
            alt="search"
          />
        </button>
      </label>
    </div>
  );
};
