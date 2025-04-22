// components/UpdateTable.tsx
"use client";

import React, { use, useEffect, useState } from 'react';
import Table from './table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Notify from './notify'

export type Payment = {
    id: number;
    state: '用餐中' | '清潔中' | '空桌' | '已預定';
    orderNumber: string;
    startTime: string;
    remainingMealTime: number;
    totalMealTime: number;
    tableNumber: string;
    cookerNumber: number;
    seats: number;
    notify: string;
    remark: string;
    areas_id: number;
};


const UpdateTable = ({ initialAreas }: { initialAreas: Payment[] }) => {
    const [areas, setAreas] = useState<Payment[]>(initialAreas);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const areasArray = Array.isArray(areas) ? areas : [];

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/areas`);
            const result = await response.json();
            setAreas(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchData, 1000); 
        return () => clearInterval(interval);
    }, []);

    // useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <div className="flex flex-wrap gap-2 gap-y-6">
            <div className='h-full w-[1200px] p-6 flex flex-wrap gap-7 rounded-lg '> 
                {areasArray.map((item, index) => (
                    <div key={index} className='flex bg-white rounded-lg h-26 w-54 shadow-md font-semibold '>
                        <div>
                            {item.notify === '已處理' ? (
                                <div className='rounded-l-lg px-4 py-6 h-20 w-16 bg-[#c2b09f] text-white font-semibold hover:text-white hover:bg-[#c79d77]'>
                                    <Notify tableNumber={item.tableNumber} areas_id={item.areas_id} state={item.notify} />
                                </div>
                            ) : (
                                <div className='rounded-l-lg px-4 py-6 h-20 w-16 bg-[#c4996f] text-white font-semibold hover:text-white hover:bg-[#d0975d]'>
                                    <Notify tableNumber={item.tableNumber} areas_id={item.areas_id} state={item.notify} />
                                </div>
                            )}
                        </div>
                        <Dialog>
                            <DialogTrigger className='rounded-r-lg tracking-wider h-20 w-36 bg-[#7e604a] text-white font-semibold hover:text-white hover:bg-[#664233]'>
                                <div className="flex items-start px-10 text-lg">
                                    {item.tableNumber.length > 10 
                                        ? item.tableNumber.slice(0, 10) + '...' 
                                        : item.tableNumber}
                                </div>
                            </DialogTrigger>
                            <DialogContent className='bg-gray-100'>
                                <div className="px-6 py-2">
                                    <Table key={index} {...item} fetchTableData={fetchData} areas_id={item.areas_id} />
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default UpdateTable;

