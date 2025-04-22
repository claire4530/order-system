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
import Details from './details'

interface Area {
    id: number
    tableNumber: string
    orderNumber: string
    orderTime: string
    content: string
    payment: number
    area_id: number
}
const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString();
};

export const columns: ColumnDef<Area>[] = [
    {
        accessorKey: 'orderTime',
        header: ({ column }) => {
            return (
                <Button
                    className=""
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    日期
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center ml-4">
                {formatDate(row.getValue('orderTime'))}
            </div>
        ),
    },
    {
        accessorKey: 'orderNumber',
        header: '訂單編號',
        cell: ({ row }) => (
            <div className="">{row.getValue('orderNumber')}</div>
        ),
    },
    {
        accessorKey: 'tableNumber',
        header: ({ column }) => {
            return (
                <Button
                    className=""
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    桌號
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center ml-4">
                {(row.getValue('tableNumber') as string).length > 10 
                    ? (row.getValue('tableNumber') as string).slice(0, 10) + '...' 
                    : row.getValue('tableNumber')}
            </div>
        ),
    },
    {
        accessorKey: 'payment',
        header: () => <div className="">價錢</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue('payment'))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
            }).format(amount)

            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: 'content',
        header: () => <div className="text-left">訂單明細</div>,
        cell: ({ row }) => {
            const content = row.getValue('content')

            return (
                <Details id={row.original.id}/>
            )
        },
    },
]



const UpdateTable = ({ initialAreas = [] }: { initialAreas: Area[] }) => {
    const [areas, setAreas] = useState<Area[]>(initialAreas);
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'orderTime', desc: true }, // 初始化时按照 'orderTime' 列倒序排序
    ]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
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
    })
    
    useEffect(() => {
        const interval = setInterval(fetchData, 1000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center py-4">
                <Input
                    placeholder="查詢訂單編號歷史紀錄..."
                    value={(table.getColumn('orderNumber')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('orderNumber')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
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
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
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

