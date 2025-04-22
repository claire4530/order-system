import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        // 從請求中解析出 JSON 參數
        const { Fire } = await req.json()

        // 定義要發送的資料
        const payload = {
            deviceMacaddress : "84:F7:03:15:66:E8",
            Fire,
            Time : "30",
            Status : "c"
        }

        // 發送 HTTP POST 請求到外部伺服器
        const response = await fetch('http://140.128.102.72:50515/device_detail_set_IHFirepower', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // 設定為 JSON 格式
            },
            body: JSON.stringify(payload) // 將資料轉換為 JSON 字串
        })

        // 確認是否成功
        if (!response.ok) {
            throw new Error(`Failed to update device: ${response.status} ${response.statusText}`)
        }

        // 解析伺服器回應
        const responseData = await response.json()

        return NextResponse.json({
            message: 'Device updated successfully',
            data: responseData
        })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ message: error }, { status: 500 })
    }
}

