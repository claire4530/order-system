'use client'
import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import FormSockets from './form-sockets'
import TVImage from '../devicePhoto/TV.png'

interface Sockets {
    tableNumber: string
    areas_id: number
    maxSockets: number
}

const SocketButton: React.FC<Sockets> = ({
    tableNumber,
    areas_id,
    maxSockets,
}) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="rounded-lg w-30 h-40 flex flex-col" >
                    <Image src={TVImage} alt="插座" width={100} />
                    <div className="pt-2 font-bold text-base">
                        插座
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <FormSockets areas_id={areas_id} tableNumber={tableNumber} maxSockets={maxSockets} />
            </DialogContent>
        </Dialog>
    )
}

export default SocketButton