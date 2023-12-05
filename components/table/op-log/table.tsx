import { useState } from 'react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getFacetedRowModel,
   getFacetedUniqueValues,
   getFilteredRowModel,
   getSortedRowModel,
   SortingState,
   useReactTable,
   VisibilityState,
} from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[]
   data: TData[]
}

export default function OpLogTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
   const [rowSelection, setRowSelection] = useState({})
   const [sorting, setSorting] = useState<SortingState>([{ id: 'name', desc: false }])
   const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

   const table = useReactTable({
      data,
      columns,
      state: {
         sorting,
         rowSelection,
         columnVisibility,
      },
      defaultColumn: {
         minSize: 0,
         size: Number.MAX_SAFE_INTEGER,
         maxSize: Number.MAX_SAFE_INTEGER,
      },
      onColumnVisibilityChange: setColumnVisibility,
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
   })

   return (
      <div className="space-y-4">
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(header.column.columnDef.header, header.getContext())}
                              </TableHead>
                           )
                        })}
                     </TableRow>
                  ))}
               </TableHeader>
               <TableBody>
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           row-id={row.id}
                           data-state={row.getIsSelected() && 'selected'}
                           className="even:bg-muted/50"
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                           Firma bulunmamaktadir.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
               <TableFooter>
                  {table.getFooterGroups().map((footerGroup) => (
                     <TableRow key={footerGroup.id}>
                        {footerGroup.headers.map((footer) => (
                           <TableHead key={footer.id} className="h-6">
                              {footer.isPlaceholder
                                 ? null
                                 : flexRender(footer.column.columnDef.footer, footer.getContext())}
                           </TableHead>
                        ))}
                     </TableRow>
                  ))}
               </TableFooter>
            </Table>
         </div>
      </div>
   )
}
