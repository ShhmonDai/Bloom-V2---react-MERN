import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, TextInput, Button, Modal, Alert, Textarea, Select, Checkbox } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TfiAngleDoubleDown } from "react-icons/tfi";
import { TfiAngleDoubleUp } from "react-icons/tfi";

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

  const goalColor = {
    'mind': ' bg-gradient-to-b from-teal-500 to-cyan-800',
    'body': ' bg-gradient-to-b from-amber-400 to-pink-400',
    'spirit': ' bg-gradient-to-b from-sky-500 to-teal-500',
  };

  const goalButton = {
    'mind': 'greenToBlue',
    'body': 'pinkToOrange',
    'spirit': 'cyanToBlue',
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

        <div className='text-center font-bold'>Today is: {todaysDay} !</div>

        {/* Timeline */}
        <div className='mx-2 min-h-16 border-red-500 border '></div>

        {/* Todays Day */}
        <div className='mx-2 min-h-16 border-red-500 border '></div>

        {/* Weekdays Container */}
        <div className='flex flex-col mx-2 min-h-16 border-red-500 border gap-10 '>

          {/* Add Habit Input */}
          <div className='my-5 flex flex-row justify-center' >
            <Button className='w-full shadow-md' gradientDuoTone={`${goalButton[category]}`} onClick={() => {
              setFormDataAddHabit({ ...formDataAddHabit, userId: currentUser._id, daysofweek: formDataDays, category: 'mind', timeofday: 'all'});
              setShowModalAddHabit(true);
            }}>Add new Habit</Button>
          </div>   

          <div id='monday' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}>
              <div className={`mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer text-center`} onClick={() => document.getElementById('monday').classList.toggle('is-open')}>Monday</div>

              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-4 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value="Mondays Tasks" />
              </div>

              {/* Map Days Habits Here */}
              {mondayHabits.map((habit) => (
                <>
                  <div className={` group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={habit._id}>

                    <div className='flex flex-col justify-between w-full'>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        {habit.title}
                      </div>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        Complete By: {habit.timeofday}
                      </div>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        On days: {habit.daysofweek + ''} 
                      </div>

                      <div className='flex flex-row justify-between pt-6 px-2'>

                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                            <button type='button'>
                              <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                            </button>
                        </div>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item >Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className={`mx-2 flex bg-white min-h-[70px] flex-row justify-evenly items-center px-4`}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById('monday').classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
              </div>
            </div>

          </div>

          <div id='tuesday' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}>
              <div className={`mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer text-center`} onClick={() => document.getElementById('tuesday').classList.toggle('is-open')}>Tuesday</div>

              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-4 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value="Tuesdays Tasks" />
              </div>

              {/* Map Days Habits Here */}
              {tuesdayHabits.map((habit) => (
                <>
                  <div className={` group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={habit._id}>

                    <div className='flex flex-col justify-between w-full'>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        {habit.title}
                      </div>

                      <div className='flex flex-row justify-between pt-6 px-2'>

                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                          <button type='button'>
                            <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                          </button>
                        </div>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item >Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className={`mx-2 flex bg-white min-h-[70px] flex-row justify-evenly items-center px-4`}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById('tuesday').classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
              </div>
            </div>

          </div>

          <div id='wednesday' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}>
              <div className={`mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer text-center`} onClick={() => document.getElementById('wednesday').classList.toggle('is-open')}>Wednesday</div>

              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-4 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value="Wednesday Tasks" />
              </div>

              {/* Map Days Habits Here */}
              {wednesdayHabits.map((habit) => (
                <>
                  <div className={` group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={habit._id}>

                    <div className='flex flex-col justify-between w-full'>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        {habit.title}
                      </div>

                      <div className='flex flex-row justify-between pt-6 px-2'>

                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                          <button type='button'>
                            <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                          </button>
                        </div>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item >Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className={`mx-2 flex bg-white min-h-[70px] flex-row justify-evenly items-center px-4`}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById('wednesday').classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
              </div>
            </div>

          </div>

          <div id='thursday' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}>
              <div className={`mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer text-center`} onClick={() => document.getElementById('thursday').classList.toggle('is-open')}>Thursday</div>

              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-4 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value="Thursdays Tasks" />
              </div>

              {/* Map Days Habits Here */}
              {thursdayHabits.map((habit) => (
                <>
                  <div className={` group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={habit._id}>

                    <div className='flex flex-col justify-between w-full'>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        {habit.title}
                      </div>

                      <div className='flex flex-row justify-between pt-6 px-2'>

                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                          <button type='button'>
                            <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                          </button>
                        </div>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item >Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className={`mx-2 flex bg-white min-h-[70px] flex-row justify-evenly items-center px-4`}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById('thursday').classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
              </div>
            </div>

          </div>

          <div id='friday' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}>
              <div className={`mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer text-center`} onClick={() => document.getElementById('friday').classList.toggle('is-open')}>Friday</div>

              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-4 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value="Fridays Tasks" />
              </div>

              {/* Map Days Habits Here */}
              {fridayHabits.map((habit) => (
                <>
                  <div className={` group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={habit._id}>

                    <div className='flex flex-col justify-between w-full'>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        {habit.title}
                      </div>

                      <div className='flex flex-row justify-between pt-6 px-2'>

                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                          <button type='button'>
                            <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                          </button>
                        </div>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item >Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className={`mx-2 flex bg-white min-h-[70px] flex-row justify-evenly items-center px-4`}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById('friday').classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
              </div>
            </div>

          </div>

          <div id='saturday' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}>
              <div className={`mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer text-center`} onClick={() => document.getElementById('saturday').classList.toggle('is-open')}>Saturday</div>

              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-4 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value="Saturdays Tasks" />
              </div>

              {/* Map Days Habits Here */}
              {saturdayHabits.map((habit) => (
                <>
                  <div className={` group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={habit._id}>

                    <div className='flex flex-col justify-between w-full'>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        {habit.title}
                      </div>

                      <div className='flex flex-row justify-between pt-6 px-2'>

                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                          <button type='button'>
                            <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                          </button>
                        </div>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item >Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className={`mx-2 flex bg-white min-h-[70px] flex-row justify-evenly items-center px-4`}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById('saturday').classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
              </div>
            </div>

          </div>

          <div id='sunday' className='group sm:mx-2' >

            {/* Top Outer - Header*/}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}>
              <div className={`mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer text-center`} onClick={() => document.getElementById('sunday').classList.toggle('is-open')}>Sunday</div>

              </div>
            </div>

            {/* Inner Container */}
            <div className='h-0 gap-4 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

              {/* Description */}
              <div className="text-center">
                <Label htmlFor="description" value="Sundays Tasks" />
              </div>

              {/* Map Days Habits Here */}
              {sundayHabits.map((habit) => (
                <>
                  <div className={` group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={habit._id}>

                    <div className='flex flex-col justify-between w-full'>

                      <div className='font-semibold text-center my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                        {habit.title}
                      </div>

                      <div className='flex flex-row justify-between pt-6 px-2'>

                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                          <button type='button'>
                            <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                          </button>
                        </div>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                          <Dropdown.Item >Edit</Dropdown.Item>
                          <Dropdown.Item>Delete</Dropdown.Item>
                        </Dropdown>
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>

            {/* Bottom Outer - Footer */}
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className={`mx-2 flex bg-white min-h-[70px] flex-row justify-evenly items-center px-4`}>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById('sunday').classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
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
                <option value='all'>All day</option>
                <option value='6'>6 am</option>
                <option value='12'>12 pm</option>
                <option value='6'>6 pm</option>
                <option value='12'>12 am</option>
              </Select>

              <Label className='mt-6'>Days to Complete On </Label>
              <div className='flex flex-row gap-2 my-2 mb-4'> 

                <Checkbox id="monday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Mon</Label>

                <Checkbox id="tuesday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Tue</Label>

                <Checkbox id="wednesday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Wed</Label>

                <Checkbox id="thursday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Thur</Label>

                <Checkbox id="friday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Fri</Label>

                <Checkbox id="saturday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Sat</Label>

                <Checkbox id="sunday" onChange={(e) => handleCheckday(e.target.id)} />
                <Label>Sun</Label>
              </div>

              <div> 
                {formDataAddHabit.title} {formDataAddHabit.category} {formDataAddHabit.timeofday}
              
                <div>
                    {formDataDays.map((day, index) => (
                      <div key={index}>
                        Day: {day}
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
