import React, { useContext} from 'react'
import { DataContext, urlimg } from '../../Context/DataContext'
import { noxe, noxeActive } from '../../image'

import './carousel.css'

function Carosel() {

  return ( 
 
    <div id="carouselExampleSlidesOnly" class="carousel slide pt-4 " data-bs-ride="carousel" >
    <div class="carousel-inner">
    <CarouselImg />
    <div className='carousel-item_info'>
    <img src={noxe} alt="" />
    </div>
    </div>
    </div>
   
  )
}

export default Carosel



let CarouselImg =()=>{
    let{movies}=useContext(DataContext);

    return(<>
      <div className="carousel-item active">
      <img className='d-block w-100 ' src={noxeActive} alt="" />
      </div>
        
    {movies ? movies.map((movie)=><div className="carousel-item ">
    <img className='d-block w-100' src={urlimg+movie.poster_path } alt="" />
    </div>
   ):<></>}
    </>)}
    