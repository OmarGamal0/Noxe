import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Joi from 'joi'

function Login(props) {

    const [errorList, seterrorList] = useState('');
    const [loading, setloading] = useState(false);
    const [apiError, setapiError] = useState('');
    const [userDate, setuserDate] = useState({
      email : '' ,
      password : '' ,
     })
  
    let navigate= useNavigate()
  

    function getUserData (e) {
     let copyData = { ...userDate} ;
     copyData[e.target.name] = e.target.value ;
     setuserDate(copyData);
    }
    

    function getValidation(userDate){
      const schema = Joi.object({
          password: Joi.string()
              .pattern(new RegExp('^[a-zA-Z0-9\u0600-\u06FF\s]{3,30}$')),    
          email: Joi.string()
              .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      })
      return schema.validate(userDate, {abortEarly:false});
    }
  
  
  
  async function submitRegister (e) {
      e.preventDefault();
      setloading(true);
      let validation = getValidation(userDate);
    
     if(validation.error)
     { setloading(false);
       seterrorList(validation.error.details) ;
     }else{
      try{
        setloading(true);
        let responseApi = await axios.post('https://registeration.vercel.app/user/signin', userDate);

        if(responseApi.data.message === 'done'){
          localStorage.setItem('userToken',responseApi.data.token);
          props.getUserToken();
            navigate('/home')
           }
           
      }catch(error){
        setapiError('your email or password was incorrect');
        setloading(false);
      }
    }
  }
  
  
    return (
      <form onSubmit={submitRegister}>
        <h2>Log IN</h2>
        {errorList? errorList.map((error,index)=><div key={index} className='alert alert-danger'>{error.message}</div>):''} 
        {apiError?<div className='alert alert-danger'>{apiError}</div>:''}

          <label htmlFor="email">Email</label>
          <input onChange={getUserData} className='form-control my-2' type="email" name='email' />
  
          <label htmlFor="password">Password</label>
          <input onChange={getUserData} className='form-control my-2' type="password" name='password' />

          {loading == false?<button  className='btn btn-outline-info mt-3'>Log in</button>
          :<button className='btn btn-outline-info mt-3 spinner-border '></button>}
      </form>
    )
  }
  
  export default Login