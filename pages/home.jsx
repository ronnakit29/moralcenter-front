import { useRouter } from 'next/router'
import React from 'react'
import { useEffect } from 'react'
import IndexLayout from '../components/IndexLayout'
import SliderComponent from '../components/SliderComponent'
import ParseService from '../plugins/ParseService'
import { replaceString } from './search'

export default function home() {
    const [data, setData] = React.useState([])
    const lorem = ["Burgdoggen cupim ground round shankle.  Drumstick sed salami, nulla bresaola pancetta tenderloin meatball ball tip dolore dolor andouille.  Ut proident culpa, ad leberkas exercitation sint pancetta shoulder elit sirloin minim sausage eiusmod.  Occaecat jerky sint, tenderloin esse beef ribs proident ex shankle spare ribs pariatur.  Magna venison beef eu filet mignon ground round.  Venison elit occaecat, ex enim kielbasa laboris.  Shoulder dolore et, bresaola sausage ullamco fugiat picanha jerky labore meatloaf.", "Doner ham hock laborum proident, adipisicing meatloaf non jowl in tongue.  Leberkas eiusmod duis sirloin lorem kevin nostrud commodo ut dolore bacon adipisicing minim.  Tail deserunt ham esse cow fatback.  Tempor spare ribs shankle aliquip landjaeger fugiat dolore.  Tempor prosciutto pork belly ham hock ball tip ipsum.", "Bresaola landjaeger dolore, nulla aliqua voluptate laboris esse ground round elit ullamco.  Capicola esse est meatball laboris incididunt tri-tip elit tenderloin.  Laborum jerky officia landjaeger exercitation, quis cupim magna in aute.  Tail sint hamburger ut jowl magna cupim eiusmod in short ribs pastrami ribeye chicken.  In rump laborum bresaola.  Tri-tip ut ut, picanha jerky pancetta in velit magna eu porchetta.  Ground round flank officia frankfurter nisi reprehenderit.", "Enim shank corned beef, short loin ut proident burgdoggen chicken kielbasa nulla nostrud culpa magna buffalo exercitation.  Consectetur exercitation mollit cow minim est.  Reprehenderit quis tri-tip, ex spare ribs pariatur id cupim picanha prosciutto sint.  Dolore incididunt dolore, cow proident ball tip id filet mignon pork belly sint spare ribs ribeye boudin meatball.  Et occaecat beef ribs in cupidatat quis ribeye shoulder mollit.  Prosciutto in tempor, non tenderloin sint filet mignon magna veniam.  Ribeye bresaola ball tip anim, est excepteur veniam.", "Venison beef ribs laborum, veniam landjaeger shoulder shankle.  Kevin brisket eu leberkas sed pork chop kielbasa aliqua culpa.  Prosciutto esse voluptate tenderloin pig anim meatloaf nulla picanha jerky short loin.  In est qui, labore jerky laborum pastrami leberkas aliquip reprehenderit shank boudin meatball strip steak dolor.  Meatloaf ad t-bone prosciutto, shankle ground round cupidatat et swine short ribs.  Ad in landjaeger sed turducken nulla chicken duis short loin incididunt exercitation.  Non fatback porchetta turkey rump proident, pastrami burgdoggen do velit quis."]
    async function fetch() {
        try {
            const response = await ParseService.Cloud.run("allPage", { include: "collection,category" })
            setData(response)
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
                                {data.filter(i => i.get('category')?.get('slug') == 'people').map((i, key) => <CardShow onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}

                            </div>
                        </div>
                        <div>
                            <h1 className="under-secondary-line flex items-center justify-between">
                                กระบวนการถอดบทเรียน
                                <button className='main-button' onClick={() => gotoSlug('tutorial')}>แสดงทั้งหมด <i className="fas fa-chevron-right"></i><i className="fas fa-chevron-right"></i></button>
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                {data.filter(i => i.get('category')?.get('slug') == 'tutorial').map((i, key) => <CardShow onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}

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
                                {data.filter(i => i.get('ebook')?.get('slug') == 'media').map((i, key) => <CardShow video={true} onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}
                                {data.filter(i => i.get('ebook')?.get('slug') == 'media').length < 1 && <div className='h-[300px] rounded-xl border flex items-center justify-center border-neutral-50'>
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
                                {data.filter(i => i.get('ebook')?.get('slug') == 'doc-book').map((i, key) => <CardShow onClick={() => router.push(`/page/${i.id}?slug=${i.get('title')}`)} tagName={i.get('collection')?.get('title')} key={key} bg={i.get("coverUrl")} title={i.get('title')} description={replaceString(i, i.get('category')?.get('templateString') || '')}></CardShow>)}
                                {data.filter(i => i.get('ebook')?.get('slug') == 'doc-book').length < 1 && <div className='h-[300px] rounded-xl border flex items-center justify-center border-neutral-50  col-span-2'>
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
            {tagName && <span className={`absolute top-2 left-2 rounded-full px-3 text-white ${tagColor || 'bg-emerald-400'}`}>{tagName}</span>}
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