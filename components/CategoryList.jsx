import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ParseService from "../plugins/ParseService"
export default function CategoryList({ bg, size, activeRoute, categories }) {
    const [data, setData] = useState([])
    async function fetch() {
        const query = new ParseService.Query("Collection")
        query.ascending("priority")
        const response = await query.find()
        setData(response)
    }
    const router = useRouter()
    function goto(path){
        router.push(path)
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <div
            className={`${bg || "bg-gray-100"} rounded-3xl p-5 w-full ${data.length > 5 ? 'lg:flex grid grid-cols-3 sm:grid-cols-6' : 'grid grid-cols-5'} justify-between gap-2 lg:gap-10`}
        >
            {/* {JSON.stringify()} */}
            {data.map((i, key) => <div key={key}>
                <div
                    className=" w-full rounded-3xl relative"
                >
                    {/* {i.get('svgIcon')} */}
                    <img onClick={()=>goto(`/search?collection=${i.id}&slug=${i.get("title")}`)} src={i.get('svgIcon')} alt="" className="w-full cursor-pointer transform transition-all hover:scale-105 " />
                </div>

                {activeRoute == i.id && <div className="rounded-full  w-full h-2 mt-3 " style={{background: i.get('color')}}></div>}
            </div>)}

        </div>
    )
}
export async function getStaticProps() {

}