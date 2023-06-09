import React, { useState } from 'react'
import axios from "axios" 
import { error } from 'jquery';
import Joi from 'joi';
import { useNavigate } from 'react-router';
export default function Signup() {

let navigate = useNavigate();
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

    // joi maktaba 3la4an el validation

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
          
          password : Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

          age : Joi.number()
        .integer()
        .min(18)
        .max(60), })

        // hat3mal test 3ala al user     da 3la4an mytla4 m3a 2wal error 
         return schema.validate(user , {abortEarly:false})


  }






const [error, seterror] = useState('')

const [isloading, setisloading] = useState(false)



// array  al erorr validation

const [validationFormErrorList, setvalidationFormErrorList] = useState([]);



  async function submitRegister(e) {

    setisloading(true);
    // 3ala4an al form bt3mal refrish 
    e.preventDefault() ; 



// validationRigesterForm(user) bet return al error bta3 el function validation (schema) 
    let validata = validationRigesterForm(user);
    
   // console.log(validata , 'alooooooooooooo');

    if(validata.error)
    {

      setisloading(false);
      setvalidationFormErrorList(validata.error.details);

    }


    else{


      try{

      let respons = await axios.post(`https://registeration.vercel.app/user/signup`, user );

      // console.log(respons , '1')
      
      if(respons.data.message === 'done'){

        // 3la4an ywdeh
        navigate('/login');

       // console.log('doneeeeeeee', respons)

        setisloading(false);

      }
    }

// 3la4an al api lama ytba3tlo 7aga 8alt byrag3 error ma4 message erorr


    catch(error){ 
      seterror('Your mail is already registered');
      console.log('error else 2')
      console.log(error.message,'2')
      setisloading(false)
    }


    }

   
    



 

  }

  return (<>
  <div >

  <form onSubmit={submitRegister}  >

    <h2 className='my-3'>Registeration Form</h2>
 
    {validationFormErrorList.map((error,index)=> {

      // el index bta3 al password = 0 .... da 3la4an mayzhar4 al /^[a-zA-Z0-9]{3,30}$/

      if(index == 0)
      {
     
        return <div key={index} className="alert alert-danger "> password not validation</div>
      }
      else{
        
      return <div key={index} className="alert alert-danger ">{error.message}</div> 
      
      }
    }
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
