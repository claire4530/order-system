'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { CookingPot, Plug } from 'lucide-react'
import { CopyPlus, SmartphoneCharging, CircleX } from 'lucide-react'
import DeleteAreas from './delete-areas'
import AddMenuItems from './add-menu-items'
import EditMenuItems from './edit-menu-items'
// import AreaSocketDevices from './area-socket-devices'
import Cooker from '@/app/dashboard/DiningArea/components/cooker'
import { Utensils } from 'lucide-react'

interface Area {
    id: number
    name: string
}

export type MenuPayment = {
    id: number
    menu_id: number
    name: string
    description: string
    money: number
    switchOn: boolean
    image: string
}

const Table: React.FC<Area> = ({
    id,
    name,
}) => {

    const [menuProps, setMenuProps] = useState<MenuPayment[]>([])

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    const fetchMenuProps = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/menu-items`);
            const data: MenuPayment[] = await res.json();
            setMenuProps(data);
        } catch (error) {
            console.error('Failed to fetch menu data:', error);
        }
    };

    useEffect(() => {
        fetchMenuProps();
        const interval = setInterval(() => {
            fetchMenuProps();
        }, 1000); 

        return () => clearInterval(interval); 
    }, [apiUrl]);

    const filteredCookerProps = Array.isArray(menuProps) ? menuProps.filter(menu => menu.menu_id === id) : [];

    return (
        <div className="w-full">
            <Card>
                <CardHeader className="gap-3">
                    <CardTitle className="font-medium text-xl flex justify-between">
                        <div className="flex gap-2">
                            <Utensils />
                            {name}
                        </div>
                        <div className="flex gap-4 justify-end">
                            <AddMenuItems menu_id={id} />
                            <DeleteAreas name={name} />
                        </div>
                    </CardTitle>
                    <div className="border-b "></div>
                </CardHeader>
                <CardContent className="flex gap-14">
                <div className="grid grid-cols-6 gap-8">
                    {Array.isArray(filteredCookerProps) && filteredCookerProps.map((item, index) => (
                        <div className="">
                            <EditMenuItems
                                key={index}
                                {...item}
                            />
                        </div>
                    ))}
                </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default Table
