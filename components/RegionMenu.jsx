import React from 'react'

export default function RegionMenu() {
    return (
        <div className='flex gap-4 items-center flex-wrap'>

            <div className="flex gap-2 flex-wrap">
                <button className="main-button min-w-min">ภาคเหนือ</button>
                <button className="main-button min-w-min">ภาคอีสาน</button>
                <button className="main-button min-w-min">ภาคกลาง/ตะวันตก</button>
                <button className="main-button min-w-min">กรุงเทพฯ/ตะวันออก</button>
                <button className="main-button min-w-min">ภาคใต้</button>
            </div>
            <div className='flex gap-4 w-full lg:w-[300px]'>
                <select className='main-input'>
                    <option value="">จังหวัด</option>
                </select>
                <select className='main-input'>
                    <option value="">อำเภอ</option>
                </select>
            </div>
        </div>
    )
}
