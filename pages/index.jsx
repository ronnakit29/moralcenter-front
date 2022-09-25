import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CategoryList from '../components/CategoryList'
import Layout from '../components/Layout'

export default function Home() {
  const [title, setTitle] = useState("องค์ความรู้ชุมชนท้องถิ่นคุณธรรมต้นแบบ")
  const router = useRouter()
  const [search, setSearch] = useState("")
  function onSearch(e) {
    e.preventDefault();
    router.push('/search?input=' + search + '&mode=search')
  }
  return (
    <Layout dissub={true}>
      <div className="max-w-6xl mx-auto py-10 px-3">
        <div className="flex flex-col text-center items-center justify-center gap-5">
          <div id="logo" className="w-[130px] h-[130px] flex items-center justify-center relative mb-5">
            <img src="/logo.webp" className="w-full" alt="" />
          </div>
          <h1 className="text-5xl font-semibold text-primary-600">
            {title}
          </h1>
          <form onSubmit={onSearch} className="w-full">
            <div className="w-full ">
              <input type="text" className="rounded-2xl w-full px-3 py-3 border-primary-600 border outline-none text-xl italic text-center focus:ring-1 ring-primary-600 font-semibold" placeholder="ค้นหาองค์กรต้นแบบคุณธรรม" onChange={e => setSearch(e.target.value)} />
              <button type='submit' className='hidden'></button>
            </div>
          </form>
          <div className=''>
            <CategoryList></CategoryList>
          </div>
          <div>
            <Link href="/home"><button className="bg-primary-600 rounded-full px-4 py-3 text-xl font-bold text-white hover:bg-primary-700 transition-all focus:ring-2 ring-primary-700">เข้าสู่หน้าหลัก</button></Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}
