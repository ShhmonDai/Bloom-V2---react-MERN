import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { isSameDay } from "date-fns";

import { Label, Button, Modal, Alert} from "flowbite-react";
import { BsYinYang } from "react-icons/bs";
import { FaBrain, FaDumbbell } from 'react-icons/fa';


import { summary } from 'date-streaks';
import Calendar from 'react-calendar'

import Timeline from './Timeline';


export default function ProfileDash() {

  const { currentUser } = useSelector((state) => state.user);
  const [publishError, setPublishError] = useState(null);

  const [timelineHabits, setTimelineHabits] = useState([]);

  const [latestMindSubgoals, setLatestMindSubgoals] = useState([]);
  const [latestBodySubgoals, setLatestBodySubgoals] = useState([]);
  const [latestSpiritSubgoals, setLatestSpiritSubgoals] = useState([]);

  const [oldestMindSubgoals, setOldestMindSubgoals] = useState([]);
  const [oldestBodySubgoals, setOldestBodySubgoals] = useState([]);
  const [oldestSpiritSubgoals, setOldestSpiritSubgoals] = useState([]);

  const [totalMindSubgoals, setTotalMindSubgoals] = useState(0);
  const [totalMindGoals, setTotalMindGoals] = useState(0);
  const [completedMindGoals, setCompletedMindGoals] = useState(0);
  const [completedMindSubgoals, setCompletedMindSubgoals] = useState(0);

  const [totalBodySubgoals, setTotalBodySubgoals] = useState(0);
  const [totalBodyGoals, setTotalBodyGoals] = useState(0);
  const [completedBodyGoals, setCompletedBodyGoals] = useState(0);
  const [completedBodySubgoals, setCompletedBodySubgoals] = useState(0);

  const [totalSpiritSubgoals, setTotalSpiritSubgoals] = useState(0);
  const [totalSpiritGoals, setTotalSpiritGoals] = useState(0);
  const [completedSpiritGoals, setCompletedSpiritGoals] = useState(0);
  const [completedSpiritSubgoals, setCompletedSpiritSubgoals] = useState(0);

  const [completedMindHabits, setCompletedMindHabits] = useState(0);
  const [completedBodyHabits, setCompletedBodyHabits] = useState(0);
  const [completedSpiritHabits, setCompletedSpiritHabits] = useState(0);



  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date();
  const [todaysDay, setTodaysDay] = useState(weekday[date.getDay()]);
  const [todaysDate, setTodaysDate] = useState(moment().format('MMM-DD-YYYY'));

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

  useEffect(() => {

    const fetchStatistics = async () => {
      try {
        const res = await fetch(`/api/dashboard/getstatistics/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {

          setTimelineHabits(data.timelineHabits);

          setLatestMindSubgoals(data.latestMindSubgoals);
          setLatestBodySubgoals(data.latestBodySubgoals);
          setLatestSpiritSubgoals(data.latestSpiritSubgoals);

          setOldestMindSubgoals(data.oldestMindSubgoals);
          setOldestBodySubgoals(data.oldestBodySubgoals);
          setOldestSpiritSubgoals(data.oldestSpiritSubgoals);

          setTotalMindGoals(data.totalMindGoals);
          setTotalMindSubgoals(data.totalMindSubgoals);

          setTotalBodyGoals(data.totalBodyGoals);
          setTotalBodySubgoals(data.totalBodySubgoals);

          setTotalSpiritGoals(data.totalSpiritGoals);
          setTotalSpiritSubgoals(data.totalSpiritSubgoals);

          setCompletedMindGoals(data.completedMindGoals);
          setCompletedMindSubgoals(data.completedMindSubgoals);

          setCompletedBodyGoals(data.completedBodyGoals);
          setCompletedBodySubgoals(data.completedBodySubgoals);

          setCompletedSpiritGoals(data.completedSpiritGoals);
          setCompletedSpiritSubgoals(data.completedSpiritSubgoals);

          setCompletedMindHabits(data.mindHabitScore[0].total);
          setCompletedBodyHabits(data.bodyHabitScore[0].total);
          setCompletedSpiritHabits(data.spiritHabitScore[0].total);



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
    <div className='w-full min-h-screen bg-gradient-to-b from-white via-indigo-200 to-indigo-50 flex flex-col items-center'>
      
      {/* Welcome text */}
      <div className='px-5 pt-10 pb-14 sm:px-10 flex flex-col justify-center items-center'>
        <h1 className='font-BrushFont text-6xl sm:text-8xl'>Dashboard</h1>
        <p className='text-wrap break-words italic max-w-4xl'>Welcome to Dashboard, with your daily overviews and statistics</p>
      </div>

      {/* Todays Day */}
      <div className='text-center flex flex-col'>
        <span className='font-bold text-2xl text-gray-600 font-Grandiflora'>TODAY IS <span className='uppercase tracking-widest'>{todaysDay}</span> </span>
        <span className='text-md font-medium text-gray-500'> {todaysDate} </span>
      </div>

      {/* Main Container */}
      <div className='min-h-screen flex flex-col 2xl:flex-row items-center 2xl:items-start 2xl:justify-center mx-2 sm:mx-5'>

        {/* Left Side Container */}
        <div className='p-2 mt-10 flex flex-col gap-10 max-w-5xl'>

        {/* Habits Timeline */ }
        <Timeline tasks={timelineHabits} />

        {/* Habits Table Container */}
        <div className='min-h-16 flex flex-col bg-white rounded-xl gap-1'>

          {/* Description */}
          <span className='text-center text-md font-semibold text-gray-500 py-6 '>Todays Tasks</span>

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

          {/* See Habits page button */}
          <div className='flex flex-row justify-center py-6' >
            <button className='font-normal text-blue-500' type='button' >Go to full Habits page</button>
          </div>   

        </div>
        {/* End ofHabits Table Container */}

        </div>
        {/* End of Left Container */}


        {/* Right Side Container */}
        <div className='flex flex-col p-2 2xl:mt-10 mb-10 justify-center items-center'>

          {/* Habit Statistics */}
          <div className='flex flex-col bg-white rounded-xl py-2 px-4 max-w-4xl w-full'>
            <span className='font-bold text-xl text-gray-600 text-center 2xl:mb-5'>Number of completed Habits:</span>
            <div className='flex flex-row 2xl:flex-wrap gap-6 2xl:items-center justify-center'>
              <span className='font-bold text-2xl  text-teal-500 flex flex-row items-center'> <FaBrain /> <span className='pl-1 text-gray-600'>: {completedMindHabits}</span> </span>
              <span className='font-bold text-2xl text-orange-300 flex flex-row items-center'> <FaDumbbell /> <span className='pl-1 text-gray-600'>: {completedBodyHabits}</span> </span>
              <span className='font-bold text-2xl text-sky-500 flex flex-row items-center'> <BsYinYang /> <span className='pl-1 text-gray-600'>: {completedSpiritHabits}</span> </span>
            </div>
          </div>

          {/* Goal/Task Statistics */}
          <div className='flex flex-wrap gap-4 justify-center 2xl:flex-col 2xl:gap-0 2xl:w-full'>

          {/* Mind Statistics */}
          <div className='flex flex-wrap justify-center 2xl:flex-col gap-10 2xl:gap-2 bg-white rounded-xl py-2 px-4 mt-5'>
          
            <div className='flex flex-col'>
              {/* Mind Goals */}
              <span className='text-xl text-teal-500 text-center'>Mind Goals:</span>
              <div className='flex flex-row gap-6 2xl:items-center justify-center text-lg'>
                <span className='text-green-500 flex flex-row items-center'> Completed: <span className='pl-1 font-bold text-gray-600'>{completedMindGoals}</span> </span>
                <span className='text-blue-500 flex flex-row items-center'> Total: <span className='pl-1 font-bold text-gray-600'>{totalMindGoals}</span> </span>
              </div>
              {/* Mind Goals Loading Bar */}
              <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-500`}>
                  <div className='mx-2 w-full border-y-2 border-blue-500 bg-indigo-50'>
                    <div style={totalMindGoals !== 0 ? { width: `${Math.trunc((completedMindGoals / totalMindGoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                    </div>
                  </div>
              </div>
            </div>  

            <div className='flex flex-col'>
              {/* Mind SubGoals */}
              <span className='text-xl text-teal-500 text-center 2xl:mt-5'>Mind Tasks:</span>
              <div className='text-lg flex flex-row gap-6 2xl:items-center justify-center'>
                <span className='text-green-500 flex flex-row items-center'> Completed: <span className='pl-1 font-bold text-gray-600'>{completedMindSubgoals}</span> </span>
                <span className='text-blue-500 flex flex-row items-center'> Total: <span className='pl-1 font-bold text-gray-600'>{totalMindSubgoals}</span> </span>
              </div>
              {/* Mind SubGoals Loading Bar */}
              <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-500`}>
                <div className='mx-2 w-full border-y-2 border-blue-500 bg-indigo-50'>
                  <div style={totalMindSubgoals !== 0 ? { width: `${Math.trunc((completedMindSubgoals / totalMindSubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* End of Mind Statistics */}

          {/* Body Statistics */}
            <div className='flex flex-wrap justify-center 2xl:flex-col gap-10 2xl:gap-2 bg-white rounded-xl py-2 px-4 mt-5'>

            <div className='flex flex-col'>
              {/* Body Goals */}
              <span className='text-xl text-orange-300 font-Grandiflora text-center'>Body Goals:</span>
              <div className='text-lg flex flex-row gap-6 2xl:items-center justify-center'>
                <span className='text-green-500 font-Grandiflora flex flex-row items-center'> Completed: <span className='pl-1 font-bold text-gray-600'>{completedBodyGoals}</span> </span>
                <span className='text-blue-500 font-Grandiflora flex flex-row items-center'> Total: <span className='pl-1 font-bold text-gray-600'>{totalBodyGoals}</span> </span>
              </div>
              {/* Body Goals Loading Bar */}
              <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-500`}>
                <div className='mx-2 w-full border-y-2 border-blue-500 bg-indigo-50'>
                  <div style={totalBodyGoals !== 0 ? { width: `${Math.trunc((completedBodyGoals / totalBodyGoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col'>
              {/* Body SubGoals */}
              <span className='text-xl text-orange-300 font-Grandiflora text-center 2xl:mt-5'>Body Tasks:</span>
              <div className='text-lg flex flex-row gap-6 2xl:items-center justify-center'>
                <span className='text-green-500 font-Grandiflora flex flex-row items-center'> Completed: <span className='pl-1 font-bold text-gray-600'>{completedBodySubgoals}</span> </span>
                <span className='text-blue-500 font-Grandiflora flex flex-row items-center'> Total: <span className='pl-1 font-bold text-gray-600'>{totalBodySubgoals}</span> </span>
              </div>
              {/* Body SubGoals Loading Bar */}
              <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-500`}>
                <div className='mx-2 w-full border-y-2 border-blue-500 bg-indigo-50'>
                  <div style={totalBodySubgoals !== 0 ? { width: `${Math.trunc((completedBodySubgoals / totalBodySubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* End of Body Statistics */}

          {/* Spirit Statistics */}
            <div className='flex flex-wrap justify-center 2xl:flex-col gap-10 2xl:gap-2 bg-white rounded-xl py-2 px-4 mt-5'>

            <div className='flex flex-col'>
              {/* Spirit Goals */}
              <span className='text-xl text-sky-500 font-Grandiflora text-center'>Spirit Goals:</span>
              <div className='text-lg flex flex-row gap-6 2xl:items-center justify-center'>
                <span className='text-green-500 font-Grandiflora flex flex-row items-center'> Completed: <span className='pl-1 font-bold text-gray-600'>{completedSpiritGoals}</span> </span>
                <span className='text-blue-500 font-Grandiflora flex flex-row items-center'> Total: <span className='pl-1 font-bold text-gray-600'>{totalSpiritGoals}</span> </span>
              </div>
              {/* Spirit Goals Loading Bar */}
              <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-500`}>
                <div className='mx-2 w-full border-y-2 border-blue-500 bg-indigo-50'>
                  <div style={totalSpiritGoals !== 0 ? { width: `${Math.trunc((completedSpiritGoals / totalSpiritGoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-col'>
              {/* Spirit SubGoals */}
              <span className='text-xl text-sky-500 font-Grandiflora text-center 2xl:mt-5'>Spirit Tasks:</span>
              <div className='text-lg flex flex-row gap-6 2xl:items-center justify-center'>
                <span className='text-green-500 font-Grandiflora flex flex-row items-center'> Completed: <span className='pl-1 font-bold text-gray-600'>{completedSpiritSubgoals}</span> </span>
                <span className='text-blue-500 font-Grandiflora flex flex-row items-center'> Total: <span className='pl-1 font-bold text-gray-600'>{totalSpiritSubgoals}</span> </span>
              </div>
              {/* Spirit SubGoals Loading Bar */}
              <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-500`}>
                <div className='mx-2 w-full border-y-2 border-blue-500 bg-indigo-50'>
                  <div style={totalSpiritSubgoals !== 0 ? { width: `${Math.trunc((completedSpiritSubgoals / totalSpiritSubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                  </div>
                </div>
              </div>
            </div>

          </div>
          {/* End of Spirit Statistics */}
          </div>

        </div>
        {/* End of Right Side Container */}

      </div>    

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