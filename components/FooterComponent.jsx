import React, { useEffect } from 'react'
import ParseService from '../plugins/ParseService'
import CategoryList from './CategoryList'

export default function FooterComponent({ dissub }) {
    const [footer, setFooter] = React.useState({})
    async function getFooter() {
        try {
            const response = await ParseService.Cloud.run("getSingleType", { ref: 'footer_link'})
            setFooter({
                facebook: response.get('rawData')?.facebook,
                // line
                line: response.get('rawData')?.line,
                // instagram
                instagram: response.get('rawData')?.instagram,
                // twitter
                twitter: response.get('rawData')?.twitter,
                // youtube
                youtube: response.get('rawData')?.youtube,
                // tiktok
                tiktok: response.get('rawData')?.tiktok,
            })
        } catch (error) {
            
        }
    }
    useEffect(()=>{
        getFooter()
    },[])
    return (
        <div className="bg-primary-600 text-white py-3">
            <footer className="max-w-screen-2xl px-4 md:px-8 mx-auto">
                {!dissub && <div className="mx-auto max-w-xl z-0">
                    <CategoryList bg={"bg-primary-600"}></CategoryList>
                </div>}
                <div className="flex flex-col items-center pt-6">
                    <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>

                    <div className="flex gap-4">
                        {footer.facebook && <a
                            href={footer.facebook}
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-facebook text-xl"></i>
                        </a>}

                        {footer.youtube && <a
                            href={footer.youtube}
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-youtube text-xl"></i>
                        </a>}

                        {footer.line && <a
                            href={footer.line}
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-line text-xl"></i>
                        </a>}

                        {footer.twitter && <a
                            href={footer.twitter}
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-twitter text-xl"></i>
                        </a>}

                        {footer.instagram && <a
                            href={footer.instagram}
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-instagram text-xl"></i>
                        </a>}

                        {footer.tiktok && <a
                            href={footer.tiktok}
                            target="_blank"
                            className="hover: active:text-gray-600 transition duration-100"
                        >
                            <i className="fab fa-tiktok text-xl"></i>
                        </a>}
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
