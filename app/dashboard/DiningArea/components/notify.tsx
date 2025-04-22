import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline'
import { useState } from "react"
import { UserRound } from 'lucide-react';

interface Area {
    tableNumber: string,
    areas_id: number
    state : string
}

function convertToLocalISOString(date: Date): string {
    const tzOffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
    const localISOTime = new Date(date.getTime() - tzOffset).toISOString().slice(0, -1); // Adjust the date and remove the 'Z' at the end
    return localISOTime;
}

async function addState(tableNumber: string, AlerTime: Date, areas_id: number): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    const formattedTime = convertToLocalISOString(AlerTime);
    await fetch(`${apiUrl}/api/add-notifys`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tableNumber, AlerTime: formattedTime, areas_id }),
        }
    )
    

}

async function updateState(notify: string, tableNumber: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/edit-table-notify`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ notify, tableNumber }),
        }
    )
    

}

const handleConfirm = (tableNumber: string, areas_id: number) => {
    const isoTime = new Date();
    addState(tableNumber, isoTime, areas_id)
    updateState('待處理', tableNumber)
}

const Notify : React.FC<Area> = ({tableNumber, areas_id, state}) => {

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div>
                    {state === '已處理' ? (
                        <BellIcon className=" flex-end h-8 w-8 transition-transform transform hover:-translate-y-1 duration-200 ease-in-out" />
                    ) : (
                        <BellAlertIcon className="flex-end h-8 w-8 transition-transform transform hover:-translate-y-1 duration-200 ease-in-out" />
                    )}
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[400px] h-[160px]">
                <div>
                    {state === '已處理' ? (
                        <div className="grid gap-10">
                            <AlertDialogTitle className="text-center">
                                確定要呼叫服務員嗎?
                            </AlertDialogTitle>
                            <div className='flex justify-center gap-4'>
                                <AlertDialogCancel>
                                    &nbsp;&nbsp;取消&nbsp;&nbsp;
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={() => handleConfirm( tableNumber, areas_id ) }
                                >
                                    &nbsp;&nbsp;確定&nbsp;&nbsp;
                                </AlertDialogAction>
                            </div>
                        </div>
                    ) : (
                        <div>
                                <AlertDialogTitle className="flex gap-2 mt-4 ml-6">
                                    <UserRound />
                                    服務員已經在路上了...
                                </AlertDialogTitle>
                                <div  className="mt-6 flex justify-end">
                                    <AlertDialogCancel>
                                        &nbsp;&nbsp;取消&nbsp;&nbsp;
                                    </AlertDialogCancel>
                                </div>
                        </div>
                    )}
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Notify