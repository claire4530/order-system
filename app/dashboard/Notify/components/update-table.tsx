'use client'
import { Toaster, toast } from 'sonner'
import React, { useEffect, useState } from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    BellAlertIcon,
    BellIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline'
import Alert from './alert'
import Dropdown from './dropdown'
import { CircleGauge, SquareMousePointer } from 'lucide-react';
import SheetNotify from './sheet'
interface Area {
    id: number
    tableNumber: string
    state: string
    alertTime: string
    event: string
    stateButton: string
    area_id: number
}
const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString();
};

export const columns: ColumnDef<Area>[] = [
    {
        accessorKey: 'alertTime',
        header: ({ column }) => {
            return (
                <Button
                    className=""
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    警報時間
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="ml-4 items-center">
                {formatDate(row.getValue('alertTime'))}
            </div>
        ),
    },
    {
        accessorKey: 'state',
        header: '狀態',
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.getValue('state') === '已處理' ? (
                    <>
                        <BellIcon className="mr-2 flex h-6 w-6 " />
                        <span className="">已處理</span>
                    </>
                ) : row.getValue('state') === '待處理' ? (
                    <>
                        <BellAlertIcon className="mr-2 flex h-6 w-6 text-red-500" />
                        <span className=" text-red-500">待處理</span>
                    </>
                ) : (
                    <>
                        <BellAlertIcon className="mr-2 flex h-6 w-6 text-yellow-500" />
                        <span className="text-yellow-500">處理中</span>
                    </>
                )}
            </div>
        ),
    },
    {
        accessorKey: 'tableNumber',
        header: '桌號',
        cell: ({ row }) => (
            <div className="flex items-center">
                {(row.getValue('tableNumber') as string).length > 10 
                    ? (row.getValue('tableNumber') as string).slice(0, 10) + '...' 
                    : row.getValue('tableNumber')}
            </div>
        ),
    },
    {
        accessorKey: 'event',
        header: '事件',
        cell: ({ row }) => (
            <div className="flex items-center">
                {row.getValue('event')}
            </div>
        ),
    },
    {
        accessorKey: 'stateButton',
        header: () => <div className="ml-4">事件處理</div>,
        cell: ({ row }) => (
            <div className="flex items-center h-6">
                {row.getValue('state') === '待處理' ? (
                    <>
                        <Alert id={row.original.id} />
                    </>
                ) : row.getValue('state') === '已處理' ? (
                    <>
                        <CheckCircleIcon className="ml-4 mr-2 h-6 w-6" />
                        <div>處理完成</div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center">
                            <CircleGauge className="ml-4 mr-2 h-6 w-6 text-yellow-500" />
                            <div className="text-yellow-500">正在處理</div>
                        </div>
                    </>
                )}
            </div>
        ),
    },
]



const UpdateTable = ({ initialAreas = [] }: { initialAreas: Area[] }) => {
    const [areas, setAreas] = useState<Area[]>(initialAreas);
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'alertTime', desc: true }, // 初始化时按照 'orderTime' 列倒序排序
    ]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const [sheetMessage, setSheetMessage] = React.useState('')
    const [showStatusBar, setShowStatusBar] = React.useState(true)
    const [showActivityBar, setShowActivityBar] = React.useState(true)
    const [showActivityBaring, setShowActivityBaring] = React.useState(true)

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/notify`);
            const result = await response.json();
            setAreas(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const table = useReactTable({
        data: areas,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 1000000, // 使用一个非常大的值来表示不限制行数
            },
        },
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        meta: {
            updateSheetMessage: setSheetMessage,
        },
    })
    
    useEffect(() => {
        const interval = setInterval(fetchData, 1000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="查詢桌號 ..."
                    value={(table.getColumn('tableNumber')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('tableNumber')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    <SheetNotify />
                    <Dropdown showStatusBar={showStatusBar} 
                              setShowStatusBar={setShowStatusBar} 
                              showActivityBar={showActivityBar} 
                              setShowActivityBar={setShowActivityBar}
                              showActivityBaring={showActivityBaring}
                              setShowActivityBaring={setShowActivityBaring}
                               />
                </div>
            </div>
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
                                                : flexRender( header.column.columnDef.header, header.getContext() )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table
                                .getRowModel()
                                .rows.filter((row) => {
                                    const state = row.original.state
                                    return (
                                        (showStatusBar && state === '已處理') ||
                                        (showActivityBar && state === '待處理') ||
                                        (showActivityBaring && state === '處理中')
                                    )
                                })
                                .map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={ row.getIsSelected() && 'selected' } >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender( cell.column.columnDef.cell, cell.getContext() )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center" >
                                    沒有此筆訂單名稱
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default UpdateTable;

