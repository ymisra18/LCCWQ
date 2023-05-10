import React from 'react';
import ReactTooltip from 'react-tooltip';
export const columns = [
  {
    Header: 'Title',
    accessor: 'name' as const,
    Cell: ({ row }: any) => {
      return (
        <a className="hover:text-blue" href={row.original.link}>
          {`${row.index + 1}. ${row.original.name}`}
        </a>
      );
    },
  },

  { Header: 'Difficulty', accessor: 'difficulty' as const },
  {
    Header: 'Companies',
    accessor: 'companies' as const,
    Cell: ({ value }: any) => {
      return (
        <div className="text-companyTagText">
          {value.length === 0 && '--'}
          {value.map((compData: any, index: number) => (
            <button
              key={index}
              className="bg-companyTagBg mr-2 rounded-full inline-flex items-center leading-6 px-2  whitespace-nowrap"
            >
              {compData.company_name}{' '}
              <div className="rounded-full inline-flex items-center leading-4  bg-freqTag text-freqText ml-1 my-[4px] px-1.5 whitespace-nowrap ">
                {compData.freq}
              </div>
            </button>
          ))}
        </div>
      );
    },
  },
];

export type HeaderColumn = {
  name: string;
  difficulty: string;
  companies: string;
};

export const HEADER_COLUMN_CLASS: HeaderColumn = {
  name: 'max-w-[295px] !w-[295px] truncate overflow-hidden',
  difficulty: 'w-[84px] py-[11px]  mx-[8px] text-center',
  companies: 'text-center',
};
