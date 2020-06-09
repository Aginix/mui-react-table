import { Button } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { Fragment } from 'react';

import DataTableFilters from './DataTableFilters';
import { DataTableToolbarProps } from './types';

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.primary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.primary.dark,
        },
  title: {
    flex: '1',
    margin: 'auto',
  },
  subtoolbar: {
    minHeight: 32,
    alignItems: 'flex-start',
  },
  actions: {
    flex: '1 1 100%',
    '& >*': {
      marginRight: theme.spacing(1),
    },
  },
  filters: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  bulkActions:{
    width: '100%',
    display: 'flex',
    flex: 2,
    justifyContent: 'flex-end',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'row wrap',
    }
  },
  bulkActionButton:{
    minWidth: 'unset',
  }
}));

const DataTableToolbar = ({
  title = 'DataTable',
  numSelected = 0,
  preGlobalFilteredRows = [],
  bulkActions = [],
  actions,
  search,
  setSearch,
  columns,
  filters,
}: DataTableToolbarProps) => {
  const classes = useToolbarStyles();
  const bulkActionsComponents = React.useMemo(
    () =>
      bulkActions.map((action, index) => {
        return action.hidden ? null : (
          <Fragment>
            {action.render ? (
              <Tooltip title={action.tooltip || 'Action'} key={index}>
                {action.render({ data: preGlobalFilteredRows, disabled: action.disabled, hidden: action.hidden })}
              </Tooltip>
            ) : (
              <Tooltip title={action.tooltip || 'Action'} key={index}>
                <Button
                  disabled={action.disabled}
                  aria-label={action.label || 'BulkAction'}
                  variant="text"
                  color="primary"
                  startIcon={action.icon}
                  onClick={e => {
                    if (action.onClick) action.onClick(e, preGlobalFilteredRows);
                  }}
                  classes={{
                    root: classes.bulkActionButton
                  }}
                  className={action.className}
                >
                  {action.label}
                </Button>
              </Tooltip>
            )}
          </Fragment>
        );
      }),
    [preGlobalFilteredRows, bulkActions]
  );

  return (
    <Fragment>
      <Toolbar
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} color="inherit" variant="subtitle1">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            {title}
          </Typography>
        )}

        {numSelected > 0 ? (
          <div className={classes.bulkActions}>{bulkActionsComponents}</div>
        ) : (
          <div className={classes.filters}>
            <DataTableFilters filters={filters} columns={columns} search={search} setSearch={setSearch} />
          </div>
        )}
      </Toolbar>
      {actions ? (
        <Toolbar className={clsx(classes.root, classes.subtoolbar)}>
          {numSelected === 0 ? (
            <Fragment>
              <div className={classes.actions}>{actions}</div>
              <div>{/* TODO: Filtering chip */}</div>
            </Fragment>
          ) : null}
        </Toolbar>
      ) : null}
    </Fragment>
  );
};

export default DataTableToolbar;
