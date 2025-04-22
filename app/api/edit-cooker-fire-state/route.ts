import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { cookerNumber, newfireStatus } = await req.json()

        const query = 'UPDATE cooker SET fireStatus = ? WHERE cookerNumber = ?;'
        const values = [newfireStatus, cookerNumber]

        await new Promise((resolve, reject) => {
            db.query(query, values, (err: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        })

        // const { Fire } = await req.json()

        // 定義要發送的資料
        // const payload = {
        //     deviceMacaddress : "84:F7:03:15:66:E8",
        //     newfireStatus,
        //     Time : "30",
        //     Status : "c"
        // }

        // // 發送 HTTP POST 請求到外部伺服器
        // const response = await fetch('http://140.128.102.72:50515/device_detail_set_IHFirepower', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json', // 設定為 JSON 格式
        //     },
        //     body: JSON.stringify(payload) // 將資料轉換為 JSON 字串
        // })
        // if (!response.ok) {
        //     throw new Error(`Failed to update device: ${response.status} ${response.statusText}`)
            
        // }

        return NextResponse.json({
            message: 'Table state updated successfully',
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
