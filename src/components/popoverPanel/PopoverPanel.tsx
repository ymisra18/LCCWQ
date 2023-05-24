import { Popover, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React from 'react';
import { Fragment } from 'react';

export type PopoverPanelProps = {
  buttonText: string;
  panelContent: any;
};

const PopoverPanel = ({ buttonText, panelContent }: PopoverPanelProps) => {
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
                  'transform rotate-180': open,
                })}
                aria-hidden="true"
              />
            </Popover.Button>

            {/* Popover Panel */}
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Popover.Panel
                static
                className="absolute z-10 w-4 mt-2 -ml-4 transform -translate-x-1/2 sm:px-0"
              >
                {/* Panel Content */}
                <div className="absolute left-0 mt-2 origin-top-right text-white bg-tableRowEven divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {panelContent}
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
