/* eslint-disable react/jsx-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import styles from './Table.module.css';
import LoadingOverlay from 'react-loading-overlay';

const Table = ({ columns, data, loading }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  return (
    <LoadingOverlay
      active={loading}
      spinner
      text="Loading stack info"
      styles={{
        wrapper: {
          width: '100%',
          height: '100%',
        },
        overlay: base => ({
          ...base,
          background: 'rgba(241,90,87,0.5)',
        }),
      }}
    >
      <table {...getTableProps()} className="zi-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        fontSize: '1.1rem',
                        padding: '10px',
                      }}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </LoadingOverlay>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default Table;
