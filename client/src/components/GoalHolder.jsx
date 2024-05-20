import { useState } from 'react';


import Goals from './Goals';
import HabitsComp from './Habits';
import { PiFlowerLotus } from "react-icons/pi";
import { Link } from 'react-router-dom';



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
    But if youre playing with the main intention of playing an instrument, to lets say: play regularly or as a hobby, then it might fit better under your Spirit category.`),
    'body': (`The physical category. Related to your physical health, strength and physical acts. Losing weight, getting stronger, chores, habits, good sleep and things 
    that will root you down to the earth and pull you out of day dreaming will all belong here.`),
    'spirit': (`Spirit refers to your mental and spiritual well being and the state of zen. Do not confuse it with spirituality in only a religious sense. While such spirituality 
    might fall under Spirit, the category encompasses more than that. A vacation for example, while a physical act and good for both the body and the mind, can fall into this
    category because it intends to help your mental well being, to destress and let you relax. Use this category for hobbies, bucket lists, meditations and yoga, exploring nature
    and small daily acts that bring peace to your mind - like keeping a diary or taking more breaks to catch a breather from work`),
  };

  const categoryColor = {
    'mind': 'text-teal-500',
    'body': 'text-orange-300',
    'spirit': 'text-sky-500',
  };

  const borderColor = {
    'mind': 'border-teal-500',
    'body': 'border-orange-300',
    'spirit': 'border-sky-500',
  };



  return (
    <div className='flex flex-col justify-center '>

      <div className='px-5 pt-5 pb-28 sm:px-10 flex flex-col justify-center items-center bg-gradient-to-b from-white via-indigo-100 to-indigo-50'>
        <h1 className='font-BrushFont text-8xl sm:text-9xl'>{category}</h1>
        <p className='text-wrap break-words italic max-w-4xl'> {categoryDescription[category]}</p>
      </div>



        {/* GOALS / HABITS selector buttons */ }
        < div className = {`flex flex-row gap-5 justify-center relative min-h-[41px] bg-indigo-50 `} >
        <button className={` w-[35%] sm:w-[40.4%] pr-3 border-t-4 rounded-tr-full text-xl font-medium ${borderColor[category]} pt-4 pb-3 bottom-[-1px] ${goalsToggle ? `font-bold ${categoryColor[category]}` : `text-gray-400 `} bg-gradient-to-b from-white to-white absolute left-0 overflow-y-visible z-1`} type='button' onClick={toggleGoals}>GOALS</button>
        <Link to='/' className={`flex justify-center w-[31.5%]  sm:w-[20.2%] lg:w-[19.9%] bg-gradient-to-t from-indigo-50 to-indigo-50 border-b-4 rounded-b-full  text-xl font-semibold ${borderColor[category]}   absolute bottom-[-41px] overflow-y-visible z-2`}> <PiFlowerLotus className={`${categoryColor[category]} text-6xl`}/> </Link>
        <button className={` w-[35%] sm:w-[40.4%] pl-3 border-t-4 rounded-tl-full text-xl font-medium ${borderColor[category]}  pt-4 pb-3 bottom-[-1px] ${habitsToggle ? `font-bold ${categoryColor[category]}` : 'text-gray-400 '} bg-gradient-to-b from-white to-white absolute right-0 overflow-y-visible z-1`} type='button' onClick={toggleHabits}>HABITS</button>
        </div >

        <div className='flex flex-col justify-center bg-gradient-to-b from-white via-indigo-100 to-indigo-100'>
          {habitsToggle ? (< HabitsComp />) : (< Goals category={category} sendDataToCategory={sendDataToCategory}/>)}
        </div>

        
    </div>
  )
}