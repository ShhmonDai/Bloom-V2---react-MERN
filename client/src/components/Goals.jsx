import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Table, Checkbox, Label, TextInput, Button } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";


export default function Goals( {category} ) {

  const { currentUser } = useSelector((state) => state.user);

  const [userGoals, setUserGoals] = useState([]);
  const [userSubGoals, setUserSubGoals] = useState([]);
  const [userNotes, setUserNotes] = useState([]);




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

    const fetchNotes = async () => {
      try {
        const resNote = await fetch(`/api/note/getcategorynotes/${currentUser._id}?category=${category}`);
        const dataNote = await resNote.json();
        if (resNote.ok) {
          setUserNotes(dataNote.notes);

        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {
      fetchGoals();
      fetchSubGoals();
      fetchNotes();
    }
  }, [currentUser._id, category]);

  return (
    <div className='w-full min-h-screen transition-all duration-500'>
      
      {/* Main Container */}
      <div className='mx-auto p-10 my-6 flex flex-col justify-center gap-5 max-w-5xl'> 
      
      {/* If user logged-in, map userGoals */}
      {currentUser ? (
        
        <>
        {/* User Goals */}
        {userGoals.map((goal) => (
          
          
          <div key={goal._id} className='group m-4 ' >

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
            <div className='hidden group-hover:flex opacity-0 group-hover:opacity-100 flex-col mx-10 px-2 py-10 border-2 transition-all duration-500'>


              {/* Goal Description */}
              <div className="ml-5">
                <Label htmlFor="description" value="Goal Description" />
              </div>
              <div className='mx-5 mb-10 p-5 border-2 min-h-20' >{goal.content}</div>

              {/* Add subgoal Input */}
              <div className='mx-5 mb-10 flex flex-row gap-2 justify-between' >
                <TextInput className='w-full' id="base" type="text" sizing="md" placeholder='Add A Subgoal'/>
                <Button>ADD</Button>
              </div>

              {/* Subgoals */}
              <div className="ml-5">
                <Label htmlFor="subgoals" value="Subgoals" />
              </div>
              <div className='mx-5 mb-10 border-2 min-h-20'>

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

                          <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
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
              <div className="ml-5">
                <Label htmlFor="Notes" value="Notes" />
              </div>
              <div className='mx-5 mb-10 border-2 min-h-20'>

                {/* User Notes */}
                {userNotes.map((note) => (
                  <>

                    {/* Show Subgoals for current Goal */}
                    {(note.goalId == goal._id) ? (

                        <div className='flex flex-col justify-between gap-2 m-2 p-5 border-2' key={note._id}>

                          <div className='flex flex-col justify-between'>
                            <div>
                              {note.title}
                            </div>
                            <div>
                              {note.content}
                            </div>
                          </div>

                          <div className='flex flex-row justify-between'>
                            <span>Last Update: {new Date(goal.createdOn).toLocaleDateString()} </span>

                            <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                              <Dropdown.Item>Edit</Dropdown.Item>
                              <Dropdown.Item>Delete</Dropdown.Item>
                            </Dropdown>
                          </div>

                        </div>


                      )
                      :
                      (
                        <></>
                      )}


                  </>
                ))}
              </div>

                

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
