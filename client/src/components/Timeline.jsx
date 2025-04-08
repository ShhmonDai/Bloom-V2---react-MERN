import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { FaSun, FaMoon } from "react-icons/fa6";


export default function Timeline( {tasks, category}) {

    const categoryBorder = {
        'mind': 'border-teal-500',
        'body': 'border-orange-300',
        'spirit': 'border-sky-500',
    };

    const [timelineHour, setTimelineHour] = useState(moment().format('HH'));

    //Refresh the time every 60 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setTimelineHour(moment().format('HH'));
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    
    }, []);


    const timelineTasks = tasks;

  return (
    <div className='pt-2 bg-white flex flex-col rounded-xl'>
    
        <span className='text-md font-semibold text-gray-500 pt-2 pb-6 text-center'>Todays Timeline</span>

          <div className=' flex flex-row justify-center text-xs sm:text-lg'>
        
            <div className='w-full grid grid-flow-col auto-cols-fr border-b-2 lg:px-2 border-gray-600'>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('05:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '05' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '05' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('06:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '06' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '06' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('07:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 sm:-mb-3 -mb-1 z-[1] p-[2px] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '07' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '07' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('08:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '08' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '08' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('09:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '09' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '09' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('10:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '10' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '10' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('11:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '11' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '11' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('12:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '12' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '12' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('13:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '13' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '13' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('14:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '14' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '14' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('15:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '15' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '15' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('16:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '16' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '16' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('17:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '17' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '17' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('18:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '18' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '18' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('19:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                                  <div className={`min-h-3 sm:min-h-6 border-r-2 ${categoryBorder[timelinehabit.category]}`}> </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '19' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-yellow-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '19' && <div className='absolute -bottom-7 sm:-bottom-8 text-yellow-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaSun /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('20:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '20' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '20' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('21:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                                  <div className={`min-h-3 sm:min-h-6 border-r-2 ${categoryBorder[timelinehabit.category]}`}> </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '21' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '21' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('22:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>

                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '22' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '22' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('23:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '23' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '23' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div id='Any' className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('Any')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('00:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '00' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '00' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('01:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '01' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '01' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('02:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '02' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '02' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('03:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '03' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '03' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

                  <div className='flex flex-col justify-end items-center relative'>
                      {timelineTasks.filter(habit => habit.timeofday.includes('04:')).map((timelinehabit) => (
                          <>
                              <div key={timelinehabit._id} className='flex flex-col items-center'>
                                  <div className={`border-2 sm:p-1 p-[2px] sm:-mb-3 -mb-1 z-[1] rounded-full bg-white ${categoryBorder[timelinehabit.category]} `}> {timelinehabit.icon} </div>
                              </div>
                          </>
                      ))}
                      <div className={`min-h-3 sm:min-h-6 border-r-2 border-gray-600 z-0`}> </div>
                      {timelineHour === '04' && <div className='absolute -bottom-2 sm:-bottom-2 min-h-6 sm:min-h-8 border-r-[3px] border-sky-50 drop-shadow-[0_1px_2px_rgba(0,0,0,0.60)] z-1'></div>}
                      {timelineHour === '04' && <div className='absolute -bottom-7 sm:-bottom-8 text-sky-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.60)] text-xl sm:text-2xl z-10'><FaMoon /></div>}
                  </div>

            </div>
        </div>
                  
          <div className='flex justify-between text-sm sm:text-md bg-gradient-to-r p-2 rounded-b-xl from-fuchsia-200 via-40% via-orange-200 to-100% to-sky-700'>
            <span className='font-semibold text-white'>5am</span>
            <span className='font-semibold text-white'>4pm - 6pm</span>  
            <span className='font-semibold text-white'>4am</span>    
        </div>
         

    </div>    
  )
}