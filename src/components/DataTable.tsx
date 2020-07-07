import {
  CircularProgress,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useEffect, useState, useMemo, Fragment } from 'react';
import {
  TableOptions,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import DataTableToolbar from './DataTableToolbar';
import { useSelection } from './utilityHooks';

import DataTablePaginationActions from './DataTablePaginationActions';
import { DataTableProps } from './types';

const DEFAULT_OPTIONS: Partial<TableOptions<object>> = {
  manualSortBy: true,
  manualGlobalFilter: true,
  manualFilters: true,
  manualPagination: true,
};

const useStyles = makeStyles(theme => ({
  headerCell: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
  },
  dataCell: {
    overflow: 'hidden',
    display: '-webkit-box',
    [theme.breakpoints.down('xs')]: {
      '-webkit-line-clamp': 1,
    },
    '-webkit-box-orient': 'vertical',
  },
}));

const DataTable: FC<DataTableProps> = ({
  title,
  columns = [],
  data = [],
  loading,
  totalCount = 0,
  actions,
  onStateChange,
  bulkActions,
  ...props
}) => {
  const classes = useStyles();
  const [search, setSearch] = useState<string | undefined>(undefined);
  const { options = { pagination: true, search: true, selection: true } } = props;
  const tableOptions = onStateChange ? DEFAULT_OPTIONS : {};
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    gotoPage,
    setPageSize,
    prepareRow,
    page,
    columns: tableColumns,
    preGlobalFilteredRows,
    state: { sortBy, pageIndex, pageSize, filters, globalFilter, hiddenColumns, selectedRowIds },
  } = useTable(
    { columns, data, ...tableOptions },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination,
    useRowSelect,
    useSelection
  );

  useEffect(() => {
    if (onStateChange) {
      onStateChange({ search, sortBy, pageIndex, pageSize, filters, globalFilter, hiddenColumns });
    }
  }, [search, sortBy, pageIndex, pageSize, filters, globalFilter, hiddenColumns, onStateChange]);

  const handleChangePage = (_: any, newPage: number) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setPageSize(Number(event.target.value));
  };

  const tableBodyRender = () =>
    page.map(row => {
      prepareRow(row);
      return (
        <TableRow {...row.getRowProps()}>
          {row.cells.map(cell => {
            return (
              <TableCell {...cell.getCellProps()}>
                <span className={classes.dataCell}>{cell.render('Cell')}</span>
              </TableCell>
            );
          })}
        </TableRow>
      );
    });

  const rowsPerPageOptions = useMemo(() => [5, 10, 25, { label: 'All', value: totalCount }], [totalCount]);

  return (
    <Fragment>
      <DataTableToolbar
        title={title}
        numSelected={Object.keys(selectedRowIds).length}
        preGlobalFilteredRows={preGlobalFilteredRows}
        search={search}
        setSearch={setSearch}
        actions={actions}
        bulkActions={bulkActions}
        columns={tableColumns}
        filters={filters}
      />
      <TableContainer>
        <MuiTable size="small" {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    {...(column.id === 'selection'
                      ? column.getHeaderProps()
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      title={column.id}
                      placement="bottom-start"
                      enterDelay={100}
                    >
                      {column.isSorted && column.id !== 'selection' ? (
                        <TableSortLabel
                          active={column.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        >
                          <span className={classes.headerCell}>{column.render('Header')}</span>
                        </TableSortLabel>
                      ) : (
                        <span className={classes.headerCell}>{column.render('Header')}</span>
                      )}
                    </Tooltip>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {loading ? (
              <tr>
                <td style={{ paddingTop: 32, paddingBottom: 32 }}>
                  <div style={{ position: 'absolute', left: '50%', right: '50%' }}>
                    <CircularProgress color="primary" size="24px" />
                  </div>
                </td>
              </tr>
            ) : (
              tableBodyRender()
            )}
          </TableBody>
          {options.pagination ? (
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  colSpan={columns.length + 1}
                  count={totalCount}
                  rowsPerPage={pageSize}
                  page={pageIndex}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                  ActionsComponent={DataTablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          ) : null}
        </MuiTable>
      </TableContainer>
    </Fragment>
  );
};

export default DataTable;
