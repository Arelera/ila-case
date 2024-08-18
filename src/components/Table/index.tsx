import {
  AccessorKeyColumnDef,
  flexRender,
  getCoreRowModel,
  Header,
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
    <div className="p-2">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id} {...header} />
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

function TableHeader(header: Header<any, unknown>) {
  return (
    <th key={header.id}>
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
    </th>
  )
}

function TableRow(row: Row<any>) {
  return (
    <tr>
      {row.getVisibleCells().map((cell) => (
        <td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}
