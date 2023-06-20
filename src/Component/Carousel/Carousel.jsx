import React, { useContext} from 'react'
import { DataContext, urlimg } from '../../Context/DataContext'
import { noxe, noxeActive } from '../../image'

import './carousel.css'

function Carousel() {

  return ( 

    <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
  <div className="carousel-inner">
  <CarouselImg />
  <div className='carousel-item_info'>
    <img src={noxe} alt="" />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

   
  )
}
export default Carousel



let CarouselImg =()=>{
  let{movies}=useContext(DataContext);
  console.log(movies);

    return(<>
      <div className="carousel-item active">
      <img className='d-block w-100 ' src={noxeActive} alt="" />
      </div>
        
    {movies ? movies.map((movie,index)=> <><div key={index} className="carousel-item ">
    <img className='d-block w-100' src={urlimg+movie.poster_path } alt="" />
    {  console.log(urlimg+movie.poster_path)}
    </div></>
   ):<></>}
    </>)}
    