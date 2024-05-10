import React from 'react'
import { useEffect, useState } from 'react';
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
      
      
      <div className=' mx-auto pb-10 flex flex-col justify-center'> 
      {currentUser ? (
        <>
        {userGoals.map((goal) => (
          
          <div key={goal._id}>

            <div> 
              <p>Goal Title: {goal.title}</p>
            </div>

                    {userSubGoals.map(subgoal => (
                        
                     
                      <div key={subgoal._id}>
            
                        <div>
                          <li>Subgoal title: {subgoal.title}</li>
                        </div>
            
                      </div>
            
                    ))}
          </div>

        ))}

      </>
      ) : (<p>You have no users yet!</p>) }
      
      
      </div>

    

    </div>
  )
}
