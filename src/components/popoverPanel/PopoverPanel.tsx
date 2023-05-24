import { Popover, Transition } from '@headlessui/react';
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
            <Popover.Button className="border border-gray-300 rounded-md p-2">
              {buttonText}
            </Popover.Button>

            {/* Popover Panel */}
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Popover.Panel
                static
                className="absolute z-10 w-56 mt-2 -ml-4 transform -translate-x-1/2 sm:px-0"
              >
                {/* Panel Content */}
                <div className="bg-white border border-gray-200 rounded-md shadow-lg p-4">
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
