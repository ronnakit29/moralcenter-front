import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useState } from 'react'
import ContentViewLayout from '../components/ContentViewLayout'
import IndexLayout from '../components/IndexLayout'
import RegionMenu from '../components/RegionMenu'
import ParseService from '../plugins/ParseService'
import { CardShow, CardShowV2 } from './home'

export default function search() {
    const router = useRouter()
    const [data, setData] = React.useState([])
    const slug = router.query.slug
    const [loading, setLoading] = useState(true)
    const province = router.query.province
    const district = router.query.district
    const input = router.query.mode == 'search' ? router.query.input : ''
    async function fetch() {
        try {
            setLoading(true)
            const region = router.query.region
            const regionQuery = region ? `region:${region}` : ""
            const provinceQuery = province ? `province:${province}` : ""
            const districtQuery = district ? `district:${district}` : ""
            const collection = router.query.collection ? `collection:Collection**${router.query.collection}` : ''
            const category = router.query.category ? `category:Category**${router.query.category}` : ''
            const joinAll = [regionQuery, provinceQuery, districtQuery, collection, category].filter(i => i).join(",")
            if (router.query?.mode == 'search') {
                const response = await ParseService.Cloud.run('searchPage', { search: router.query.input, equal: joinAll })
                setData(response)
            } else {
                const response = await ParseService.Cloud.run('allPage', { include: 'collection,category', equal: `${joinAll}` })
                setData(response)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }
    useEffect(() => {
        if (router.isReady) {
            fetch()
        }
    }, [router.isReady, router.query])
    const region = router.query.region && `ภาค${router.query.region}`
    return (
        <ContentViewLayout pages={["ค้นหา", slug, region, province, district, input]}>
            <div className="max-w-6xl mx-auto mb-5 px-3">
                <div className="grid lg:grid-cols-3 gap-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2">
                    {data.map((i, key) => <CardShowV2 key={key} category={i.get('category')?.get('title')} onClick={() => router.push(`/page/${i.id}?s=${i.get('title')}`)} bg={i.get('coverUrl')} title={i.get('title')} tagName={i.get('collection')?.get('title')} tagColor={i.get('collection')?.get('color')} description={replaceString(i, i.get("category")?.get('templateString') || '')}></CardShowV2>)}
                </div>
                {loading ? <div className='w-full h-[200px] flex items-center justify-center'>
                    <i className="fas fa-spinner animate-spin"></i>
                </div> : data.length < 1 ? <div className='w-full h-[200px] flex items-center justify-center'>
                    <span className='text-neutral-400'>- ยังไม่มีเนื้อหา -</span>
                </div> : null}
            </div>
        </ContentViewLayout>
    )
}
export function replaceString(data, template) {
    // template string syntax in {{ }}
    const replaceTemplate = template.replace(/{{(.*?)}}/g, (match, p1) => {
        return data.get(p1)
    })
    return replaceTemplate
}