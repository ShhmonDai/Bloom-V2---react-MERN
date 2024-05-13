import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import Goals from './Goals';
import HabitsComp from './Habits';


export default function GoalHolder( {category} ) {

    const {currentUser, error, loading } = useSelector(state => state.user);
    
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
    <div className='pb-10 flex flex-col justify-center bg-gradient-to-b from-white via-indigo-100 to-indigo-100'>

        {/* GOALS / HABITS selector buttons */ }
        < div className = 'flex flex-row gap-5 justify-center' >
          <button className='border rounded-lg px-2 py-1' type='button' onClick={toggleGoals}>Goals</button>
          <button className='border rounded-lg px-2 py-1' type='button' onClick={toggleHabits}>Habits</button>
        </div >

        <div className='flex flex-col gap-5 justify-center'>
          {habitsToggle ? (< HabitsComp />) : (< Goals category={category} />)}
        </div>
        
    </div>
  )
}