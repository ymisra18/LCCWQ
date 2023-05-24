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
              enterFrom="transform scale-95"
              enterTo="transform scale-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100"
              leaveTo="transform scale-95"
            >
              <Popover.Panel
                static
                className="absolute left-0 w-[300px] mt-2 -ml-4 transform -translate-x-1/2 sm:px-0 flex flex-wrap text-white bg-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                {/* Panel Content */}
                {panelContent}
              </Popover.Panel>
            </Transition>
          </div>
        </>
      )}
    </Popover>
  );
};

export default PopoverPanel;
