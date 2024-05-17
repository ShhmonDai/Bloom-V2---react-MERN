import { Avatar, Dropdown, Navbar} from "flowbite-react";
import { Link, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from "../redux/user/userSlice";
import { Flowbite } from 'flowbite-react';

import { FaToriiGate, FaBrain, FaDumbbell } from "react-icons/fa";
import { BsYinYang } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";




const customNavTheme = {
  navbar: {
    "root": {
      "base": "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4",
      "rounded": {
        "on": "rounded",
        "off": ""
    },
      "bordered": {
        "on": "border",
        "off": ""
    },
      "inner": {
        "base": "mx-auto flex-col sm:flex items-center",
        "fluid": {
          "on": "",
          "off": "container"
      }
      }
    },
    "brand": {
      "base": "flex items-center"
  },
    "collapse": {
      "base": "w-full sm:block sm:w-auto sm:items-center",
      "list": "mt-4 flex flex-col sm:mt-0 sm:flex-row sm:space-x-8 sm:text-sm sm:font-medium",
      "hidden": {
        "on": "hidden",
        "off": ""
    }
    },
    "link": {
      "base": "block py-2 pr-4 pl-3 md:p-0",
      "active": {
        "on": "bg-blue-400 dark:bg-blue-500 text-gray-900 dark:text-white sm:text-blue-400 sm:bg-transparent dark:sm:bg-transparent sm:dark:text-blue-400",
        "off": "border-b border-gray-100  text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-white sm:border-0 sm:hover:bg-transparent sm:hover:text-cyan-700 sm:dark:hover:bg-transparent sm:dark:hover:text-blue-300"
    },
      "disabled": {
        "on": "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        "off": ""
    }
    },
    "toggle": {
      "base": "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 sm:hidden",
      "icon": "h-5 w-5 shrink-0"
  },
  
  }, 
  button: {
    "base": "group flex items-stretch items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow]",
    "fullSized": "w-full",
    "color": {
      "dark": "text-white bg-gray-800 border border-transparent enabled:hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:bg-gray-800 dark:enabled:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700",
      "failure": "text-white bg-red-700 border border-transparent enabled:hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:enabled:hover:bg-red-700 dark:focus:ring-red-900",
      "gray": "text-gray-900 bg-white border border-gray-200 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 :ring-cyan-700 focus:text-cyan-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:enabled:hover:text-white dark:enabled:hover:bg-cyan-800 focus:ring-4",
      "info": "text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800",
      "light": "text-gray-900 bg-white border border-gray-300 enabled:hover:bg-gray-100 focus:ring-4 focus:ring-cyan-300 dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:enabled:hover:bg-gray-700 dark:enabled:hover:border-gray-700 dark:focus:ring-gray-700",
      "purple": "text-white bg-purple-700 border border-transparent enabled:hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:enabled:hover:bg-purple-700 dark:focus:ring-purple-900",
      "success": "text-white bg-green-700 border border-transparent enabled:hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:enabled:hover:bg-green-700 dark:focus:ring-green-800",
      "warning": "text-white bg-yellow-400 border border-transparent enabled:hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-900",
      "blue": "text-white bg-blue-700 border border-transparent enabled:hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
      "cyan": "text-cyan-900 bg-white border border-cyan-300 enabled:hover:bg-cyan-100 focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:text-white dark:border-cyan-600 dark:enabled:hover:bg-cyan-700 dark:enabled:hover:border-cyan-700 dark:focus:ring-cyan-700",
      "green": "text-green-900 bg-white border border-green-300 enabled:hover:bg-green-100 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:text-white dark:border-green-600 dark:enabled:hover:bg-green-700 dark:enabled:hover:border-green-700 dark:focus:ring-green-700",
      "indigo": "text-indigo-900 bg-white border border-indigo-300 enabled:hover:bg-indigo-100 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:text-white dark:border-indigo-600 dark:enabled:hover:bg-indigo-700 dark:enabled:hover:border-indigo-700 dark:focus:ring-indigo-700",
      "lime": "text-lime-900 bg-white border border-lime-300 enabled:hover:bg-lime-100 focus:ring-4 focus:ring-lime-300 dark:bg-lime-600 dark:text-white dark:border-lime-600 dark:enabled:hover:bg-lime-700 dark:enabled:hover:border-lime-700 dark:focus:ring-lime-700",
      "pink": "text-pink-900 bg-white border border-pink-300 enabled:hover:bg-pink-100 focus:ring-4 focus:ring-pink-300 dark:bg-pink-600 dark:text-white dark:border-pink-600 dark:enabled:hover:bg-pink-700 dark:enabled:hover:border-pink-700 dark:focus:ring-pink-700",
      "red": "text-red-900 bg-white border border-red-300 enabled:hover:bg-red-100 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:text-white dark:border-red-600 dark:enabled:hover:bg-red-700 dark:enabled:hover:border-red-700 dark:focus:ring-red-700",
      "teal": "text-teal-900 bg-white border border-teal-300 enabled:hover:bg-teal-100 focus:ring-4 focus:ring-teal-300 dark:bg-teal-600 dark:text-white dark:border-teal-600 dark:enabled:hover:bg-teal-700 dark:enabled:hover:border-teal-700 dark:focus:ring-teal-700",
      "yellow": "text-yellow-900 bg-white border border-yellow-300 enabled:hover:bg-yellow-100 focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-600 dark:text-white dark:border-yellow-600 dark:enabled:hover:bg-yellow-700 dark:enabled:hover:border-yellow-700 dark:focus:ring-yellow-700"
    },
    "disabled": "cursor-not-allowed opacity-50",
    "isProcessing": "cursor-wait",
    "spinnerSlot": "absolute h-full top-0 flex items-center animate-fade-in",
    "spinnerLeftPosition": {
      "xs": "left-2",
      "sm": "left-3",
      "md": "left-4",
      "lg": "left-5",
      "xl": "left-6"
    },
    "gradient": {
      "cyan": "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
      "failure": "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800",
      "info": "text-white bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 ",
      "lime": "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-lime-300 dark:focus:ring-lime-800",
      "pink": "text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800",
      "purple": "text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800",
      "success": "text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800",
      "teal": "text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:ring-teal-300 dark:focus:ring-teal-800"
    },
    "gradientDuoTone": {
      "cyanToBlue": "text-white bg-gradient-to-r from-cyan-500 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
      "greenToBlue": "text-white bg-gradient-to-br from-green-400 to-cyan-600 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800",
      "pinkToOrange": "text-white bg-gradient-to-br from-pink-500 to-orange-400 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800",
      "purpleToBlue": "text-white bg-gradient-to-br from-purple-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800",
      "purpleToPink": "text-white bg-gradient-to-r from-purple-500 to-pink-500 enabled:hover:bg-gradient-to-l focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800",
      "redToYellow": "text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-red-100 dark:focus:ring-red-400",
      "tealToLime": "text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 focus:ring-4 focus:ring-lime-200 dark:focus:ring-teal-700",
      "skyToBlue": "text-white bg-gradient-to-br from-sky-600 to-cyan-500 enabled:hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800"
    },
    "inner": {
      "base": "flex items-stretch items-center transition-all duration-200",
      "position": {
        "none": "",
        "start": "rounded-r-none",
        "middle": "rounded-none",
        "end": "rounded-l-none"
      },
      "outline": "border border-transparent",
      "isProcessingPadding": {
        "xs": "pl-8",
        "sm": "pl-10",
        "md": "pl-12",
        "lg": "pl-16",
        "xl": "pl-20"
      }
    },
    "label": "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
    "outline": {
      "color": {
        "gray": "border border-gray-900 dark:border-white",
        "default": "border-0",
        "light": ""
      },
      "off": "",
      "on": "flex justify-center bg-white text-gray-900 transition-all duration-200 ease-in group-enabled:group-hover:bg-[rgba(0,0,0,0)] group-enabled:group-hover:text-inherit dark:bg-[rgba(31,41,55,0.9)] dark:text-white w-full",
      "pill": {
        "off": "rounded-md",
        "on": "rounded-full"
      }
    },
    "pill": {
      "off": "rounded-lg",
      "on": "rounded-full"
    },
    "size": {
      "xs": "text-xs px-2 py-1",
      "sm": "text-sm px-3 py-1.5",
      "md": "text-sm px-4 py-2",
      "lg": "text-base px-5 py-2.5",
      "xl": "text-base px-6 py-3"
    }
  }, textInput: {
    "base": "flex",
    "addon": "inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-500 dark:text-gray-400",
    "field": {
      "input": {
        "base": "block w-full border disabled:cursor-not-allowed disabled:opacity-50",
        "sizes": {
          "sm": "p-2 sm:text-xs",
          "md": "p-2.5 text-sm",
          "lg": "sm:text-md p-4"
        },
        "colors": {
          "gray": "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-[rgba(0,0,0,0.4)] dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-100 dark:focus:ring-cyan-500",
          "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
        }
      }
    }
  }, fileInput: {
    "root": {
      "base": "flex"
  },
    "field": {
      "base": "relative w-full",
      "input": {
        "base": "rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50",
        "sizes": {
          "sm": "sm:text-xs",
          "md": "text-sm",
          "lg": "sm:text-md"
      },
        "colors": {
          "gray": "bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-[rgba(0,0,0,0.4)] dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          "info": "border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500",
          "failure": "border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500",
          "warning": "border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500",
          "success": "border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500"
      }
      }
    }
  }, 
};
  




export default function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user);

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
    <Flowbite theme={{ theme: customNavTheme }}>


      <div className='w-full px-8 pt-3 pb-12 sm:pb-2 hidden sm:flex sm:text-center sm:justify-center dark:bg-[rgba(0,0,0,0.4)]'>

        {/* middle */}
        <div className='w-100 flex flex-col justify-start sm:justify-center sm:text-center'>
          <Link to='/' className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl sm:text-center font-QwigleyFont'>Bloom</Link>
        </div>

      </div>


      <Navbar className='border-y-[1px] sm:sticky top-0 z-10 sm:backdrop-blur transition-all duration-500 bg-white dark:bg-[rgba(0,0,0,0.4)]'>
      

      {/* Navbar Elements */}
      <div className='flex gap-6 justify-start'>  
          <Link to='/' className='text-5xl font-QwigleyFont sm:hidden'>Bloom</Link>

          <div className='flex gap-2 absolute right-5 '>

          <div className='sm:hidden'>
          {currentUser ? (
            <Dropdown className='position:absolute' arrowIcon={false} inline label={<Avatar alt='user' img={currentUser.profilePicture} color="light" rounded />}>
              <Dropdown.Header>
                <span className='block text-sm'>@{currentUser.username}</span>
                <span className='block text-sm font-medium truncate'>
                  {currentUser.email}
                </span>
              </Dropdown.Header>
              <Link to={'/dashboard?tab=profile'}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Link to={'/profile?tab=body'}>
                  <Dropdown.Item>Goals</Dropdown.Item>
              </Link>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
            </Dropdown>

            ) :
            (
            <Link to='/sign-in'>
                <div className='pt-1.5 font-bold'>
                  Sign In
                </div>
              </Link>
            )
          }
          
        </div>  
          <Navbar.Toggle className='' />
          
        </div>  
      

      </div>


      <Navbar.Collapse>

          {currentUser ? (
            <div className="sm:flex sm:flex-row sm:justify-around sm:text-md">
              <Navbar.Link className='flex gap-2 items-center' active={path === "/"} as={Link} to='/'>
                < FaToriiGate /> HOME
              </Navbar.Link>
              
              <div className="sm:flex sm:flex-row sm:gap-1 md:gap-4 sm:text-md sm:mx-20 md:mx-24">
                <Navbar.Link className='flex gap-2 items-center' active={path === '/profile?tab=mind'} as={Link} to='/profile?tab=mind'>
                  < FaBrain /> MIND
                </Navbar.Link>
                <Navbar.Link className='flex gap-2 items-center' active={path === "/profile?tab=body"} as={Link} to='/profile?tab=body'>
                  < FaDumbbell /> BODY
                </Navbar.Link>
                <Navbar.Link className='flex gap-2 items-center' active={path === "/profile?tab=spirit"} as={Link} to='/profile?tab=spirit'>
                  < BsYinYang /> SPIRIT
                </Navbar.Link>    
              </div>

              <Navbar.Link className='flex gap-2 items-center' active={path === "/dashboard"} as={Link} to='/dashboard?tab=profile'>
                PROFILE < CgProfile /> 
              </Navbar.Link>           
            </div>
          ) :
            (
              <>
                <Navbar.Link className="flex gap-2 items-center" active={path === "/"} as={Link} to='/'>
                  < FaToriiGate /> HOME
                </Navbar.Link>
                <Navbar.Link active={path === "/about"} as={Link} to='/about'>
                  ABOUT
                </Navbar.Link>
                <Navbar.Link className='flex gap-2 items-center' active={path === "/sign-in"} as={Link} to='/sign-in'>
                  SIGN IN <FaToriiGate />
                </Navbar.Link>              
              </>
            )
          }
    
              
      </Navbar.Collapse>

    </Navbar>
    </Flowbite>
  )
}