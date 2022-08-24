import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Pagination, Navigation } from "swiper";
import "swiper/css/pagination";
import "swiper/css/navigation";
export default function SliderComponent() {
    return (
        <Swiper slidesPerView={1} modules={[Pagination]} autoplay navigation={true}>
            <SwiperSlide>
                <div className=' bg-primary-900 h-fit'>
                    <div className="container mx-auto">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="w-full flex justify-center items-center h-fit">
                                <img src="/logo.webp" className='h-full' alt="" />
                            </div>
                            <div className="w-full h-full"></div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' bg-primary-600'>
                    <div className="container mx-auto">
                        <div className="flex gap-2">
                            <div className="w-full">
                                test
                            </div>
                            <div className="w-full"></div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className=' bg-primary-600'>
                    <div className="container mx-auto">
                        <div className="flex gap-2">
                            <div className="w-full">
                                test
                            </div>
                            <div className="w-full"></div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    )
}
