import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import ParseService from '../plugins/ParseService'

export default function Navbar() {
    const [search, setSearch] = React.useState('')
    const router = useRouter()
    async function submitSearch(e) {
        e.preventDefault();
        try {
            router.push('/search/?input=' + search + '&mode=search')
        } catch (error) {

        }
    }
    return (
        <nav className="w-full flex items-center flex-col lg:flex-row justify-between px-3 py-3">
            <div className="flex items-center gap-4">
                <img src="/logo.webp" className="w-[75px]" />
                <span className="text-2xl text-primary-600 font-bold">องค์ความรู้ชุมชนท้องถิ่นคุณธรรมต้นแบบ</span>
            </div>
            <form className="flex items-center gap-2 justify-center w-full lg:w-fit py-3" onSubmit={submitSearch}>
                <i className="fas fa-search text-primary-600 text-xl"></i>
                <input
                    type="text"
                    className="rounded-2xl w-full flex items-center px-3 h-[40px] border-primary-600 border outline-none text-lg italic text-center focus:ring-1 ring-primary-600 font-semibold"
                    placeholder="ค้นหาต้นแบบคุณธรรม"
                    onChange={(e) => { setSearch(e.target.value) }}
                />
                <button className="bg-primary-600  text-white rounded-2xl text-lg items-center px-3 h-[40px] focus:ring-2 ring-primary-700 transition-all">ค้นหา</button>
            </form>
        </nav>
    )
}
