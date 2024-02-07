import DashBoardMain from '../components/DashBoardMain'
import DashBoardSideBar from '../components/DashBoardSideBar'
import {useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom'

export default function Dashboard() {
  const location = useLocation()
  const [tab, setTab] = useState('')
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabValue = urlParams.get('tab')
    tabValue && setTab(tabValue)
  }, [location.search])
  
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* sidebar */}
      <div className='md:w-56'>
      <DashBoardSideBar/>
      </div>

      {/* main */}
      {tab === 'profile' && <DashBoardMain/>}
    </div>
  )
}