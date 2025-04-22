'use client'
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
import { useState } from 'react'
import { TriangleAlert, SquareCheck } from 'lucide-react'
import DateTimeReadOnly from './date-time-read-only'

export const schema = z.object({
    name: z.string(),
    reserveTime: z.date(),
    people: z.string(),
    tableNumber: z.string(),
    phoneNumber: z.string(),
    remark: z.string(),
})

type FormMenuProps = { 
    tableNumber: string;
}

export type Reserve = {
    name: string
    reserveTime: Date
    people: string
    tableNumber: string
    phoneNumber: string
    remark: string
}

const FormMenu = ({ tableNumber }: FormMenuProps) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setsuccessMessage] = useState<string | null>(null)

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: "",
            reserveTime: new Date(),
            people: "",
            tableNumber: "",
            phoneNumber: "",
            remark: "",
        },
    })

    const onSubmit = async (data: z.infer<typeof schema>) => {
        setErrorMessage(null)
        setsuccessMessage(null)
        if (data.name.trim() === '') {
            setErrorMessage("名稱不能為空")
            return
        }

        const submissionData = { ...data }
        const result = await submitForm(submissionData)
        console.log(result)
        setsuccessMessage("新增成功")

    }

    return (
        <FormComponent {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex gap-2 justify-between px-4 py-2 items-center rounded-md hover:bg-slate-100 text-black">
                            <FormLabel className='text-base font-semibold'>姓名</FormLabel>
                            <FormControl>
                                <div className="flex gap-2">
                                    <Input
                                        type="text"
                                        {...field}
                                        className="rounded-md border border-gray-400 w-40"
                                    />
                                    <div className="flex gap-2">
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        className="w-4" 
                                        onClick={() => {
                                            if (!field.value.includes('先生')) {
                                            field.onChange(field.value.replace('小姐', '') + '先生');
                                            }
                                        }}
                                        >
                                        先生
                                    </Button>
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        className="w-4" 
                                        onClick={() => {
                                            if (!field.value.includes('小姐')) {
                                            field.onChange(field.value.replace('先生', '') + '小姐');
                                            }
                                        }}
                                        >
                                        小姐
                                    </Button>
                                    </div>
                                </div>
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="reserveTime"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 px-4 py-2 justify-between text-black rounded-md hover:bg-slate-100">
                            <FormLabel className='text-base font-semibold'>預約時間</FormLabel>
                                <FormControl>
                                    <DateTimeReadOnly field={field} />
                                </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="people"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 px-4 py-2 justify-between text-black rounded-md hover:bg-slate-100">
                            <FormLabel className='text-base font-semibold'>預約人數</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=""
                                    {...field}
                                    className="rounded-md border border-gray-400 w-60"
                                />
                            </FormControl>
                            <FormMessage />
                            
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tableNumber"
                    render={({ field }) => {
                        // 確保 tableNumber 被存入表單狀態
                        if (!field.value) {
                            field.onChange(tableNumber);  // 手動將 tableNumber 設置到 field 中
                        }

                        return (
                            <FormItem className="flex items-center gap-2 px-4 py-2 justify-between text-black rounded-md hover:bg-slate-100">
                                <FormLabel className='text-base font-semibold'>預定桌號</FormLabel>
                                <FormControl>
                                    {/* 顯示 tableNumber，不能修改 */}
                                    <div className="rounded-md border border-gray-400 w-60 px-3 py-2 bg-gray-100">
                                        {tableNumber} {/* 顯示傳入的 tableNumber */}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 px-4 py-2 justify-between text-black rounded-md hover:bg-slate-100">
                            <FormLabel className='text-base font-semibold'>連絡電話</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder=""
                                    {...field}
                                    className="rounded-md border border-gray-400 w-60"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="remark"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-2 px-4 py-2 justify-between text-black rounded-md hover:bg-slate-100">
                            <FormLabel className='text-base font-semibold'>備註</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder=""
                                    {...field}
                                    className="rounded-md border border-gray-400 w-60"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='flex justify-between px-4 py-2'>
                    <div className='ml-4'>
                        {errorMessage && <div className="text-red-500 flex gap-2 mt-2"><TriangleAlert />{errorMessage}</div>}
                        {successMessage && <div className="text-green-600 flex gap-2 mt-2"><SquareCheck /> {successMessage}</div>}
                    </div>
                    <Button type="submit" className="px-8">儲存</Button>
                </div>
            </form>
        </FormComponent>
    )
}

export default FormMenu
