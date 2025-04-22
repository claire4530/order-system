import React, { useEffect, useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from "@/components/ui/button"
import { ChevronDown } from 'lucide-react'

interface ChangeDropdownProps {
    showStatusBar: boolean
    setShowStatusBar: (state: boolean) => void
    showActivityBar: boolean
    setShowActivityBar: (state: boolean) => void
    showActivityBaring: boolean
    setShowActivityBaring: (state: boolean) => void
}

const Dropdown : React.FC<ChangeDropdownProps> = ({
    showStatusBar,
    setShowStatusBar,
    showActivityBar,
    setShowActivityBar,
    showActivityBaring,
    setShowActivityBaring,
}) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A]">
                    狀態選擇
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A]">
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
                    已處理
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
                    未處理
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showActivityBaring} onCheckedChange={setShowActivityBaring}>
                    處理中
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Dropdown