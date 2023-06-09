
import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { Navigate, Route, Routes, useNavigate } from 'react-router'


import { Home, Signup , Login ,Navbar ,MovieDetails } from './Component' 
import DetailsContextProvider from './Context/DetailsContext'




export default function App() {
  
  const [userData, setuserData] = useState(null); 
  let navigate = useNavigate() ;
// hena 3la4an lo 3amal refrish ma y5lea4 al useState(null); fa ytla3 men al (if ely f al nav bar (logOut)) fa be4of al  
//{localStorage.getItem("userToken")} lo mawgod yb2h ma 3mal4 log out 

// component did mount 
  useEffect(() => { 
    if(localStorage.getItem("userToken")){
      
      setuserData(localStorage.getItem("userToken"));
  
    }
  }, [])


// jwt decode 3la4an al userToken mat4afr 

  function getUserData() {
  let userTokenDecode = jwtDecode(localStorage.getItem("userToken"));
  setuserData(userTokenDecode);
  }

// useEffect(() => {console.log(userData, 'userData')}, [useState])


function logout () {
  localStorage.removeItem("userToken");
  setuserData(null);
  navigate('/login');

}

function Protectedroute ({ children }) {

  if(!localStorage.getItem("userToken"))
  {//  Navigate de 7aga lwa7dahaaaaaaaaaaaaaaa  import it 
   // maynfa4 navigate('/login'); 3la4an el <Navigate to='/login'/> htt7at makan el Protectedroute
   return <Navigate to='/login'/>;

  }else{// <Protectedroute> <Home/> </Protectedroute>
//               da al children
    return children ;

  }}



  return (<>
  
  <Navbar userData={userData}  logout={logout}/>

  
  <div className='container'>

  <Routes>
      <Route path='home' element={<Protectedroute> <Home/> </Protectedroute> }/>

     
      <Route path='MovieDetails' element={<Protectedroute>  <DetailsContextProvider>  <MovieDetails/>   </DetailsContextProvider>  </Protectedroute> }>
      <Route path=':id' element={<MovieDetails/>}/>
      </Route>
      
      
      <Route path='signup' element={<Signup/>}/>
      <Route path='NNoXe' element={<Signup/>}/>
      <Route path='login' element={ <Login getUserData={getUserData}/> }/>
      <Route path='*' element={<h1>404</h1>}/>
      <Route path='/' element={<Protectedroute> <Home/> </Protectedroute> }/>
     
  </Routes>

  </div>
   
    
  </>
 
  )
}
