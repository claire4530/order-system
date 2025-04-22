import { ReactNode } from 'react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import FormMenu from './form'

interface OrderDetailsProps {
    children: ReactNode
}

interface Area {
    tableNumber: string
    state: string
    seats: number
}

const AddRemark: React.FC<OrderDetailsProps> = ({ children }) => {

    const [areas, setAreas] = useState<Area[]>([]);
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
        fetchData(); // 初始加载数据
        const interval = setInterval(fetchData, 1000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[full]">
                <DialogHeader className=''>
                    <DialogTitle></DialogTitle>
                    <FormMenu areas={areas}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddRemark