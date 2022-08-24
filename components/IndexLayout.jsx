import React from 'react'
import CategoryList from './CategoryList'
import Layout from './Layout'
import Navbar from './Navbar'

export default function IndexLayout({ children }) {

    return (
        <Layout>
            <Navbar></Navbar>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col">
                    <CategoryList bg={"bg-white"} size="sm" activeRoute={0}></CategoryList>
                </div>
            </div>
            <div>
                {children}
            </div>
        </Layout>
    )
}
