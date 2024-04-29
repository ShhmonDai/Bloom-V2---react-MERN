import { useSelector } from "react-redux";

export default function ThemeProvider({ children }) {
    const {theme} = useSelector(state => state.theme);
  return (
    <div className={theme}>
      <div className=' text-gray-700 dark:text-gray-100 min-h-screen dark:bg-gradient-to-tl from-sky-700 to-gray-900 transition-colors duration-500'>
        <div className='dark:bg-[url("/bggrid.png")] bg-[rgba(255,255,255,1)] dark:bg-[rgba(255,255,255,0)] transition-colors duration-500'>
            {children}
        </div>
      </div>    
    </div>
  );
}