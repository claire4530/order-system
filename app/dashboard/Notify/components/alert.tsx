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

const Alert : React.FC<Area> = ({id}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="link" className=" text-red-500" >
                    <ExclamationCircleIcon className="mr-2 h-6 w-6 text-red-500" />
                    前往處理
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="w-[400px] h-[160px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-center">
                        確定要前往處理嗎?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <div className="flex gap-12 pr-20">
                        <AlertDialogCancel>
                            &nbsp;&nbsp;取消&nbsp;&nbsp;
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => editState( id, "處理中", "正在處理" ) }>
                            &nbsp;&nbsp;確定&nbsp;&nbsp;
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default Alert