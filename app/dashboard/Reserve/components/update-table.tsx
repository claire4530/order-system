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
import AddRemark from './add-remark'

interface Area {
    reserveTime: string
    name: string
    people: number
    tableNumber: string
    phoneNumber: string
    remark: string
}
const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString();
};

export const columns: ColumnDef<Area>[] = [
    {
        accessorKey: 'reserveTime',
        header: ({ column }) => {
            return (
                <Button
                    className=""
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    預約時間
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="flex items-center ml-4">
                {formatDate(row.getValue('reserveTime'))}
            </div>
        ),
    },
    {
        accessorKey: 'name',
        header: '顧客名稱',
        cell: ({ row }) => (
            <div className="">{row.getValue('name')}</div>
        ),
    },
    {
        accessorKey: 'people',
        header: '到場人數',
        cell: ({ row }) => (
            <div className="">{row.getValue('people')}</div>
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
                    預定桌號
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
        accessorKey: 'phoneNumber',
        header: '連絡電話',
        cell: ({ row }) => (
            <div className="">{row.getValue('phoneNumber')}</div>
        ),
    },
    {
        accessorKey: 'remark',
        header: '備註',
        cell: ({ row }) => (
            <div className="">{row.getValue('remark')}</div>
        ),
    },
]



const UpdateTable = ({ initialAreas = [] }: { initialAreas: Area[] }) => {
    const [areas, setAreas] = useState<Area[]>(initialAreas);
    const [sorting, setSorting] = React.useState<SortingState>([
        { id: 'reserveTime', desc: true }, // 初始化时按照 'orderTime' 列倒序排序
    ]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/reserve`);
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
                    placeholder="查詢連絡電話..."
                    value={(table.getColumn('phoneNumber')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('phoneNumber')?.setFilterValue(event.target.value)}
                    className="max-w-sm"
                />
                <AddRemark>
                    <Button variant="outline"
                        className="ml-auto px-8 py-2 bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white">
                        預定
                    </Button>
                </AddRemark>
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
                                    沒有此連絡電話的預約
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

