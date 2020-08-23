import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { action } from '@storybook/addon-actions';
import React from 'react';

import DataTableToolbar from '../src/components/DataTableToolbar';
import { Button } from '@material-ui/core';

export default {
  title: 'DataTableToolbar',
  component: DataTableToolbar,
};

const data = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

export const Empty = () => <DataTableToolbar />;

export const Selected = () => <DataTableToolbar numSelected={data.length} />;

export const withBulkActions = () => {
  const useWithBulkActionsStyles = makeStyles((theme: Theme) => ({
    approve: {
      color: theme.palette.success.main,
    },
    reject: {
      color: theme.palette.error.main,
    },
  }));

  const classes = useWithBulkActionsStyles();
  return (
    <DataTableToolbar
      preGlobalFilteredRows={data}
      numSelected={data.length}
      bulkActions={[
        {
          tooltip: 'Approve',
          label: 'Approve',
          className: classes.approve,
          icon: <ThumbUpIcon />,
          onClick: (e, data) => {
            action('Approve')(e, data);
          },
          // disabled: true
        },
        {
          tooltip: 'Reject',
          label: 'Approve',
          className: classes.reject,
          icon: <ThumbDownIcon />,
          onClick: (e, data) => {
            action('Reject')(e, data);
          },
        },
        {
          tooltip: 'Refresh',
          label: 'Refresh',
          icon: <RefreshIcon />,
          onClick: (e, data) => {
            action('Refresh')(e, data);
          },
        },
        {
          tooltip: 'Delete',
          render: ({ data }) => (
            <Button
              variant="text"
              color="secondary"
              startIcon={<DeleteIcon />}
              onClick={(e) => {
                action('Delete')(e, data);
              }}
            >
              Delete
            </Button>
          ),
        },
      ]}
    />
  );
};
