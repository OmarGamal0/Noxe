import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-transperant navbar-dark ">

  <div className="container-fluid">
  
    <a className="navbar-brand fw-bolder fs-3" to='home'>NOXE</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>


    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav m-auto mb-2 mb-lg-0 ">
      {props.userData?<>
        <li className="nav-item ">
        <Link className="nav-link active" aria-current="page" to='home'>Home</Link>
        </li>
        <li className="nav-item px-1 "><a className='nav-link active' href="#Movies">Movies</a></li>
        <li className="nav-item px-1 "><a className='nav-link active' href="#Tv">Tv</a></li>
        <li className="nav-item px-1 "><a className='nav-link active' href="#People">People</a></li>
          </>:''}
      </ul>


<ul className='navbar-nav mb-2 mb-lg-0'>
<li className='d-flex align-items-center me-3'>
   <i className="fa-brands mx-2  fa-facebook"></i>
   <i className="fa-brands mx-2  fa-instagram"></i>
   <i className="fa-brands mx-2  fa-twitter"></i>
   <i className="fa-brands mx-2  fa-youtube"></i>
</li>  
{props.userData?<>
<li className="nav-item">
    <span onClick={props.logout} className="nav-link active me-auto" aria-current="page" >Logout</span>
    </li></> : <>
        <li className="nav-item">
        <Link className="nav-link active me-auto" aria-current="page" to='signup'>Sign up</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active me-auto" aria-current="page" to='login'>Login</Link>
        </li>
</>}
</ul>

    </div>
  </div>
</nav>
  )
}
