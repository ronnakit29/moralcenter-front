import React from 'react'
import ContentViewLayout from '../components/ContentViewLayout'
import IndexLayout from '../components/IndexLayout'
import RegionMenu from '../components/RegionMenu'
import { CardShow, CardShowV2 } from './home'

export default function search() {
    return (
        <ContentViewLayout pages={["ค้นหา", "Keyword"]}>
            <div className="max-w-6xl mx-auto mb-5 px-3">
                <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2">
                    <CardShowV2 bg={"https://picsum.photos/200/300"} title="text" tagName={"พอเพียง"} description={"test test test"}></CardShowV2>
                </div>
            </div>
        </ContentViewLayout>
    )
}
