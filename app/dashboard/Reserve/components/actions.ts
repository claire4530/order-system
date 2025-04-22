'use server'

import { z } from 'zod'
import { schema } from './form'

export async function submitForm(data: z.infer<typeof schema>) {
    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const updateTableState = await fetch(`${apiUrl}/api/edit-table-state`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ state: "已預定", tableNumber: data.tableNumber }),
        });

    const response = await fetch(`${apiUrl}/api/add-reserve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    const changeStateResult = await updateTableState.json();
    const addReserveResult = await response.json();

    return {
        changeStateResult,
        addReserveResult

    }
}
export default submitForm
