import Form from './form'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
export type Payment = {
    id: number
    tableNumber: string
    cookerNumber: number
    socketNumber: number
    seats: number
    items: Item[]
}
interface Item {
    id: number
    name: string
    status: number
    switchOn: boolean
    type: 'cooker' | 'socket'
    uniqueId: string
}
const AddAreas = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mr-2 bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A]">
                    新增區域
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form />
            </DialogContent>
        </Dialog>
    )
}

export default AddAreas
