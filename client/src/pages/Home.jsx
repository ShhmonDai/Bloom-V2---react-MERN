export default function Home() {

  return (
    <div className='w-full min-h-screen'>


      {/* Intro Container */}
      <div className='dark:bg-black dark:bg-opacity-40 border-b-[1px] border-gray-300 dark:border-gray-700 mx-auto py-10 px-5 flex flex-col sm:flex-row gap-8 justify-center'>

        <div className=' border-gray-300 dark:border-gray-700 max-w-6xl flex-1'>
          <h1 className='text-2xl font-semibold text-center '>Welcome to Bloom!</h1>
          <p className='text-center font-semibold pt-2 pb-5 '>Bloom is a goal tracking website meant to help you visualize and see your progress</p> 
          <p className='dark:text-gray-300'>The goal of Bloom is to provide a way to visualy track your progress within three separate life categories: Mental, Physical and Spiritual, 
            since we often cannot see our individual progress until we step back and take a look at the bigger picture. 
            The reason for the three categories is to provide us a way to compare our progress between them in order to help us become a well-rounded person. 
            Our method of visualization is a little tree that grows with you as you accomplish your goals and habits </p>
          
        </div>

      </div>




    </div>
  )
}
