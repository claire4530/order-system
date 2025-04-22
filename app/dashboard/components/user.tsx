'use client'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TriangleAlert, SquareCheck } from 'lucide-react'
import { PencilIcon } from '@heroicons/react/24/outline'

interface UserChangeProps {
    initialStoreName: string
    initialAccount: string
    initialPassword: string
    onUpdate: (storeName: string, account: string, password: string) => void
}

async function editUser(storeName:string, account: string, password: string): Promise<void> {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    try {
        await fetch(`${apiUrl}/api/edit-user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ storeName, account, password }),
        })
    } catch (error) {
        console.error('Error editing user:', error)
        throw new Error('Failed to update user')
    }
}

export const UserChange: React.FC<UserChangeProps> = ({
    initialStoreName,
    initialAccount,
    initialPassword,
    onUpdate
}) => {
    const [areaName, setAreaName] = useState(initialStoreName)
    const [areaAccount, setAreaAccount] = useState(initialAccount)
    const [areaPassword, setAreaPassword] = useState(initialPassword)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    // 使用 useEffect 监听 props 的变化来更新 state
    useEffect(() => {
        setAreaName(initialStoreName)
        setAreaAccount(initialAccount)
        setAreaPassword(initialPassword)
    }, [initialStoreName, initialAccount, initialPassword])

    const handleAreaNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaName(e.target.value)
    }

    const handleAreaAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaAccount(e.target.value)
    }

    const handleAreaPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAreaPassword(e.target.value)
    }

    const handleContinue = async () => {
        setErrorMessage(null)
        setSuccessMessage(null)

        if (areaName === '') {
            setErrorMessage("名稱不能為空")
        } else if (areaPassword === '') {
            setErrorMessage("密碼不能為空")
        } else {
            try {
                await editUser(areaName, areaAccount, areaPassword)
                setSuccessMessage("修改成功")
                onUpdate(areaName, areaAccount, areaPassword)
            } catch {
                setErrorMessage("修改失敗，請稍後再試")
            }
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="rounded-full">
                    <PencilIcon className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className='w-[400px]'>
                <DialogHeader className="gap-6">
                    <DialogTitle>修改店鋪名稱</DialogTitle>
                    <DialogDescription>
                        <Input
                            type="text"
                            placeholder="modify.."
                            value={areaName}
                            onChange={handleAreaNameChange}
                            className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                        />
                    </DialogDescription>
                    <DialogTitle>修改帳號名稱</DialogTitle>
                    <DialogDescription>
                        <Input
                            type="text"
                            placeholder="modify.."
                            value={areaAccount}
                            onChange={handleAreaAccountChange}
                            className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                        />
                    </DialogDescription>
                    <DialogTitle>修改帳號密碼</DialogTitle>
                    <DialogDescription>
                        <Input
                            type="text"
                            placeholder="modify.."
                            value={areaPassword}
                            onChange={handleAreaPasswordChange}
                            className="mb-4 rounded-md border border-gray-300 px-4 py-2"
                        />
                    </DialogDescription>
                </DialogHeader>
                <div className='flex justify-between'>
                    <div>
                        {errorMessage && <div className="text-red-500 flex gap-2 mt-2"><TriangleAlert />{errorMessage}</div>}
                        {successMessage && <div className="text-green-600 flex gap-2 mt-2"><SquareCheck /> {successMessage}</div>}
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit" className="w-30">儲存</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogTitle>
                                你確定要修改嗎?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                此操作無法復原。這將永久刪除您的舊資料，並從我們的伺服器中刪除您的數據。
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel>
                                    取消
                                </AlertDialogCancel>
                                <AlertDialogAction  onClick={handleContinue}>
                                    確認
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>    
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default UserChange
