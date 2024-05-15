import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Table, Checkbox, Label, TextInput, Button, Modal, Alert, Textarea } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { TfiAngleDoubleDown } from "react-icons/tfi";
import { TfiAngleDoubleUp } from "react-icons/tfi";
import Subgoals from './Subgoals';


export default function Goals( {category} ) {

  const { currentUser } = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);

  const [userGoals, setUserGoals] = useState([]);

  const [showModalAddGoal, setShowModalAddGoal] = useState(false);



  const [showModalUpdateGoal, setShowModalUpdateGoal] = useState(false);

  

  const [showModalDeleteGoal, setShowModalDeleteGoal] = useState(false);

  

  const [formDataAddGoal, setFormDataAddGoal] = useState({});


  const [formDataUpdateGoal, setFormDataUpdateGoal] = useState({});


  const [idToDelete, setIdToDelete] = useState({});

  const [finishedTasks, setFinishedTasks] = useState("");

  function handleDataFromChild(data) {
    setFinishedTasks(data);
  }



  const goalColor = {
    'mind': ' bg-gradient-to-b from-rose-400 to-red-500',
    'body': ' bg-gradient-to-b from-amber-500 to-pink-500',
    'spirit': ' bg-gradient-to-b from-sky-500 to-teal-500',
  };
 
  const goalButton = {
    'mind': 'pinkToOrange',
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



  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`/api/goal/getcategorygoals/${currentUser._id}?category=${category}`);
        const data = await res.json();
        if (res.ok) {
          setUserGoals(data.goals);
 
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {
      fetchGoals();

    }
  }, [currentUser._id, category, reload]);

  return (
    <div className='w-full min-h-screen'>
      
      {/* Main Container */}
      <div className='mx-auto p-2 pt-20 mb-10 flex flex-col justify-center gap-10 max-w-4xl'>

      <span>Category Score: {finishedTasks} finished tasks </span> 
      
      {/* If user logged-in, map userGoals */}
      {currentUser ? (
        
        <>
        {/* User Goals */}
        {userGoals.map((goal, index) => (
          
          
          <div key={goal._id} id={index} className='group sm:mx-2' >

            {/* Title Div */}
            <div className={`border-b-2 rounded-lg shadow-lg ${goalColor[category]}`}> 
              <div className='mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg'>

                <div className='w-full cursor-pointer' onClick={() => document.getElementById(index).classList.toggle('is-open')}>{goal.title}</div>

                <div className='hidden group-[.is-open]:inline'>
                  <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button"><BsThreeDots /></button>}>
                    <Dropdown.Item onClick={() => {
                      setShowModalUpdateGoal(true);
                      setFormDataUpdateGoal({ ...formDataUpdateGoal, _id: goal._id, title: goal.title, content: goal.content});
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
            <div className={`border-t-2 rounded-lg min-h-[70px] shadow-2xl ${goalColor[category]}`} >
              <div className='mx-2 flex bg-white min-h-[70px] flex-row justify-around items-center px-4'>
                <span className='hidden group-[.is-open]:flex'>Started on: {new Date(goal.createdOn).toLocaleDateString()} </span>
                <span className='flex justify-center group-[.is-open]:rotate-180 cursor-pointer w-full' onClick={() => document.getElementById(index).classList.toggle('is-open')}><TfiAngleDoubleDown /></span>
                <Button className='hidden group-[.is-open]:flex' outline gradientDuoTone="greenToBlue"> Accomplish Goal </Button>
              </div>
            </div>

          </div>

        ))}


            {/* Add Goal Input */}
            <div className='my-5 mb-20 flex flex-row justify-center' >

              <Button className='w-full shadow-md' gradientDuoTone={`${goalButton[category]}`} onClick={() => {
                setFormDataAddGoal({ ...formDataAddGoal, category: category, userId: currentUser._id });
                setShowModalAddGoal(true);
              }}>Start A New Goal</Button>
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







    </div>
  )
}
