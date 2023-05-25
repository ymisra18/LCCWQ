import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { Searchbar } from 'components/searchbar/Searchbar';
import React, { useState } from 'react';
import { calculateCompanyFrequency } from 'utils/questionsGrid.utils';

import allTableData from '../../mocks/data.json';

type PopoverPanelProps = {
  buttonText: string;
  selectedCompanies: string[];
  handleCompanySelection: (companyName: string) => void;
};

const PopoverPanel: React.FC<PopoverPanelProps> = ({
  buttonText,
  selectedCompanies,
  handleCompanySelection,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const maxItemsToShow = 23;

  const handleSearchChange = (value: string) => {
    setSearchText(value.trim().toLowerCase());
  };
  const handleItemSelection = (item: string) => {
    handleCompanySelection(item);
  };

  const renderedItems = calculateCompanyFrequency(allTableData).map(
    ({ company_name, totalFrequency }) => (
      <div
        key={company_name}
        className={classNames(
          'text-sm bg-companyTagBg mr-2 rounded-full inline-flex items-center leading-6 px-2 whitespace-nowrap',
          {
            'bg-blue text-white': selectedCompanies.includes(company_name),
          }
        )}
        onClick={() => handleItemSelection(company_name)}
      >
        {company_name}
        <div
          className={classNames(
            'rounded-full inline-flex items-center leading-4 bg-freqTag text-freqText ml-1 my-[4px] px-1.5 whitespace-nowrap',
            {
              'bg-blue text-headerText ':
                selectedCompanies.includes(company_name),
            }
          )}
        >
          {totalFrequency}
        </div>
      </div>
    )
  );

  const filteredItems = renderedItems.filter(({ props }) =>
    props.children.toString().toLowerCase().includes(searchText)
  );

  const itemsToShow = expanded
    ? filteredItems
    : filteredItems.slice(0, maxItemsToShow);

  const shouldShowExpandButton = filteredItems.length > maxItemsToShow;

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const renderItems = () => {
    if (filteredItems.length === 0) {
      return <div className="text-error">No Results</div>;
    }

    return itemsToShow.map((item) => (
      <div key={item.key} className="flex">
        {item}
      </div>
    ));
  };

  return (
    <Popover>
      {({ open }) => (
        <>
          {/* Content before the Popover */}
          <div className="relative">
            {/* Popover Trigger */}
            <Popover.Button className="w-[130px] h-[33px] flex px-4 py-[6px] pb-5 text-sm font-medium text-left text-headerText bg-tableRowEven rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-gray-800">
              {buttonText}
              <ChevronDownIcon
                className={classNames('w-5 h-5 ml-2 transition-transform', {
                  'transform rotate-180': open || expanded,
                })}
                aria-hidden="true"
              />
            </Popover.Button>

            {/* Popover Panel */}
            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel
                static
                className="absolute left-[190%] w-[500px] mt-2 transform -translate-x-1/2 sm:px-0 bg-tableRowEven text-white rounded-md shadow-xl"
              >
                {/* Panel Content */}
                <div className="flex flex-wrap gap-4 p-2">
                  <Searchbar
                    placeholderContent="Search Companies"
                    fetchResults={handleSearchChange}
                    defaultValue={searchText}
                    className="!text-companyTagText !bg-companyTagBg !pl-[40px] "
                  />
                  <div className="max-h-96 overflow-y-auto flex flex-wrap gap-2">
                    {renderItems()}
                  </div>
                  {shouldShowExpandButton && (
                    <button
                      className="w-full text-right text-blue focus:outline-none"
                      onClick={toggleExpansion}
                    >
                      {expanded ? 'Collapse' : 'Expand'}
                    </button>
                  )}
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  );
};

export default PopoverPanel;
