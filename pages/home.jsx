import Head from 'next/head'
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
            const responsePeople = await ParseService.Cloud.run("getSingleType", { ref: "index_people" })
            const responseBook = await ParseService.Cloud.run("getSingleType", { ref: "index_doc_book" })
            const responseTutorial = await ParseService.Cloud.run("getSingleType", { ref: "index_tutorial" })
            const responseMedia = await ParseService.Cloud.run("getSingleType", { ref: "index_media" })
            const peopleData = [
                responsePeople.get('blog1'),
                responsePeople.get('blog2'),
                responsePeople.get('blog3'),
                responsePeople.get('blog4'),
                responsePeople.get('blog5'),
                responsePeople.get('blog6'),
            ]
            const docBookData = [
                responseBook.get('blog1'),
                responseBook.get('blog2'),
                responseBook.get('blog3'),
                responseBook.get('blog4'),
            ]
            const tutorialData = [
                responseTutorial.get('blog1'),
                responseTutorial.get('blog2'),
                responseTutorial.get('blog3'),
                responseTutorial.get('blog4'),
                responseTutorial.get('blog5'),
                responseTutorial.get('blog6'),
            ]
            const mediaData = [
                responseMedia.get('blog1'),
                responseMedia.get('blog2'),
            ]
            setPeopleData(peopleData.filter(i => i))
            setDocBookData(docBookData.filter(i => i))
            setTutorialData(tutorialData.filter(i => i))
            setMediaData(mediaData.filter(i => i))
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
        <WebTitle title={"หน้าหลัก"}></WebTitle>
            <div className="container mx-auto py-10 px-3">
                <div className='grid grid-cols-5 gap-4'>
                    <div className="md:col-span-3 flex flex-col gap-4 col-span-5">
                        <div>
                            <h1 className="under-secondary-line flex items-center justify-between">
                                คนต้นแบบคุณธรรม
                                <button className='main-button' onClick={() => gotoSlug('people')}>แสดงทั้งหมด <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button>
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {peopleData.slice(0, 6).map((i, key) => <CardShow tagColor={i.get('collection')?.get('color')} onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}

                            </div>
                        </div>
                        <div>
                            <h1 className="under-secondary-line flex items-center justify-between">
                                กระบวนการถอดบทเรียน
                                <button className='main-button' onClick={() => gotoSlug('tutorial')}>แสดงทั้งหมด <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button>
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {tutorialData.slice(0, 6).map((i, key) => <CardShow tagColor={i.get('collection')?.get('color')} onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}

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
                                {mediaData.slice(0, 2).map((i, key) => <CardShow tagColor={i.get('collection')?.get('color')} video={true} onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}
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
                                {docBookData.slice(0, 4).map((i, key) => <CardShow tagColor={i.get('collection')?.get('color')} onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}
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
                    <input type="text" className='main-input text-2xl' onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            router.push(`/search?input=${e.target.value}&mode=search`)
                        }
                    }} placeholder='ค้นหาต้นแบบคุณธรรม' />
                </div>
            </div>
        </IndexLayout>
    )
}

export function WebTitle({ title }) {
    return <Head>
        <title>{title} - องค์ความรู้ชุมชนท้องถิ่นคุณธรรมต้นแบบ</title>
    </Head>
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
                <div className=" text-white truncate w-full">{description}</div>
            </div>
            {video && <div className="absolute w-full h-full flex items-center justify-center"><i className="fas fa-play text-xl text-white bg-secondary-500 w-16 shadow-lg h-16 flex items-center justify-center rounded-full"></i></div>}
            {tagName && <span className={`absolute top-2 left-2 rounded-full px-3 text-white ${tagColor || 'bg-emerald-400'}`} style={{ backgroundColor: tagColor }}>{tagName}</span>}
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
        <div style={{ backgroundImage: `url('${bg}')` }} className="bg-cover bg-no-repeat h-[190px] rounded-b-3xl block relative">
            {video && <div className="absolute w-full h-full flex items-center justify-center"><i className="fas fa-play text-xl text-white bg-secondary-500 w-16 shadow-lg h-16 flex items-center justify-center rounded-full"></i></div>}
            {tagName && <span className={`absolute top-2 left-2 rounded-full px-3 text-white ${tagColor || 'bg-emerald-400'}`} style={{ backgroundColor: tagColor }}>{tagName}</span>}
            {category && <div className='absolute bottom-2 w-full flex justify-center'><span className={` left-auto right-auto rounded-full px-3 text-black bg-white`}>{category}</span></div>}
        </div>
        <div className="card-body">
            <div className=" flex flex-col justify-end items-start">
                <h2 className="text-lg font-semibold text-white  line-clamp-1">{title}</h2>
                <div className=" text-white truncate w-full ">{description}</div>
            </div>
        </div>

    </div>
}