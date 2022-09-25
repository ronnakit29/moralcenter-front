import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import IndexLayout from '../components/IndexLayout'
import SliderComponent from '../components/SliderComponent'
import ParseService from '../plugins/ParseService'
import { replaceString } from './search'

export default function home() {
    const [peopleData, setPeopleData] = React.useState([])
    const [docBookData, setDocBookData] = React.useState([])
    const [tutorialData, setTutorialData] = React.useState([])
    const [mediaData, setMediaData] = React.useState([])
    async function fetch() {
        try {
            const response = await ParseService.Cloud.run("allPage", { include: "collection,category" })
            setPeopleData(response.filter(i => i.get('category')?.get('slug') == 'people'))
            setDocBookData(response.filter(i => i.get('category')?.get('slug') == 'doc-book'))
            setTutorialData(response.filter(i => i.get('category')?.get('slug') == 'tutorial'))
            setMediaData(response.filter(i => i.get('category')?.get('slug') == 'media'))
        } catch (error) {

        }
    }
    const router = useRouter()
    useEffect(() => {
        fetch()

        return () => {

        }
    }, [router.isReady])
    async function gotoSlug(slug) {
        try {
            const response = await ParseService.Cloud.run("firstCategory", { equal: `slug:${slug}` })
            router.push(`/search?category=${response.id}&slug=${response.get('title')}`)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <IndexLayout>
            <div>
                <SliderComponent></SliderComponent>
            </div>
            <div className="container mx-auto py-10 px-3">
                <div className='grid grid-cols-5 gap-4'>
                    <div className="md:col-span-3 flex flex-col gap-4 col-span-5">
                        <div>
                            <h1 className="under-secondary-line flex items-center justify-between">
                                คนต้นแบบคุณธรรม
                                <button className='main-button' onClick={() => gotoSlug('people')}>แสดงทั้งหมด <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button>
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {peopleData.slice(0,6).map((i, key) => <CardShow onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}

                            </div>
                        </div>
                        <div>
                            <h1 className="under-secondary-line flex items-center justify-between">
                                กระบวนการถอดบทเรียน
                                <button className='main-button' onClick={() => gotoSlug('tutorial')}>แสดงทั้งหมด <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button>
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {tutorialData.slice(0,6).map((i, key) => <CardShow onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}

                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2 col-span-5  flex flex-col gap-4">
                        <div>
                            <h1 className="under-secondary-line flex items-center justify-between">
                                สื่อคุณธรรม
                                <button className='main-button' onClick={() => gotoSlug('media')}>แสดงทั้งหมด <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button>
                            </h1>
                            <div className="grid grid-cols-1 gap-4">
                                {mediaData.slice(0,2).map((i, key) => <CardShow video={true} onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}
                                {mediaData.length < 1 && <div className='h-[300px] rounded-xl border flex items-center justify-center border-neutral-50'>
                                    ยังไม่มีเนื้อหาสำหรับสื่อคุณธรรม
                                </div>}
                            </div>
                        </div>
                        <div>
                            <h1 className="under-secondary-line flex items-center justify-between">
                                คู่มือ / Ebook
                                <button className='main-button' onClick={() => gotoSlug('doc-book')}>แสดงทั้งหมด <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button>
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                                {docBookData.slice(0,4).map((i, key) => <CardShow onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}
                                {docBookData.length < 1 && <div className='h-[300px] rounded-xl border flex items-center justify-center border-neutral-50  col-span-2'>
                                    ยังไม่มีเนื้อหาสำหรับคู่มือ / Ebook
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-primary-600 w-full flex justify-center pt-8 pb-3">
                <div className='w-full max-w-md'>
                    <input type="text" className='main-input text-2xl' placeholder='ค้นหาต้นแบบคุณธรรม' />
                </div>
            </div>
        </IndexLayout>
    )
}

export function CardShow({ bg, link, href, title, description, onClick, video, tagName, tagColor }) {
    // const router = useRouter()
    const checkLink = () => {
        if (link) {
            window.location.href = href
        } else {
            if (onClick) onClick()
        }

    }
    return <div className="card bg-base-100 shadow-xl hover:scale-95 transition-all cursor-pointer" onClick={checkLink}>
        <div style={{ backgroundImage: `url('${bg}')` }} className="bg-cover bg-no-repeat h-[190px] relative">

            <div className="absolute px-4 py-2 from-primary-600 via-transparent to-transparent top-0 left-0 bg-gradient-to-t w-full h-full flex flex-col justify-end items-start">
                <h2 className="text-lg font-semibold text-white  line-clamp-1">{title}</h2>
                <p className=" text-white truncate w-fit lg:max-w-[180px] md:max-w-[180px] sm:max-w-[250px] max-w-[200px]">{description}</p>
            </div>
            {video && <div className="absolute w-full h-full flex items-center justify-center"><i className="fas fa-play text-xl text-white bg-secondary-500 w-16 shadow-lg h-16 flex items-center justify-center rounded-full"></i></div>}
            {tagName && <span className={`absolute top-2 left-2 rounded-full px-3 text-white ${tagColor || 'bg-emerald-400'}`}>{tagName}</span>}
        </div>
    </div>
}
export function CardShowV2({ bg, link, href, title, description, onClick, video, tagName, tagColor, category }) {
    // const router = useRouter()
    const checkLink = () => {
        if (link) {
            window.location.href = href
        } else {
            if (onClick) onClick()
        }

    }
    return <div className="card shadow-xl hover:scale-95 transition-all cursor-pointer bg-primary-600" onClick={checkLink}>
        <div style={{ backgroundImage: `url('${bg}')` }} className="bg-cover bg-no-repeat h-[190px] rounded-b-3xl block">
            {video && <div className="absolute w-full h-full flex items-center justify-center"><i className="fas fa-play text-xl text-white bg-secondary-500 w-16 shadow-lg h-16 flex items-center justify-center rounded-full"></i></div>}
            {tagName && <span className={`absolute top-2 left-2 rounded-full px-3 text-white ${tagColor || 'bg-emerald-400'}`} style={{backgroundColor: tagColor}}>{tagName}</span>}
            {category && <span className={`absolute top-10 left-2 rounded-full px-3 text-black bg-white`}>{category}</span>}
        </div>
        <div className="card-body">
            <div className=" flex flex-col justify-end items-start">
                <h2 className="text-lg font-semibold text-white  line-clamp-1">{title}</h2>
                <p className=" text-white truncate w-fit lg:max-w-[180px] md:max-w-[180px] sm:max-w-[250px] max-w-[200px]">{description}</p>
            </div>
        </div>

    </div>
}