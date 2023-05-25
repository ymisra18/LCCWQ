import searchDark from 'assets/icons/searchDark.svg';
import React, { useEffect, useRef, useState } from 'react';

export type SearchbarProps = {
  placeholderContent: string;
  defaultValue?: string;
  fetchResults: (searchText: string) => void;
  className?: string;
};

export const Searchbar = ({
  placeholderContent,
  fetchResults,
  defaultValue,
  className,
}: SearchbarProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchText, setSearchText] = useState(defaultValue ?? '');

  useEffect(() => {
    if (defaultValue === '') setSearchText('');
  }, [defaultValue]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    fetchResults(value);
  };

  return (
    <div data-testid="Searchbar" className="flex flex-row items-center">
      <input
        type="text"
        name="search"
        value={searchText}
        className={
          'w-[312px] h-[32px] font-roboto text-searchText py-2 rounded-lg bg-tableRowEven border-white text-ellipsis whitespace-nowrap'
        }
        placeholder={placeholderContent}
        onChange={(event) => handleSearch(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            fetchResults(searchText);
          }
        }}
        ref={searchRef}
      />
      <label htmlFor="search">
        <button
          onClick={() => {
            searchRef?.current?.focus();
            fetchResults(searchText);
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
