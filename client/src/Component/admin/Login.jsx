import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'

const Login = () => {

  const {axios, setToken} = useAppContext();
  const [mail, setmail] = useState("")
  const [pass, setpass] = useState("")



  const handleSubmit = async (e) => {
    e.preventDefault()
    // try {
    //   const {data} = await axios.post('/api/admin/login', {mail, pass})
    //   if(data.success)
    // } catch (error) {
      
    // }
  }


  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
            <p className='font-light'>Enter Your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label htmlFor="email">Email</label>
              <input onChange={(e) => setmail(e.target.value)} value={mail} className=' outline-none border-b-2 border-gray-300 p-2' type="email" id='email' required placeholder='Enter email id' />
            </div>
            <div className='flex flex-col mt-6'>
              <label htmlFor="pass">Password</label>
              <input onChange={(e) => setpass(e.target.value)} value={pass} className=' outline-none border-b-2 border-gray-300 p-2' type="password" id='pass' required placeholder='Enter your password' />
            </div>
            {console.log(pass)}

            <button className=' mt-5 w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90' type='submit'>Login</button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login