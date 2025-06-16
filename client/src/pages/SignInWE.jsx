import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignInWE() {


  {/* This is a separate sign in page for Wallpaper Engine Users. It simply has less options visible and redirects to the custom Wallpaper Engine main page.
    Unfortunately Google Oauth does not work on Wallpaper Engine as it needs to open a separate tab in order to login */}

  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const [errorMessageAlert, setErrorMessageAlert] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearAlert = () => {
    setErrorMessageAlert(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
      return setErrorMessageAlert('Please fill all the fields');
    }

    try {
      setErrorMessageAlert(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signinwallpaper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setErrorMessageAlert(data.message);
        dispatch(signInFailure(data.message));
      }

      {/* Change Navigate Destination on Sign In to the WE Main page  */ }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/wallpaper-engine?wallpaper=true&tab=mind');
      }

    } catch (error) {
      setErrorMessageAlert(error.message);
      dispatch(signInFailure(error.message));
    }
  };

  const handleDemo = async () => {

    try {
      setErrorMessageAlert(null);
      dispatch(signInStart());
      const res = await fetch('/api/auth/signindemo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email: 'demo@demo.com'}),
      });

      const data = await res.json();
      if (data.success === false) {
        setErrorMessageAlert(data.message);
        dispatch(signInFailure(data.message));
      }

      {/* Change Navigate Destination on Sign In to the WE Main page  */ }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/wallpaper-engine?wallpaper=true');
      }

    } catch (error) {
      setErrorMessageAlert(error.message);
      dispatch(signInFailure(error.message));
    }
  };

 
  return (
    <div className='min-h-screen bg-gradient-to-tl from-sky-900 to-gray-800'>
      <div className='min-h-screen bg-[url("/bggrid.png")] text-slate-100'>
        <div className='flex p-3 max-w-4xl mx-auto flex-col lg:flex-row md:items-top sm:gap-10 md:gap-15 lg:gap-20 md:px-14 pt-20'>
        {/* left side */}
        
          <div className='flex flex-col mb-10 justify-center items-center w-auto lg:max-w-72 md:-max-w-xl'>
          <Link to='/' className='text-6xl md:text-7xl text-center font-QwigleyFont'>Sign In</Link>
          <span className='mt-4 text-center italic font-semibold'>Continue Your Journey</span>
          <p className='text-center lg:text-left text-sm mt-5'>
            You can sign in with your email and password. Or you can use the demo account below. Unfortunately Google OAuth Login is currently not supported.
          </p>

          <div className="mt-5 text-sm text-center flex flex-col">
            <p className='text-sm font-bold'>
              For a preview:
            </p>

            <Button gradientDuoTone="purpleToBlue" type='submit' disabled={loading} onClick={() => {
              handleDemo();
            }} className="my-2">
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : ('Demo Account Sign In'
              )}
            </Button>


          </div>


        </div>


        {/* right side */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          
            <div className=''>
              <Label className="text-slate-100" value='Your email' />
              <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
            </div>
            <div className=''>
              <Label className="text-slate-100" value='Your passsword' />
              <TextInput type='password' placeholder='********' id='password' onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Loading...</span>
                </>
              ) : ('Sign In'
              )}
            </Button>

          </form>

          { errorMessageAlert && (
            <Alert className='mt-5' color='failure' onDismiss={() => clearAlert()}>
                {errorMessageAlert}
              </Alert>
            )
          }
        </div>

      </div>
      </div>
    </div>
  
  )
}
