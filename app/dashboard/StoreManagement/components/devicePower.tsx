import * as React from 'react'
import { PieChart, Pie, Tooltip, Cell } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { format, startOfDay, parseISO } from 'date-fns'

interface PowerUsage {
    id: number
    powerName: string
    powerTime: string
    watt: number
}

const groupByDate = (data: PowerUsage[]) => {
    const result: { [key: string]: number } = {};
    data.forEach(({ powerName, powerTime, watt }) => {
        const date = format(startOfDay(parseISO(powerTime)), 'yyyy-MM-dd');
        const key = `${date}-${powerName}`;
        result[key] = (result[key] || 0) + watt;
    });
    return result;
};

export function DevicePowerDay() {

    const [powerUsageData, setPowerUsageData] = React.useState<PowerUsage[]>([]);
    const [dailyData, setDailyData] = useState<{ name: string; value: number }[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/power-usage`);
            const result = await response.json();

            setPowerUsageData(result);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const sortedData = [...powerUsageData].sort((a, b) => b.watt - a.watt)

    
    // useEffect(() => {
    //     fetchData();
    //     const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料
    //     return () => clearInterval(intervalId); // 清除定時器
    // }, [apiUrl]);

    // useEffect(() => {
    //     if (powerUsageData.length > 0) {
    //         const groupedData = groupByDate(powerUsageData);
    //         const formattedData = Object.entries(groupedData).map(([name, value]) => ({ name, value }));
    //         setDailyData(formattedData);
    //     }
    // }, [powerUsageData]);

    return (
        <>
            <div className="flex ">
                <PieChart width={340} height={340}>
                    <Pie
                        data={dailyData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {dailyData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name) => [
                            `${(value / dailyData.reduce((acc, cur) => acc + cur.value, 0) * 100).toFixed(2)}%`,
                            name,
                        ]}
                    />
                </PieChart>
                <div className="flex ">
                    <div className="space-y-8">
                        {dailyData.slice(0, 5).map((item) => (
                            <div key={item.name} className="flex items-center">
                                <Avatar className="h-9 w-9">
                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4 flex gap-4">
                                    <p className="text-base font-medium ">{item.name} :</p>
                                    <div className="font-medium">
                                        {item.value}
                                        <span className="ml-1 text-sm font-bold">kw</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-grow justify-end ">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">查看更多</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>全部電磁爐用電情況</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[320px] w-[450px] p-4">
                                <div className="space-y-8">
                                        {dailyData.map((item) => (
                                            <div key={item.name} className="flex items-center">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarFallback>{item.name.slice(-1)}</AvatarFallback>
                                                </Avatar>
                                                <div className="ml-4 flex gap-4">
                                                    <p className="text-base font-medium ">{item.name} :</p>
                                                    <div className="font-medium">
                                                        {item.value}
                                                        <span className="ml-1 text-sm font-bold">kw</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export function DevicePowerMonth() {
    const data = [
        { id: 1, value: 1003, name: '電磁爐編號一' },
        { id: 2, value: 1245, name: '電磁爐編號二' },
        { id: 3, value: 4209, name: '電磁爐編號三' },
        { id: 4, value: 2700, name: '電磁爐編號四' },
        { id: 5, value: 2580, name: '電磁爐編號五' },
        { id: 6, value: 400, name: '電磁爐編號六' },
        { id: 7, value: 8290, name: '電磁爐編號七' },
        { id: 8, value: 270, name: '電磁爐編號八' },
        { id: 9, value: 680, name: '電磁爐編號九' },
        { id: 10, value: 5120, name: '電磁爐編號十' },
    ]
    const sortedData = [...data].sort((a, b) => b.value - a.value)
    return (
        <>
            <div className="flex ">
                <PieChart width={340} height={340}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={`#${Math.floor(
                                    Math.random() * 16777215
                                ).toString(16)}`}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name) => [
                            `${(
                                (value /
                                    data.reduce(
                                        (acc, cur) => acc + cur.value,
                                        0
                                    )) *
                                100
                            ).toFixed(2)}%`,
                            name,
                        ]}
                    />
                </PieChart>
                <div className="flex ">
                    <div className="space-y-8">
                        {data
                            .sort((a, b) => b.value - a.value)
                            .slice(0, 5)
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={`/avatars/${item.id}.png`}
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>
                                            {item.name.slice(-1)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 flex gap-4">
                                        <p className="text-base font-medium ">
                                            {item.name} :
                                        </p>
                                        <div className="font-medium">
                                            {item.value}
                                            <span className="ml-1 text-sm font-bold">
                                                kw
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-grow justify-end ">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">查看更多</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>全部電磁爐用電情況</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[320px] w-[450px] p-4">
                                    <div className="space-y-8">
                                        {data
                                            .sort((a, b) => b.value - a.value)
                                            .map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center"
                                                >
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage
                                                            src={`/avatars/${item.id}.png`}
                                                            alt="Avatar"
                                                        />
                                                        <AvatarFallback>
                                                            {item.name.slice(
                                                                -1
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-4 flex gap-4">
                                                        <p className="text-base font-medium ">
                                                            {item.name} :
                                                        </p>
                                                        <div className="font-medium">
                                                            {item.value}
                                                            <span className="ml-1 text-sm font-bold">
                                                                kw
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </ScrollArea>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export function DevicePowerYear() {
    const data = [
        { id: 1, value: 19003, name: '電磁爐編號一' },
        { id: 2, value: 1245, name: '電磁爐編號二' },
        { id: 3, value: 42909, name: '電磁爐編號三' },
        { id: 4, value: 72700, name: '電磁爐編號四' },
        { id: 5, value: 2580, name: '電磁爐編號五' },
        { id: 6, value: 400, name: '電磁爐編號六' },
        { id: 7, value: 18290, name: '電磁爐編號七' },
        { id: 8, value: 2790, name: '電磁爐編號八' },
        { id: 9, value: 6890, name: '電磁爐編號九' },
        { id: 10, value: 75120, name: '電磁爐編號十' },
    ]
    const sortedData = [...data].sort((a, b) => b.value - a.value)
    return (
        <>
            <div className="flex ">
                <PieChart width={340} height={340}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={`#${Math.floor(
                                    Math.random() * 16777215
                                ).toString(16)}`}
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number, name) => [
                            `${(
                                (value /
                                    data.reduce(
                                        (acc, cur) => acc + cur.value,
                                        0
                                    )) *
                                100
                            ).toFixed(2)}%`,
                            name,
                        ]}
                    />
                </PieChart>
                <div className="flex ">
                    <div className="space-y-8">
                        {data
                            .sort((a, b) => b.value - a.value)
                            .slice(0, 5)
                            .map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center"
                                >
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage
                                            src={`/avatars/${item.id}.png`}
                                            alt="Avatar"
                                        />
                                        <AvatarFallback>
                                            {item.name.slice(-1)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 flex gap-4">
                                        <p className="text-base font-medium ">
                                            {item.name} :
                                        </p>
                                        <div className="font-medium">
                                            {item.value}
                                            <span className="ml-1 text-sm font-bold">
                                                kw
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-grow justify-end ">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">查看更多</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>全部電磁爐用電情況</DialogTitle>
                            <DialogDescription>
                                <ScrollArea className="h-[320px] w-[450px] p-4">
                                    <div className="space-y-8">
                                        {data
                                            .sort((a, b) => b.value - a.value)
                                            .map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="flex items-center"
                                                >
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage
                                                            src={`/avatars/${item.id}.png`}
                                                            alt="Avatar"
                                                        />
                                                        <AvatarFallback>
                                                            {item.name.slice(
                                                                -1
                                                            )}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="ml-4 flex gap-4">
                                                        <p className="text-base font-medium ">
                                                            {item.name} :
                                                        </p>
                                                        <div className="font-medium">
                                                            {item.value}
                                                            <span className="ml-1 text-sm font-bold">
                                                                kw
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </ScrollArea>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}
