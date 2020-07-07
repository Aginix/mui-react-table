import React, { Fragment, useState } from 'react';

import { fade, makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import { DataTableFiltersProps } from './types';
import { Tooltip, Button, Menu, MenuItem } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { InputSearch } from './InputSearch';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  filter: {},
  filterList: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const DataTableFilters = ({ columns = [] }: DataTableFiltersProps) => {
  const classes = useStyles();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const selectedFiltersComponents = React.useMemo(
    () => columns.filter(column => selectedFilters.includes(column.id)).map(column => column.render('Filter')),
    [columns, selectedFilters]
  );

  return (
    <Fragment>
      <InputSearch />
      <div className={classes.filter}>{React.Children.toArray(selectedFiltersComponents)}</div>
      <div className={classes.filterList}>
        <PopupState variant="popover" popupId="demo-popup-menu">
          {popupState => (
            <React.Fragment>
              <Tooltip title="Filter list">
                <Button aria-label="filter list" startIcon={<FilterListIcon />} {...bindTrigger(popupState)}>
                  Add Filter
                </Button>
              </Tooltip>
              <Menu {...bindMenu(popupState)}>
                {columns
                  .filter(column => !selectedFilters.includes(column.id) && column.canFilter && column.Filter)
                  .map(column => (
                    <MenuItem
                      key={column.id}
                      onClick={() => {
                        popupState.close();
                        setSelectedFilters(selectedFilters.concat(column.id as string));
                      }}
                    >
                      {column.Header}
                    </MenuItem>
                  ))}
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      </div>
    </Fragment>
  );
};

export default DataTableFilters;
