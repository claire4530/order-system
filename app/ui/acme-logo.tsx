import { UserCircleIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'

export default function Personalpage() {
    return (
        <div
            className={`${lusitana.className} flex flex-row items-center leading-none text-white gap-2`}
        >
            <UserCircleIcon className="h-14 w-14" />
            <p className="text-2xl mt-2 font-semibold">個人頁面</p>
        </div>
    )
}
