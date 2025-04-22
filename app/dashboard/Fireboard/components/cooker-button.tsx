'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import cookerImage from '../devicePhoto/cooker.png'
import FormCookers from './form-cookers'

interface Cookers {
    areas_id: number
    tableNumber: string
    maxCookers: number
}

const CookerButton: React.FC<Cookers> = ({
    areas_id,
    tableNumber,
    maxCookers,
}) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="rounded-lg w-30 h-40 flex flex-col" >
                    <Image src={cookerImage} alt="電磁爐" width={100} />
                    <div className="pt-2 font-bold text-base">
                        電磁爐
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <FormCookers areas_id={areas_id} tableNumber={tableNumber} maxCookers={maxCookers}/>
            </DialogContent>
        </Dialog>
    )
}

export default CookerButton