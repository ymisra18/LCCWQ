import classNames from 'classnames';
import React from 'react';
import { usePagination, useTable } from 'react-table';

import { columns } from '../../constants/questionsGridColumn';
import tableData from '../../mocks/data.json';
import { fetchDifficultyColourCoding } from '../../utils/questionsGrid.utils';
const data = tableData;

const QuestionsGrid = () => {
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
                    className={classNames(
                      'px-4 py-2 text-lg',
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

export default QuestionsGrid;
