import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import { MoreHorizontal } from 'lucide-react';
import { useEffect, useState } from "react";
import React from "react";

interface Area {
    id: number
    content: string;
}

interface DetailsProps {
    id: number;
}

const Details : React.FC<DetailsProps> = ({id}) => {

    const [cookerProps, setCookers] = useState<Area[]>([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/order-details`);
            const result = await response.json();
            setCookers(result);
            console.log('cookerProps:', cookerProps);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const cookers = (Array.isArray(cookerProps) ? cookerProps : []).filter(
        (fireItem) => fireItem.id === id
    );


    useEffect(() => {
        const interval = setInterval(fetchData, 1000); 
        return () => clearInterval(interval); 
    }, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[400px] h-[160px]">
                <DialogHeader className="grid gap-2">
                    <DialogTitle className="text-center">
                        用餐明細
                    </DialogTitle>
                    <DialogDescription>
                        {cookers.map((cooker) => (
                            <div key={cooker.id}>
                                <p>{cooker.content}</p>
                            </div>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {/* <AlertDialogAction onClick={() => editState( id, "處理中", "正在處理" ) }>
                        修改訂單
                    </AlertDialogAction> */}
                    {/* <Button>修改訂單</Button> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default Details