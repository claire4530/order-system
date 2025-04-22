import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function POST(req: Request) {
    try {
        const { newState, orderNumber, startTime, notify, remark, tableNumber } = await req.json()

        const query = 'UPDATE areas SET state = ?, orderNumber = ?, startTime = ?, notify = ?, remark = ? WHERE tableNumber = ?;'
        const values = [ newState, orderNumber, startTime, notify, remark, tableNumber ]

        await new Promise((resolve, reject) => {
            db.query(query, values, (err: any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(true)
                }
            })
        })

        return NextResponse.json({
            message: 'Table state updated successfully',
        })
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 })
    }
}
