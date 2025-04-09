import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import News from './pages/News'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import WallpaperEngine from './pages/WallpaperEngine'
import SignIn from './pages/SignIn'
import SignInWE from './pages/SignInWE'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute'
import PrivateRouteWE from './components/PrivateRouteWE'


import ScrollToTop from './components/ScrollToTop'




export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/news" element={<News />}></Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
        <Route path="/sign-in-we" element={<SignInWE />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>
        <Route element={<PrivateRoute />} >
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />} >
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateRouteWE />} >
          <Route path="/wallpaper-engine" element={<WallpaperEngine />} />
        </Route>


      </Routes>
      <Footer/>
    </BrowserRouter>
    
  );
}
