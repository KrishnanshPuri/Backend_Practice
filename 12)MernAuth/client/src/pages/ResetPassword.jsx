import React, { useState, useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const nav = useNavigate()
  const { backendUrl } = useContext(AppContent)
  
  const [e, setE] = useState('')
  const [p, setP] = useState('')
  const [isE, setIsE] = useState(false)
  const [isO, setIsO] = useState(false)
  const [o, setO] = useState('')
  
  const refs = useRef([])

  const hIn = (ev, i) => {
    if (ev.target.value.length > 0 && i < refs.current.length - 1) refs.current[i + 1].focus()
  }

  const hKD = (ev, i) => {
    if (ev.key === 'Backspace' && ev.target.value === '' && i > 0) refs.current[i - 1].focus()
  }

  const subE = async (ev) => {
    ev.preventDefault()
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email: e })
      data.success ? (toast.success(data.message), setIsE(true)) : toast.error(data.message)
    } catch (err) { toast.error(err.message) }
  }

  const subO = async (ev) => {
    ev.preventDefault()
    const otpVal = refs.current.map(r => r.value).join('')
    setO(otpVal)
    setIsO(true)
  }

  const subP = async (ev) => {
    ev.preventDefault()
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', { email: e, otp: o, newpassword: p })
      data.success ? (toast.success(data.message), nav('/login')) : toast.error(data.message)
    } catch (err) { toast.error(err.message) }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400'>
      <img onClick={() => nav('/')} src={assets.logo} alt="" className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' />
      
      {!isE && (
        <form onSubmit={subE} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter your registered email address</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} className='w-3 h-3' />
            <input type="email" value={e} onChange={ev => setE(ev.target.value)} placeholder='Email id' className='bg-transparent outline-none text-white w-full' required />
          </div>
          <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 cursor-pointer'>Submit</button>
        </form>
      )}

      {isE && !isO && (
        <form onSubmit={subO} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>Reset password OTP</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email id.</p>
          <div className='flex justify-between mb-8'>
            {Array(6).fill(0).map((_, i) => (
              <input type="text" maxLength='1' key={i} required className='w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md' ref={el => refs.current[i] = el} onInput={(ev) => hIn(ev, i)} onKeyDown={(ev) => hKD(ev, i)} />
            ))}
          </div>
          <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer'>Submit</button>
        </form>
      )}

      {isE && isO && (
        <form onSubmit={subP} className='bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm'>
          <h1 className='text-white text-2xl font-semibold text-center mb-4'>New password</h1>
          <p className='text-center mb-6 text-indigo-300'>Enter the new password below</p>
          <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} className='w-3 h-3' />
            <input type="password" value={p} onChange={ev => setP(ev.target.value)} placeholder='Password' className='bg-transparent outline-none text-white w-full' required />
          </div>
          <button className='w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full mt-3 cursor-pointer'>Submit</button>
        </form>
      )}
    </div>
  )
}

export default ResetPassword