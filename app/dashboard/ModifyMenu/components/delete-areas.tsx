'use client'
import React from 'react'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

export type Area = {
    name: string
}

async function deleteAreas(name: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/delete-menu-areas`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        }
    )
}

const DeleteAreas: React.FC<Area> = ({name}) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" className="bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white">
                    刪除分類
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogTitle>
                    你確定要刪除此分類嗎?
                </AlertDialogTitle>
                <AlertDialogDescription>
                    此操作無法復原。這將永久刪除您的資料，並從我們的伺服器中刪除您的數據。
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        取消
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deleteAreas( name ) }>
                        確認
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>        
    )
}

export default DeleteAreas