import { useState } from 'react';


import Goals from './Goals';
import HabitsComp from './Habits';


export default function GoalHolder( {category, sendDataToCategory} ) {


    const [goalsToggle, setGoalsToggle] = useState(true);
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


  const categoryDescription = {
    'mind': (`This category refers to the growth of your knowledge, intelligence, processing power and accomplishments related to the use of your head.
    Use it for goals related to school, career, learning and creating. Some items might fall into multiple categories, in such cases define your main intent. 
    For example: "Learning An Instrument" can clearly fall under Mind if your goal is to get more technically skilled at it. 
    But if youre playing with the main intention of playing an instrument, lets say: to play regularly or as a hobby, then it might fit better under your Spirit category.`),
    'body': (`The physical category. Related to your physical health, strength and physical acts. Losing weight, getting stronger, chores, habits, good sleep and things 
    that will root you down to the earth and pull you out of day dreaming will all belong here.`),
    'spirit': (`Spirit refers to your mental and spiritual well being and the state of zen. Do not confuse it with spirituality in only a religious sense. While such spirituality 
    might fall under spirit, the category encompasses more than that. A vacation for example, while a physical act and good for both the body and the mind, can fall into this
    category because it intends to help your mental well being, to destress and let you relax. Use this category for hobbies, bucket lists, meditations and yoga, exploring nature
    and small daily acts that bring peace to your mind - like keeping a diary or taking more breaks to catch a breather from work`),
  };


  return (
    <div className='flex flex-col justify-center '>

      <div className='px-5 pt-5 pb-24 sm:px-10 flex flex-col justify-center items-center bg-gradient-to-b from-white via-indigo-100 to-indigo-50'>
        <h1 className='font-BrushFont text-8xl sm:text-9xl'>{category}</h1>
        <p className='text-wrap break-words italic max-w-4xl'> {categoryDescription[category]}</p>
      </div>



        {/* GOALS / HABITS selector buttons */ }
        < div className = {`flex flex-row gap-5 justify-center border-b-2 border-gray-300 relative min-h-[41px] bg-indigo-50 `} >
          <button className={` w-[40%] border-r-2 border-t-2 rounded-t-lg  px-2 py-1 text-xl font-semibold border-gray-300 ${goalsToggle ? 'bottom-[-2px] bg-white' : 'text-gray-600 bottom-[-1px] border-b-2 bg-indigo-50'} absolute left-0 overflow-y-visible z-10`} type='button' onClick={toggleGoals}>GOALS</button>
          <button className={` w-[40%] border-l-2 border-t-2 rounded-t-lg px-2 py-1 text-xl font-semibold border-gray-300 ${habitsToggle ? 'bottom-[-2px] bg-white' : 'text-gray-600 bottom-[-1px] border-b-2 bg-indigo-50'} absolute right-0 overflow-y-visible z-10`} type='button' onClick={toggleHabits}>DAILY TASKS</button>
        </div >

        <div className='flex flex-col justify-center bg-gradient-to-b from-white via-indigo-100 to-indigo-100'>
          {habitsToggle ? (< HabitsComp />) : (< Goals category={category} sendDataToCategory={sendDataToCategory}/>)}
        </div>

        
    </div>
  )
}