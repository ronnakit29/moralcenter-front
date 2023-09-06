import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import ParseService from '../plugins/ParseService'
import { getAllProvince, getDistrictByProvince } from '../plugins/thailand_query'

export default function RegionMenu() {5
    const router = useRouter()
    function regionTo(region) {
        const query = router.query
        query.region = region
        query.input = ""
        query.mode = ""
        delete query.pv
        router.push({ pathname: router.pathname, query: query })
    }
    const [regionList, setRegionList] = React.useState([])
    async function regionListFetch(){
        try {
            const response = await ParseService.Cloud.run("allRegion")
            setRegionList(response)
        } catch (error) {
            
        }
    }
    const allProvince = getAllProvince()
    const districtList = getDistrictByProvince(router.query.pv)
    function linkProvince(province) {
        router.push({ pathname: router.pathname, query: {
            collection: router.query.collection,
            pv: province,
            slug: router.query.slug,
        } })
    }
    function linkDistrict(district) {
        const query = router.query
        query.district = district
        delete query.region
        router.push({ pathname: router.pathname, query: query })
    }
    function allCollection(){
        const query = router.query
        delete query.collection,
        delete query.district,
        delete query.province,
        delete query.region,
        router.push({ pathname: router.pathname })
    }
    useEffect(() => {
        router.query.province = ""
        regionListFetch()
    }, [router.query.search, router.query.mode, router.query.input, router.query.region, router.query.province])
    return (
        <div className='flex gap-4 items-center flex-wrap'>
            <div className="flex gap-2 flex-wrap">
            <button className="pink-button min-w-min" onClick={() => allCollection()}>ทุกประเภท</button>{regionList.map((i, key) => <button key={key} className="main-button min-w-min" onClick={() => regionTo(i.get('name'))}>{i.get('name').search('กรุงเทพ') ? 'ภาค' : ''}{i.get('name')}</button>)}
            </div>
            <div className='flex gap-4 w-full lg:w-[300px]'>
                <select className='main-input' onChange={(e) => linkProvince(e.target.value)}>
                    <option value="">จังหวัด</option>
                    {allProvince.map((i, key) => <option key={key} value={i.name_th}>{i.name_th}</option>)}
                </select>
                <select className='main-input'
                    onChange={(e) => linkDistrict(e.target.value)}
                    value={router.query.district}
                >
                    <option value="">อำเภอ</option>
                    {districtList.map((i, key) => <option key={key} value={i.name_th}>{i.name_th}</option>)}
                </select>
            </div>
        </div>
    )
}
