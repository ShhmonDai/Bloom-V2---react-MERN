import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, setDark } from "../redux/theme/themeSlice";

export default function ThemeProvider({ children }) {
    const {theme} = useSelector(state => state.theme);
    const dispatch = useDispatch();

  useEffect(() => {
    const prefersDark = (window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches && window.matchMedia(
      "(max-width: 425px)"
      ).matches && navigator.userAgent.match(/SAMSUNG|Samsung|SGH-[I|N|T]|GT-[I|N]|SM-[A|N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i) );

    if (prefersDark) {
      dispatch(setDark());
    }
  }, []);

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