import classNames from 'classnames';
import React from 'react';
import { usePagination, useTable } from 'react-table';

import tableData from '../../mocks/data.json';
const data = tableData;

const columns = [
  {
    Header: 'Problem',
    accessor: 'name' as const,
    Cell: ({ row }: any) => {
      return <a href={row.original.link}>{row.original.name}</a>;
    },
  },
  { Header: 'Difficulty', accessor: 'difficulty' as const },
  {
    Header: 'Companies',
    accessor: 'companies' as const,
    Cell: ({ value }: any) => {
      return value
        .map((compData: any) => `${compData.company_name} ${compData.freq}`)
        .join(',');
    },
  },
];

export const QuestionsGrid = () => {
  const tableInstance = useTable({ columns, data }, usePagination);

  return (
    <>
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
                className="odd:bg-graybg even:bg-tableRowEven font-semibold"
              >
                {row.cells.map((cell) => (
                  <td
                    key={cell.column.id}
                    className={classNames('px-4 py-2 text-lg', {
                      'text-white': cell.column.id !== 'difficulty',
                      'text-difficulty-easy':
                        cell.column.id === 'difficulty' &&
                        cell.value.trim() === 'Easy',
                      'text-difficulty-medium':
                        cell.column.id === 'difficulty' &&
                        cell.value.trim() === 'Medium',
                      'text-difficulty-hard':
                        cell.column.id === 'difficulty' &&
                        cell.value.trim() === 'Hard',
                      'hover:text-blue': cell.column.id === 'name',
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => tableInstance.previousPage()}
          disabled={!tableInstance.canPreviousPage}
        >
          Previous
        </button>
        <button
          onClick={() => tableInstance.nextPage()}
          disabled={!tableInstance.canNextPage}
        >
          Next
        </button>
      </div>
    </>
  );
};
