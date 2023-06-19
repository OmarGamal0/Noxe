import React, { useContext} from 'react'
import { DataContext, urlimg } from '../../Context/DataContext'
import { noxe, noxeActive } from '../../image'

import './carousel.css'

function Carousel() {

  return ( 
  
    <div id="carouselExampleSlidesOnly" className="carousel slide pt-4 " data-bs-ride="carousel" >
    <div className="carousel-inner">
    
    <div className='carousel-item_info'>
    <img src={noxe} alt="" />
    </div>
    <CarouselImg />
    </div>
    </div>
   
  )
}

export default Carousel



let CarouselImg =()=>{
    let{movies}=useContext(DataContext);

    return(<>
      <div className="carousel-item active">
      <img className='d-block w-100 ' src={noxeActive} alt="" />
      </div>
        
    {movies ? movies.map((movie ,index)=><div key={index} className="carousel-item ">
    <img  className='d-block w-100' src={urlimg+movie.poster_path } alt="" />
    </div>
   ):<></>}
    </>)}
    