import { ReactNode } from 'react';
import { TableState as ReactTableState } from 'react-table';
import { TableContainerProps } from '@material-ui/core/TableContainer';
import { TablePaginationProps } from '@material-ui/core/TablePagination';
import { TableProps } from '@material-ui/core/Table';

export interface DataTableOptions {
  selection?: boolean;
  pagination?: boolean;
}

export interface TableState {
  sortBy: ReactTableState['sortBy'];
  pageIndex: ReactTableState['pageIndex'];
  pageSize: ReactTableState['pageSize'];
  hiddenColumns: ReactTableState['hiddenColumns'];
}

export interface DataTableProps {
  columns?: any[];
  data?: any[];
  totalCount?: number;
  pageCount?: number;
  page?: number;
  loading?: boolean;
  onStateChange?: (state: TableState) => void;
  onRowClick?: (rowData: object) => void;
  title?: string;
  options?: DataTableOptions;
  bulkActions?: DataTableToolbarProps['bulkActions'];
  TableContainerProps?: TableContainerProps;
  TableProps?: TableProps;
  defaultRowsPerPage?: number;
  rowsPerPageOptions?: TablePaginationProps['rowsPerPageOptions'];
  emptyRender?: React.ReactNode;
}

export interface DataTableToolbarBulkAction {
  tooltip?: ReactNode;
  icon?: ReactNode;
  render?: (props: { data: any[]; disabled?: boolean; hidden?: boolean }) => JSX.Element;
  label?: string;
  onClick?: <T = any>(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: T[]) => void | any;
  className?: string;
  disabled?: boolean;
  hidden?: boolean;
}

export interface DataTableToolbarProps {
  title?: React.ReactNode;
  numSelected?: number;
  preGlobalFilteredRows?: any[];
  bulkActions?: DataTableToolbarBulkAction[];
}

export interface DataTablePaginationActionsProps {
  count: number;
  onChangePage: (event: any, page: number) => void;
  page: number;
  rowsPerPage: number;
}
