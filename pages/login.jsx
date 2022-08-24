import React from 'react'
import Layout from '../components/Layout'

export default function login() {
    function onLogin(e) {
        e.preventDefault()
    }
    return (
        <Layout>
        <div className="py-10 flex items-center justify-center px-3 flex-col">
            <div className="mb-5">
                <h1 className="text-2xl font-semibold text-primary-600 text-center">
                    องค์ความรู้ชุมชนท้องถิ่นคุณธรรมต้นแบบ
                </h1>
                <p className="text-center text-primary-500">เข้าสู่ระบบแอดมิน</p>
            </div>
            <div
                className="rounded-2xl shadow-lg py-10 px-5 border-primary-600 border border-b-4 w-full max-w-lg"
            >
                <div>
                    <form onSubmit={onLogin} className="flex flex-col items-center">
                        <div className="py-2 w-full">
                            <input type="text" className="main-input" placeholder="ชื่อผู้ใช้งาน" />
                        </div>
                        <div className="py-2 w-full">
                            <input type="password" className="main-input" placeholder="รหัสผ่าน" />
                        </div>
                        <div className="py-2"></div>
                        <button type="submit" className="main-button">เข้าสู่ระบบ</button>
                        <p className="text-secondary-500 text-sm pt-5">** หากลืมรหัสผ่านโปรดติดต่อผู้ดูแลผู้ใช้งานของคุณ **</p>
                    </form>
                </div>
            </div>
        </div></Layout>
    )
}
