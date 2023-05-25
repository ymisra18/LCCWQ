import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import { Searchbar } from 'components/searchbar/Searchbar';
import React, { useState } from 'react';
import { calculateCompanyFrequency } from 'utils/questionsGrid.utils';

import allTableData from '../../mocks/data.json';

export type PopoverPanelProps = {
  buttonText: string;
};

const PopoverPanel: React.FC<PopoverPanelProps> = ({ buttonText }) => {
  const [expanded, setExpanded] = useState(false);
  const [searchText, setSearchText] = useState('');

  const maxItemsToShow = 20;

  const handleSearchChange = (value: string) => {
    setSearchText(value.trim().toLowerCase());
  };

  const renderedItems = calculateCompanyFrequency(allTableData).map(
    ({ company_name, totalFrequency }) => (
      <div key={company_name}>
        {company_name} ({totalFrequency})
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
                className="absolute left-[190%] w-[500px] mt-2 transform -translate-x-1/2 sm:px-0 overflow-y-auto max-h-96 bg-tableRowEven text-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {/* Panel Content */}
                <div className="flex flex-wrap gap-4 p-2">
                  <Searchbar
                    placeholderContent="Search Companies"
                    fetchResults={handleSearchChange}
                    defaultValue={searchText}
                  />
                  {itemsToShow}
                </div>
                {shouldShowExpandButton && (
                  <button
                    className="w-full text-left text-white focus:outline-none"
                    onClick={toggleExpansion}
                  >
                    {expanded ? 'Collapse' : 'Expand'}
                  </button>
                )}
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  );
};

export default PopoverPanel;
