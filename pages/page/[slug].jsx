import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import ContentViewLayout from '../../components/ContentViewLayout'
import IndexLayout from '../../components/IndexLayout'
import ParseService from '../../plugins/ParseService'
import { replaceString } from '../search'
import ImageGallery from "react-image-gallery"
import GalleryBox from '../../components/GalleryBox'
export default function slug() {
    const router = useRouter()
    const id = router.query.slug
    const [data, setData] = React.useState({})
    async function fetch() {
        try {
            const response = await ParseService.Cloud.run('firstPage', { include: 'collection,category,parentPage.category', equal: `objectId:${id}` })
            setData(response)
        } catch (error) {

        }
    }
    useEffect(() => {
        if (router.isReady)
            fetch()
    }, [router.isReady, router.query])
    return (data?.id ?
        <ContentViewLayout pages={[data.get("collection")?.get('title'), data.get('title')]} hideRegion={true}>
            <div className='max-w-6xl mx-auto px-3'>
                <div className='mb-5'>
                    <h1 className="text-lg md:text-xl lg:text-4xl font-semibold text-primary-600 line-clamp-2 lg:line-clamp-1">{data.get('title')}</h1>
                    <p className=' text-primary-600 text-lg'>{replaceString(data, data.get("category")?.get('templateString') || '')}</p>

                </div>
                <div className='grid grid-cols-4 gap-4 mb-5'>
                    <div className={` flex justify-center ${!data.get('parentPage')?.id ? 'col-span-4 ' : 'col-span-4 lg:col-span-3'}`}>
                        <img src={data.get('coverUrl')} className='w-full rounded-3xl bg-contain bg-center bg-no-repeat' />
                    </div>
                    {data.get('parentPage')?.id && <div className="col-span-4 lg:col-span-1">
                        <div onClick={() => router.push(`/page/${data.get('parentPage')?.id}`)} className='bg-primary-600 lg:h-[500px] rounded-3xl p-5 flex flex-row lg:flex-col items-center gap-4 hover:shadow-lg transition-all cursor-pointer'>
                            <div className="bg-white w-[70px] block h-[70px] lg:w-[250px] lg:h-[250px] rounded-full bg-contain bg-center bg-no-repeat" style={{ backgroundImage: `url('${data.get('parentPage')?.get('coverUrl')}')` }}></div>
                            <div className='text-left lg:text-center w-2/3'>
                                <div className='text-base md:text-2xl font-semibold text-white'>
                                    {data.get('parentPage').get('title')}
                                </div>
                                {/* <div className='text-sm lg:text-lg text-white'>
                                    ตำแหน่ง
                                </div> */}
                                <div className='text-sm lg:text-lg text-white line-clamp-2'>
                                    {replaceString(data.get('parentPage'), data.get('parentPage').get("category")?.get('templateString') || '')}
                                </div>
                                <div className='text-white py-3'>
                                    <i className="fas fa-link mr-2"></i> คลิ๊กดูเพิ่มเติม
                                </div>
                            </div>
                        </div>
                    </div>}
                    <div className="col-span-4 text-lg mb-5">
                        <div dangerouslySetInnerHTML={{ __html: data.get('description') }}>

                        </div>
                    </div>
                </div>
                <GalleryBox items={data.get('images')}></GalleryBox>
                <div className='text-center rounded-3xl bg-neutral-200 p-5  mb-5'>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4 grid-cols-1'>
                        {data.get('pdfUrl') && <a className='bg-white flex items-center justify-center  py-3 h-12 rounded-full' href={data.get('pdfUrl')} target={"_blank"}>
                            <i className="fas fa-file-pdf text-lg mr-2 text-red-500"></i> ดาวน์โหลดเอกสาร PDF
                        </a>}
                        {data.get('infoGraphicUrl') && <a className='bg-primary-600 flex items-center justify-center h-12 rounded-full  text-white' href={data.get('infoGraphicUrl')} target={"_blank"}>
                            <div className='text-left'>
                                <div className="text-lg">ดาวน์โหลด Info Graphic</div>
                            </div>
                        </a>}
                        {data.get('contacts').length > 0 && <div className='flex flex-col gap-4 justify-center'>
                            <h1 className="text-2xl font-semibold">ติดต่อได้โดยตรง</h1>
                            {data.get('contacts').map((i, key) => <div key={i} className="main-button">{i}</div>)}
                        </div>}
                        <div className='flex items-center justify-center'>
                            <div className="grid grid-cols-3 gap-4">
                                {data.get('messengerUrl') && <a target={'_blank'} href={data.get('messengerUrl')} className="w-20 h-20 bg-sky-400 rounded-full flex items-center justify-center">
                                    <i className="fab fa-facebook-messenger text-2xl text-white"></i>
                                </a>}
                                {data.get('lineUrl') && <a target={'_blank'}
                                    href={data.get('lineUrl')}
                                    className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
                                    <i className="fab fa-line text-2xl text-white"></i>

                                </a>}
                                {data.get('youtubeUrl') && <a target={'_blank'}
                                    href={data.get('youtubeUrl')}
                                    className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center">
                                    <i className="fab fa-youtube text-2xl text-white"></i>

                                </a>}
                            </div>
                        </div>
                    </div>
                    {/* <ImageGallery items={(data.get('images') || []).map(x => ({ original: x, thumbnail: x }))}>  </ImageGallery> */}
                </div>
            </div>
        </ContentViewLayout> : null
    )
}
