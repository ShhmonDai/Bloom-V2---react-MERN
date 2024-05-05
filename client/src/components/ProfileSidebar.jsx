import { Sidebar, Navbar } from 'flowbite-react';
import { HiAnnotation, HiArrowSmRight, HiChartPie, HiDocumentText, HiOutlineUserGroup, HiUser } from 'react-icons/hi';
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

export default function ProfileSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);

    const path = useLocation().pathname;

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

        <Sidebar theme={customTheme} className='w-full md:w-56 sm:hidden'>
            <Sidebar.Items className=''>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>

        

                    {currentUser && (
                        <Link to='/profile?tab=mind'>
                            <Sidebar.Item active={tab === 'mind'} icon={HiOutlineUserGroup} as='div'>
                                Mind
                            </Sidebar.Item>
                        </Link>
                    )}

                    {currentUser && (
                        <Link to='/profile?tab=body'>
                            <Sidebar.Item active={tab === 'body'} icon={HiOutlineUserGroup} as='div'>
                                Body
                            </Sidebar.Item>
                        </Link>
                    )}

                    {currentUser && (
                        <Link to='/profile?tab=spirit'>
                            <Sidebar.Item active={tab === 'spirit'} icon={HiOutlineUserGroup} as='div'>
                                Spirit
                            </Sidebar.Item>
                        </Link>
                    )}


                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>

    );
}