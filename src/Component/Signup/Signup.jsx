import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import axios from "axios" 
import Joi from 'joi';


export default function Signup() {
  let navigate = useNavigate();

  const [isloading, setisloading] = useState(false)
  const [error, seterror] = useState('')
  const [user, setuser] = useState({
    first_name :'',
    last_name : '' ,
    email : '' ,
    password : '' ,
    age : ''
  })

  function getUser (e) {
    let myUser = {...user} ;
    myUser[e.target.name] = e.target.value;
    setuser(myUser);
    console.log(user);
  }

  function validationRigesterForm (user) {
    let schema = Joi.object({
      first_name: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),

          last_name :Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),

          email : Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
          
          password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{5,30}$')),

          age : Joi.number()
          .integer()
          .min(18)
          .max(60), })

         return schema.validate(user , {abortEarly:false})
  }
  const [validationFormErrorList, setvalidationFormErrorList] = useState([]);

  async function submitRegister(e) {
    setisloading(true);
    e.preventDefault() ; 
    let validata = validationRigesterForm(user);

    if(validata.error)
    {
      setisloading(false);
      setvalidationFormErrorList(validata.error.details);
    }else{
    try{
      let respons = await axios.post(`https://registeration.vercel.app/user/signup`, user );
      if(respons.data.message === 'done'){
        navigate('/login');
        setisloading(false);
      }
    }

// 3la4an al api lama ytba3tlo 7aga 8alt byrag3 error ma4 message erorr
    catch(error){ 
      seterror('Your mail is already registered');
      // console.log('error else 2')
      // console.log(error.message,'2')
      setisloading(false)
    }
  }  
}

  return (<>
  <div >

  <form onSubmit={submitRegister}  >
    <h2 className='my-3'>Registeration Form</h2>

    {validationFormErrorList.map((error,index)=> {

      if(error.context.key == 'password')
      {
     console.log(error, 'omarrrrrrrrr');
        return <div key={index} className="alert alert-danger "> password not validation</div>
      }
      else{
      return <div key={index} className="alert alert-danger ">{error.message}</div> 
      }}
     )}

    {error?<div className=' alert alert-danger '>{error}</div>:''}

    <label htmlFor="first_name">Frist Name :</label>
    <input onChange={getUser} type="text"name='first_name'id='first_name' className='form-control my-3 '/>

    <label htmlFor="last_name">Last Name :</label>
    <input onChange={getUser}type="text" name='last_name'id='last_name'className='form-control my-3 ' />

    <label htmlFor="age">age :</label>
    <input onChange={getUser} type="number"name='age'id='age'className='form-control my-3 '/>

    <label htmlFor="email">Email :</label>
    <input onChange={getUser} type="email"name='email'id='email' className='form-control my-3 '/>

    <label htmlFor="password">Password :</label>
    <input onChange={getUser} type="password"name='password'id='password'className='form-control my-3 ' />
    
    <button className='btn btn-success '>   
    {isloading?<i className='fas fa-spinner fa-spin '></i>:'Regist'}
    </button>

  </form>
  </div>
  </> 
  )
}
