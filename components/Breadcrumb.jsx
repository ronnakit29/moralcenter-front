import React from 'react'

export default function Breadcrumb({ pages }) {
    const joinBy = (key) => <i key={key} className="fas fa-chevron-right text-primary-600"></i>
    const showPage = pages.filter(i => i).map((t, k) => k == 0 ? <span className='main-button' key={k}>{t}</span> : <span className='text-primary-600 text-lg' key={k}>{t}</span>)
        .reduce((prev, curr) => [prev, joinBy(curr), curr])
    return (
        <div className='flex gap-2 items-center'>
            {showPage}
        </div>
    )
}
