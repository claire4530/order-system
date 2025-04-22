import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import EditRemark from './edit-remark'; 

interface ReservedProps {
    tableNumber: string;
    seats: number;
    totalMealTime: number;
}

const Reserved: React.FC<ReservedProps> = ({ tableNumber, seats, totalMealTime }) => {

    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const updateTableState = async (state: string, tableNumber: string) => {
        try {
            const response = await fetch(`${apiUrl}/api/edit-table-state`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ state, tableNumber }),
            });

        } catch (error) {
            console.error('Error updating table state:', error);
        }
    };

    return (
        <Card>
            <div className="h-[380px] ">
                <CardHeader className="flex gap-2">
                    <div className="flex items-center h-[56px]">
                        <CardTitle className="w-80">
                            {tableNumber}
                            <span className="text-base ml-4">({seats}人座)</span>
                        </CardTitle>
                    </div>
                    <CardDescription className="text-base text-black">
                        狀態: 已預定
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex h-[240px] flex-col justify-between">
                    <div className="flex flex-col gap-6 text-sm ">
                        <div>訂單編號: --</div>
                        <div className="flex items-baseline gap-2">
                            剩餘用餐時間: 120
                            <span className="text-xs font-bold">min</span>
                        </div>
                        <div>
                            本日總用餐時間:{' '}
                            {Math.floor(totalMealTime / 60)}{' '}
                            <span className="text-xs font-bold">h&nbsp;</span>
                            {totalMealTime % 60}{' '}
                            <span className="text-xs font-bold">min</span>
                        </div>
                        {/* <div>備註: {remark}</div> */}
                    </div>
                    <div className="flex items-center justify-between ">
                        <EditRemark tableNumber={tableNumber}>
                            <Button variant="outline" className="px-6 py-2 bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A] transition-colors duration-200 ease-in-out">預定資料</Button>
                        </EditRemark>
                        <Button variant="outline" className="ml-auto px-6 py-2 bg-[#bf6c41] text-white font-semibold hover:bg-[#8d4a28] hover:text-white" onClick={() => updateTableState( "空桌", tableNumber )}>
                            取消預定
                        </Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default Reserved;
