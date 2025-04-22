import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AddRemark from './add-remark';

interface AvailableProps {
    tableNumber: string;
    seats: number;
    totalMealTime: number;
}

const Available: React.FC<AvailableProps> = ({ tableNumber, seats, totalMealTime }) => {
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
                        狀態: 空桌
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
                        {/* <div>備註: --</div> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <AddRemark tableNumber={tableNumber}>
                            <Button variant="outline"
                                className="ml-auto px-8 py-2 bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A] transition-colors duration-200 ease-in-out">
                                預定
                            </Button>
                        </AddRemark>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default Available;
