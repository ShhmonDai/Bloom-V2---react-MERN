import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdOutlineChecklist, MdOutlineTimeline } from "react-icons/md";
import { LuWallpaper } from "react-icons/lu";


export default function News() {

    const { currentUser, error, loading } = useSelector(state => state.user);


    return (
        <div className='w-full min-h-screen dark:bg-white'>

            <div className='text-md flex flex-col items-center justify-center mx-auto gap-2 max-w-5xl px-5 sm:px-10 text-left text-gray-900 dark:text-gray-400 dark:bg-black dark:bg-opacity-40'>


                <h1 className='text-3xl lg:text-5xl font-bold text-center mt-10 mb-7'>
                    Introducing the Bloom News Page!
                </h1>

                <h1 className='text-xl text-center text-gray-600 sm:px-10'>
                    Stay up-to-date with all the exciting updates, new features, and enhancements happening at Bloom Habits. 
                    Whether we're adding new tools to help you track your growth, introducing fresh resources to support your journey, or sharing inspiring tips, 
                    this is the place to find it all. We’re constantly improving to help you bloom into your best self—check back often for the latest updates and news!
                </h1>
            </div>    

            <div className='mt-10 text-md w-full text-center flex flex-col items-center rounded-t-[50px] bg-gradient-to-b from-blue-200 via-[#ceecfa] to-transparent text-gray-700 '>
                <div className='max-w-4xl  pb-10 flex flex-col gap-4'>

                    <h1 className='text-3xl font-semibold flex flex-col text-center items-center mt-7'>

                        <MdOutlineChecklist className='text-center text-3xl text-blue-500 my-2' />

                        <h1>Now In Bloom</h1>

                    </h1>

                    <p className='text-left px-5 sm:px-10 flex flex-col gap-2'>

                        <span><b>1.</b> Use the new <b>Bloom Desktop Wallpaper</b> as a permanent live and interactable desktop background through Wallpaper Engine! </span>

                        <span><b>2.</b> <b>Current Time Position Marker</b> on the Habits Timeline. Now you can immediately tell which Habit deadline is approaching. </span>

                        <span><b>3.</b> Various bug fixes and UI/UX adjustments to make your experience smoother.</span>
                    </p>  


                    <h1 className='text-3xl font-semibold flex flex-col text-center items-center mt-7'>

                        <LuWallpaper className='text-center text-3xl text-blue-500 my-2' />

                        <h1>Interactable Desktop Wallpaper</h1>

                    </h1>

                    <p className='text-left px-5 sm:px-10 text-wrap break-words whitespace-pre-wrap flex flex-col gap-4'>
                        <span>
                            Introducing the <b>Bloom Desktop Wallpaper</b> – a sleek, interactive tool designed to elevate your habit tracking experience right from your desktop! 
                            Available through <b>Wallpaper Engine</b> on Steam, this custom wallpaper turns your desktop into a powerful productivity hub. 
                            Wallpaper Engine’s Chromium-based framework allows websites to be used as dynamic backgrounds, and we’ve taken full advantage of this to bring you a unique, 
                            engaging experience tailored to your habit tracking needs.
                        </span>

                        <img src="/news1.jpg" alt='news' className='rounded-lg' />

                        <span>
                            Bloom Desktop Wallpaper is <b>fully interactive</b> and designed to keep you motivated throughout the day. 
                            At its core, you’ll find today’s habits front and center, with the ability to easily mark them as completed directly from your desktop. 
                            The interactive dashboard includes a real-time Habits Timeline, allowing you to track your progress with a clear time marker to guide you. 
                            You’ll also have quick access to your 5 Top Priority Goal Tasks, helping you stay focused on your most important objectives.
                        </span>

                        <span>
                            To help you keep track of your overall progress, the wallpaper features completed Task Statistics Overview for each category, offering a visual representation of your completed tasks. 
                            It’s a seamless way to stay on top of your habits and goals without interrupting your workflow. Additionally, the wallpaper includes a dedicated area for your desktop icons, 
                            making sure you can access everything you need while still enjoying your new interactive background. And of course, the iconic Bloom Trees are prominently featured, 
                            representing each habit category and adding a touch of nature to your digital space.
                        </span>

                        <span>
                            The Bloom Desktop Wallpaper is a perfect blend of function and beauty, bringing your habits and goals to life in a way that’s as engaging as it is practical. 
                            With everything you need to stay on track right at your fingertips, 
                            this interactive wallpaper is a great addition for anyone looking to boost their productivity and motivation throughout the day.
                        </span>

                        <img src="/news2.jpg" alt='news' className='rounded-lg' />

                        <img src="/news3.jpg" alt='news' className='rounded-lg' />

                        <h1 className='text-center font-bold'>How to use the Desktop Wallpaper</h1>

                        <span>
                            Once you have Wallpaper Engine running, navigate to its Change Wallpaper window. There you want to click &quot;Open Wallpaper&quot; and &quot;Open From URL&quot;. 
                            When it asks for URL copy paste this link: <b>&quot;https://bloomhabits.com/wallpaper-engine?wallpaper=true&quot;</b> without the quotation marks. Keep in mind the &quot;?wallpaper=true&quot; part of the link is important,
                            as it prevents the navbar and sidebars from showing.
                        </span>

                    </p>


                    <h1 className='text-3xl font-semibold flex flex-col text-center items-center mt-7'>

                        <MdOutlineTimeline className='text-center text-3xl text-blue-500 my-2' />

                        <h1>Current-Time Marker on the Timeline</h1>

                    </h1>

                    <p className='text-left px-5 sm:px-10 text-wrap break-words whitespace-pre-wrap flex flex-col gap-4'>
                        <span>
                            Although this addition may seem minor, it significantly enhances the functionality of the Habits Timeline. 
                            It provides immediate feedback on your daily progress, allowing you to easily identify which habit is coming up next and when, without the need to reference specific deadlines.
                        </span>

                        <span>
                            <b>Graphic Design:</b> Throughout the day, the tracker is represented by a vibrant sun, transitioning to a moon as evening approaches. 
                            This visual shift effectively marks the transition from day to night, offering a clear distinction between daytime and evening.
                        </span>

                        <img src="/news4.png" alt='news' className='rounded-lg' />
                        
                        <img src="/news5.png" alt='news' className='rounded-lg' />

                    </p>




                </div>
            </div>




        </div>
    );
}