import Form from './form'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from "@/components/ui/button"
interface Item {
    id: number
    name: string
    description: string
    money: number
    switchOn: boolean   
}

interface Area {
    id: number
    name: string
    items: Item[]
}
const AddAreas = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="mr-2 bg-[#969363] text-white font-semibold hover:text-white hover:bg-[#706E4A]">
                    新增分類
                </Button>
            </DialogTrigger>
            <DialogContent>
                <Form />
            </DialogContent>
        </Dialog>
    )
}

export default AddAreas