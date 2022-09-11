import { useRouter } from 'next/router'
import React from 'react'
import CategoryList from './CategoryList'
import Layout from './Layout'
import Navbar from './Navbar'

export default function IndexLayout({ children }) {
    const router = useRouter()
    const collection = router.query.collection
    return (
        <Layout>
            <Navbar></Navbar>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col">
                    <CategoryList bg={"bg-white"} size="sm" activeRoute={collection}></CategoryList>
                </div>
            </div>
            <div>
                {children}
            </div>
        </Layout>
    )
}
