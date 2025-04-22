import { ReactNode, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface RemarkProps {
    children: ReactNode;
    tableNumber: string;
}

interface Area {
    id: number;
    name: string;
    reserveTime: string;
    people: number;
    tableNumber: string;
    phoneNumber: string;
    remark: string;
}

const EditRemark: React.FC<RemarkProps> = ({ children, tableNumber }) => {
    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toLocaleString();
    };

    const [cookerProps, setCookers] = useState<Area[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/reserve`);
            const result = await response.json();

            // 過濾出符合該桌號的訂單
            const filteredData = result.filter(
                (item: { tableNumber: string }) => item.tableNumber === tableNumber
            );

            // 按照 reserveTime 排序，並選擇最新的預定
            const sortedData = filteredData.sort(
                (a: Area, b: Area) => new Date(b.reserveTime).getTime() - new Date(a.reserveTime).getTime()
            );

            setCookers(sortedData);
            console.log('Sorted cookerProps:', sortedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); // 初始加載數據
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader className="space-y-6">
                    <DialogTitle>預約詳情</DialogTitle>
                    <DialogDescription className='px-2 text-base'>
                        {cookerProps.length > 0 ? (
                            // 顯示最新的預定詳情
                            <div className="flex flex-col gap-4">
                                <div>桌號: {tableNumber}</div>
                                <div>預定人: {cookerProps[0].name}</div>
                                <div>預約時間: {formatDate(cookerProps[0].reserveTime)}</div>
                                <div>用餐人數: {cookerProps[0].people}人</div>
                                <div>電話: {cookerProps[0].phoneNumber}</div>
                                <div>備註: {cookerProps[0].remark}</div>
                            </div>
                        ) : (
                            <p>沒有找到相關資料。</p>
                        )}
                    </DialogDescription>
                </DialogHeader>
                {/* <DialogFooter>
                    <Button type="submit">修改訂單</Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
};

export default EditRemark;
