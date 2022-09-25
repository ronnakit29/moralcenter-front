import React from 'react'
import CategoryList from './CategoryList'

export default function FooterComponent({ dissub }) {
    return (
        <div className="bg-primary-600 text-white py-3">
            <footer className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                {!dissub && <div className="mx-auto max-w-xl">
                    <CategoryList bg={"bg-primary-600"}></CategoryList>
                </div>}
                <div className="flex flex-col items-center pt-6">
                    <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>

                    <div className="flex gap-4">
                        <a
                            href="#"
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-facebook text-xl"></i>
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-youtube text-xl"></i>
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-line text-xl"></i>
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-twitter text-xl"></i>
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-instagram text-xl"></i>
                        </a>

                        <a
                            href="#"
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-tiktok text-xl"></i>
                        </a>
                    </div>
                </div>
                <div className="text-center pt-8">
                    <p className="mb-0 font-bold text-lg">
                        องค์ความรู้ชุมชนท้องถิ่นคุณธรรมต้นแบบ ศูนย์คุณธรรม (องค์การมหาชน)
                    </p>
                    <div className="text-center">
                        เลขที่ 69 อาคารวิทยาลัยการจัดการ มหาวิทยาลัยมหิดล (CMMU) ชั้น 16-17
                        ถ.วิภาวดีรังสิต แขวงสามเสนใน เขตพญาไท กรุงเทพฯ 10400
                    </div>
                    <div className="text-white text-sm text-center">
                        Copyright © 2022 Center for Morality Promotion (Public Organization)
                        All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}
