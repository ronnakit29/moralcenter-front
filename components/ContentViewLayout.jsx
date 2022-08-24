import React from 'react'
import Breadcrumb from './Breadcrumb'
import IndexLayout from './IndexLayout'
import RegionMenu from './RegionMenu'

export default function ContentViewLayout({ children,pages }) {
    return (
        <IndexLayout>
            <div className='py-5 container mx-auto flex justify-center px-3'>
                <RegionMenu></RegionMenu>
            </div>
            <div className='my-8 border-b'></div>
            <div className="max-w-6xl mx-auto mb-5 px-3">

                <div className='flex justify-start'>
                    <Breadcrumb pages={pages}></Breadcrumb>
                </div>
            </div>
            <div>
                {children}
            </div>
        </IndexLayout>
    )
}
