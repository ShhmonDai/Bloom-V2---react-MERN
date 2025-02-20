import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserProfile from '../components/UserProfile';
import Dashboard from '../components/ProfileDash';
import WallpaperMind from '../components/WallpaperMind';
import ProfileBody from '../components/ProfileBody';
import ProfileSpirit from '../components/ProfileSpirit';
import Journal from '../components/Journal';
import Habits from '../components/Habits';



export default function WallpaperEngine() {

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
        <div className='min-h-screen'>

            {/* dashboard... */}
            {tab === 'dashboard' && <Dashboard />}
            {/* profile... */}
            {tab === 'profile' && <UserProfile />}
            {/* mind */}
            {tab === 'mind' && <WallpaperMind />}
            {/* body */}
            {tab === 'body' && <ProfileBody />}
            {/* spirit */}
            {tab === 'spirit' && <ProfileSpirit />}
            {/* journal */}
            {tab === 'journal' && <Journal />}
            {/* habits */}
            {tab === 'habits' && 
            
            
            <div className='flex flex-col min-h-screen items-center bg-gradient-to-b from-white via-indigo-100 to-indigo-50 gap-2 pb-24'>
                    {/* Habits Intro*/}
                    <div className='px-5 pt-10 sm:px-10 flex flex-col justify-center items-center'>
                        <h1 className='font-BrushFont text-7xl sm:text-8xl'>Habits</h1>
                        <p className='text-wrap break-words italic max-w-4xl'>Welcome to the Habits, where transformation begins with small, 
                            consistent actions. Here, you can cultivate a lifestyle of growth by creating recurring habits that nurture your mind, body, and spirit. 
                            Whether it's a daily meditation practice to center your mind, a workout routine to strengthen your body, 
                            or moments of gratitude to uplift your spirit, Bloom empowers you to mark each accomplishment and track your streaks, 
                            fostering a journey of continuous improvement and well-being. </p>
                    </div>
                    <Habits />
            </div>
            
            }

        </div>
    );
}