// components/UpdateTable.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Table from './table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea, ScrollBar  } from "@/components/ui/scroll-area"
import EditArea from './edit-area-name'

interface Item {
    id: number
    name: string
    description: string
    money: number
    switchOn: boolean
}

interface Area {
    id: number
    name: string
    items: Item[]
}


const UpdateTable = ({ initialAreas = [] }: { initialAreas: Area[] }) => {
    const [areas, setAreas] = useState<Area[]>(initialAreas);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/menu`);
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
        <Tabs defaultValue="area-15" className="pt-10">
                <TabsList className="h-full grid grid-cols-6">
                    {Array.isArray(areas) && areas.map((area, index: number) => (
                        <TabsTrigger
                            key={area.id}
                            value={`area-${area.id}`}
                            className="h-[50px] min-w-[8rem]"
                        >
                            <div className='grid grid-cols-6 w-full'>
                                <div className="flex justify-start col-span-5 font-medium text-base truncate ...">
                                    <p className="font-medium text-base truncate ...">{area.name}</p>
                                </div>
                                <div className='col-span-1'>
                                    <EditArea key={index} {...area}/>
                                </div>
                            </div>
                        </TabsTrigger>
                    ))}
                </TabsList>
            {Array.isArray(areas) && areas.map((area, index) => (
                <TabsContent key={area.id} value={`area-${area.id}`}>
                    <Table id={area.id} name={area.name}/>
                </TabsContent>
            ))}
        </Tabs> 
    );
};

export default UpdateTable;

