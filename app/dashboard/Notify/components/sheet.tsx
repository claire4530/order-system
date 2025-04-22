import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from "@/components/ui/button"
import { ScrollArea } from '@/components/ui/scroll-area'
import React, { useEffect, useState } from 'react'
import FinishEvent from './finishEvent'

interface Area {
    id: number
    tableNumber: string
    state: string
    alertTime: string
    event: string
    stateButton: string
    area_id: number
}

const SheetNotify = () => {

    const [areas, setAreas] = useState<Area[]>();
    const areasArray = Array.isArray(areas) ? areas : [];

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
    
    useEffect(() => {
        const interval = setInterval(fetchData, 1000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white px-8">通知欄</Button>
            </SheetTrigger>
            <SheetContent>
                    <SheetTitle className="px-4 py-2 items-center">
                        待處理通知
                    </SheetTitle>
                    <SheetDescription>
                        <ScrollArea className="h-[600px]">
                            {areasArray.map((msg, index) => (
                                    <div key={index}>
                                        {msg.state === '處理中' && (
                                            <div className="grid gap-2 justify-right px-4 py-6 items-center rounded-md hover:bg-slate-100 text-black text-base font-normal ">
                                                <div className="font-bold text-lg">
                                                    {msg.tableNumber}
                                                </div>
                                                <div className="font-normal">
                                                    正在前往{msg.tableNumber}
                                                    處理中...
                                                </div>
                                                <div className="flex justify-end">
                                                    {msg && (
                                                        <FinishEvent id={msg.id} tableNumber={msg.tableNumber}/>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                        </ScrollArea>
                    </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}

export default SheetNotify