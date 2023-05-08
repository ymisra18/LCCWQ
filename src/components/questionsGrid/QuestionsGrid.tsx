import classNames from 'classnames';
import { Searchbar } from 'components/searchbar/Searchbar';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { usePagination, useTable } from 'react-table';

import { columns } from '../../constants/questionsGridColumn';
import tableData from '../../mocks/data.json';
import { fetchDifficultyColourCoding } from '../../utils/questionsGrid.utils';

const QuestionsGrid = () => {
  const tableInstance = useTable({ columns, data: tableData }, usePagination);
  const options = [
    { value: 20, label: '20 / Page' },
    { value: 50, label: '50 / Page' },
    { value: 100, label: '100 / Page' },
  ];
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (option: any) => {
    setSelectedOption(option);
    tableInstance.setPageSize(option.value);
  };

  useEffect(() => {
    tableInstance.setPageSize(selectedOption.value);
  }, [selectedOption, tableInstance]);

  return (
    <>
      <div className="p-6 lg:mx-[241.5px]">
        <div className="flex justify-end">
          <Searchbar />
        </div>
        <table className="table-auto w-full z-20">
          <thead>
            <tr className="bg-graybg">
              {tableInstance.headers.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-2 text-left font-semibold text-xl text-headerText"
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
                        'px-4 py-2 text-[14px]',
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
          <Select
            className="w-[111px] h-[27px]"
            classNamePrefix="react-select"
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                border: 'none',
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: 'inherit',
              }),
              singleValue: (provided) => ({
                ...provided,
                color: 'rgba(239, 241, 246, 0.75)',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                textOverflow: 'initial',
                marginRight: 10,
              }),
              dropdownIndicator: (provided) => ({
                ...provided,
                color: 'rgba(239, 241, 246, 0.75)',
                paddingLeft: 0,
              }),
              valueContainer: (provided) => ({
                ...provided,
                paddingRight: 0,
                width: '120px',
              }),
            }}
            options={options}
            value={selectedOption}
            onChange={handleChange}
            components={{ IndicatorSeparator: () => null }}
          />

          <div className="pagination">
            <button
              onClick={() => tableInstance.previousPage()}
              disabled={!tableInstance.canPreviousPage}
            >
              Previous
            </button>
            <span>
              Page{' '}
              <strong>
                {tableInstance.state.pageIndex + 1} of{' '}
                {tableInstance.pageOptions.length}
              </strong>
            </span>
            <button
              onClick={() => tableInstance.nextPage()}
              disabled={!tableInstance.canNextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsGrid;
