import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Table, Checkbox, Label, TextInput, Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";


export default function Goals() {

  const { currentUser } = useSelector((state) => state.user);

  const [userGoals, setUserGoals] = useState([]);
  const [userSubGoals, setUserSubGoals] = useState([]);




  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`/api/goal/getgoals/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserGoals(data.goals);
 
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchSubGoals = async () => {
      try {
        const resSub = await fetch(`/api/subgoal/getsubgoals/${currentUser._id}`);
        const dataSub = await resSub.json();
        if (resSub.ok) {
          setUserSubGoals(dataSub.subgoals);

        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser) {
      fetchGoals();
      fetchSubGoals();
    }
  }, [currentUser._id]);

  return (
    <div className='w-full min-h-screen'>
      
      {/* Main Container */}
      <div className='mx-auto p-10 my-6 flex flex-col justify-center gap-5 max-w-5xl'> 
      
      {/* If user logged-in, map userGoals */}
      {currentUser ? (
        
        <>
        {/* User Goals */}
        {userGoals.map((goal) => (
          
          
          <div key={goal._id} className='group m-4' >

            {/* Title Div */}
            <div className='flex flex-row justify-between border-2 p-10 text-2xl'> 
              <p>{goal.title}</p>
              <div className='hidden group-hover:inline'>
                <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button"><BsThreeDots /></button>}>
                  <Dropdown.Item>Edit</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown> 
              </div>
            </div>

            {/* Inner Div of Goals */}
            <div className='hidden group-hover:flex flex-col mx-10 px-2 py-10 border-2 transition-all duration-500'>


              {/* Goal Description */}
              <div className='m-5 border-2 p-10' >{goal.content}</div>

              {/* Add subgoal Input */}
              <div className="ml-5 block">
                <Label htmlFor="base" value="Add Task" />
              </div>
              <div className='mx-5 flex flex-row gap-2 justify-between' >
                <TextInput className='w-full' id="base" type="text" sizing="md" />
                <Button>ADD</Button>
              </div>

              {/* Subgoal Table */}
              <div className='m-5 border-2'>

                    {/* User Subgoals */}
                    {userSubGoals.map((subgoal) => (
                      <>
                        
                      {/* Show Subgoals for current Goal */}
                      {(subgoal.goalId == goal._id) ? 
                        
                       (
                        
                        <div className='flex flex-row justify-between gap-2 m-2 p-2' key={subgoal._id}>

                          <div className='flex flex-row gap-5 justify-between'>
                            <div>
                              {subgoal.accomplished ? (<Checkbox id="accomplish" defaultChecked></Checkbox>) : (<Checkbox id="accomplish"></Checkbox>)}
                            </div>

                            <div>
                              {subgoal.title}
                            </div>

                          </div>
                              
                          <div>
                            {subgoal.content}
                          </div>

                          <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button"><BsThreeDots /></button>}>
                            <Dropdown.Item>Edit</Dropdown.Item>
                            <Dropdown.Item>Delete</Dropdown.Item>
                          </Dropdown> 


                        </div> 
                        
                      
                      )
                      : 
                      (
                        <></>
                      )}


                    </>    
                    ))}
              </div>

              {/* Notes */}
              <div className='m-5 border-2 p-10' >Notes go Here</div> 

              {/* Add Note */}
              <div className='mx-auto border-2 rounded-lg p-5 flex flex-col justify-center items-center gap-2 ' >
                <IoIosAddCircleOutline className='text-4xl'/>
                <span>Add new note</span>  
              </div>         

            </div>

            {/* Outer Div of Goals */}
            <div className='border-2 p-6'>
              <div className='hidden group-hover:flex flex-row justify-between text-xl'>
                <span>Date Created: {new Date(goal.createdOn).toLocaleDateString()} </span>
                <Button> Accomplish Goal </Button>
              </div>
            </div>

          </div>

        ))}

      </>
      ) : (<p>You have no users yet!</p>) }
      
      
      </div>

    

    </div>
  )
}
