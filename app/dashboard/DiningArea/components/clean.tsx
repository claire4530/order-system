'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

async function updateTableState(
    newState: string, orderNumber: string, startTime: string, notify: string, remark: string, tableNumber: string
): Promise<{ success: boolean; message: string }> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    try {
        const response: Response = await fetch(`${apiUrl}/api/edit-table`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ newState, orderNumber, startTime, notify, remark, tableNumber }),
        })

        const result: any = await response.json()
        if (response.ok) {
            return { success: true, message: result.message }
        } else {
            return { success: false, message: result.message }
        }
    } catch (error) {
        console.error('Failed to update table state:', error)
        return { success: false, message: '更新桌號狀態失敗' }
    }
}

async function checkTableExists(tableNumber: string): Promise<boolean> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    try {
        const response: Response = await fetch(`${apiUrl}/api/areas`)
        const data: any[] = await response.json()

        return data.some(item => item.tableNumber === tableNumber)
    } catch (error) {
        console.error('Failed to fetch cooker data:', error)
        return false
    }
}

const Clean: React.FC<{}> = () => {
    const [inputTableNumber, setInputTableNumber] = useState('')
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTableNumber(e.target.value)
        setErrorMessage(null) // Reset error message when input changes
    }

    const handleSubmit = async () => {
        setErrorMessage(null)
        setSuccessMessage(null)
        const tableExists = await checkTableExists(inputTableNumber)

        if (!tableExists) {
            setErrorMessage('桌號不存在')
            return
        }

        const { success, message } = await updateTableState('清潔中', "", "", "已處理", "", inputTableNumber )
        if (success) {
            setSuccessMessage('桌號已清潔')
        } else {
            setErrorMessage(message)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" 
                    className='text-base px-6 h-[50px] bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A] transition-colors duration-200 ease-in-out'
                    onClick={() => { setSuccessMessage(null); setErrorMessage(null) }}>清潔桌子</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader className="grid gap-4">
                    <DialogTitle>請輸入需要清潔的桌號 : </DialogTitle>
                    <DialogDescription>
                        <Input
                            type="text"
                            placeholder="區域名稱..."
                            value={inputTableNumber}
                            onChange={handleInputChange}
                            className="rounded-md border border-gray-400 px-4 py-2 w-30"
                        />
                    </DialogDescription>
                </DialogHeader>
                <div className='flex justify-between'>
                    <div>
                        {errorMessage && <div className="text-red-600 mt-2">{errorMessage}</div>}
                        {successMessage && <div className="text-green-600 mt-2">{successMessage}</div>}  
                    </div>
                    <Button type="submit" onClick={handleSubmit}>儲存</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default Clean
