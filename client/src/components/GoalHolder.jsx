import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import GoalsComp from './Goals';
import HabitsComp from './Habits';


export default function GoalHolder() {

    const { currentUser, error, loading } = useSelector(state => state.user);
    
    const [goalsToggle, setGoalsToggle] = useState();
    const [habitsToggle, setHabitsToggle] = useState();

    const toggleGoals = () => {
        setHabitsToggle(false);
        setGoalsToggle(true);
        console.log('Goals On');

    };

    const toggleHabits = () => {
        setGoalsToggle(false);
        setHabitsToggle(true);
        console.log('Habits On');
    };




  return (
    <div className=' mx-auto pb-10 flex flex-col justify-center'>

        {/* GOALS / HABITS selector buttons */ }
        < div className = 'flex flex-row gap-5 justify-center' >
          <button className='border rounded-lg px-2 py-1' type='button' onClick={toggleGoals}>Goals</button>
          <button className='border rounded-lg px-2 py-1' type='button' onClick={toggleHabits}>Habits</button>
        </div >

        <div className='flex flex-col gap-5 justify-center'>
          {habitsToggle ? (< HabitsComp />) : (< GoalsComp />)}
        </div>
        
    </div>
  )
}