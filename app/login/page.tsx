'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
    
interface PowerUsage {
    account: string
    password: string
}

export default function Page() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [powerUsageData, setPowerUsageData] = useState<PowerUsage[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    
    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/business`);
            const result = await response.json();

            setPowerUsageData(result);
            console.log('Data fetched:', result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleLogin = () => {
        // 假設登入成功
        if (username === powerUsageData[0].account && password === powerUsageData[0].password) {
            console.log('Login successful')
            location.href = '/dashboard' //跳轉首頁
        } else {
            // 登入失敗
            setError('錯誤的帳號或密碼')
        }
    }

    useEffect(() => {
        fetchData();
        // const intervalId = setInterval(fetchData, 3000); // 每三秒抓取一次資料

        // return () => clearInterval(intervalId); // 清除定時器
    }, [apiUrl]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#fdf5e5]">
            <Card className="w-[320px]">
                <CardHeader>
                    <CardTitle className="text-center text-xl">登入系統</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    {/* {error && <div className="h-[24px] text-center text-red-500">{error}</div>} */}
                    
                    <label className="w-full text-left font-semibold">帳號</label>
                    <Input
                        type="text"
                        placeholder="輸入帳號"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                    />
                    
                    <label className="w-full text-left font-semibold">密碼</label>
                    <Input
                        type="password"
                        placeholder="輸入密碼"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-4 py-2"
                    />
                    <div className="h-[24px] text-center text-red-500">
                        {error && <p>{error}</p>}
                    </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        onClick={handleLogin}
                        className="w-full rounded-md font-bold bg-[#657157] px-6 py-3 text-white hover:bg-[#48513e]"
                    >
                        登入
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
