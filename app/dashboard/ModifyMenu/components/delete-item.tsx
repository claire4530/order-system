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

export type Item = {
    id: number
}

async function deleteItems(id: number): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/delete-items`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        }
    )
}

const DeleteItems: React.FC<Item> = ({id}) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                    刪除菜品
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>
                    你確定要刪除此菜品嗎?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    此操作無法復原。這將永久刪除您的資料，並從我們的伺服器中刪除您的數據。
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        取消
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteItems( id ) }>
                        確認
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>        
    )
}

export default DeleteItems