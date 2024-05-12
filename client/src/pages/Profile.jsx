import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileSidebar from '../components/ProfileSidebar';
import DashProfile from '../components/DashProfile';
import ProfileMind from '../components/ProfileMind';
import ProfileBody from '../components/ProfileBody';
import ProfileSpirit from '../components/ProfileSpirit';



export default function Profile() {
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

            {/* profile... */}
            {tab === 'profile' && <DashProfile />}
            {/* mind */}
            {tab === 'mind' && <ProfileMind />}
            {/* body */}
            {tab === 'body' && <ProfileBody />}
            {/* spirit */}
            {tab === 'spirit' && <ProfileSpirit />}

        </div>
    );
}