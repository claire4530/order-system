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

export type Cooker = {
    cookerNumber: string
}

async function deleteCookers(cookerNumber: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/delete-cookers`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cookerNumber }),
        }
    )
}

const DeleteCookers: React.FC<Cooker> = ({cookerNumber}) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    刪除電磁爐
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>
                    你確定要刪除此電磁爐嗎?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    此操作無法復原。這將永久刪除您的資料，並從我們的伺服器中刪除您的數據。
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        取消
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteCookers( cookerNumber ) }>
                        確認
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>        
    )
}

export default DeleteCookers