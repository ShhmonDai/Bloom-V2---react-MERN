import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';

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
      <div className=' mx-auto pb-10 my-6 flex flex-col justify-center'> 
      
      {/* If user logged in map userGoals */}
      {currentUser ? (
        
        <>
        {/* User Goals */}
        {userGoals.map((goal) => (
          
          
          <div key={goal._id} className='group m-4' >

            {/* Title Div */}
            <div className='flex flex-row border-2 p-10 max-w-2xl w-screen'> 
              <p>Goal Title: {goal.title}</p>
              <button className='hidden group-hover:inline'>dropdown</button>
            </div>

            {/* Inner Div of Goals */}
            <div className='hidden group-hover:flex flex-col mx-10 px-2 border-2'>

                    {/* User Subgoals */}
                    {userSubGoals.map((subgoal) => (
                      <>
                      {/* Show Subgoals for current Goal */}
                      {(subgoal.goalId == goal._id) ? 
                        
                      (
                      <div className='' key={subgoal._id}>

                        <div className='flex flex-row gap-2'>
                                <span>Subgoal title: {subgoal.title}</span>
                                <button>Edit</button>
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

            {/* Outer Div of Goals */}
            <div className='flex flex-row border-2 p-4 max-w-2xl w-screen'></div>

          </div>

        ))}

      </>
      ) : (<p>You have no users yet!</p>) }
      
      
      </div>

    

    </div>
  )
}
