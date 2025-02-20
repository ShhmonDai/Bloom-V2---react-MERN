import { Footer } from "flowbite-react";
import { BsLinkedin, BsInstagram, BsGithub, BsLaptop } from 'react-icons/bs';
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function FooterCom() {

    {/* For use for the Wallpaper Engine page, if URL contains wallpaper=true the navbar will be hidden*/ }
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const [wallpaper, setWallpaper] = useState('');

    useEffect(() => {
        const weFromUrl = urlParams.get('wallpaper');
        if (weFromUrl) {
            setWallpaper(weFromUrl);
        }
    }, [location.search]);

    const showWallpaper = {
        '': '',
        'true': 'hidden',
    };


  return (
      <Footer container className={`border-t-2 dark:border-gray-700 bg-[rgba(0,0,0,0.0)] dark:bg-[rgba(0,0,0,0.2)] transition-colors duration-500 ${showWallpaper[wallpaper]} md:${showWallpaper[wallpaper]}`}>
        <div className='w-full mx-auto max-w-7xl'>

            <div className='grid-cols-2 w-full flex justify-around flex-wrap '>


                <div className={`items-center justify-left hidden sm:flex sm:${showWallpaper[wallpaper]} `}>
                        <Link to='/' className='text-6xl font-QwigleyFont dark:text-gray-200'>Bloom</Link>    
                </div>
                
                <div className='mt-3'>
                    <Footer.Title title='About' />
                    <Footer.LinkGroup col>
                        <Footer.Link as={Link} to='/about'> 
                            This Project
                        </Footer.Link>
                            <Footer.Link href='https://github.com/ShhmonDai/Bloom-V2---react-MERN' target='_blank' rel='noopener noreferrer'>
                            Source Code
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>

                <div className='mt-3'>
                    <Footer.Title title='Follow Me' />
                    <Footer.LinkGroup col>
                        <Footer.Link href='https://www.shhmon.com' target='_blank' rel='noopener noreferrer'>
                            Shhmon.com
                        </Footer.Link>
                        <Footer.Link href='https://github.com/ShhmonDai' target='_blank' rel='noopener noreferrer'>
                            Github
                        </Footer.Link>
                    </Footer.LinkGroup>
                </div>

            </div>

            <Footer.Divider />

            <div className='grid w-full sm:flex justify-center sm:justify-around'>
                    <Footer.Copyright href='#' by="Szymon Pozniewski" year={new Date().getFullYear()}/>
                <div className='flex gap-6 mt-4 sm:mt-0'>
                    <Footer.Icon href='https://www.linkedin.com/in/shhmon/' target='_blank' rel='noopener noreferrer' icon={BsLinkedin} />
                    <Footer.Icon href='https://github.com/ShhmonDai' target='_blank' rel='noopener noreferrer' icon={BsGithub} />
                    <Footer.Icon href='https://www.shhmon.com' target='_blank' rel='noopener noreferrer' icon={BsLaptop} />
                    <Footer.Icon href='https://instagram.com/shh.mon' target='_blank' rel='noopener noreferrer' icon={BsInstagram} />
                </div>
            </div>

        
        </div>                  
    </Footer>
  )
}