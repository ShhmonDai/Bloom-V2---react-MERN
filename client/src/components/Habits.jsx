import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, TextInput, Button, Modal, Alert, Textarea, Select, Checkbox } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TfiAngleDoubleDown } from "react-icons/tfi";
import { FaCheck, FaTimes, FaSlidersH } from 'react-icons/fa';
import { RiSettings3Fill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';
import Timeline from './Timeline';

import moment from 'moment';

export default function Habits( {category, sendDataToCategory2}) {

  const { currentUser } = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);
  const [publishError, setPublishError] = useState(null);

  const [showModalAddHabit, setShowModalAddHabit] = useState(false);
  const [formDataAddHabit, setFormDataAddHabit] = useState({});

  const [showModalDeleteHabit, setShowModalDeleteHabit] = useState(false);
  const [idToDelete, setIdToDelete] = useState({});

  const [showModalUpdateHabit, setShowModalUpdateHabit] = useState(false);
  const [formDataUpdateHabit, setFormDataUpdateHabit] = useState({});

  const [formDataAccomplishHabit, setFormDataAccomplishHabit] = useState({});

  const [showModalOverview, setShowModalOverview] = useState(false);
  const [formDataOverview, setFormDataOverview] = useState({});

  const [formDataDays, setFormDataDays] = useState([]);
  const [formDataCompleted, setFormDataCompleted] = useState([]);
  const [formDataEmoji, setFormDataEmoji] = useState('');

  const [mondayHabits, setMondayHabits] = useState([]);
  const [tuesdayHabits, setTuesdayHabits] = useState([]);
  const [wednesdayHabits, setWednesdayHabits] = useState([]);
  const [thursdayHabits, setThursdayHabits] = useState([]);
  const [fridayHabits, setFridayHabits] = useState([]);
  const [saturdayHabits, setSaturdayHabits] = useState([]);
  const [sundayHabits, setSundayHabits] = useState([]);

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date();
  const [todaysDay, setTodaysDay] = useState(weekday[date.getDay()]);
  const [todaysDate, setTodaysDate] = useState(moment().format('MMM-DD-YYYY'));

  const [selectDay, setSelectDay] = useState('1');

  const [showPicker, setShowPicker] = useState(true);


  const onEmojiClick = (emojiObject) => {
    setFormDataEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

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

  const todaysTasks = {
    '0': sundayHabits,
    '1': mondayHabits,
    '2': tuesdayHabits,
    '3': wednesdayHabits,
    '4': thursdayHabits,
    '5': fridayHabits,
    '6': saturdayHabits,

  };

  useEffect(() => {

    const fetchHabits = async () => {
      try {
        const res = await fetch(`/api/habit/gethabits/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {

          setMondayHabits(data.mondayHabits);
          setTuesdayHabits(data.tuesdayHabits);
          setWednesdayHabits(data.wednesdayHabits);
          setThursdayHabits(data.thursdayHabits);
          setFridayHabits(data.fridayHabits);
          setSaturdayHabits(data.saturdayHabits);
          setSundayHabits(data.sundayHabits);

        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {

      fetchHabits();

    }
  }, [currentUser._id, reload]); 


  const handleCheckday = (e) => {

    if (formDataDays.includes(e)) {
      const arr = formDataDays.filter((item) => item !== e);
      setFormDataDays(arr);
    } else {
      setFormDataDays([...formDataDays, e]);
    }
  };

  useEffect(() => {
    setFormDataAddHabit({ ...formDataAddHabit, icon: formDataEmoji });
    setFormDataUpdateHabit({ ...formDataUpdateHabit, icon: formDataEmoji });
  }, [formDataEmoji])

  useEffect(() => {
    setFormDataAddHabit({ ...formDataAddHabit, daysofweek: formDataDays });
    setFormDataUpdateHabit({ ...formDataUpdateHabit, daysofweek: formDataDays });
  }, [formDataDays])

  const handleCreateHabit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/habit/createhabit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAddHabit),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalAddHabit(false);
        setFormDataAddHabit({});
        setFormDataDays([]);
        setFormDataEmoji('');
        setShowPicker(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleDeleteHabit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/habit/deletehabit/${idToDelete._id}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalDeleteHabit(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleUpdateHabit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/habit/edithabit/${formDataUpdateHabit._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataUpdateHabit),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalUpdateHabit(false);
        setFormDataDays([]);
        setFormDataEmoji('');
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleAccomplishHabit = async (id) => {
    try {
      const res = await fetch(`/api/habit/accomplishhabit/${id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({datescompleted: todaysDate}),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormDataAccomplishHabit({});
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setFormDataAccomplishHabit({});
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setFormDataAccomplishHabit({});
      setPublishError('Something went wrong');
    }
  };

  const handleUndoHabit = async (id) => {
    try {
      const res = await fetch(`/api/habit/undohabit/${id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({datescompleted: todaysDate}),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormDataAccomplishHabit({});
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setFormDataAccomplishHabit({});
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setFormDataAccomplishHabit({});
      setPublishError('Something went wrong');
    }
  };


  return (
    <div className='w-full min-h-screen'>

      {/* Main Container */}
      <div className='min-h-screen mx-auto p-2 mt-20 mb-10 flex flex-col gap-10 max-w-4xl'>

        {/* Welcome text */}
        <div className='text-center flex flex-col'>
          <span className='text-md font-semibold text-gray-500'>Welcome To Habits</span>
          <span className='font-bold text-2xl text-gray-600 '>TODAY IS <span className='uppercase tracking-widest'>{todaysDay}</span> </span>
          <span className='text-md font-medium text-gray-500'> {todaysDate} </span>
        </div>


        {/* Timeline */}
        <Timeline tasks={todaysTasks[date.getDay()]} category={category} />


        {/* Todays Day */}
        <div className='mx-2 min-h-16 flex flex-col bg-white rounded-xl'>
          <span className='text-center text-md font-semibold text-gray-500 py-6 '>Todays Tasks</span>

          <div className='grid grid-cols-[10%_15%_auto_5%] md:grid-cols-[5%_7%_auto_5%] font-bold items-center rounded-t-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-200'>
            <span className='justify-self-start'><FaCheck/> </span>
            <span>Time</span>
            <span className='justify-self-center'>Task</span>
            <span className='justify-self-end'><RiSettings3Fill/></span>
          </div>

          {todaysTasks[date.getDay()].map((todayshabit) => (
            <>
              <div className='group my-1' key={todayshabit._id}>

                <div className='grid grid-cols-[10%_20%_10%_auto_5%]  md:grid-cols-[5%_15%_5%_auto_5%]  items-center rounded-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-50'>

                  {/* Checkmark - Time - Icon - Task - EditOnHover */}

                  <div className={`w-4 h-4 border-2 ${categoryBorder[todayshabit.category]} justify-self-start relative`} onClick={() => {
                    todayshabit.datescompleted.includes(todaysDate) ? handleUndoHabit(todayshabit._id) : handleAccomplishHabit(todayshabit._id)
                  }}>{todayshabit.datescompleted.includes(todaysDate) ? <FaCheck className='absolute -bottom-[1px] text-lg'/> : <></> }</div>

                  <div className={``}> {todayshabit.timeofday}</div>

                  <div className={``}>{todayshabit.icon}</div>

                  <div className='font-semibold my-2 text-wrap break-words whitespace-pre-wrap' onClick={() => {
                    setShowModalOverview(true);
                    setFormDataDays(todayshabit.daysofweek);
                    setFormDataCompleted(todayshabit.datescompleted);
                    setFormDataOverview({ title: todayshabit.title, category: todayshabit.category, icon: todayshabit.icon, timeofday: todayshabit.timeofday, daysofweek: todayshabit.daysofweek, datescompleted: todayshabit.datescompleted });
                  }}>
                    {todayshabit.title}
                  </div>

                  <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-self-end items-center justify-center'>
                    <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                      <Dropdown.Item onClick={() => {
                        setShowModalOverview(true);
                        setFormDataDays(todayshabit.daysofweek);
                        setFormDataCompleted(todayshabit.datescompleted);
                        setFormDataOverview({ title: todayshabit.title, category: todayshabit.category, icon: todayshabit.icon, timeofday: todayshabit.timeofday, daysofweek: todayshabit.daysofweek, datescompleted: todayshabit.datescompleted });
                      }}>Overview</Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setShowModalUpdateHabit(true);
                        setFormDataDays(todayshabit.daysofweek);
                        setFormDataUpdateHabit({ ...formDataUpdateHabit, _id: todayshabit._id, title: todayshabit.title, category: todayshabit.category, icon: todayshabit.icon, timeofday: todayshabit.timeofday, daysofweek: todayshabit.daysofweek });
                      }}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => {
                        setShowModalDeleteHabit(true);
                        setIdToDelete({ ...idToDelete, _id: todayshabit._id });
                      }}>Delete</Dropdown.Item>
                    </Dropdown>
                  </div>

                </div>

              </div>
            </>
          ))}

          {/* Add New Task Button */}
          <div className='flex flex-row justify-center py-8' >
            <button className='font-normal text-blue-500' type='button' onClick={() => {
              setFormDataAddHabit({ ...formDataAddHabit, userId: currentUser._id, daysofweek: formDataDays, category: 'mind', timeofday: 'Any' });
              setShowModalAddHabit(true);
            }}>Add new Task</button>
          </div>   

        </div>

        {/* WEEKLY VIEW CONTAINER */}
        <div className='flex flex-col mt-10 mx-2 min-h-16 gap-5 '>

          <div className='text-center flex flex-col'>
            <span className='text-md font-semibold text-gray-500'>Habits By Day</span>
            <span className='font-bold text-xl text-gray-600 '>YOUR WEEKLY VIEW </span>
          </div>
 

          {/* DAY CONTAINER */}
          <div id='day' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`shadow-lg rounded-t-lg bg-white border-b-2`}>
              <div className={`mx-2 sm:px-5 bg-white flex flex-row justify-between p-3 text-md font-semibold shadow-lg`}>

                <button type='button' onClick={() => setSelectDay('1')} className={`${selectDay == '1' ? 'text-blue-500 underline underline-offset-4 ' : 'text-gray-500' }`}>Mon</button>
                <button type='button' onClick={() => setSelectDay('2')} className={`${selectDay == '2' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-500'}`}>Tue</button>
                <button type='button' onClick={() => setSelectDay('3')} className={`${selectDay == '3' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-500'}`}>Wed</button>
                <button type='button' onClick={() => setSelectDay('4')} className={`${selectDay == '4' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-500'}`}>Thu</button>
                <button type='button' onClick={() => setSelectDay('5')} className={`${selectDay == '5' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-500'}`}>Fri</button>
                <button type='button' onClick={() => setSelectDay('6')} className={`${selectDay == '6' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-500'}`}>Sat</button>
                <button type='button' onClick={() => setSelectDay('0')} className={`${selectDay == '0' ? 'text-blue-500 underline underline-offset-4' : 'text-gray-500'}`}>Sun</button>


              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-1 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-6 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value={`Your Tasks for ${weekday[selectDay]}`} />
              </div>
              <div className='grid grid-cols-[15%_auto_5%] md:grid-cols-[7%_auto_5%] font-bold items-center rounded-t-md mx-1 px-2 py-1 sm:mx-4 bg-indigo-200'>
                <span>Time</span>
                <span className='justify-self-center'>Task</span>
                <span className='justify-self-end'><RiSettings3Fill /></span>
              </div>

              {/* Map Days Habits Here */}
              {todaysTasks[selectDay].map((habit) => (
                <>
                  <div className='group/item' key={habit._id}>

                    <div className='grid grid-cols-[22%_15%_auto_5%] items-center rounded-md mx-1 px-2 py-1 sm:mx-4 bg-indigo-50'>

                      {/* Checkmark - Time - Icon - Task - EditOnHover */}

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
                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item onClick={() => {
                            setShowModalOverview(true);
                            setFormDataDays(habit.daysofweek);
                            setFormDataCompleted(habit.datescompleted);
                            setFormDataOverview({ title: habit.title, category: habit.category, icon: habit.icon, timeofday: habit.timeofday, daysofweek: habit.daysofweek, datescompleted: habit.datescompleted });
                          }}>Overview</Dropdown.Item>
                          <Dropdown.Item onClick={() => {
                            setShowModalUpdateHabit(true);
                            setFormDataDays(habit.daysofweek);
                            setFormDataUpdateHabit({ ...formDataUpdateHabit, _id: habit._id, title: habit.title, category: habit.category, icon: habit.icon, timeofday: habit.timeofday, daysofweek: habit.daysofweek });
                          }}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => {
                            setShowModalDeleteHabit(true);
                            setIdToDelete({ ...idToDelete, _id: habit._id });
                          }}>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

              {/* Add Habit Input */}
              <div className='flex flex-row justify-center pt-8' >
                <button className='font-normal text-blue-500' type='button' onClick={() => {
                  setFormDataAddHabit({ ...formDataAddHabit, userId: currentUser._id, daysofweek: formDataDays, category: 'mind', timeofday: 'Any' });
                  setShowModalAddHabit(true);
                }}>Add new Task</button>
              </div> 

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 shadow-2xl rounded-b-lg bg-white`} >
              <div className={`mx-2 flex bg-white py-5 flex-row justify-evenly items-center px-4 shadow-lg`} onClick={() => document.getElementById('day').classList.toggle('is-open')}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full'><TfiAngleDoubleDown /></span>
              </div>
            </div>

          </div>
 

        </div>


      </div>

      {/* Add Habit Modal */}
      <Modal
        show={showModalAddHabit}
        onClose={() => setShowModalAddHabit(false)}
        popup
        size='lg'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Add a new habit:
            </h3>

            <form onSubmit={handleCreateHabit}>
              <div className='flex flex-col'>
              <Label className='mt-4'>Habit</Label>
              <TextInput type='text' placeholder='Habit' id='title' value={formDataAddHabit.title} onChange={(e) =>
                setFormDataAddHabit({ ...formDataAddHabit, title: e.target.value })
              } />

              <Label className='mt-4'>Habit Icon</Label>

                {showPicker ? 
                (<></>) : 
                (
                <div className='flex flex-row justify-evenly'>
                  <span>Icon: {formDataAddHabit.icon}</span>  
                  <button type = 'button' onClick = { () => setShowPicker((val) => !val)} className='font-bold text-md text-blue-500'>Change Icon</button>
                </div>
                )}
                

                {showPicker && ( 
                  <div className='flex flex-col justify-center items-center gap-4'>
                    <EmojiPicker emojiStyle='native' width="95%" reactions={["1f955","1f37d-fe0f", "2600-fe0f", "1f4a4", "1f98d", "1f3cb-fe0f" ]} reactionsDefaultOpen={true} onEmojiClick={onEmojiClick} />
                    <button type='button' onClick={() => setShowPicker((val) => !val)} className='font-bold text-md text-blue-500'>Cancel</button>
                  </div>  
                )}

              <Label className='mt-4'>Habit Category</Label>
              <Select id="category" required onChange={(e) =>
                setFormDataAddHabit({ ...formDataAddHabit, category: e.target.value })}>
                <option value='mind'>Mind</option>
                <option value='body'>Body</option>
                <option value='spirit'>Spirit</option>
              </Select>

                <Label className='mt-4'>Time to Complete By</Label>
                
                <div className='flex flex-col items-center'>
                  <input
                    type="time"
                    min="00:00"
                    max="23:59"
                    step="60"
                    value={formDataAddHabit.timeofday}
                    onChange={(e) => 
                      setFormDataAddHabit({ ...formDataAddHabit, timeofday: e.target.value })
                    }
                    className='w-full'/>
                  <button type='button' onClick={() =>
                    setFormDataAddHabit({ ...formDataAddHabit, timeofday: 'Any' })} className='p-2 w-auto text-blue-500'>Set No Deadline</button>
                </div>

              <Label className='mt-6'>Days to Complete On </Label>
              <div className='flex flex-wrap justify-center gap-5 mt-2 mb-4 '> 
                
                <span className='flex flex-row items-center gap-1'>
                <Checkbox id="monday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Mon</Label>
                </span>
                
                  <span className='flex flex-row items-center gap-1'>
                <Checkbox id="tuesday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Tue</Label>
                </span>

                  <span className='flex flex-row items-center gap-1'>
                <Checkbox id="wednesday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Wed</Label>
                </span>

                  <span className='flex flex-row items-center gap-1'>
                <Checkbox id="thursday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Thur</Label>
                </span>
                  <span className='flex flex-row items-center gap-1'>
                <Checkbox id="friday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Fri</Label>
                </span>
                  <span className='flex flex-row items-center gap-1'>
                <Checkbox id="saturday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Sat</Label>
                </span>
                  <span className='flex flex-row items-center gap-1'>
                <Checkbox id="sunday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Sun</Label>
                </span>
              </div>

              <div className='flex flex-col gap-2'>
                <span className='flex flex-col font-semibold'> 
                  Settings Preview:
                </span> 
                <span>Task: {formDataAddHabit.title}</span>
                <span>Icon: {formDataAddHabit.icon}</span>
                <span>Category: <span className={`${categoryText[formDataAddHabit.category]} font-bold`}>{formDataAddHabit.category}</span> </span>
                <span>Deadline: {formDataAddHabit.timeofday}</span>
              
                <div>
                    <span className='font-semibold'>Days To Complete On: </span>
                    {formDataDays.map((day, index) => (
                      <div key={index}>
                        {day}
                      </div>
                    ))}
                </div>
              </div>




              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Add
                </Button>
                <Button color='gray' onClick={() => setShowModalAddHabit(false)}>
                  Cancel
                </Button>
              </div>

            </div>
            </form>

            {publishError && (
              <Alert className='mt-5' color='failure'>
                {publishError}
              </Alert>
            )}

          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Habit Modal */}
      <Modal
        show={showModalDeleteHabit}
        onClose={() => setShowModalDeleteHabit(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this Task?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteHabit}>
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModalDeleteHabit(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Update Habit Modal */}
      <Modal
        show={showModalUpdateHabit}
        onClose={() => setShowModalUpdateHabit(false)}
        popup
        size='lg'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Edit habit:
            </h3>

            <form onSubmit={handleUpdateHabit}>
              <div className='flex flex-col'>
                <Label className='mt-4'>Habit</Label>
                <TextInput type='text' placeholder='Habit' id='title' value={formDataUpdateHabit.title} onChange={(e) =>
                  setFormDataUpdateHabit({ ...formDataUpdateHabit, title: e.target.value })
                } />

                <Label className='mt-4'>Habit Icon</Label>

                {showPicker ?
                  (<></>) :
                  (
                    <div className='flex flex-row justify-evenly'>
                      <span>Icon: {formDataUpdateHabit.icon}</span>
                      <button type='button' onClick={() => setShowPicker((val) => !val)} className='font-bold text-md text-blue-500'>Change Icon</button>
                    </div>
                  )}


                {showPicker && (
                  <div className='flex flex-col justify-center items-center gap-4'>
                    <EmojiPicker emojiStyle='native' width="95%" reactions={["1f955", "1f37d-fe0f", "2600-fe0f", "1f4a4", "1f98d", "1f3cb-fe0f"]} reactionsDefaultOpen={true} onEmojiClick={onEmojiClick} />
                    <button type='button' onClick={() => setShowPicker((val) => !val)} className='font-bold text-md text-blue-500'>Cancel</button>
                  </div>
                )}

                <Label className='mt-4'>Habit Category</Label>
                <Select id="category" required onChange={(e) =>
                  setFormDataUpdateHabit({ ...formDataUpdateHabit, category: e.target.value })}>
                  <option value='mind'>Mind</option>
                  <option value='body'>Body</option>
                  <option value='spirit'>Spirit</option>
                </Select>

                <Label className='mt-4'>Time to Complete By</Label>

                <div className='flex flex-col items-center'>
                  <input
                    type="time"
                    min="00:00"
                    max="23:59"
                    step="60"
                    value={formDataUpdateHabit.timeofday}
                    onChange={(e) =>
                      setFormDataUpdateHabit({ ...formDataUpdateHabit, timeofday: e.target.value })
                    }
                    className='w-full' />
                  <button type='button' onClick={() =>
                    setFormDataUpdateHabit({ ...formDataUpdateHabit, timeofday: 'Any' })} className='p-2 w-auto text-blue-500'>Set No Deadline</button>
                </div>

                <Label className='mt-6'>Days to Complete On </Label>
                <div className='flex flex-wrap justify-center gap-5 mt-2 mb-4 '>

                  <span className='flex flex-row items-center gap-1'>
                    <Checkbox id="monday" defaultChecked={formDataDays.includes('monday')} onChange={(e) => handleCheckday(e.target.id)} />
                    <Label>Mon</Label>
                  </span>

                  <span className='flex flex-row items-center gap-1'>
                    <Checkbox id="tuesday" defaultChecked={formDataDays.includes('tuesday')} onChange={(e) => handleCheckday(e.target.id)} />
                    <Label>Tue</Label>
                  </span>

                  <span className='flex flex-row items-center gap-1'>
                    <Checkbox id="wednesday" defaultChecked={formDataDays.includes('wednesday')} onChange={(e) => handleCheckday(e.target.id)} />
                    <Label>Wed</Label>
                  </span>

                  <span className='flex flex-row items-center gap-1'>
                    <Checkbox id="thursday" defaultChecked={formDataDays.includes('thursday')} onChange={(e) => handleCheckday(e.target.id)} />
                    <Label>Thur</Label>
                  </span>
                  <span className='flex flex-row items-center gap-1'>
                    <Checkbox id="friday" defaultChecked={formDataDays.includes('friday')} onChange={(e) => handleCheckday(e.target.id)} />
                    <Label>Fri</Label>
                  </span>
                  <span className='flex flex-row items-center gap-1'>
                    <Checkbox id="saturday" defaultChecked={formDataDays.includes('saturday')} onChange={(e) => handleCheckday(e.target.id)} />
                    <Label>Sat</Label>
                  </span>
                  <span className='flex flex-row items-center gap-1'>
                    <Checkbox id="sunday" defaultChecked={formDataDays.includes('sunday')} onChange={(e) => handleCheckday(e.target.id)} />
                    <Label>Sun</Label>
                  </span>
                </div>

                <div className='flex flex-col gap-2'>
                  <span className='flex flex-col font-semibold'>
                    Settings Preview:
                  </span>
                  <span>Task: {formDataUpdateHabit.title}</span>
                  <span>Icon: {formDataUpdateHabit.icon}</span>
                  <span>Category: <span className={`${categoryText[formDataUpdateHabit.category]} font-bold`}>{formDataUpdateHabit.category}</span> </span>
                  <span>Deadline: {formDataUpdateHabit.timeofday}</span>

                  <div>
                    <span className='font-semibold'>Days To Complete On: </span>
                    {formDataDays.map((day, index) => (
                      <div key={index}>
                        {day}
                      </div>
                    ))}
                  </div>
                </div>




                <div className='my-5 flex justify-center gap-4'>
                  <Button color='gray' type='submit'>
                    Add
                  </Button>
                  <Button color='gray' onClick={() => {
                    setShowModalUpdateHabit(false);
                    setFormDataDays([]);
                    setFormDataEmoji('');
                  }}>
                    Cancel
                  </Button>
                </div>

              </div>
            </form>

            {publishError && (
              <Alert className='mt-5' color='failure'>
                {publishError}
              </Alert>
            )}

          </div>
        </Modal.Body>
      </Modal>

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
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              {formDataOverview.title}
            </h3>

            <div className='flex flex-col gap-2'>
              <span className='font-semibold'>
                Settings Overview:
              </span>
              <span>Icon: {formDataOverview.icon}</span>
              <span>Category: <span className={`${categoryText[formDataOverview.category]} font-bold`}>{formDataOverview.category}</span> </span>
              <span>Deadline: {formDataOverview.timeofday}</span>

              <span className='font-semibold'>Days To Complete On: </span>
              <div className='flex flex-wrap justify-center gap-2 mt-1 mb-4'>
                {formDataDays.map((day, index) => (
                  <div key={index}>
                    {day}
                  </div>
                ))}
              </div>

              <span className='font-semibold'>Dates Completed: </span>
              <div className='flex flex-wrap justify-center gap-2 mt-1 mb-4'>
                {formDataCompleted.map((dateCompleted, index) => (
                  <div key={index} >
                    {dateCompleted}
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
