import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tooltip,
  LinearProgress,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { FC, useCallback, useEffect, useMemo, Fragment } from 'react';
import {
  TableOptions,
  useExpanded,
  useFilters,
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  PluginHook,
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
  onStateChange,
  bulkActions,
  onRowClick,
  TableContainerProps,
  rowsPerPageOptions = [5, 10, 25, { label: 'All', value: totalCount }],
  emptyRender,
  ...props
}) => {
  const classes = useStyles();
  const { options = { pagination: true, selection: true } } = props;
  const tableOptions = onStateChange ? DEFAULT_OPTIONS : {};
  const plugins = useMemo<PluginHook<object>[]>(
    () =>
      [
        useGlobalFilter,
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        options.selection ? useSelection : null,
      ].filter(_ => _) as any,
    [options]
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    gotoPage,
    setPageSize,
    prepareRow,
    page,
    preGlobalFilteredRows,
    state: { sortBy, pageIndex, pageSize, filters, globalFilter, hiddenColumns, selectedRowIds },
  } = useTable({ columns, data, ...tableOptions }, ...plugins);

  useEffect(() => {
    if (onStateChange) {
      onStateChange({ sortBy, pageIndex, pageSize, filters, globalFilter, hiddenColumns });
    }
  }, [sortBy, pageIndex, pageSize, filters, globalFilter, hiddenColumns, onStateChange]);

  const handleChangePage = useCallback(
    (_: any, newPage: number) => {
      gotoPage(newPage);
    },
    [gotoPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event: any) => {
      setPageSize(Number(event.target.value));
    },
    [setPageSize]
  );

  const tableBodyRender = () =>
    page.map(row => {
      const handleOnRowClick = (event: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>) => {
        event.stopPropagation();
        if (typeof onRowClick === 'function') {
          onRowClick(row.original);
        }
      };
      prepareRow(row);
      return (
        <TableRow component="div" hover {...row.getRowProps()} role="checkbox">
          {row.cells.map(cell => {
            return (
              <TableCell
                component="div"
                padding={cell.column.id === 'selection' ? 'checkbox' : undefined}
                {...cell.getCellProps()}
                onClick={cell.column.id === 'selection' ? undefined : handleOnRowClick}
              >
                <span className={classes.dataCell}>{cell.render('Cell')}</span>
              </TableCell>
            );
          })}
        </TableRow>
      );
    });

  return (
    <Fragment>
      <DataTableToolbar
        title={title}
        numSelected={Object.keys(selectedRowIds).length}
        preGlobalFilteredRows={preGlobalFilteredRows}
        bulkActions={bulkActions}
      />
      <TableContainer {...TableContainerProps}>
        <MuiTable component="div" style={{ position: 'relative' }} {...getTableProps()}>
          <TableHead component="div">
            {headerGroups.map(headerGroup => (
              <TableRow component="div" {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell
                    component="div"
                    {...(column.id === 'selection'
                      ? { ...column.getHeaderProps(), padding: 'checkbox' }
                      : column.getHeaderProps(column.getSortByToggleProps()))}
                  >
                    {column.id === 'selection' ? (
                      <span className={classes.headerCell}>{column.render('Header')}</span>
                    ) : (
                      <Tooltip
                        PopperProps={{
                          disablePortal: true,
                        }}
                        title={column.id}
                        placement="bottom-start"
                        enterDelay={100}
                      >
                        <TableSortLabel
                          disabled
                          active={column.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                        >
                          <span className={classes.headerCell}>{column.render('Header')}</span>
                        </TableSortLabel>
                      </Tooltip>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          {loading ? (
            <div
              style={{
                display: 'flex',
                position: 'absolute',
                top: 56,
                left: 0,
                right: 0,
                bottom: 15,
                alignSelf: 'center',
                WebkitBoxAlign: 'center',
                alignItems: 'center',
                zIndex: 10,
                background: '#ffffff61',
              }}
            >
              <div style={{ display: 'flex', WebkitBoxPack: 'center', justifyContent: 'center', flex: '1 1 0%' }}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: '100%',
                  }}
                >
                  <LinearProgress />
                </div>
              </div>
            </div>
          ) : null}
          <TableBody component="div" {...getTableBodyProps()}>
            {tableBodyRender()}
          </TableBody>
        </MuiTable>
        {emptyRender ? emptyRender : <Typography align="center" component="div">Data is empty</Typography>}
      </TableContainer>
      {options.pagination ? (
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
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
      ) : null}
    </Fragment>
  );
};

export default DataTable;
