import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
    const {theme} = useSelector(state => state.theme);
  return (
    <div className={theme}>
      <div className=' text-gray-700 min-h-screen bg-[url("/backgroundGrid.png"),_url("/backgroundLines.png")] bg-[#176376] transition-colors duration-500'>
        <div className="bg-[#208da8] bg-opacity-60  sm:mx-5 md:mx-12 2xl:mx-[7%]">
          <div className='bg-white dark:bg-opacity-70 dark:bg-[#132b31] md:mx-10 lg:mx-20 2xl:mx-[10%] transition-colors duration-500'>
            {children}
          </div>
        </div>
      </div>    
    </div>
  );
}