import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
    const {theme} = useSelector(state => state.theme);
    const {wallpaper} = useSelector(state => state.wallpaper);
  return (
    <div className={`group ${theme} ${wallpaper}`}>
      <div className=' text-gray-700 min-h-screen bg-[url("/backgroundGrid.png"),_url("/backgroundLines.png")] bg-[#176376] dark:bg-[#16424e] transition-colors duration-500'>
        <div className="bg-[#208da8] bg-opacity-60 dark:bg-opacity-30  sm:mx-5 md:mx-12 2xl:mx-[7%] group-[.wallpaper]:sm:mx-0 group-[.wallpaper]:md:mx-0 group-[.wallpaper]:2xl:mx-0">
          <div className='bg-white dark:bg-opacity-70 dark:bg-[#132b31] dark:backdrop-blur md:mx-10 lg:mx-20 2xl:mx-[10%] transition-colors duration-500 group-[.wallpaper]:md:mx-0 group-[.wallpaper]:lg:mx-0 group-[.wallpaper]:2xl:mx-0'>
            {children}
          </div>
        </div>
      </div>    
    </div>
  );
}