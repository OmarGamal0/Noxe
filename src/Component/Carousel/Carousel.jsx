import React, { useContext, useEffect} from 'react'
import { useState } from 'react'
import { DataContext, urlimg } from '../../Context/DataContext'
import { noxe, noxeActive } from '../../image'

import './carousel.css'

function Carousel() {

  return ( 
  
    <div id="carouselExampleSlidesOnly" className="carousel slide pt-4 " data-bs-ride="carousel" >
    <div className="carousel-inner">
    <CarouselImg />
    <div className='carousel-item_info'>
    <img src={noxe} alt="" />
    </div>

    </div>
    </div>
   
  )
}
export default Carousel



let CarouselImg =()=>{
  let{movies}=useContext(DataContext);
  const [moviesCarousel, setmoviesCarousel] = useState(null) ;

  useEffect(() => {
    let moviesCarousel =[...movies]
    setmoviesCarousel(moviesCarousel);
  
  }, [movies])

    return(<>
      <div className="carousel-item active">
      <img className='d-block w-100 ' src={noxeActive} alt="" />
      </div>
        
    {moviesCarousel ? moviesCarousel.map((movie,index)=><div key={index} className="carousel-item ">
    <img className='d-block w-100' src={urlimg+movie.poster_path } alt="" />
    </div>
   ):<></>}
    </>)}
    