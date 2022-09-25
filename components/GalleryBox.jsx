import React from 'react'

export default function GalleryBox({ items }) {
    const [current, setCurrent] = React.useState(0)
    const [show, setShow] = React.useState(false)
    function handlerShow(index) {
        setShow(true)
        setCurrent(index)
    }
    return (
        <div>
            <div className="mb-5 grid lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 grid-cols-2  gap-4">
                {items.map((i, key) => <img key={key} className='transition-all hover:scale-105 transform cursor-pointer h-[200px]' src={i} onClick={() => handlerShow(key)} />)}
            </div>
            {show && <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-30 flex items-center justify-center'  >
                <div id="close" className='w-screen h-screen absolute z-0' onClick={()=>setShow(false)}></div>
                <img src={items[current]} className="w-full max-w-[900px] z-10 p-3 rounded-3xl bg-white animate__animated animate__fadeIn animate__faster" alt="" />
                {items[current - 1] && <button onClick={() => setCurrent(current - 1)} className='absolute left-5 z-20 transition-all transform hover:scale-105'><i className="fas fa-chevron-left text-7xl text-white"></i></button>}
                {items[current + 1] && <button onClick={() => setCurrent(current + 1)} className='absolute right-5 z-20 transition-all transform hover:scale-105'><i className="fas fa-chevron-right text-7xl text-white"></i></button>}
            </div>}
        </div>
    )
}
