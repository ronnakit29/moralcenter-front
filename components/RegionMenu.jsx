import { useRouter } from 'next/router'
import React from 'react'
import { getAllProvince, getDistrictByProvince } from '../plugins/thailand_query'

export default function RegionMenu() {
    const router = useRouter()
    function regionTo(region) {
        const query = router.query
        query.region = region
        query.input = ""
        query.mode = ""
        router.push({ pathname: router.pathname, query: query })
    }
    const regionList = [
        "เหนือ",
        "กลาง",
        "ใต้",
        "ตะวันออกเฉียงเหนือ",
        "ตะวันออก",
        "ตะวันตก",
        "กรุงเทพฯ"
    ]
    const allProvince = getAllProvince()
    const districtList = getDistrictByProvince(router.query.province)
    function linkProvince(province) {
        const query = router.query
        query.province = province
        router.push({ pathname: router.pathname, query: query })
    }
    function linkDistrict(district) {
        const query = router.query
        query.district = district
        router.push({ pathname: router.pathname, query: query })
    }
    return (
        <div className='flex gap-4 items-center flex-wrap'>

            <div className="flex gap-2 flex-wrap">
                {regionList.map((i, key) => <button key={key} className="main-button min-w-min" onClick={() => regionTo(i)}>{i.search('กรุงเทพ') ? 'ภาค' : ''}{i}</button>)}
            </div>
            <div className='flex gap-4 w-full lg:w-[300px]'>
                <select className='main-input' onChange={(e) => linkProvince(e.target.value)}>
                    <option value="">จังหวัด</option>
                    {allProvince.map((i, key) => <option key={key} value={i.name_th}>{i.name_th}</option>)}
                </select>
                <select className='main-input'
                    onChange={(e) => linkDistrict(e.target.value)}
                >
                    <option value="">อำเภอ</option>
                    {districtList.map((i, key) => <option key={key} value={i.name_th}>{i.name_th}</option>)}
                </select>
            </div>
        </div>
    )
}
