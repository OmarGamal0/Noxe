
import React, { useEffect, useState } from 'react'

import { Navigate, Route, Routes, useNavigate } from 'react-router'
import { Home, Signup , Login ,Navbar ,MovieDetails } from './Component' 
import DetailsContextProvider from './Context/DetailsContext'
import jwtDecode from 'jwt-decode'



export default function App() { 
  const [userData, setuserData] = useState(null); 
  let navigate = useNavigate() ;

  useEffect(() => { 
    if(localStorage.getItem("userToken")){ 
      setuserData(localStorage.getItem("userToken"));
    }
  }, [])

  function getUserData() {
  let userTokenDecode = jwtDecode(localStorage.getItem("userToken"));
  setuserData(userTokenDecode);
  }

function logout() {
  localStorage.removeItem("userToken");
  setuserData(null);
  navigate('/login');
}

function Protectedroute ({ children }) {
  if(!localStorage.getItem("userToken"))
  {return <Navigate to='/login'/>;

  }else{
    return children ;
  }
}



  return (<>
  <Navbar userData={userData}  logout={logout}/>

  <div className='container'>
  <Routes>
      <Route path='home' element={<Protectedroute> <Home/> </Protectedroute> }/>

      <Route path='MovieDetails' element={<Protectedroute>  <DetailsContextProvider>  <MovieDetails/>   </DetailsContextProvider>  </Protectedroute> }>
      <Route path=':id' element={<MovieDetails/>}/></Route>

      <Route path='signup' element={<Signup/>}/>
      <Route path='Noxe' element={<Signup/>}/>
      <Route path='login' element={ <Login getUserData={getUserData}/> }/>
      <Route path='*' element={<h1>404</h1>}/>
      <Route path='/' element={<Protectedroute> <Home/> </Protectedroute> }/> 
  </Routes>
  </div>
   
    
  </>
 
  )
}
