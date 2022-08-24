import React from 'react'

export default function CategoryList({ bg, size, activeRoute }) {
    return (
        <div
            className={`${bg || "bg-gray-100"} rounded-3xl p-5 w-full grid grid-cols-5 justify-between gap-2 lg:gap-10`}
        >
            {Array.from({ length: 5 }, x => x).map((i,key) => <div key={key}>
                <div
                    className="md:h-[150px] sm:h-[100px] h-[70px] w-full rounded-3xl bg-cerise-500"
                ></div>
                
                {activeRoute == key && <div className="rounded-full  w-full h-4 mt-3 bg-cerise-500"></div>}
            </div>)}

        </div>
    )
}
