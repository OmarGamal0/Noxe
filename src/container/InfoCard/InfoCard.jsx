import React from 'react'


function InfoCard({title}) {
  return (
    <div className="col-md-12 col-lg-4 d-flex align-items-center  ">
    <div className='w-100  shadow-lg rounded-2 px-4'>
    <div className='noxe_infoCard-line my-4'> </div>
     <h3 >Trending</h3> 
     <h3>{title}</h3> 
     <h3>To Watch Now</h3>
     <h5 className='secondFontColor'>Lorem ipsum dolor sit amet.</h5> 
    <div className='noxe_infoCard-line my-4 w-100'>   </div>
    </div>
    </div>
  )
}

export default InfoCard