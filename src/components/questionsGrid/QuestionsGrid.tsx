import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { usePagination, useTable } from 'react-table';

import { columns } from '../../constants/questionsGridColumn';
import tableData from '../../mocks/data.json';
import { fetchDifficultyColourCoding } from '../../utils/questionsGrid.utils';
const data = tableData;

const QuestionsGrid = () => {
  const tableInstance = useTable({ columns, data }, usePagination);
  const options = [
    { value: 20, label: '20 / Page' },
    { value: 50, label: '50 / Page' },
    { value: 100, label: '100 / Page' },
  ];
  // const [pageSize, setPageSize] = useState(20);
  const [selectedOption, setSelectedOption] = useState<{
    value: number;
    label: string;
  } | null>(options[0]);

  const handleChange = (option: { value: number; label: string } | null) => {
    if (option !== null) {
      setSelectedOption(option);
      // setPageSize(option.value);
      tableInstance.setPageSize(option.value);
    }
  };

  useEffect(() => {
    tableInstance.setPageSize(selectedOption?.value || 0);
  }, []);

  return (
    <>
      <div className="p-6 lg:mx-[241.5px]">
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
                  className="odd:bg-graybg even:bg-tableRowEven "
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
            className="w-[111px] h-[33px] bg-grayBg"
            classNames={{
              dropdownIndicator: () => 'bg-tableRowEven',
              control: () => 'bg-grayBg',
            }}
            options={options}
            value={selectedOption}
            onChange={handleChange}
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
              </strong>{' '}
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
