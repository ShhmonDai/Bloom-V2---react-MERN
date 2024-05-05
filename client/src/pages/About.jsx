export default function About() {
  return (
    <div className='min-h-screen flex justify-center'>
      <div className='max-w-7xl mx-auto pb-40 pt-10 sm:mx-5 px-10 sm:px-20 md:px-40 text-center dark:bg-black dark:bg-opacity-40'>
        <div className='text-left text-gray-900 dark:text-gray-400'>


          <div className='text-md flex flex-col gap-6'>
            
          <h1 className='text-3xl dark:text-white font font-semibold text-center mt-7 '>
            Welcome to Bloom!
          </h1>

          <h1 className='text-3xl dark:text-white font font-semibold text-center mb-7 '>
            A goal tracking website meant to help you visualize and see your progress!
          </h1>
            <p>
              The purpose of Bloom is to provide a way to visualy track your progress within three separate life categories: Mental, Physical and Spiritual,
              since we often cannot see our individual progress until we step back and take a look at the bigger picture. The reason for the three categories
              is to provide us a way to compare our progress between them in order to help us become a well-rounded person. Our method of visualization is a little
              tree that grows with you as you accomplish your goals and habits 
            </p>
          
          </div>
        </div>
      </div>
    </div>
  );
}