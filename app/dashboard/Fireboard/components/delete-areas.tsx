'use client'
import React, { useState } from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export type Area = {
    id: number
}

async function deleteAreas(id: number): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/delete-table-areas`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        }
    )
}

const DeleteAreas: React.FC<Area> = ({id}) => {

    
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white">
                    刪除區域
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>
                    你確定要刪除此區域嗎?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    此操作無法復原。這將永久刪除您的資料，並從我們的伺服器中刪除您的數據。
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        取消
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteAreas( id ) }>
                        確認
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>        
    )
}

export default DeleteAreas