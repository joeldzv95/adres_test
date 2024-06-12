import React, { FC, useMemo } from 'react'
import { ITable } from '../models/ITable'

const Table: FC<ITable> = ({ columns, data }) => {
  const formatValue = useMemo(() => {
    return (value: any) => {
      return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value)
    }
  }, [])

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column, index) => (
            <th key={index} onClick={() => column?.action && column.action()} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <>
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="px-6 py-4 whitespace-nowrap">
                  {column.isOperation ? column.render && column.render(row) : column.formatCurrency ? formatValue(row[column.accessor as string]) : row[column.accessor as string]}
                </td>
              ))}
            </tr>
          </>
        ))}
      </tbody>
    </table>
  )
}

export default React.memo(Table)
