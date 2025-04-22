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
import FormMenu from './form-menu-items'

interface menuProps {
    menu_id: number
}

const AddMenuItems: React.FC<menuProps> = ({
    menu_id,
}) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mr-2 bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A]">
                    新增菜品
                </Button>
            </DialogTrigger>
            <DialogContent>
                <FormMenu menu_id={menu_id}/>
            </DialogContent>
        </Dialog>
    )
}

export default AddMenuItems