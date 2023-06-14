import React, { useState } from 'react'
import axios from "axios" 
import { error } from 'jquery';
import Joi from 'joi';
import { useNavigate } from 'react-router';

export default function (props) {
  
  let navigate = useNavigate();
  const [error, seterror] = useState('')
  const [isloading, setisloading] = useState(false)
  

  const [user, setuser] = useState({
      email : '' ,
       password : '' , 
  })

  function getUser (e) {
    let myUser = {...user} ;
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
    
  }

  function validationloginForm (user) {
    let schema = Joi.object({

          email : Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          password : Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), })

         return schema.validate(user , {abortEarly:false})
  }
  const [validationFormErrorList, setvalidationFormErrorList] = useState([]);
  
  async function submitRegister(e) {
    setisloading(true);
    e.preventDefault() ; 

    let validata = validationloginForm(user);

    if(validata.error)
    {setisloading(false);
     setvalidationFormErrorList(validata.error.details);

    }else{
      try{
      let respons = await axios.post(`https://registeration.vercel.app/user/signin`, user );

      if(respons.data.message === 'done'){
        localStorage.setItem('userToken',respons.data.token )

       props.getUserData();
        setisloading(false);
        navigate('/home');
      }

    }catch(error){ 
      seterror(`Make sure you are registered or Verify the password `);
      setisloading(false)
    }}
  
  }

  return (<>
  <div >

  <form onSubmit={submitRegister}  >

    <h2 className='my-3'>logIn</h2>
    <h5 className='fs-6 secondFontColor mb-3'> you should go to sign up first </h5>
    {validationFormErrorList.map((error,index)=> {
      if(index == 4)
      {
        return <div key={index} className="alert alert-danger ">password not validation</div>
      }
      else{
      return <div key={index} className="alert alert-danger ">{error.message}</div>
      }
    }
     )}

    {error?<div className=' alert alert-danger '>{error}</div>:''}

    <label htmlFor="email">Email :</label>
    <input onChange={getUser} type="email"name='email'id='email' className='form-control my-3 '/>

    <label htmlFor="password">Password :</label>
    <input onChange={getUser} type="password"name='password'id='password'className='form-control my-3 ' />
    
    <button className='btn btn-success '>   
    {isloading?<i className='fas fa-spinner fa-spin px-1 '></i>:'LogIn'}
    </button>

  </form>

  </div>
 
  </>
    
  )
}
