import classNames from 'classnames';
import DropdownMenu from 'components/dropdownMenu/DropdownMenu';
import PopoverPanel from 'components/popoverPanel/PopoverPanel';
import { Searchbar } from 'components/searchbar/Searchbar';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { usePagination, useTable } from 'react-table';

import {
  columns,
  HEADER_COLUMN_CLASS,
  HeaderColumn,
} from '../../constants/questionsGridColumn';
import allTableData from '../../mocks/data.json';
import { fetchDifficultyColourCoding } from '../../utils/questionsGrid.utils';

const getFilteredProblemByName = (searchString: string, data: any) => {
  if (!searchString) return data;
  const lowerSearchString = searchString.toLowerCase();
  return data.filter((data: any) =>
    data.name.toLowerCase().includes(lowerSearchString)
  );
};

const QuestionsGrid = () => {
  const pageSizeOptions = [
    { value: 20, label: '20/ Page' },
    { value: 50, label: '50/ Page' },
    { value: 100, label: '100/ Page' },
  ];
  const [selectedPageSizeOption, setSelectedPageSizeOption] = useState(
    pageSizeOptions[0]
  );

  const options = [
    { value: '', label: 'All Levels' },
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];
  const [selectedDifficultyLevel, setSelectedDifficultyLevel] = useState(
    options[0]
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const handleCompanySelection = (companyName: string) => {
    setSelectedCompanies((prevSelected) => {
      if (companyName === 'Miscellaneous') {
        if (prevSelected.includes(companyName)) {
          return prevSelected.filter((company) => company !== companyName);
        } else {
          return [companyName, ...prevSelected];
        }
      } else {
        if (prevSelected.includes(companyName)) {
          return prevSelected.filter((company) => company !== companyName);
        } else {
          const updatedSelectedCompanies = [...prevSelected, companyName];
          const miscellaneousIndex =
            updatedSelectedCompanies.indexOf('Miscellaneous');
          if (miscellaneousIndex !== -1) {
            updatedSelectedCompanies.splice(miscellaneousIndex, 1);
          }
          return updatedSelectedCompanies;
        }
      }
    });
    setSelectedTags((prevSelectedTags: any) => {
      if (prevSelectedTags.includes(companyName)) {
        return prevSelectedTags.filter((tag: any) => tag !== companyName);
      } else {
        return [...prevSelectedTags, companyName];
      }
    });
  };

  const [searchText, setSearchText] = useState('');
  const handleSearchChange = (searchText: string) => {
    setSearchText(searchText.trim());
  };
  const tableData = useMemo(() => {
    const filteredData = getFilteredProblemByName(searchText, allTableData);

    let filteredByDifficulty = filteredData;
    if (selectedDifficultyLevel.value !== '') {
      filteredByDifficulty = filteredData.filter(
        (row: any) =>
          row.difficulty.toLowerCase() === selectedDifficultyLevel.value
      );
    }

    let filteredByCompany = filteredByDifficulty;

    if (selectedCompanies.includes('Miscellaneous')) {
      filteredByCompany = filteredByDifficulty.filter(
        (row: any) => row.companies.length === 0
      );
    } else if (selectedCompanies.length > 0) {
      const selectedCompanyNames = selectedCompanies.map((company) =>
        company.toLowerCase()
      );

      filteredByCompany = filteredByDifficulty.filter((row: any) =>
        row.companies.some((company: any) =>
          selectedCompanyNames.includes(company.company_name.toLowerCase())
        )
      );
    }

    return filteredByCompany;
  }, [searchText, selectedDifficultyLevel, selectedCompanies]);

  const tableInstance = useTable({ columns, data: tableData }, usePagination);
  const handleChange = (option: any) => {
    setSelectedPageSizeOption(option);
    tableInstance.setPageSize(option.value);
  };
  const handleDifficultyChange = (option: any) => {
    setSelectedDifficultyLevel(option);
  };

  useEffect(() => {
    tableInstance.setPageSize(selectedPageSizeOption.value);
  }, [selectedPageSizeOption, tableInstance]);

  return (
    <>
      <div className="p-6 lg:mx-[241.5px]">
        <div className="flex justify-between mb-[60px]">
          <div className="flex">
            <div className="mr-[10px]">
              {' '}
              <DropdownMenu
                options={options}
                selectedOption={selectedDifficultyLevel}
                handleChange={handleDifficultyChange}
              />
            </div>

            {/* </div>
          <div> */}
            <PopoverPanel
              buttonText="Companies"
              selectedCompanies={selectedCompanies}
              handleCompanySelection={handleCompanySelection}
              selectedTags={selectedTags}
            />
          </div>
          <Searchbar
            placeholderContent="  Search Questions"
            fetchResults={handleSearchChange}
            defaultValue={searchText}
          />
        </div>
        <table className="table-auto w-full z-20">
          <thead>
            <tr className="bg-graybg">
              {tableInstance.headers.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-2 text-center font-semibold text-xl text-headerText"
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableInstance.page.map((row) => {
              tableInstance.prepareRow(row);
              return (
                <tr
                  key={row.id}
                  className={classNames('odd:bg-graybg even:bg-tableRowEven')}
                >
                  {row.cells.map((cell) => (
                    <td
                      key={cell.column.id}
                      className={classNames(
                        'px-4 py-2 text-xs leading-6',
                        HEADER_COLUMN_CLASS[
                          cell.column.id as keyof HeaderColumn
                        ],
                        fetchDifficultyColourCoding(cell)
                      )}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <div className="relative inline-block">
            <DropdownMenu
              options={pageSizeOptions}
              selectedOption={selectedPageSizeOption}
              handleChange={handleChange}
            />
          </div>

          <div className="text-headerText ">
            <button
              onClick={() => tableInstance.previousPage()}
              disabled={!tableInstance.canPreviousPage}
            >
              {'<<'}
            </button>
            <span>
              {' '}
              Page{' '}
              <strong>
                {tableInstance.state.pageIndex + 1} of{' '}
                {tableInstance.pageOptions.length}{' '}
              </strong>
            </span>
            <button
              onClick={() => tableInstance.nextPage()}
              disabled={!tableInstance.canNextPage}
            >
              {'>>'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsGrid;
