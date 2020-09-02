import { Button } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { Fragment } from 'react';

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
    width: '15%',
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
  bulkActions: {
    width: '80%',
    display: 'flex',
    flex: 2,
    justifyContent: 'flex-end',
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      flexFlow: 'row wrap',
    },
  },
  bulkActionButton: {
    minWidth: 'unset',
  },
}));

const DataTableToolbar = ({
  title,
  numSelected = 0,
  preGlobalFilteredRows = [],
  bulkActions = [],
}: DataTableToolbarProps) => {
  const classes = useToolbarStyles();
  const bulkActionsComponents = React.useMemo(
    () =>
      bulkActions.map((action, index) => {
        return action.hidden ? null : (
          <Fragment key={index}>
            {action.render ? (
              <Tooltip title={action.tooltip || 'Action'}>
                {action.render({ data: preGlobalFilteredRows, disabled: action.disabled, hidden: action.hidden })}
              </Tooltip>
            ) : (
              <Tooltip title={action.tooltip || 'Action'}>
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
                    root: classes.bulkActionButton,
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
    [preGlobalFilteredRows, bulkActions, classes.bulkActionButton]
  );

  if (numSelected === 0 && !title) {
    return null;
  }

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
        ) : title ? (
          <Typography className={classes.title} variant="h6" id="tableTitle">
            {title}
          </Typography>
        ) : null}

        {numSelected > 0 ? <div className={classes.bulkActions}>{bulkActionsComponents}</div> : null}
      </Toolbar>
    </Fragment>
  );
};

export default DataTableToolbar;
