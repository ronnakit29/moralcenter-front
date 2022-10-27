import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import ParseService from '../plugins/ParseService';
import { useEffect } from 'react';
export default function SliderComponent() {
    const [data, setData] = React.useState([])
    async function fetch() {
        try {
            const response = await ParseService.Cloud.run("allSlider")
            setData(response)
        } catch (error) {

        }
    }
    useEffect(() => {
        fetch()
    }, [])
    return (
        <Swiper slidesPerView={1} modules={[Pagination, Navigation, Autoplay]} autoplay={true} navigation={true}>
            {data.map((i, key) => <SwiperSlide key={key}>
                <div className=' bg-primary-900 h-fit'>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <div className="w-full flex justify-center items-center h-fit">
                                <img src={i.get('coverUrl')} className='h-full' alt="" />
                            </div>
                            <div className="w-full h-full flex flex-col p-5 justify-center">
                                <h1 className="font-bold text-white text-lg line-clamp-2 md:text-2xl lg:text-3xl xl:text-5xl pb-3">{i.get('title')}</h1>
                                <div className='text-white line-clamp-3'>{i.get('description')}</div>
                                <div className="flex justify-end py-2">
                                    {i.get('linkUrl') && <a href={i.get('linkUrl')} className="bg-white text-black rounded-full px-3 py-2">อ่านต่อ</a>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>)}
        </Swiper>
    )
}
