import React, { useContext } from 'react'
import {urlimg } from '../../Context/DataContext';
import { DetailsContext } from '../../Context/DetailsContext';


  function MovieDetails() {
    let {movieDetails} = useContext(DetailsContext);
  
    return (<>
      <div  className="row noxe__section-background p-4 my-5 justify-content-around  align-items-center ">
      <div className="col-md-5 d-flex  "> 
      <img className='w-100 shadow-lg rounded-2' src={urlimg+movieDetails.poster_path} alt="" />
      </div>
   
      <div  className="col-md-5">
      <h2 className=' fs-1 py-2'>{movieDetails.original_title}</h2>
      <h2 className=' fs-5 secondFontColor m-2'>{movieDetails.tagline}</h2>
     
      {movieDetails.genres? movieDetails.genres.map((genre , index )=><button key={index} className='btn btn-info m-1 px-1'>{genre.name}</button> ): ''}
   
      <MovieDetailsInfo/>
   
      <h4 className='fs-6 my-2 secondFontColor mx-2'> {movieDetails.overview}</h4>
      </div>
      </div>
       </>
     )
  }
  
  export default MovieDetails
    

let MovieDetailsInfo =()=>
{
  let {movieDetails} = useContext(DetailsContext);
return(
  <div  className=" noxe__section-background my-4 p-1 ">
  <h4 className='fs-6 mx-4 mt-4 mb-4'> Vote : {movieDetails.vote_average}</h4>
  <h4 className='fs-6 mx-4 my-4'> Vote Count : {movieDetails.vote_count}</h4>
  <h4 className='fs-6 mx-4 my-4'> Popularity : {movieDetails.popularity}</h4>
  <h4 className='fs-6 mx-4 my-4'> Vote Count : {movieDetails.release_date}</h4>
  </div>
)
}



