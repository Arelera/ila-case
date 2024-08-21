import {
  AccessorKeyColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from '@tanstack/react-table'

interface Props<T> {
  data: T[]
  columns: AccessorKeyColumnDef<T, any>[]
}

export default function Table<T>({ data, columns }: Props<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="table-fixed overflow-scroll overflow-sm-hidden">
      <table className="table align-items-center ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} {...row} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TableRow(row: Row<any>) {
  return (
    <tr>
      {row.getVisibleCells().map((cell) => (
        <td
          key={cell.id}
          className="text-sm px-3 overflow-hidden"
          style={{ maxWidth: '1px' }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}
