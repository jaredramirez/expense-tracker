// @flow
import 'react-table/react-table.css';
import React from 'react';
import ReactTable from 'react-table';

import './styles.css';

type Props = {
  columns: Array<any>,
  data: Array<any>,
  onRowClick?: (rowValues: any) => void,
  noDataText?: string,
  showFilters?: boolean,
};

const Table = ({onRowClick, ...props}: Props) => (
  <ReactTable
    className={'-highlight'}
    showPageSizeOptions={false}
    defaultPageSize={14}
    getTrProps={(state, rowInfo) => ({
      onClick: () => onRowClick(rowInfo.row),
    })}
    {...props}
  />
);

Table.defaultProps = {
  onRowClick: () => {},
  noDataText: 'No Data',
  showFilters: false,
};

export default Table;
