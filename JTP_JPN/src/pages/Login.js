import React, { useState } from 'react';
import AbcIcon from '@mui/icons-material/Abc';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { loginProfile } from '../global/api';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const [passwordShow, setPasswordShow] = useState(false)
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleTogglePasswordVisibility = (e) => {
    e.preventDefault()
    setPasswordShow(!passwordShow)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (formData.email && formData.password) {
      loginProfile({ username: formData.email, password: formData.password }).then(res => {
        localStorage.setItem("token", res.token)
        navigate("/")
        setError("")
      }).catch(err => { setError("Unable To Login"); console.log(err) })
        .finally(() => {
          setLoading(false)
        })
    }
    else {
      setError("Please provide all credentials")
    }
  }



  return <div className={`loginContainer`}>
    {/* Signin functionality */}
    <div className={` rounded-xl ${`loginMain`} grid grid-cols-1 sm:grid-cols-2 `}>
      <div className='grid place-items-center'>
        <div className=" sm:w-2/3">
          <center>
            <img
              height={100}
              width={100}
              className="mb-4"
              src="https://www.jtp.co.jp/wdp/wp-content/themes/jtp/assets/images/logo.png"
              alt="Without Background Logo"
            />
            <p className="text-4xl">Movie Recommender System</p>
            <span className="text-1xl block">Please provide credentials</span>
            {/* Error message */}
            {error && <p className='text-sm text-red-500 mt-4'>{error}</p>}
            <form
              onSubmit={handleLogin}
              className="mt-4">
              <input
                className="standardInput bg-gray-50"
                style={{ width: "calc(100% - 1rem)" }}
                type="email"
                placeholder='Enter your mail'
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
              <div className='relative'>
                <input
                  className='standardInput bg-gray-50'
                  style={{ width: "calc(100% - 1rem)" }}
                  type={passwordShow ? "text" : "password"}
                  placeholder='Password'
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  style={{ height: "calc(100% - 1rem)" }}
                  className='absolute top-0 right-0 px-2 mt-2 mb-2 mr-2'
                  onClick={handleTogglePasswordVisibility}>
                  {passwordShow ? <MoreHorizIcon /> : <AbcIcon />}
                </button>
              </div>
              <button
                className="block basicDarkButton m-2 mt-8 p-2 py-2"
                style={{ background: "var(--base-color)", color: "white", width: "calc(100% - 1rem)" }}
              >
                {!loading ? <p>Login</p> : <HourglassBottomIcon style={{ fontSize: "1rem" }} />}
              </button>
            </form>
            <a href="/forgotpassword" className="text-xs text-sky-500 ml-2" >
              Trouble in logging? <span className="text-xs text-slate-500">Forgot Password</span>
            </a>

          </center>
        </div>
      </div>

      <div className={`rounded-xl relative`}>
        <div
          className='rounded-xl absolute w-full bottom-0 right-0 overflow-hidden'
          style={{ height: "100%", width: "100%" }}
        >
          <img
            style={{ height: "100%", width: "100%",objectFit:"cover" }}
            src="https://www.jtp.co.jp/wdp/wp-content/uploads/revslider/aboutus-top/AdobeStock_310610261.jpg"
            alt="JTP Login"
          />
        </div>
      </div>
    </div>
  </div>;
};


