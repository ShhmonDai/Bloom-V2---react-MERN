export default function About() {
  return (
    <div className='min-h-screen flex justify-center'>
      <div className='max-w-7xl mx-auto pb-40 pt-10 sm:mx-5 px-10 sm:px-20 md:px-40 text-center dark:bg-black dark:bg-opacity-40'>
        <div className='text-left text-gray-900 dark:text-gray-400'>


          <div className='text-md flex flex-col gap-6'>
            
          <h1 className='text-3xl dark:text-white font font-semibold text-center my-7 '>
            About Szymon's Eclectic Anecdotes
          </h1>
            <p>
              Welcome! This blog was created by Szymon Pozniewski (pronounced: Shh-mohn Poh-znieh-vski, or close enough to that)
              as a personal project to share with everyone my journey through the world of programming,
              art, development and life in general. I am a passionate developer who loves bringing products to life. 
              Starting from scratch with just an idea, wireframing, designing databases, 
              coming up with comfortable plus efficient UI/UX and the whole coding process to grow the idea into a finished working product 
              that all people involved in it's creation can feel proud of. In this blog I would like to document this entire process.
            </p>
          
            <h1 className='text-3xl dark:text-white font font-semibold text-center mt-7'>
              The meaning behind the name
            </h1>

            <div>
              <h2 className='text-2xl dark:text-white font-semibold'>Eclectic</h2>
              <h3 className="text-lg italic">/ēˈklektik/</h3>
              <span className="gap-1">:deriving ideas, style, or taste from a broad and diverse range of sources.</span>
            </div>

            <p>Eclectic comes from the Greek eklektikos (meaning "selective"), from the verb eklegein, "to select." 
              Eclectic was originally applied to ancient philosophers who were not committed to any single system of 
              philosophy but instead selected whichever doctrines pleased them from every school of thought. 
              Later, the word's use broadened to cover other selective natures. 
              "Hard by, the central slab is thick with books / Diverse, but which the true eclectic mind / Knows how to group, and gather out of each / 
              Their frequent wisdoms...." In this 19th century example from a poem by Arthur Joseph Munby, 
              for example, the word is applied to literature lovers who cull selective works from libraries.</p>

            <div>
              <h2 className='text-2xl dark:text-white font-semibold'>Anecdote</h2>
              <h3 className='text-lg italic'>/AN-ik-doht/</h3>
              <span>: a short account of a particular incident or event, especially of an interesting or amusing nature.</span>
            </div>

            <p>An anecdote is a quick story about something of interest, usually with a singular theme or lesson. 
              Anecdotes are no different than the stories told among friends, but when they’re used in literature, 
              they can accomplish more than merely passing the time. </p>

            <h1 className='text-3xl dark:text-white font font-semibold text-center mt-7'>
              Contents
            </h1>

            <p>
              On this blog, you'll find regular articles on topics
              such as web development, software engineering, and programming
              languages as well as back to basics reviews of programming concepts,
              such as leet code problems. If I learn something interesting, cool or 
              have a horror story with bugs and various mistakes I make, I
              will share it here as well. I am always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <h1 className='text-3xl dark:text-white font font-semibold text-center mt-7'>
              Leave a comment!
            </h1>

            <p>
              I encourage you to leave comments on my posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. I believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}