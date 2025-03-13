import React from 'react';
import landing from '../assets/Landing.png';
import { ITEMS } from './Items';

const Landing = () => {

  const handleAuth = (type) => {
    window.location.href = `${process.env.REACT_APP_BACKEND_URL}/auth/google/${type}`;
  };
  
  return (
    <>
      <div className='md:flex'>
        <img src={landing} alt="notepad" className='w-screen h-[27vh] object-cover md:w-[60vw] md:h-[100vh]' />

        <div>
          <div className="font-bold text-2xl pt-10 pb-6 md:pt-24 md:pb-16 md:px-[15vw] text-center">
            Welcome to
            <div className='playwrite text-green-600 text-4xl'>easytexteditor</div>
          </div>

          <div className='px-10 md:px-14'>
            <ul className='pb-12 list-disc space-y-2 text-sm text-justify'>
              {ITEMS.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className='flex flex-col items-center space-y-2'>
              <button
                onClick={() => handleAuth("login")}
                className="button-style px-13"
              >Login with Google</button>

              <p className='text-xs'>or</p>

              <button
                onClick={() => handleAuth("signup")}
                className="button-style px-12"
              >Sign up with Google</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing