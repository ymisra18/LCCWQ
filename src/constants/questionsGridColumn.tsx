import React from 'react';
export const columns = [
  {
    Header: 'Problem',
    accessor: 'name' as const,
    Cell: ({ row }: any) => {
      return (
        <a className="hover:text-blue" href={row.original.link}>
          {row.original.name}
        </a>
      );
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
