import React from 'react'
import AddAreas from './components/add-areas'
import UpdateTable from './components/update-table'
import {
    FireIcon,
} from '@heroicons/react/24/outline'

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
interface Area {
    id: number
    tableNumber: string
    items: Item[]
    seats: number
    cookerNumber: number
    socketNumber: number
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const fetchAreas = async (): Promise<Area[]> => {
    const response = await fetch(`${apiUrl}/api/areas`);
    return await response.json();
};

const App: React.FC = async () => {

    const initialAreas = await fetchAreas();
    
    return (
        <div className="gap-4 ">
            <div className='bg-white rounded-3xl p-8'>
                <div className="flex h-16 items-center px-4 gap-4">
                    <FireIcon className="h-8 w-8 font-semibold" />
                    <h2 className="text-3xl font-bold tracking-tight flex-grow">
                        區域管理
                    </h2>
                    <div className="ml-auto flex items-center space-x-4">
                        <AddAreas />
                    </div>
                </div>
                <div className="border-b p-3"></div>
                <div>
                    <UpdateTable initialAreas={initialAreas} />
                </div>
            </div>
        </div>
    )
}

export default App
