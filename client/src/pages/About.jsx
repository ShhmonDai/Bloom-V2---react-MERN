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

            <p className='text-left px-5 sm:px-10'>
              Bloom's Trees are created using P5.JS canvas. The shape is made up of many variables such as: <br /> <br />
              <b>Size</b> - the general scale of tree while keeping proportions, <br />
              <b>Recursion Level</b> - the number of branch levels, <br />
              <b>Length Variation</b> - the variation in length of branches, <br />
              <b>Split Probability</b> - probability that a branch will split into multiple branches, <br />
              <b>Flower Probabilty</b> - probability that a flower will appear at a branch level.<br /> <br />
              And hidden variables such as the <b>Seed</b> of the random functions which control how the tree will shape up in the end.
              Not all Seeds produce a pretty tree so I've preselected certain Seeds that produce better visuals.
            </p>

            <div className='text-left text-wrap break-words whitespace-pre-wrap flex flex-col gap-4'>

              In Bloom, we believe in holistic growth, which is why we categorize goals and habits into three distinct
              yet interconnected categories: mind, body, and spirit.

              <p>
                <b>Mind:</b> This category focuses on mental well-being, cognitive development, and intellectual pursuits.
                Goals and habits related to learning new skills, expanding knowledge, practicing mindfulness, and
                improving mental health fall under this category. Whether it's reading more books, learning a new language,
                or practicing meditation, nurturing your mind is essential for overall growth and fulfillment.
              </p>

              <p>
                <b>Body:</b> The body category encompasses physical health, fitness, nutrition, and overall well-being.
                Goals and habits here revolve around exercise, diet, sleep hygiene, and self-care practices. Whether you're aiming
                to run a marathon, eat more vegetables, prioritize sleep, or simply stay active throughout the day, taking care of
                your body is crucial for vitality and longevity.
              </p>

              <p>
                <b>Spirit:</b> Spirituality, personal values, and emotional well-being form the foundation of the spirit category.
                Goals and habits in this realm include cultivating gratitude, fostering meaningful relationships, practicing self-reflection,
                and connecting with something greater than oneself. Whether it's through meditation, journaling, spending time in nature,
                or engaging in acts of kindness, nurturing your spirit enriches your sense of purpose and inner peace.
              </p>

              By categorizing goals and habits into mind, body, and spirit, Bloom empowers users to address all aspects of
              their well-being and achieve balanced growth in their lives.
            </div>
          
          </div>
        </div>
      </div>
    </div>
  );
}