'use client'
import { useState } from 'react'
import {
    Form as FormComponent,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import submitForm from './actions'
import { TriangleAlert, SquareCheck } from 'lucide-react'

export const schema = z.object({
    tableNumber: z.string().refine(value => value !== "", {
        message: '區域名稱不能為空',
    }),
    seats: z.string().refine(value => value !== "0", {
        message: '座位數量不能為0',
    }),
    cookerNumber: z.string().refine((value) => !isNaN(Number(value)), {
        message: '電磁爐數量必須是數字',
    }),
    socketNumber: z.string().refine((value) => !isNaN(Number(value)), {
        message: '插座數量必須是數字',
    }),
})

interface Areas {
    id: number
    tableNumber: string
    seats: number
    cookerNumber: number
    socketNumber: number
}

const fetchTables = async (): Promise<Areas[]> => {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const areas: Areas[] = await fetch(`${apiUrl}/api/areas`).then(res => res.json())
    return areas
}

const Form = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setsuccessMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            tableNumber: '',
            seats: '0',
            cookerNumber: '0',
            socketNumber: '0',
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        
        setsuccessMessage(null)
        const areas = await fetchTables()
        const isDuplicate = areas.some(area => area.tableNumber === data.tableNumber)
        
        if (isDuplicate) {
            setErrorMessage("此區域已存在")
            return
        }
        setErrorMessage(null)

        const result = await submitForm(data)
        console.log(result);
        setsuccessMessage("新增成功")
    }

    return (
        <FormComponent {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="tableNumber"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-7 px-4">
                            <FormLabel>區域名稱 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="新增區域名稱"
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="seats"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-7 px-4">
                            <FormLabel>座位數量 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="新增座位數量"
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="cookerNumber"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4 px-4">
                            <FormLabel>電磁爐數量 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="新增座位上電磁爐數量"
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="socketNumber"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-7 px-4">
                            <FormLabel>插座數量 :</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="新增座位上插座數量"
                                    {...field}
                                    className="rounded-md border border-gray-400 px-4 py-2 w-40"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-between'>
                    <div className='ml-4'>
                        {successMessage && <p className="text-green-600 flex gap-2 mt-2"> <SquareCheck /> {successMessage} </p>}
                        {errorMessage && <p className="text-red-500 flex gap-2 mt-2"><TriangleAlert />警告 : {errorMessage}</p>}
                    </div>
                    <Button type="submit" className='ml-4 w-30'>儲存</Button>
                </div>
            </form>
        </FormComponent>
    )
}

export default Form
