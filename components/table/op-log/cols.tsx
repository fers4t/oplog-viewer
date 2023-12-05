/* eslint-disable @next/next/no-img-element */
import { translateOp } from '@/lib/utils'
import { ZOplog } from '@/utils/zod/oplog'
import { ColumnDef } from '@tanstack/react-table'
import DataTableColumnHeader from './header'

export const oplogTableCols: ColumnDef<ZOplog>[] = [
   {
      accessorFn: (row) => row.lsid,
      accessorKey: 'lsid',
      header: ({ column }) => (
         <DataTableColumnHeader
            className="!text-xs [&>button>svg]:hidden [&>button]:!text-xs"
            column={column}
            title="LSID"
         />
      ),
      cell: ({ row }) => <div className="!text-sm sm:!text-xs">{row.original.lsid?.uid?.$binary?.base64}</div>,
      enableSorting: true,
      enableHiding: false,
   },
   {
      accessorFn: (row) => row.txnNumber,
      accessorKey: 'txnNumber',
      header: ({ column }) => (
         <DataTableColumnHeader
            className="!text-xs [&>button>svg]:hidden [&>button]:!text-xs"
            column={column}
            title="Transaction"
         />
      ),
      cell: ({ row }) => <div className="!text-sm sm:!text-xs">{row.original.txnNumber}</div>,
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorFn: (row) => row.op,
      accessorKey: 'op',
      header: ({ column }) => (
         <DataTableColumnHeader
            className="!text-xs [&>button>svg]:hidden [&>button]:!text-xs"
            column={column}
            title="Op"
         />
      ),
      cell: ({ row }) => {
         return <div className="!text-sm sm:!text-xs">{row.original.op && translateOp(row.original.op)}</div>
      },
      enableSorting: false,
      enableHiding: false,
   },
   {
      accessorFn: (row) => row.ns,
      accessorKey: 'ns',
      header: ({ column }) => (
         <DataTableColumnHeader
            className="!text-xs [&>button>svg]:hidden [&>button]:!text-xs"
            column={column}
            title="Namespace"
         />
      ),
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
         return <div className="!text-sm sm:!text-xs">{row.original.ns}</div>
      },
   },
   {
      accessorFn: (row) => row.o,
      accessorKey: 'o',
      header: ({ column }) => (
         <DataTableColumnHeader
            className="!text-xs [&>button>svg]:hidden [&>button]:!text-xs"
            column={column}
            title="Operation"
         />
      ),
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
         const op = row.original.o
         const diff = op?.diff

         const isCmd = row.original.op === 'c'
         return (
            <div className="flex flex-col text-xs">
               {!isCmd && (
                  <div className="flex flex-col">
                     {op.$v && <div>Ver: {op.$v}</div>}
                     {diff && (
                        <div className="flex flex-col">
                           <div className="flex flex-row items-center">
                              Up:{' '}
                              <pre className="ml-1 bg-gray-200 px-1 text-[10px]  leading-3">
                                 {JSON.stringify(diff.u)}
                              </pre>
                           </div>
                           {diff.sactivity && (
                              <div className="flex flex-row items-center">
                                 Act:{' '}
                                 <pre className="ml-1 bg-gray-200 px-1 text-[10px]  leading-3">
                                    {JSON.stringify(diff.sactivity)}
                                 </pre>
                              </div>
                           )}
                        </div>
                     )}
                  </div>
               )}
               {isCmd && (
                  <pre className="pre flex flex-col bg-gray-200 text-[10px] leading-3">
                     {JSON.stringify(op, null, 4)}
                  </pre>
               )}
            </div>
         )
      },
   },
   {
      accessorFn: (row) => row.o2,
      accessorKey: 'o2',
      header: ({ column }) => (
         <DataTableColumnHeader
            className="!text-xs [&>button>svg]:hidden [&>button]:!text-xs"
            column={column}
            title="Query"
         />
      ),
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
         return <div className="!text-sm sm:!text-xs">{row.original.o2?._id?.$oid}</div>
      },
   },
   {
      accessorFn: (row) => row.wall,
      accessorKey: 'wall',
      header: ({ column }) => (
         <DataTableColumnHeader
            className="!text-xs [&>button>svg]:hidden [&>button]:!text-xs"
            column={column}
            title="Date"
         />
      ),
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
         return <div className="!text-sm sm:!text-xs">{row.original.wall.$date}</div>
      },
   },
]
