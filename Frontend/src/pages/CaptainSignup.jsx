import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CaptainSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e) => {
      e.preventDefault();
      setUserData({
        fullname:{
          firstname: firstname,
          lastname: lastname
        },
        email: email,
        password: password
      });
      console.log(userData);
      setFirstname('');
      setLastname('');
      setEmail('');
      setPassword('');
    }

  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
    <div>
      <img className='w-16 mb-2' src="https://www.svgrepo.com/show/505031/uber-driver.svg"/>
      <form onSubmit={(e) => submitHandler(e)}>

        <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
        <div className='flex gap-4 mb-5'>
        <input 
        type="text" 
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder: text-base'
        required 
        placeholder='First name' />
        <input 
        type="text" 
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder: text-base'
        required 
        placeholder='Last name' /> 
        </div>

        <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>

        <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder: text-base'
        required 
        placeholder='email@example.com' />

        <h3 className='text-lg font-medium mb-2'>Enter your password</h3>

        <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-lg placeholder: text-base'
        required 
        placeholder='password' />
        <button
        className='bg-[#111] text-white font-semibold mb-4 rounded px-4 py-2 w-full text-lg placeholder: text-base'>
          Register</button>

        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </form>
    </div>
    <div>
      <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of service</span> apply</p>    
    </div>
  </div>
  );
};

export default CaptainSignup;