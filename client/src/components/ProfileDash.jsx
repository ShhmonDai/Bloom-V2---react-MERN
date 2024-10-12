import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { isSameDay } from "date-fns";

import { Label, Button, Modal, Alert, Dropdown} from "flowbite-react";
import { BsYinYang } from "react-icons/bs";
import { FaBrain, FaDumbbell } from 'react-icons/fa';

import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';


import { summary } from 'date-streaks';
import Calendar from 'react-calendar'

import Timeline from './Timeline';


export default function ProfileDash() {

  const { currentUser } = useSelector((state) => state.user);
  const [publishError, setPublishError] = useState(null);

  const [timelineHabits, setTimelineHabits] = useState([]);

  const [latestSubgoals, setLatestSubgoals] = useState([]);
  const [oldestSubgoals, setOldestSubgoals] = useState([]);


  const [totalMindSubgoals, setTotalMindSubgoals] = useState(0);
  const [completedMindSubgoals, setCompletedMindSubgoals] = useState(0);

  const [totalBodySubgoals, setTotalBodySubgoals] = useState(0);
  const [completedBodySubgoals, setCompletedBodySubgoals] = useState(0);

  const [totalSpiritSubgoals, setTotalSpiritSubgoals] = useState(0);
  const [completedSpiritSubgoals, setCompletedSpiritSubgoals] = useState(0);

  const [completedMindHabits, setCompletedMindHabits] = useState(0);
  const [completedBodyHabits, setCompletedBodyHabits] = useState(0);
  const [completedSpiritHabits, setCompletedSpiritHabits] = useState(0);

  const [totalmindHabits, settotalMindHabits] = useState(0);
  const [totalbodyHabits, settotalBodyHabits] = useState(0);
  const [totalspiritHabits, settotalSpiritHabits] = useState(0);



  const [mindHabitsLastWeek, setMindHabitsLastWeek] = useState(0);
  const [bodyHabitsLastWeek, setBodyHabitsLastWeek] = useState(0);
  const [spiritHabitsLastWeek, setSpiritHabitsLastWeek] = useState(0);

  const [mindSubgoalsLastMonth, setMindSubgoalsLastMonth] = useState(0);
  const [bodySubgoalsLastMonth, setBodySubgoalsLastMonth] = useState(0);
  const [spiritSubgoalsLastMonth, setSpiritSubgoalsLastMonth] = useState(0);


  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date();
  const [todaysDay, setTodaysDay] = useState(weekday[date.getDay()]);
  const [todaysDateFull, setTodaysDateFull] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));


  const [showModalOverview, setShowModalOverview] = useState(false);
  const [formDataOverview, setFormDataOverview] = useState({});
  const [formDataDays, setFormDataDays] = useState([]);
  const [formDataCompleted, setFormDataCompleted] = useState([]);

  const [summaryData, setSummaryData] = useState({});

  //Calendar use
  const [value, setValue] = useState(date);
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (formDataCompleted.find(dDate => isSameDay(dDate, date))) {
        return 'myClassName';
      }
    }
  }

  const categoryGradient = {
    'mind': ' bg-gradient-to-b from-teal-500 to-cyan-800',
    'body': ' bg-gradient-to-b from-amber-400 to-pink-400',
    'spirit': ' bg-gradient-to-b from-sky-500 to-teal-500',
  };

  const categoryBorder = {
    'mind': 'border-teal-500',
    'body': 'border-orange-300',
    'spirit': 'border-sky-500',
  };

  const categoryIcon = {
    'mind': <FaBrain />,
    'body': <FaDumbbell />,
    'spirit': <BsYinYang />,
  };

  const categoryColor = {
    'mind': 'bg-teal-500',
    'body': 'bg-orange-300',
    'spirit': 'bg-sky-500',
  };

  const categoryText = {
    'mind': 'text-teal-500',
    'body': 'text-orange-300',
    'spirit': 'text-sky-500',
  };

  //Refresh the time every second
  useEffect(() => {
    const timer = setInterval(() => { 
      setTodaysDateFull(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
    return () => {
      clearInterval(timer); 
    }

  }, []);

  useEffect(() => {

    const fetchStatistics = async () => {
      try {
        const res = await fetch(`/api/dashboard/getstatistics/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {

          setTimelineHabits(data.timelineHabits);

          setLatestSubgoals(data.latestSubgoals);
          setOldestSubgoals(data.oldestSubgoals);

          setTotalMindSubgoals(data.totalMindSubgoals);
          setTotalBodySubgoals(data.totalBodySubgoals);
          setTotalSpiritSubgoals(data.totalSpiritSubgoals);

          settotalMindHabits(data.totalMindHabits);
          settotalBodyHabits(data.totalBodyHabits);
          settotalSpiritHabits(data.totalSpiritHabits);

          setCompletedMindSubgoals(data.completedMindSubgoals);
          setCompletedBodySubgoals(data.completedBodySubgoals);
          setCompletedSpiritSubgoals(data.completedSpiritSubgoals);

          if (data.mindHabitScore.length > 0) {
            setCompletedMindHabits(data.mindHabitScore[0].total);
          }

          if (data.bodyHabitScore.length > 0){
            setCompletedBodyHabits(data.bodyHabitScore[0].total);
          }

          if (data.spiritHabitScore.length > 0) {
            setCompletedSpiritHabits(data.spiritHabitScore[0].total);
          }

          if (data.mindHabitsLastWeek.length > 0) {
            setMindHabitsLastWeek(data.mindHabitsLastWeek[0].total);
          }

          if (data.bodyHabitsLastWeek.length > 0) {
            setBodyHabitsLastWeek(data.bodyHabitsLastWeek[0].total);
          }

          if (data.spiritHabitsLastWeek.length > 0) {
            setSpiritHabitsLastWeek(data.spiritHabitsLastWeek[0].total);
          }

          setMindSubgoalsLastMonth(data.mindSubgoalsLastMonth);
          setBodySubgoalsLastMonth(data.bodySubgoalsLastMonth);
          setSpiritSubgoalsLastMonth(data.spiritSubgoalsLastMonth);

        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {

      fetchStatistics();

    }
  }, [currentUser._id]); 

  useEffect(() => {
    setSummaryData(summary(formDataCompleted));

  }, [formDataCompleted])

  return (
    <div className='w-full min-h-screen pb-20 bg-gradient-to-b from-white via-blue-200 to-[#ceecfa] flex flex-col items-center'>
      
      {/* Welcome text */}
      <div className='px-5 pt-10 pb-10 sm:px-10 flex flex-col justify-center items-center'>
        <h1 className='font-BrushFont text-7xl sm:text-8xl'><span className=''>{todaysDay}</span></h1>
        <p className='text-wrap text-gray-500 break-words italic text-lg font-medium max-w-4xl'>{todaysDateFull}</p>
      </div>

      {/* Todays Day
      <div className='text-center flex flex-col'>
        <span className='font-bold text-2xl text-gray-600 font-Grandiflora'>TODAY IS <span className='uppercase tracking-widest'>{todaysDay}</span> </span>
        <span className='text-md font-medium text-gray-500'> {todaysDate} </span>
      </div>
       */}

      {/* Main Container */}
      <div className='min-h-screen flex flex-col items-center mx-2 sm:mx-5 mb-10'>

        {/* Stats Container */}
        <div className='p-2 mt-10 flex flex-col gap-10 max-w-5xl'>

          {/* Habits Timeline */ }
          <Timeline tasks={timelineHabits} />

          {/* Habits Table Container */}
          <div className='min-h-16 pb-8 flex flex-col bg-white rounded-md gap-1'>

            {/* Description */}

            <div className='flex justify-between p-3 font-semibold'>
              <h1 className='text-center text-md p-2 text-gray-500'>Todays Habit Tasks</h1>
              
              <Link to={"/profile?tab=habits"}><Button outline gradientDuoTone='cyanToBlue'>See all</Button></Link>
              
            </div>

            <div className='grid grid-cols-[15%_auto] md:grid-cols-[7%_auto] font-bold items-center rounded-t-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-200'>
              <span>Time</span>
              <span className='justify-self-center'>Task</span>
            </div>

            {/* Map of Habits */}
            {timelineHabits.map((habit) => (
              <>
                <div className='group/item' key={habit._id}>

                  <div className='grid grid-cols-[25%_10%_auto] sm:grid-cols-[20%_5%_auto] items-center rounded-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-50'>

                    {/* Time - Icon - Task */}

                    <div className={``}> {habit.timeofday}</div>

                    <div className={``}>{habit.icon}</div>

                    <div className='font-semibold my-2 text-wrap break-words pr-2 sm:pr-0' onClick={() => {
                      setShowModalOverview(true);
                      setFormDataDays(habit.daysofweek);
                      setFormDataCompleted(habit.datescompleted);
                      setFormDataOverview({ title: habit.title, category: habit.category, icon: habit.icon, timeofday: habit.timeofday, daysofweek: habit.daysofweek, datescompleted: habit.datescompleted });
                    }}>
                      {habit.title}
                    </div>

                    <div className='flex justify-self-end items-center justify-center'>

                    </div>

                  </div>

                </div>
              </>
            ))}

          </div>
          {/* End of Habits Table Container */}
          
          {/* Newest/Oldest Tasks Container */}
          <div>

              {/* Latest Subgoals Table Container */}
              <div className='min-h-16 pb-8 flex flex-col bg-white rounded-t-md gap-1'>

                {/* Description */}

                <div className='flex justify-between p-3 font-semibold'>
                  <h1 className='text-center text-md p-2 text-gray-500'>Tasks</h1>

                    <Dropdown label="" renderTrigger={() => <Button outline gradientDuoTone='cyanToBlue' >See all</Button>} center>
                    <Link to={'/profile?tab=mind&view=goals'}>
                    <Dropdown.Item icon={FaBrain}>Mind</Dropdown.Item>
                    </Link>
                    <Link to={'/profile?tab=body&view=goals'}>
                    <Dropdown.Item icon={FaDumbbell}>Body</Dropdown.Item>
                    </Link>
                    <Link to={'/profile?tab=spirit&view=goals'}>
                    <Dropdown.Item icon={BsYinYang}>Spirit</Dropdown.Item>
                    </Link>
                  </Dropdown>

                </div>

                <div className='flex justify-start mx-2 sm:mx-4 font-semibold'>
                  <h1 className='flex items-center text-md p-2 text-green-500'>Most recent tasks <HiArrowNarrowUp className='' /></h1>
                </div>

                <div className='grid grid-cols-[auto_auto_auto] font-bold items-center rounded-t-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-200'>
                  <span className='justify-self-start'>Category</span>
                  <span className='justify-self-center'>Task Title</span>
                  <span className='justify-self-end'>Created On</span>

                </div>

              {/* Map of Latest Subgoals */}
              {latestSubgoals.map((subgoal) => (
                <>
                  <div className='group/item' key={subgoal._id}>

                    <div className='grid grid-cols-[12%_auto_24%] sm:grid-cols-[20%_auto_20%] items-center rounded-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-50'>

                      {/* Category - Subgoal Name */}

                      <div className={`text-sm sm:text-base ${categoryText[subgoal.category]}`}>
                        {categoryIcon[subgoal.category]}
                      </div>

                      <div className='font-semibold my-2 text-wrap break-words pr-2 sm:pr-0 justify-self-start lg:justify-self-center'>
                        {subgoal.title}
                      </div>

                      <div className='justify-self-end text-sm sm:text-base text-end'>
                        {moment(subgoal.createdAt).format('MMM DD YYYY')}
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>
            {/* End of Latest Subgoals Table Container */}


            {/* Oldest Subgoals Table Container */}
            <div className='min-h-16 pb-8 flex flex-col bg-white rounded-b-md gap-1'>

              {/* Description */}

                <div className='flex justify-start mx-2 sm:mx-4 font-semibold'>
                  <h1 className='flex items-center text-md p-2 text-red-500'>Oldest tasks <HiArrowNarrowDown className=''/></h1>
              </div>

              <div className='grid grid-cols-[auto_auto_auto] font-bold items-center rounded-t-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-200'>
                <span className='justify-self-start'>Category</span>
                <span className='justify-self-center'>Task Title</span>
                <span className='justify-self-end'>Created On</span>
              </div>

              {/* Map of Oldest Subgoals */}
              {oldestSubgoals.map((subgoal) => (
                <>
                  <div className='group/item' key={subgoal._id}>

                    <div className='grid grid-cols-[12%_auto_24%] sm:grid-cols-[20%_auto_20%] items-center rounded-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-50'>

                      {/* Category - Subgoal Name - Date */}

                      <div className={`text-sm sm:text-base ${categoryText[subgoal.category]}`}>
                        {categoryIcon[subgoal.category]}
                      </div>

                      <div className='font-semibold my-2 text-wrap break-words pr-2 sm:pr-0 justify-self-start lg:justify-self-center'>
                        {subgoal.title}
                      </div>

                      <div className='justify-self-end text-sm sm:text-base text-end'>
                        {moment(subgoal.createdAt).format('MMM DD YYYY')}
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>
            {/* End of Oldest Subgoals Table Container */}
          </div>


          {/* Task Statistics Container */}
          <div className='flex flex-col bg-transparent rounded-md'>

              <span className='text-md font-semibold text-gray-600 text-center py-2'>Completed Goal Tasks</span>

              {/* Goal Tasks Statistics */}
              <div className='flex flex-wrap justify-center gap-4 p-4'>


                {/* Mind SubGoals Card */}
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                  <div className='flex justify-between items-center'>
                    <div className='w-8/12'>
                      <h3 className='text-gray-500 text-lg font-semibold'><span className='text-green-500 font-bold'>{completedMindSubgoals}</span> / <span className='text-gray-600 font-bold'>{totalMindSubgoals}</span> tasks</h3>
                      {/* Mind Goals Loading Bar */}
                    <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-400`}>
                        <div className='mx-1 my-[2px] w-full bg-indigo-50'>
                          <div style={totalMindSubgoals !== 0 ? { width: `${Math.trunc((completedMindSubgoals / totalMindSubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <FaBrain className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                  </div>
                  <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                      <HiArrowNarrowUp />
                      {mindSubgoalsLastMonth}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                  </div>
                </div>

                {/* Body SubGoals Card */}
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                  <div className='flex justify-between items-center'>
                    <div className='w-8/12'>
                    <h3 className='text-gray-500 text-lg font-semibold'><span className='text-green-500 font-bold'>{completedBodySubgoals}</span> / <span className='text-gray-600 font-bold'>{totalBodySubgoals}</span> tasks</h3>
                      {/* Body Goals Loading Bar */}
                    <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-400`}>
                        <div className='mx-1 my-[2px] w-full bg-indigo-50'>
                            <div style={totalBodySubgoals !== 0 ? { width: `${Math.trunc((completedBodySubgoals / totalBodySubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                            </div>
                          </div>
                        </div>
                    </div>
                    <FaDumbbell className='bg-orange-300 text-white rounded-full text-5xl p-3 shadow-lg' />
                  </div>
                  <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                      <HiArrowNarrowUp />
                      {bodySubgoalsLastMonth}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                  </div>
                </div>


                {/* Spirit SubGoals Card */}
                <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                  <div className='flex justify-between items-center'>
                    <div className='w-8/12'>
                    <h3 className='text-gray-500 text-lg font-semibold'><span className='text-green-500 font-bold'>{completedSpiritSubgoals}</span> / <span className='text-gray-600 font-bold'>{totalSpiritSubgoals}</span> tasks</h3>
                      {/* Spirit Goals Loading Bar */}
                    <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-400`}>
                        <div className='mx-1 my-[2px] w-full bg-indigo-50'>
                          <div style={totalSpiritSubgoals !== 0 ? { width: `${Math.trunc((completedSpiritSubgoals / totalSpiritSubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                          </div>
                        </div>
                      </div>
                    </div>
                    <BsYinYang className='bg-sky-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                  </div>
                  <div className='flex gap-2 text-sm'>
                    <span className='text-green-500 flex items-center'>
                      <HiArrowNarrowUp />
                      {spiritSubgoalsLastMonth}
                    </span>
                    <div className='text-gray-500'>Last month</div>
                  </div>
                </div>

              </div>


          </div>

          {/* Habits Statistics Container */}
          <div className='flex flex-col bg-transparent rounded-md '>
            <span className='text-md font-semibold text-gray-600 text-center py-2'>Completed Habit Tasks</span>

            <div className='flex-wrap flex gap-4 justify-center p-4'>

              {/* Mind Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between'>
                  <div className=''>
                    <h3 className='text-lg'><span className='text-2xl'>{completedMindHabits}</span> habits</h3>
                  </div>
                  <FaBrain className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {mindHabitsLastWeek} / {totalmindHabits}
                  </span>
                  <div className='text-gray-500'>Updated within past 7 days</div>
                </div>
              </div>

              {/* Body Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between'>
                  <div className=''>
                    <h3 className='text-lg'><span className='text-2xl'>{completedBodyHabits}</span> habits</h3>
                  </div>
                  <FaDumbbell className='bg-orange-300 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {bodyHabitsLastWeek} / {totalbodyHabits}
                  </span>
                  <div className='text-gray-500'>Updated within past 7 days</div>
                </div>
              </div>

              {/* Spirit Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between'>
                  <div className=''>
                    <h3 className='text-lg'><span className='text-2xl'>{completedSpiritHabits}</span> habits</h3>
                  </div>
                  <BsYinYang className='bg-sky-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {spiritHabitsLastWeek} / {totalspiritHabits}
                  </span>
                  <div className='text-gray-500'>Updated within past 7 days</div>
                </div>
              </div>

            </div>
          </div>

        </div>
        {/* End of Stats Container */}

      </div>    
      {/* End of Main Container */}

      {/* OVERVIEW Habit Modal */}
      <Modal
        show={showModalOverview}
        onClose={() => setShowModalOverview(false)}
        popup
        size='lg'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>

            <h3 className='text-xl text-gray-700'>
              {formDataOverview.icon} {formDataOverview.title}
            </h3>
            <span className='font-semibold text-gray-600'>
              Time <span className='font-normal'>{formDataOverview.timeofday}</span>
            </span>

            <div className='flex flex-col items-center'>

              <span className={`${categoryText[formDataOverview.category]} my-5 text-4xl`}>{categoryIcon[formDataOverview.category]}</span>

              <span className='font-semibold'>Streaks: </span>
              <div className='flex flex-wrap gap-2 mt-1 mb-4'>
                <span>Current Streak: <span className='font-bold'>{summaryData.currentStreak}</span></span>
                <span>Longest Streak: <span className='font-bold'>{summaryData.longestStreak}</span></span>
              </div>


              <div className='mb-4'>
                <Calendar value={value} tileClassName={tileClassName} />
              </div>

              <span className='font-semibold'>Dates Completed: </span>
              <div className='flex flex-wrap justify-center gap-2 mt-1 mb-4'>
                {formDataCompleted.map((dateCompleted, index) => (
                  <div key={index} >
                    {dateCompleted}
                  </div>
                ))}
              </div>

              <span className='font-semibold'>Days To Complete On: </span>
              <div className='flex flex-wrap justify-center gap-2 mt-1 mb-4'>
                {formDataDays.map((day, index) => (
                  <div key={index}>
                    {day}
                  </div>
                ))}
              </div>

            </div>

            <div className='my-5 flex justify-center gap-4'>
              <Button color='gray' onClick={() => {
                setShowModalOverview(false);
                setFormDataOverview({});
                setFormDataDays([]);
              }}>
                Close Overview
              </Button>
            </div>




            {publishError && (
              <Alert className='mt-5' color='failure'>
                {publishError}
              </Alert>
            )}

          </div>
        </Modal.Body>
      </Modal>

    </div>

  )
}