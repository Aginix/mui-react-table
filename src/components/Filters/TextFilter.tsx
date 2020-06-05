import React from 'react';
import { TextField } from '@material-ui/core';
import { HeaderProps } from 'react-table';
import { useDebouncedCallback } from 'use-debounce';

export const TextFilter = ({ column: { Header, filterValue, setFilter } }: HeaderProps<object>) => {
  const [handleOnChange] = useDebouncedCallback((value?: string) => {
    setFilter(value);
  }, 200);

  return (
    <TextField
      label={Header}
      defaultValue={filterValue || ''}
      onChange={(e: any) => {
        handleOnChange(e.target.value || undefined);
      }}
      placeholder={`Search records...`}
    />
  );
};
