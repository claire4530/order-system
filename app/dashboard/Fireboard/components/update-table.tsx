// components/UpdateTable.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Table from './table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar  } from "@/components/ui/scroll-area"
import EditArea from './edit-area-name'

interface Item {
    cookerNumber: string
    fireStatus: number
    switchOn: boolean
    type: 'cooker' | 'socket'
    broken: number
    tableNumber: string
    state: '關閉' | '開啟' | '錯誤'
    error: string
    reason: string
    solution: string
}

interface Payment {
    id: number
    tableNumber: string
    items: Item[]
    seats: number
    cookerNumber: number
    socketNumber: number
};


const UpdateTable = ({ initialAreas }: { initialAreas: Payment[] }) => {
    const [areas, setAreas] = useState<Payment[]>(initialAreas);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

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

    return (
        <Tabs defaultValue="area-46" className="pt-10">
            {/* <ScrollArea className="h-[80px] w-[1180px] whitespace-nowrap flex space-x-2 overflow-x-auto"> */}
                <TabsList className="h-full grid grid-cols-5">
                    {Array.isArray(areas) && areas.map((area, index: number) => (
                        <TabsTrigger
                            key={area.id}
                            value={`area-${area.id}`}
                            className="h-[50px] min-w-[12rem]"
                        >
                            <div className='grid grid-cols-9 w-full'>
                                <div className="col-span-5 flex justify-start">
                                    <p className="font-medium text-base truncate ...">{area.tableNumber}</p>
                                </div>
                                <div className="col-span-2 text-xs mt-1">    
                                    ( {area.seats}人座 )
                                </div>
                                <div className='col-span-2 mt-1'>
                                    <EditArea key={index} {...area}/>
                                </div>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
                {/* <ScrollBar orientation="horizontal" />
            </ScrollArea> */}
            {Array.isArray(areas) && areas.map((area, index) => (
                <TabsContent key={area.id} value={`area-${area.id}`}>
                    <Table id={area.id} tableNumber={area.tableNumber} maxCookers={area.cookerNumber} maxSockets={area.socketNumber}/>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default UpdateTable;

