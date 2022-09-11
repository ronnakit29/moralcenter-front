import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import FooterComponent from './FooterComponent'

export default function Layout({ children }) {
    const router = useRouter()
    function windowBack() {
        router.back()
    }
    return <div
        className="flex flex-col justify-between min-h-screen relative items-stretch"
    >
        <div className="h-[30px] bg-primary-600 px-3 flex items-center text-sm justify-between sticky top-0 z-50">
            <div className="flex gap-2">
                <Link href="/"><a className="flex items-center gap-2 text-white"><i className="fas fa-home"></i>หน้าแรกเว็บไซต์</a></Link>
                <button onClick={windowBack} className="flex items-center gap-2 text-white"><><i className="fas fa-chevron-left"></i>ย้อนกลับ</></button>

            </div>
            <Link href="/login"><a className="flex items-center gap-2 text-white"><i className="fas fa-user-secret"></i>เข้าสู่ระบบแอดมิน</a></Link>
        </div>
        <div className="static w-full min-h-[620px]">
            {children}
        </div>
        <div>
            <FooterComponent></FooterComponent>
            <div className="h-[30px] bg-secondary-500"></div>
        </div>
    </div >
}
