import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function WallpaperTimeline( {tasks, category}) {

    const categoryBorder = {
        'mind': 'border-teal-500',
        'body': 'border-orange-300',
        'spirit': 'border-sky-500',
    };

    const timelineTasks = tasks;

  return (
    <div className=' bg-transparent shadow-2xl border-x-2 border-b border-slate-700 flex flex-col rounded-xl'>
    
        <span className='text-sm mt-1 mb-2 font-semibold text-gray-500 text-center'>Todays Timeline</span>

        <div className=' flex flex-row justify-center text-xs sm:text-lg'>
        
            <div className='w-full grid grid-flow-col auto-cols-fr border-b-2 lg:px-2 border-slate-600'>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('05:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('06:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('07:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 -mb-3 z-10 p-[2px] rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>
              
              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('08:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('09:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('10:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('11:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('12:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('13:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>
              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('14:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('15:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('16:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('17:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('18:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('19:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              <div className={`min-h-3 sm:min-h-6 border-r-2 ${categoryBorder[timelinehabit.category]}`}> </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('20:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('21:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              <div className={`min-h-3 sm:min-h-6 border-r-2 ${categoryBorder[timelinehabit.category]}`}> </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('22:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>

                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('23:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div id='Any' className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('Any')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('00:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('01:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('02:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                  {timelineTasks.filter(habit => habit.timeofday.includes('03:')).map((timelinehabit) => (
                      <>
                          <div key={timelinehabit._id} className='flex flex-col items-center'>
                              <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                          </div>
                      </>
                  ))}
                  <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

              <div className='flex flex-col justify-end items-center'>
                {timelineTasks.filter(habit => habit.timeofday.includes('04:')).map((timelinehabit) => (
                     <>
                        <div key={timelinehabit._id} className='flex flex-col items-center'>
                            <div className={`border-2 sm:p-1 p-[2px] -mb-3 z-10 rounded-full bg-slate-800 ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                        </div>
                    </>
                ))}
                <div className={`min-h-3 sm:min-h-6 border-r-2 border-slate-600`}> </div>
              </div>

            </div>
        </div>
                  
          <div className='flex justify-between px-3 text-slate-700 text-sm sm:text-md bg-gradient-to-r rounded-b-xl from-fuchsia-200 via-40% via-orange-200 to-100% to-sky-700 opacity-50'>
            <span className='font-semibold '>5am</span>
            <span className='font-semibold '>4pm - 6pm</span>  
            <span className='font-semibold text-white'>4am</span>    
        </div>
         

    </div>    
  )
}