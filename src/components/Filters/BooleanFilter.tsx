import React, { useState } from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';
import { HeaderProps } from 'react-table';

export const BooleanFilter = React.memo<HeaderProps<object>>(({ column: { Header, filterValue, setFilter, id } }) => {
  const [value, setValue] = useState<boolean>(filterValue === 'true')
  return (
    <FormControlLabel
      control={
        <Switch
          checked={value}
          onChange={event => {
            setValue(event.target.checked)
            setFilter(String(event.target.checked))
          }}
          name={id}
          color="primary"
          size="small"
        />
      }
      label={Header}
      labelPlacement="top"
    />
  );
});
