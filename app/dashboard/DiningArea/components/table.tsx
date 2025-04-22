'use client'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import Cooker from './cooker'
import OrderDetails from './order-details'
import { CookingPot } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import Notify from './notify'
import EditRemark from './add-remark'
import FormMenu from './form'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import dayjs from 'dayjs'
import Dining from './dining';
import Cleaning from './cleaning';
import Available from './available';
import Reserved from './reserved';

interface OrderDetailsProps {
    tableNumber: string
    orderTime: string
}
interface TableProps {
    id: number
    state: string
    orderNumber: string
    startTime: string
    remainingMealTime: number
    totalMealTime: number
    tableNumber: string
    seats: number
    areas_id: number
    notify: string
    remark: string
}

export type PaymentFire = {
    cookerNumber: string
    state: '關閉' | '開啟' | '錯誤'
    tableNumber: string
    fireStatus: number
    error: string
    reason: string
    solution: string
    broken: number
}

const Table: React.FC<TableProps & { fetchTableData: () => void }> = ({
    state,
    orderNumber,
    startTime,
    remainingMealTime,
    totalMealTime,
    tableNumber,
    seats,
    areas_id,
    notify,
}) => {

    const [cookerProps, setCookers] = useState<PaymentFire[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    // const [orderNumber, setOrderNumber] = useState<string>(initialOrderNumber || '');

    // const generateSecureRandomString = (length = 9): string => {
    //     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    //     const array = new Uint8Array(length);
    //     crypto.getRandomValues(array);
    //     return Array.from(array, (byte) => characters[byte % characters.length]).join('');
    // };

    // const updateOrderNumber = async (tableNumber: string, newOrderNumber: string) => {
    //     try {
    //         const response = await fetch(`${apiUrl}/api/edit-order-number`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ tableNumber, orderNumber: newOrderNumber }),
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to update order number');
    //         }
    //     } catch (error) {
    //         console.error('Error updating order number:', error);
    //     }
    // };

    // useEffect(() => {
    //     const handleStateChange = async () => {
    //         if (state === '用餐中'&& initialOrderNumber === '') {
    //             const newOrderNumber = generateSecureRandomString();
    //             setOrderNumber(newOrderNumber);
    //             await updateOrderNumber(tableNumber, newOrderNumber);
    //         } 
    //         else if (state === '用餐中'&& initialOrderNumber !== '') {
    //             setOrderNumber(initialOrderNumber);
    //         }
    //         else {
    //             setOrderNumber('');
    //             await updateOrderNumber(tableNumber, '');
    //         }
    //     };

    //     handleStateChange();
    // }, [state, tableNumber]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/cooker`);
            const result = await response.json();
            setCookers(result);
            // console.log('cookerProps:', cookerProps);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const cookers = (Array.isArray(cookerProps) ? cookerProps : []).filter(
        (fireItem) => fireItem.tableNumber === tableNumber
    );

    const updateAllCookerState = async (tableNumber: string, newState: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-all-cooker-state`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, newState }),
            });
        } catch (error) {
            console.error('Error updating all cooker state:', error);
        }
    };

    const changeAllCookerState = (tableNumber: string) => {
        updateAllCookerState(tableNumber, '關閉');
    };


    const [orderCount, setOrderCount] = useState(0); // 訂單數量

    const OrderDetailsData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
            const result = await response.json();

            // 獲取當前日期
            const currentDate = dayjs().format('YYYY-MM-DD');

            // 過濾出本日且符合指定桌號的訂單
            const filteredOrders = result.filter((item: OrderDetailsProps) => {
                const isToday = dayjs(item.orderTime).format('YYYY-MM-DD') === currentDate;
                const isSameTable = item.tableNumber === tableNumber;
                return isToday && isSameTable;
            });

             // 設置訂單數量
            const orderCount = filteredOrders.length;
            const totalMealTime = orderCount * remainingMealTime;

            await updateTableTotalMealTime(tableNumber, totalMealTime);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const updateTableTotalMealTime = async (tableNumber: string, totalMealTime: number) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-table-all-meal-time`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tableNumber, totalMealTime }),
            });
        } catch (error) {
            console.error('Error updating table state:', error);
        }
    };

    const [remainingTime, setRemainingTime] = useState(remainingMealTime);

    useEffect(() => {
        const interval = setInterval(() => {
            // 計算已經過的時間（以分鐘為單位）
            const now = dayjs();
            const start = dayjs(startTime);
            const elapsedMinutes = now.diff(start, 'minute');

            // 計算剩餘時間
            const updatedRemainingTime = remainingMealTime - elapsedMinutes;

            // 如果剩餘時間小於或等於 0，顯示 0，否則顯示剩餘時間
            setRemainingTime(Math.max(updatedRemainingTime, 0));
        }, 1000); // 每秒更新一次

        return () => clearInterval(interval); // 組件卸載時清除定時器
    }, [startTime, remainingMealTime]);

    useEffect(() => {
        OrderDetailsData();
    }, []);

    useEffect(() => {
        fetchData(); // 初始加载数据
        const interval = setInterval(fetchData, 1000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        // <div className="w-[450px] h-[480px] bg-gray-200 rounded-md pl-6 pt-6"> 
        <div>
            <Tabs defaultValue="account" className="TabsRoot h-fit w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">用餐詳情</TabsTrigger>
                    <TabsTrigger value="password">電磁爐狀態</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="h-fit w-[400px]">
                    <div className="w-full">
                        {state === '用餐中' && (
                            <Dining
                                tableNumber={tableNumber}
                                orderNumber={orderNumber}
                                startTime={startTime}
                                remainingMealTime={remainingMealTime}
                                totalMealTime={totalMealTime}
                                seats={seats}
                                areas_id={areas_id}
                                notify={notify}
                            />
                        )}
                        {state === '清潔中' && (
                            <Cleaning tableNumber={tableNumber} seats={seats} totalMealTime={totalMealTime}/>
                        )}
                        {state === '空桌' && (
                            <Available tableNumber={tableNumber} seats={seats} totalMealTime={totalMealTime}/>
                        )}
                        {state === '已預定' && (
                            <Reserved tableNumber={tableNumber} seats={seats} totalMealTime={totalMealTime}/>
                        )}
                    </div>
                </TabsContent>
                <TabsContent value="password" className="h-fit w-[400px]">
                    <Card>
                        <div className="h-[380px] ">
                            <CardHeader className="flex gap-2">
                                <div className="flex items-center h-[56px]">
                                    <CardTitle className="w-80">
                                        {tableNumber}
                                        <span className="text-base ml-4">({seats}人座)</span>
                                    </CardTitle>
                                </div>
                                <CardDescription>查看電磁爐狀態</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[240px] flex flex-col justify-between">
                                <div className="space-y-5">
                                    {cookers.map((item, index) => (
                                        <Cooker
                                            key={index}
                                            {...item}
                                            index={index}
                                            databaseFireStatus={item.fireStatus}
                                            databaseState={item.state}
                                        />
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                                                >
                                                    查看錯誤訊息
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[480px]">
                                                <DialogHeader>
                                                    <DialogTitle></DialogTitle>
                                                    <DialogDescription>
                                                        <ScrollArea className="h-[320px] w-[450px] p-4">
                                                            <div>
                                                                {cookers.map((item, index) => item.broken === 1 && (
                                                                    <div key={ index }>
                                                                        <div className="gap-2 font-bold justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                            <CookingPot />
                                                                            {index + 1}號電磁爐
                                                                        </div>
                                                                        <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                            電磁爐錯誤代碼：{ item.error }
                                                                        </div>
                                                                        <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                            可能原因：{ item.reason }
                                                                        </div>
                                                                        <div className="justify-right flex px-4 py-6 h-10 items-center rounded-md text-black hover:bg-slate-100">
                                                                            處理方法：{ item.solution }
                                                                        </div>
                                                                        <Separator />
                                                                    </div>
                                                                    )
                                                                )}
                                                                {cookers.every((item) => item.broken !== 1 ) && (
                                                                    <div className="text-center">
                                                                        沒有錯誤訊息
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </ScrollArea>
                                                    </DialogDescription>
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="ml-auto px-6 py-2 bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white"
                                        onClick={() => changeAllCookerState(tableNumber) }
                                    >
                                        一鍵關閉
                                    </Button>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Table
