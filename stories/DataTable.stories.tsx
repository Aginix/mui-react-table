import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import DataTable from '../src';
import { action } from '@storybook/addon-actions';
import { Column } from 'react-table';

export default {
  title: 'DataTable',
  component: DataTable,
};

export const Default = () => {
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
        disableSortBy: true
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
        firstName: 'B',
        lastName: 'BBBB',
        age: 33,
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
      onRowClick={(data) => alert(JSON.stringify(data))}
    />
  );
};

export const DisablePagination = () => {
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
        disableSortBy: true
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
        firstName: 'B',
        lastName: 'BBBB',
        age: 33,
        active: true,
      },
    ],
    [],
  );

  return (
    <DataTable
      TableProps={{ style: { minWidth: 1024 } }}
      columns={columns}
      data={data}
      totalCount={data.length}
      defaultRowsPerPage={1}
      options={{ selection: false, pagination: true }}
    />
  );
};

export const WithEmptyData = () => {

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
    () => [],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      totalCount={data.length}
      options={{ pagination: false, selection: false }}
    />
  );
};

export const WithAction = () => {
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
      options={{}}
      onStateChange={(state) => {
        action('onStateChange')(state);
      }}
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

export const Loading = () => {
  const columns = React.useMemo(
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
    ],
    [],
  );

  const data = React.useMemo(
    () => [
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
      {
        firstName: 'Nonpawit',
        lastName: 'Teerachetmongkol',
        age: 25,
      },
    ],
    [],
  );

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);
  return <DataTable columns={columns} data={data} totalCount={data.length} loading={loading} />;
};
