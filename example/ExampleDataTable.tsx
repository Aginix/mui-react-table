import { Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import RefreshIcon from '@material-ui/icons/Refresh';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import * as React from 'react';
import { Column } from 'react-table';

import DataTable from '../.';


export const ExampleDataTable = () => {
  const useWithBulkActionsStyles = makeStyles((theme: Theme) => ({
    approve: {
      color: theme.palette.success.main,
    },
    reject: {
      color: theme.palette.error.main,
    },
  }));

  const classes = useWithBulkActionsStyles();

  const columns: Column[] = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
      },
      {
        Header: 'Active',
        accessor: 'active',
      },
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: true,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: true,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: false,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: false,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: true,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: false,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: false,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
        active: true,
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      totalCount={data.length}
      options={{
        pagination: true
      }}
      onStateChange={(state) => {
      }}
      bulkActions={[
        {
          tooltip: 'Approve',
          label: 'Approve',
          className: classes.approve,
          icon: <ThumbUpIcon />,
          onClick: (e, data) => {
          },
        },
        {
          tooltip: 'Reject',
          label: 'Approve',
          className: classes.reject,
          icon: <ThumbDownIcon />,
          onClick: (e, data) => {
          },
        },
        {
          tooltip: 'Refresh',
          label: 'Refresh',
          icon: <RefreshIcon />,
          onClick: (e, data) => {
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
