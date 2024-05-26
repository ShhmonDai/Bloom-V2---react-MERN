import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, TextInput, Button, Modal, Alert, Textarea, Select, Checkbox } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TfiAngleDoubleDown } from "react-icons/tfi";
import { FaCheck, FaTimes, FaSlidersH } from 'react-icons/fa';
import { RiSettings3Fill } from "react-icons/ri";
import EmojiPicker from 'emoji-picker-react';

import moment from 'moment';

export default function Habits( {category, sendDataToCategory2}) {

  const { currentUser } = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);
  const [publishError, setPublishError] = useState(null);

  const [showModalAddHabit, setShowModalAddHabit] = useState(false);
  const [formDataAddHabit, setFormDataAddHabit] = useState({});
  const [formDataDays, setFormDataDays] = useState([]);

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
    setFormDataAddHabit({ ...formDataAddHabit, icon: emojiObject.emoji })
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
    setFormDataAddHabit({ ...formDataAddHabit, daysofweek: formDataDays});
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
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
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
        <div className='mx-2 min-h-16 border-gray-500 border text-center'>
          <span className='text-md font-semibold text-gray-500'>Todays Task Timeline</span>
        </div>

        {/* Todays Day */}
        <div className='mx-2 min-h-16 flex flex-col bg-white bg-opacity-70 rounded-xl'>
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

                  <div className={`w-4 h-4 border-2 ${categoryBorder[todayshabit.category]} justify-self-start `}></div>

                  <div className={``}> {todayshabit.timeofday}</div>

                  <div className={``}>{todayshabit.icon}</div>

                  <div className='font-semibold my-2 text-wrap break-words whitespace-pre-wrap'>
                    {todayshabit.title}
                  </div>

                  <div className='opacity-0 group-hover:opacity-100 transition-all duration-300 flex justify-self-end items-center justify-center'>
                    <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                      <Dropdown.Item onClick={() => {}}>Edit</Dropdown.Item>
                      <Dropdown.Item onClick={() => {}}>Delete</Dropdown.Item>
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

                      <div className='font-semibold my-2 text-wrap break-words'>
                        {habit.title}
                      </div>

                      <div className='flex justify-self-end items-center justify-center'>
                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item onClick={() => { }}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => { }}>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

              {/* Add Habit Input */}
              <div className='flex flex-row justify-center' >
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

      {/* Add Goal Modal */}
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
                    <EmojiPicker emojiStyle='native' width="95%" reactionsDefaultOpen={true} onEmojiClick={onEmojiClick} />
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
              <Select id="time" required onChange={(e) =>
                setFormDataAddHabit({ ...formDataAddHabit, timeofday: e.target.value })}>
                <option value='Any'>All day</option>
                <option value='6 am'>6 am</option>
                <option value='7 am'>7 am</option>
                <option value='8 am'>8 am</option>
                <option value='9 am'>9 am</option>
                <option value='10 am'>10 am</option>
                <option value='11 am'>11 am</option>
                <option value='12 pm'>12 pm</option>
                <option value='1 pm'>1 pm</option>
                <option value='2 pm'>2 pm</option>
                <option value='3 pm'>3 pm</option>
                <option value='4 pm'>4 pm</option>
                <option value='5 pm'>5 pm</option>
                <option value='6 pm'>6 pm</option>
                <option value='7 pm'>7 pm</option>
                <option value='8 pm'>8 pm</option>
                <option value='9 pm'>9 pm</option>
                <option value='10 pm'>10 pm</option>
                <option value='11 pm'>11 pm</option>
                <option value='12 am'>12 am</option>
                <option value='1 am'>1 am</option>
                <option value='2 am'>2 am</option>
                <option value='3 am'>3 am</option>
                <option value='4 am'>4 am</option>
                <option value='5 am'>5 am</option>
              </Select>

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

    </div>
  )
}
