'use client'

import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
    FireIcon,
    BuildingStorefrontIcon,
    BellAlertIcon,
    ClipboardDocumentListIcon,
    BoltIcon,
    BanknotesIcon,
    ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { CalendarDays } from 'lucide-react';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
    {
        name: '用餐區域',
        href: '/dashboard/DiningArea',
        icon: UserGroupIcon,
    },
    { name: '區域管理', href: '/dashboard/Fireboard', icon: FireIcon },
    {
        name: '新增菜單',
        href: '/dashboard/ModifyMenu',
        icon: BuildingStorefrontIcon,
    },
    {
        name: '預約',
        href: '/dashboard/Reserve',
        icon: CalendarDays,
    },
    {
        name: '歷史訂單',
        href: '/dashboard/OrderTracking',
        icon: ClipboardDocumentListIcon,
    },
    {
        name: '通知',
        href: '/dashboard/Notify',
        icon: BellAlertIcon,
    },
    {
        name: '店鋪管理',
        href: '/dashboard/StoreManagement',
        icon: ComputerDesktopIcon,
    },
]

export default function NavLinks() {
    const pathname = usePathname()
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-[#71503e] hover:text-white md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-[#f5efe4]': pathname !== link.href,  // 僅當 pathname 不等於 link.href 時使用 bg-gray-50
                                'bg-[#71503e] text-white': pathname === link.href,
                            }
                        )}
                    >
                        <LinkIcon className="w-6" />
                        <p className="font-semibold hidden md:block">{link.name}</p>
                    </Link>
                )
            })}
        </>
    )
}
