// pages/tabs-demo.js
import React, { useEffect, useState } from 'react'
import { Search } from './components/search'
import Clean from './components/clean'
import UpdateTable from './components/update-table';
import {
    UserGroupIcon,
} from '@heroicons/react/24/outline'

export type Payment = {
    id: number
    state: '用餐中' | '清潔中' | '空桌' | '已預定'
    orderNumber: string
    startTime: string
    remainingMealTime: number
    totalMealTime: number
    tableNumber: string
    cookerNumber: number
    seats: number
    notify: string
    remark: string
    areas_id: number
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const fetchAreas = async (): Promise<Payment[]> => {
    const response = await fetch(`${apiUrl}/api/areas`);
    return await response.json();
};


export async function TabsDemo() {

    const initialAreas = await fetchAreas();
    
    return (
        <div className="hidden flex-col md:flex ">
            <div className='bg-white rounded-3xl p-8 '>
                <div className="flex h-16 items-center px-4 gap-4 ">
                    <UserGroupIcon className="h-8 w-8 font-semibold" />
                    <h2 className="text-3xl font-bold tracking-tight flex-grow">
                        用餐區域
                    </h2>
                    <div className="ml-auto flex items-center space-x-4">
                        <Clean />
                    </div>
                </div>
                <div className="border-b p-2"></div>
                <div className="flex-1 space-y-4 p-8 pt-6 ">
                    <UpdateTable initialAreas={initialAreas} />
                </div>
            </div>
        </div>
    )
}

export default TabsDemo