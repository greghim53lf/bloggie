import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sidebar } from 'flowbite-react'
import { FaArrowAltCircleRight, FaUser } from 'react-icons/fa'

export default function DashBoardSideBar() {
    const location = useLocation()
    const [tab, setTab] = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabValue = urlParams.get('tab')
        tabValue && setTab(tabValue)
    }, [location.search])

    return <Sidebar  className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link>
                <Sidebar.Item active={tab === 'profile'} icon={FaUser} label={'User'} labelColor='dark'>Profile</Sidebar.Item>
                </Link>
                <Sidebar.Item icon={FaArrowAltCircleRight} className='cursor-pointer'>Sign Out</Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
}