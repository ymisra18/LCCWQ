import { Menu, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';
import classNames from 'classnames';
import React from 'react';

interface Option {
  value: any;
  label: string;
}

interface DropdownMenuProps {
  options: Option[];
  selectedOption: Option;
  handleChange: (option: Option) => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  selectedOption,
  handleChange,
}) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className="w-[130px] h-[33px] flex px-4 py-[6px] pb-5 text-sm font-medium text-left text-headerText bg-tableRowEven rounded-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-gray-800">
            {selectedOption.label}
            <ChevronDownIcon
              className={classNames('w-5 h-5 ml-2 transition-transform', {
                'transform rotate-180': open,
              })}
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Menu.Items
              static
              className="absolute left-0 mt-2 origin-top-right text-white bg-tableRowEven divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                {options.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          'group',
                          'flex',
                          'rounded-md',
                          'items-center',
                          'w-[129.89px]',
                          'px-2',
                          'py-2',
                          'text-sm',
                          {
                            'bg-dropdownHover text-gray-900': active,
                            'text-gray-700': !active,
                          }
                        )}
                        onClick={() => handleChange(option)}
                      >
                        {option.label}
                        {selectedOption.value === option.value && (
                          <CheckIcon
                            className="w-4 h-4 ml-8 text-blue"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default DropdownMenu;
