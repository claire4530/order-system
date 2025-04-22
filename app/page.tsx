import AcmeLogo from '@/app/ui/acme-logo'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { lusitana } from '@/app/ui/fonts'
import Image from 'next/image'
import { AspectRatio } from "@/components/ui/aspect-ratio"

export default function Page() {


    return (
        <main className="flex min-h-screen flex-col">
                    {/* <p
                        className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
                    >
                        <strong>這是一個火鍋店的點餐系統</strong>
                    </p> */}
                        <div className="relative min-h-screen w-full">
                            <Image
                                src="/customers/火鍋店ps版本.jpg"
                                alt="Photo by Drew Beamer"
                                fill
                                className="h-full w-full object-cover rounded-md"
                            />
                            
                            <Link
                                href="/login"
                                className="absolute top-1/2 left-1/3 -translate-x-[50%] -translate-y-[90%] flex items-center gap-5 rounded-lg bg-[#fef4e1] text-[#657157] px-8 py-6 text-xl font-extrabold hover:bg-[#f0ffdd]"
                            >
                                <span>登入帳號</span>
                                <ArrowRightIcon className="w-5 md:w-6" />
                            </Link>
                        </div>

        </main>
    )
}
