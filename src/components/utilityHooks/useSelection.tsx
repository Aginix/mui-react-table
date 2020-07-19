import React from 'react';
import { Hooks } from 'react-table';
import IndeterminateCheckbox from '../IndeterminateCheckbox';

export const useSelection = <D extends object = {}>(hooks: Hooks<D>) => {
  hooks.allColumns.push(columns => [
    {
      id: 'selection',
      // eslint-disable-next-line react/display-name
      Header: ({ getToggleAllRowsSelectedProps }: any) => (
        <div>
          <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
        </div>
      ),
      // eslint-disable-next-line react/display-name
      Cell: ({ row }: any) => {
        const { onChange, ...props } = row.getToggleRowSelectedProps();
        const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
          event.stopPropagation();
          return onChange(event, checked);
        };
        return (
          <div>
            <IndeterminateCheckbox {...props} onChange={handleOnChange} />
          </div>
        );
      },
    },
    ...columns,
  ]);
};

useSelection.pluginName = 'useSelection';
