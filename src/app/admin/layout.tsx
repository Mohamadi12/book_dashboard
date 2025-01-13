import React from 'react'
import { auth } from '../auth'
import { redirect } from 'next/navigation'

import "@/styles/admin.css"
import Sidebar from '@/components/admin/Sidebar'
import Header from '@/components/admin/Header'

type Props = {
    children: React.ReactNode
}
const Layout = async({children}: Props) => {
    const session = await auth()

    if(!session?.user?.id) redirect('/sign-in')


  return (
    <main className="flex min-h-screen w-full flex-row">
        <Sidebar session={session}/>

        <div className="admin-container">
            <Header session={session}/>
            {children}
        </div>
    </main>
  )
}

export default Layout