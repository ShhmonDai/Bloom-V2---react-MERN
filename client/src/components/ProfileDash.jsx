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
    <div className='w-full min-h-screen bg-gradient-to-b from-white via-indigo-100 to-indigo-50'>
      
      <div className='min-h-screen mx-auto p-2 mb-10 flex flex-col gap-10 max-w-4xl'>

        {/* Welcome text */}
        <div className='px-5 pt-10 sm:px-10 flex flex-col justify-center items-center'>
          <h1 className='font-BrushFont text-7xl sm:text-8xl'>Dashboard</h1>
          <p className='text-wrap break-words italic max-w-4xl'>Welcome to Dashboard, with your daily overviews and statistics</p>
        </div>

        {/* Todays Day */}
        <div className='text-center flex flex-col'>
          <span className='font-bold text-2xl text-gray-600 font-Grandiflora'>TODAY IS <span className='uppercase tracking-widest'>{todaysDay}</span> </span>
          <span className='text-md font-medium text-gray-500'> {todaysDate} </span>
        </div>

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