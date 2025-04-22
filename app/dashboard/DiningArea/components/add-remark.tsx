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
    tableNumber: string
}

interface Area {
    tableNumber: string
    remark: string
}

const AddRemark: React.FC<OrderDetailsProps> = ({ children, tableNumber }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[full]">
                <DialogHeader className=''>
                    <DialogTitle></DialogTitle>
                    <FormMenu tableNumber={tableNumber}/>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default AddRemark