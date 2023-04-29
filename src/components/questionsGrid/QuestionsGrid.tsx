import React from 'react';
import { useTable } from 'react-table';

import tableData from '../../mocks/data.json';
const data = tableData;

const columns = [
  {
    Header: 'Problem Name',
    accessor: 'name' as const,
  },
  { Header: 'Link', accessor: 'link' as const },
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
  const tableInstance = useTable({ columns, data });

  return (
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
        {tableInstance.rows.map((row) => {
          tableInstance.prepareRow(row);
          return (
            <tr
              key={row.id}
              className="odd:bg-graybg even:bg-tableRowEven font-semibold"
            >
              {row.cells.map((cell) => (
                <td
                  key={cell.column.id}
                  className="px-4 py-2 text-lg text-white"
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
