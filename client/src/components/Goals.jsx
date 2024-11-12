import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, TextInput, Button, Modal, Alert, Textarea, Select } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TfiAngleDoubleDown } from "react-icons/tfi";
import { TfiAngleDoubleUp } from "react-icons/tfi";
import Subgoals from './Subgoals';
import moment from 'moment';

export default function Goals( {category, sendDataToCategory} ) {

  const { currentUser } = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);

  const [userGoals, setUserGoals] = useState([]);
  const [userGoalsAccomplished, setUserGoalsAccomplished] = useState([]);


  const [finishedTasks, setFinishedTasks] = useState(0);
  const [finishedGoals, setFinishedGoals] = useState(0);
  const [categoryScore, setCategoryScore] = useState('');

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`/api/goal/getcategorygoals/${currentUser._id}?category=${category}`);
        const data = await res.json();
        if (res.ok) {
          setUserGoals(data.goals);
          setUserGoalsAccomplished(data.accomplishedGoals);
          setFinishedGoals(data.finishedGoals);

        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {
      fetchGoals();

    }
  }, [currentUser._id, category, reload]);


  function handleDataFromChild(data) {
    setFinishedTasks(data);
  }

  useEffect(() => {

    const catScore = finishedTasks + (finishedGoals * 2)

    setCategoryScore(catScore);

  }, [finishedGoals, finishedTasks]);

  useEffect(() => {
    sendDataToCategory(categoryScore);
  }, [categoryScore])

  const [idToDelete, setIdToDelete] = useState({});

  const [showModalAddGoal, setShowModalAddGoal] = useState(false);
  const [showModalUpdateGoal, setShowModalUpdateGoal] = useState(false);
  const [showModalDeleteGoal, setShowModalDeleteGoal] = useState(false);
  const [showModalAccomplishGoal, setShowModalAccomplishGoal] = useState(false);

  const [formDataAddGoal, setFormDataAddGoal] = useState({});
  const [formDataUpdateGoal, setFormDataUpdateGoal] = useState({});
  const [formDataAccomplishGoal, setFormDataAccomplishGoal] = useState({});

  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date();
  const [todaysDay, setTodaysDay] = useState(weekday[date.getDay()]);
  const [todaysDate, setTodaysDate] = useState(moment().format('MMM-DD-YYYY'));
  const [todaysDateFull, setTodaysDateFull] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

  const goalColor = {
    'mind': ' bg-gradient-to-b from-teal-500 to-cyan-800',
    'body': ' bg-gradient-to-b from-amber-600 to-pink-400',
    'spirit': ' bg-gradient-to-b from-sky-500 to-teal-500',
  };
 
  const goalButton = {
    'mind': 'greenToBlue',
    'body': 'pinkToOrange',
    'spirit': 'cyanToBlue',
  };


  const [publishError, setPublishError] = useState(null);


  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/goal/creategoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAddGoal),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalAddGoal(false);
        setFormDataAddGoal({});
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleUpdateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/goal/editgoal/${formDataUpdateGoal._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataUpdateGoal),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalUpdateGoal(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleDeleteGoal = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(`/api/note/deletegoalnotes/${idToDelete._id}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
      }

    } catch (error) {
      setPublishError('Something went wrong');
    }

    try {

      const res = await fetch(`/api/subgoal/deletegoalsubgoals/${idToDelete._id}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
      }

    } catch (error) {
      setPublishError('Something went wrong');
    }

    try {

      const res = await fetch(`/api/goal/deletegoal/${idToDelete._id}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalDeleteGoal(false);
        reload ? setReload(false) : setReload(true);
      }

    } catch (error) {
      setPublishError('Something went wrong');
    }    

  };

  const handleAccomplishGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/goal/accomplishgoal/${formDataAccomplishGoal._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAccomplishGoal),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalAccomplishGoal(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
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



  return (
    <div className='w-full min-h-screen'>

      
      {/* Main Container */}
      <div className='mx-auto p-2 mb-10 flex flex-col justify-center gap-8 max-w-4xl'>

        {/* Welcome text */}
        <div className='text-center flex flex-col mt-20'>
          <span className='text-md font-semibold text-gray-500 font-Grandiflora'>Welcome To Goals</span>
          <span className='font-bold text-2xl text-gray-600 font-Grandiflora'>TODAY IS <span className='uppercase tracking-widest'>{todaysDay}</span> </span>
          <span className='text-md font-medium text-gray-500 '> {todaysDateFull} </span>
        </div>

        <div className='text-center flex flex-col'>
          <span className='text-lg font-medium text-gray-500 underline underline-offset-2'>Your Achievements So Far:</span>
          <span className='text-center'>Accomplished <span className='font-bold'>{finishedGoals}</span> Goals </span>
          <span className='text-center'>Completed <span className='font-bold'>{finishedTasks}</span> Tasks </span>
        </div>
       
      {/* If user logged-in, map userGoals */}
      {currentUser ? (
        
        <>
        {/* User Goals */}
        {userGoals.map((goal, index) => (
          
          
          <div key={goal._id} id={index} className='group sm:mx-2' >

            {/* Title Div */}
            <div className={`border-b-2 rounded-t-md shadow-lg ${goalColor[category]}`}> 
              <div className={`mx-2 ${goal.accomplished ? 'bg-slate-200 line-through' : 'bg-white'} flex flex-row justify-between px-5 py-4 text-xl font-semibold shadow-lg`}>

                <div className={` w-full cursor-pointer `} onClick={() => document.getElementById(index).classList.toggle('is-open')}>{goal.title}</div>

                <div className='hidden group-[.is-open]:inline'>
                  <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button"><BsThreeDots /></button>}>
                    <Dropdown.Item onClick={() => {
                      setShowModalUpdateGoal(true);
                      setFormDataUpdateGoal({ ...formDataUpdateGoal, _id: goal._id, title: goal.title, content: goal.content, category: goal.category});
                    }}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => {
                      setShowModalDeleteGoal(true);
                      setIdToDelete({ ...idToDelete, _id: goal._id });
                    }}>Delete</Dropdown.Item>
                  </Dropdown> 
                </div>
            </div>
            </div>

            {/* Inner Div of Goals */}
            <div className='h-0 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]:h-auto group-[.is-open]:py-10 flex scale-y-0 group-[.is-open]:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>
            
            <div className='flex flex-row cursor-pointer justify-between' onClick={() => document.getElementById(index).classList.toggle('is-open')} >
              <button type='button' className=''><TfiAngleDoubleUp /></button>
              <button type='button' className=''><TfiAngleDoubleUp /></button>
            </div>

              {/* Goal Description */}
              <div className="text-center">
                <Label htmlFor="description" value="About" />
              </div>
              <div className='mb-5 p-2 min-h-20 text-center break-words' >{goal.content}</div>


              < Subgoals goalId={goal._id} category={category} sendDataToParent={handleDataFromChild} />
       

            </div>

            {/* Outer Div of Goals */}
            <div className={`border-t-2 rounded-b shadow-md ${goalColor[category]}`} >
              <div className={`mx-2 flex ${goal.accomplished ? 'bg-slate-200' : 'bg-white'} min-h-[60px] flex-row justify-evenly items-center px-4`}>
                <span className='hidden group-[.is-open]:flex font-semibold'>Created on: {new Date(goal.createdOn).toLocaleDateString()} </span>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full text-gray-400' onClick={() => document.getElementById(index).classList.toggle('is-open')}><TfiAngleDoubleDown /></span>

                {goal.accomplished ?
                  (<button type='button' onClick={() => {
                    setFormDataAccomplishGoal({ ...formDataAccomplishGoal, _id: goal._id, accomplished: false});
                    setShowModalAccomplishGoal(true);
                  }} className='hidden group-[.is-open]:flex my-2'>
                    <span className=' text-red-500 font-medium'>Undo Accomplishment</span>
                  </button>)
                  :
                  (<Button type='button' onClick={() => {
                    setFormDataAccomplishGoal({ ...formDataAccomplishGoal, _id: goal._id, accomplished: true });
                    setShowModalAccomplishGoal(true);
                  }} className='hidden group-[.is-open]:flex my-2' outline gradientDuoTone="greenToBlue">
                    Accomplish Goal
                  </Button>)
                }
              </div>
            </div>

          </div>

        ))}

        {/* Add Goal Input */}
        <div className='my-5 flex flex-row justify-center' >

          <Button className='shadow-md' gradientDuoTone={`${goalButton[category]}`} onClick={() => {
            setFormDataAddGoal({ ...formDataAddGoal, category: category, userId: currentUser._id });
            setShowModalAddGoal(true);
          }}>Begin a New Goal</Button>
        </div>

        {/* Accomplished Goals Container */}
        <div className='flex flex-col mt-10 mb-20 gap-5 '>

              <div className='text-center flex flex-col'>
                <span className='text-md font-semibold text-gray-500'>History</span>
                <span className='font-bold text-xl text-gray-600 '>Your Accomplished Goals </span>
              </div>


              {/* CONTAINER */}
              <div id='day' className='group/archive sm:mx-2' >

                {/* Top Outer - Header*/}
                <div className={`shadow-lg rounded-t-lg bg-white border-b-2`}>
                  <div className={`mx-2 sm:px-5 bg-white flex flex-row justify-center cursor-pointer p-3 text-md font-semibold shadow-lg`} onClick={() => document.getElementById('day').classList.toggle('is-open')}>

                    ARCHIVES

                  </div>
                </div>

                {/* Inner Container */}
                <div className='h-0 gap-5 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]/archive:h-auto group-[.is-open]/archive:py-10 flex scale-y-0 group-[.is-open]/archive:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-6 px-2 origin-top transition-all duration-700'>
                  
                  {/* User Goals */}
                  {userGoalsAccomplished.map((goalDone) => (


                    <div key={goalDone._id} id={goalDone._id} className='group/done sm:mx-2' >

                      {/* Title Div */}
                      <div className={`border-b-2 rounded-t-md shadow-lg ${goalColor[category]}`}>
                        <div className={`mx-2 ${goalDone.accomplished ? 'bg-slate-200 line-through' : 'bg-white'} flex flex-row justify-between px-5 py-4 text-xl font-semibold shadow-lg`}>

                          <div className={` w-full cursor-pointer `} onClick={() => document.getElementById(goalDone._id).classList.toggle('is-open')}>{goalDone.title}</div>

                          <div className='hidden group-[.is-open]/done:inline'>
                            <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button"><BsThreeDots /></button>}>
                              <Dropdown.Item onClick={() => {
                                setShowModalUpdateGoal(true);
                                setFormDataUpdateGoal({ ...formDataUpdateGoal, _id: goalDone._id, title: goalDone.title, content: goalDone.content });
                              }}>Edit</Dropdown.Item>
                              <Dropdown.Item onClick={() => {
                                setShowModalDeleteGoal(true);
                                setIdToDelete({ ...idToDelete, _id: goalDone._id });
                              }}>Delete</Dropdown.Item>
                            </Dropdown>
                          </div>
                        </div>
                      </div>

                      {/* Inner Div of Goals */}
                      <div className='h-0 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-[.is-open]/done:h-auto group-[.is-open]/done:py-10 flex scale-y-0 group-[.is-open]/done:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>

                        <div className='flex flex-row cursor-pointer justify-between' onClick={() => document.getElementById(goalDone._id).classList.toggle('is-open')} >
                          <button type='button' className=''><TfiAngleDoubleUp /></button>
                          <button type='button' className=''><TfiAngleDoubleUp /></button>
                        </div>

                        {/* Goal Description */}
                        <div className="text-center">
                          <Label htmlFor="description" value="About" />
                        </div>
                        <div className='mb-5 p-2 min-h-20 text-center break-words' >{goalDone.content}</div>


                        < Subgoals goalId={goalDone._id} category={category} sendDataToParent={handleDataFromChild} />


                      </div>

                      {/* Outer Div of Goals */}
                      <div className={`border-t-2 rounded-b shadow-md ${goalColor[category]}`} >
                        <div className={`mx-2 flex ${goalDone.accomplished ? 'bg-slate-200' : 'bg-white'} min-h-[60px] flex-row justify-evenly items-center px-4`}>
                          <span className='hidden group-[.is-open]/done:flex font-semibold'>Created on: {new Date(goalDone.createdOn).toLocaleDateString()} </span>
                          <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full text-gray-400' onClick={() => document.getElementById(goalDone._id).classList.toggle('is-open')}><TfiAngleDoubleDown /></span>

                          {goalDone.accomplished ?
                            (<button type='button' onClick={() => {
                              setFormDataAccomplishGoal({ ...formDataAccomplishGoal, _id: goalDone._id, accomplished: false });
                              setShowModalAccomplishGoal(true);
                            }} className='hidden group-[.is-open]/done:flex'>
                              <span className=' text-red-500 font-medium'>Undo Accomplishment</span>
                            </button>)
                            :
                            (<Button type='button' onClick={() => {
                              setFormDataAccomplishGoal({ ...formDataAccomplishGoal, _id: goalDone._id, accomplished: true });
                              setShowModalAccomplishGoal(true);
                            }} className='hidden group-[.is-open]/done:flex' outline gradientDuoTone="greenToBlue">
                              Accomplish Goal
                            </Button>)
                          }
                        </div>
                      </div>

                    </div>

                  ))}
                </div>

                {/* Bottom Outer - Footer */}
                <div className={`border-t-2 shadow-2xl rounded-b-lg bg-white`} >
                  <div className={`mx-2 flex bg-white py-5 flex-row justify-evenly items-center px-4 shadow-lg`} onClick={() => document.getElementById('day').classList.toggle('is-open')}>
                    <span className='flex justify-center group-[.is-open]/archive:rotate-180 cursor-pointer w-full'><TfiAngleDoubleDown /></span>
                  </div>
                </div>

              </div>


        </div>
    
      </>
      ) : (<p>Log in</p>) }
      
      
      </div>


      
      {/* Add Goal Modal */}
      <Modal
        show={showModalAddGoal}
        onClose={() => setShowModalAddGoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Add a new goal:
            </h3>
            <form onSubmit={handleCreateGoal}>
              <Label>Goal Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataAddGoal.title} onChange={(e) =>
                setFormDataAddGoal({ ...formDataAddGoal, title: e.target.value })
              } />
              <Label>Goal Description</Label>
              <Textarea rows={6} placeholder='Description' id='content' value={formDataAddGoal.content} onChange={(e) =>
                setFormDataAddGoal({ ...formDataAddGoal, content: e.target.value })
              } />


              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Add
                </Button>
                <Button color='gray' onClick={() => setShowModalAddGoal(false)}>
                  Cancel
                </Button>
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


      {/* Update Goal Modal */}
      <Modal
        show={showModalUpdateGoal}
        onClose={() => setShowModalUpdateGoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Edit Goal:
            </h3>
            <form onSubmit={handleUpdateGoal}>
              <Label>Goal Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataUpdateGoal.title} onChange={(e) =>
                setFormDataUpdateGoal({ ...formDataUpdateGoal, title: e.target.value })
              } />
              <Label>Goal Description</Label>
              <Textarea rows={6} placeholder='Description' id='content' value={formDataUpdateGoal.content} onChange={(e) =>
                setFormDataUpdateGoal({ ...formDataUpdateGoal, content: e.target.value })
              } />
              <Label className='mt-4'>Goal Category</Label>
              <Select id="category" required onChange={(e) =>
                setFormDataUpdateGoal({ ...formDataUpdateGoal, category: e.target.value })}>
                <option selected value={formDataUpdateGoal.category}>Choose a category</option>
                <option value='mind'>Mind</option>
                <option value='body'>Body</option>
                <option value='spirit'>Spirit</option>
              </Select>


              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Update
                </Button>
                <Button color='gray' onClick={() => setShowModalUpdateGoal(false)}>
                  Cancel
                </Button>
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




      {/* Delete Goal Modal*/}    
      <Modal
        show={showModalDeleteGoal}
        onClose={() => setShowModalDeleteGoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this goal?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteGoal}>
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModalDeleteGoal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Accomplish Goal Modal */}
      <Modal
        show={showModalAccomplishGoal}
        onClose={() => setShowModalAccomplishGoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              {formDataAccomplishGoal.accomplished ? (<>Mark Goal as Done?</>) : (<>Mark Goal As To Do?</>)}
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleAccomplishGoal}>
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModalAccomplishGoal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>






    </div>
  )
}
