import React from 'react'
import'./sinUp.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import Joi from 'joi'

function Signup() {

  const [errorList, seterrorList] = useState('');
  const [loading, setloading] = useState(false);
  const [apiError, setapiError] = useState('');
  const [userDate, setuserDate] = useState({
    first_name :'',
    last_name : '' ,
    email : '' ,
    password : '' ,
    age : ''
   })

  let navigate= useNavigate()

  function getUserData (e) {
   let copyData = { ...userDate} ;
   copyData[e.target.name] = e.target.value ;
   setuserDate(copyData);
  }
  
  function getValidation(userDate){
    const schema = Joi.object({
        first_name: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),

        last_name : Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required(),
    
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9\u0600-\u06FF\s]{3,30}$')),
            
        age : Joi.number()
            .integer()
            .min(10)
            .max(80),
    
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    })
    return schema.validate(userDate, {abortEarly:false});
  }



async function sumitRegister (e) {
    e.preventDefault();
    setloading(true);
    let validation = getValidation(userDate);
  
   if(validation.error)
   { setloading(false);
     seterrorList(validation.error.details) ;
   }else{
    try{
      setloading(true);
      
      let responseApi = await axios.post('https://registeration.vercel.app/user/signup',userDate);
      if(responseApi.data.message === 'done'){
          navigate('/login')
          console.log('done')
         }
         
    }catch(error){
      setapiError('Your mail is already registered');
      setloading(false);
    }
  }
}


  return (
    <form onSubmit={sumitRegister}>
      <h2 className='my-3'>Registeration Form</h2>

      {errorList? errorList.map((error,index)=><div key={index} className='alert alert-danger'>{error.message}</div>):''} 
      {apiError?<div className='alert alert-danger'>{apiError}</div>:''}

        <label htmlFor="first_name">Frist Name</label>
        <input onChange={getUserData} className='form-control my-2' type="text" name='first_name' />
        
        <label htmlFor="last_name">Last Name</label>
        <input onChange={getUserData} className='form-control my-2' type="text" name='last_name' />
        
        <label htmlFor="age">Age</label>
        <input onChange={getUserData} className='form-control my-2' type="number" name='age' />

        <label htmlFor="email">Email</label>
        <input onChange={getUserData} className='form-control my-2' type="email" name='email' />

        <label htmlFor="password">Password</label>
        <input onChange={getUserData} className='form-control my-2' type="password" name='password' />
    
        {loading == false?<button  className='btn btn-outline-succes mt-3'>Sinup</button>
        :<button className='btn btn-outline-info mt-3 spinner-border'></button>}
    </form>
  )
}

export default Signup