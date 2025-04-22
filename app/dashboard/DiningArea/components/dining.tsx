import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import OrderDetails from './order-details'
import dayjs from 'dayjs';
import Notify from './notify'

interface DiningProps {
    tableNumber: string;
    orderNumber: string;
    startTime: string;
    remainingMealTime: number;
    totalMealTime: number;
    seats: number;
    areas_id: number;
    notify: string;
}

const Dining: React.FC<DiningProps> = ({
    tableNumber,
    orderNumber,
    startTime,
    remainingMealTime,
    totalMealTime,
    seats,
    areas_id,
    notify
}) => {
    const [remainingTime, setRemainingTime] = useState(remainingMealTime);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const updateTable = async ( newState: string, orderNumber: string, startTime: string, notify: string, remark: string, tableNumber: string ) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-table`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ newState, orderNumber, startTime, notify, remark, tableNumber }),
            });
            
        } catch (error) {
            console.error('Error updating table state:', error);
        }
    };
    
    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();
            const start = dayjs(startTime);
            const elapsedMinutes = now.diff(start, 'minute');
            const updatedRemainingTime = remainingMealTime - elapsedMinutes;
            setRemainingTime(Math.max(updatedRemainingTime, 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, remainingMealTime]);

    return (
        <Card className="">
            <div className="h-[380px]">
                <CardHeader className="flex gap-2">
                    <div className="flex items-center h-[56px]">
                        <CardTitle className="w-80">
                            {tableNumber}
                            <span className="text-base ml-4">({seats}人座)</span>
                        </CardTitle>
                        <Notify tableNumber={tableNumber} areas_id={areas_id} state={notify} />
                    </div>
                    <CardDescription className="text-base text-black">
                        狀態: 用餐中
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex h-[240px] flex-col justify-between">
                    <div className="flex flex-col gap-6 text-sm ">
                        <div>訂單編號: {orderNumber}</div>
                        <div className="flex items-baseline gap-2">
                            剩餘用餐時間:&nbsp;{remainingTime}
                            <span className="text-xs font-bold">min</span>
                        </div>
                        <div>
                            本日總用餐時間:{' '}
                            {Math.floor(totalMealTime / 60)}{' '}
                            <span className="text-xs font-bold">h&nbsp;</span>
                            {totalMealTime % 60}{' '}
                            <span className="text-xs font-bold">min</span>
                        </div>
                        {/* <div>備註: {remark}</div> */}
                    </div>
                    <div className="flex items-center justify-between ">
                        <OrderDetails orderNumber={orderNumber}>
                            <Button variant="outline" className="px-6 py-2 bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A] transition-colors duration-200 ease-in-out">訂單明細</Button>
                        </OrderDetails>
                        <Button variant="outline" className="ml-auto px-8 py-2 bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white" onClick={() => updateTable("清潔中", "", "", "已處理", "", tableNumber)}>
                            結帳
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default Dining;
