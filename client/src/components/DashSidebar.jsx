import { Sidebar } from 'flowbite-react';
import {HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser} from 'react-icons/hi';
import { BsStars } from "react-icons/bs";
import { FaMoon, FaSun } from 'react-icons/fa';
import { toggleTheme } from "../redux/theme/themeSlice";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from "../redux/user/userSlice";

const customTheme = {
     "root": {
        "base": "h-full",
        "collapsed": {
            "on": "w-16",
            "off": "w-64"
        },
        "inner": "h-full overflow-y-auto overflow-x-hidden border-r-2 bg-[rgba(0,0,0,0.1)] dark:border-gray-700 py-4 px-3 md:backdrop-blur dark:bg-[rgba(0,0,0,0.1)] transition-colors duration-500"
    },
};


export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);
    const { theme } = useSelector((state) => state.theme);


    const [tab, setTab] = useState('');
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);

    
    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    
  return (

      <Sidebar theme={customTheme} className='w-full md:w-56'>
        <Sidebar.Items className=''>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                
                  {currentUser && currentUser.isAdmin && (
                      <Link to='/dashboard?tab=dash'>
                          <Sidebar.Item
                              active={tab === 'dash' || !tab}
                              icon={HiChartPie}
                              as='div'
                          >
                              Dashboard
                          </Sidebar.Item>
                      </Link>
                  )}
                
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? 'Admin' : 'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                </Link>


                {currentUser.isAdmin && (
                    <Link to='/dashboard?tab=users'>
                    <Sidebar.Item active={tab === 'users'} icon={HiOutlineUserGroup} as='div'>
                        Users
                    </Sidebar.Item>
                    </Link>
                )}

                {currentUser.isAdmin && (
                    <Link to='/dashboard?tab=ai-usage'>
                        <Sidebar.Item active={tab === 'ai-usage'} icon={BsStars} as='div'>
                            AI Usage
                        </Sidebar.Item>
                    </Link>
                )}

                {currentUser.isAdmin && (
                    <Link to='/dashboard?tab=watson-usage'>
                        <Sidebar.Item active={tab === 'watson-usage'} icon={HiDocumentText} as='div'>
                            Watson Usage
                        </Sidebar.Item>
                    </Link>
                )}

   
                <Sidebar.Item icon={HiAnnotation} className='cursor-pointer' label={theme === 'dark' ? <FaMoon /> : <FaSun />} labelColor='dark' onClick={() => dispatch(toggleTheme())}>
                    THEME
                </Sidebar.Item> 

                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                    Sign Out
                </Sidebar.Item> 

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>

  );
}