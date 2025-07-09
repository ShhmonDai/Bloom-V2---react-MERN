import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import UserProfile from '../components/UserProfile';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashboardComp';
import DashAiUsage from '../components/DashAiUsage';
import DashWatsonUsage from '../components/DashWatsonUsage';


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <UserProfile />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {/* user AI usage */}
      {tab === 'ai-usage' && <DashAiUsage />}
      {/* user Watson usage */}
      {tab === 'watson-usage' && <DashWatsonUsage />}
    </div>
  );
}