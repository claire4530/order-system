import * as React from 'react'
import UpdateTable from './components/update-table'
import { CalendarDays } from 'lucide-react';

export type NotifyProps = {
    reserveTime: string
    name: string
    people: number
    tableNumber: string
    phoneNumber: string
    remark: string
}

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const fetchAreas = async (): Promise<NotifyProps[]> => {
    const response = await fetch(`${apiUrl}/api/reserve`);
    return await response.json();
};


const App: React.FC = async () => {

    const initialAreas = await fetchAreas();

    return (
        <div className="w-full ">
            <div className='bg-white rounded-3xl p-8'>
                <div className='flex items-center px-4 gap-2'>
                    <CalendarDays className="h-8 w-8 font-semibold" />
                    <h2 className="text-3xl font-bold tracking-tight flex-grow p-3">
                        預約
                    </h2>
                </div>
                <div className="border-b p-3"></div>
                <UpdateTable initialAreas={initialAreas} />
            </div>
        </div>
    )
}
export default App