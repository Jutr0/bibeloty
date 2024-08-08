import {flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import './Table.scss'
import Button from "../button/Button";

const Table = ({columns, data, onAdd}) => {
    const table = useReactTable({columns, data, getCoreRowModel: getCoreRowModel()})

    return <div className="table">
        <table>
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
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
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
        {onAdd && <Button className="add-new" onClick={onAdd}>Add new +</Button>}
    </div>
}

export default Table;