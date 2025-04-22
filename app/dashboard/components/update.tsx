'use client'
import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import UserChange from './user'

interface Business {
    storeName: string
    account: string
    password: string
}

export const Update: React.FC = () => {
    const [areaName, setAreaName] = useState<string>('')
    const [account, setAccount] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/business`)
            const result: Business[] = await response.json()
            if (result.length > 0) {
                const { storeName, account, password } = result[0] // 假設只有一組資料
                setAreaName(storeName)
                setAccount(account)
                setPassword(password)
            }
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    // 更新回调
    const handleUpdate = (updatedName: string, updatedAccount: string, updatedPassword: string) => {
        setAreaName(updatedName)
        setAccount(updatedAccount)
        setPassword(updatedPassword)
    }

    useEffect(() => {
        fetchData()
    }, [apiUrl])

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between'>
                    <CardTitle>個人資料</CardTitle>
                    {/* 将初始值传递给 UserChange */}
                    <UserChange
                        initialStoreName={areaName}
                        initialAccount={account}
                        initialPassword={password}
                        onUpdate={handleUpdate}
                    />
                </div>
            </CardHeader>
            <CardContent>
                <p>店鋪名稱 : {areaName}</p>
            </CardContent>
            <CardContent>
                <p>帳號名稱 : {account}</p>
            </CardContent>
            <CardContent>
                <p>帳號密碼 : {password}</p>
            </CardContent>
        </Card>
    )
}

export default Update

