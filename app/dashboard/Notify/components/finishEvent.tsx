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
import {
    ExclamationCircleIcon,
} from '@heroicons/react/24/outline'

interface Area {
    id: number
    tableNumber: string
}

async function editState(id: number, state: string, stateButton: string): Promise<void> {

    const apiUrl: string = process.env.NEXT_PUBLIC_API_BASE_URL || ''
    await fetch(`${apiUrl}/api/edit-notify-state`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, state, stateButton }),
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

const handleConfirm = (tableNumber: string, id: number) => {
    editState( id, "已處理", "處理完成" )
    updateState('已處理', tableNumber)
}

const FinishEvent : React.FC<Area> = ({id, tableNumber}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant='default'>
                    處理完成
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[400px] h-[160px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                        確定要完成處理嗎?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className="flex gap-12 pr-20">
                        <AlertDialogCancel>
                            &nbsp;&nbsp;取消&nbsp;&nbsp;
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleConfirm( tableNumber, id) }>
                            &nbsp;&nbsp;確定&nbsp;&nbsp;
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default FinishEvent