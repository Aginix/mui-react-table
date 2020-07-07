import React from 'react';
import { TextField } from '@material-ui/core';
import { HeaderProps } from 'react-table';
import { useDebouncedCallback } from 'use-debounce';

export const TextFilter = React.memo<HeaderProps<object>>(({ column: { Header, filterValue, setFilter } }) => {
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
      variant="filled"
      size="small"
      placeholder={`Search records...`}
    />
  );
});
