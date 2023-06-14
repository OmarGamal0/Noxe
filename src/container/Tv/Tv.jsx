import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { DataContext, urlimg } from '../../Context/DataContext';
import InfoCard from '../InfoCard/InfoCard';



function Tv() {
    let{tv}=useContext(DataContext);

  return (<>
  <div  className="row noxe__section-background p-4 my-2 " id='Tv'>
    <InfoCard title={'tv'}/>

  {tv.length >0 ? tv.map((tv ,index )=>
    <div key={index} className="col-md-2 my-2 position-relative ">

    <div className='reatbox shadow-lg d-flex align-items-center justify-content-center p-1'>
     <i className="fa-solid fa-star fa-xs "></i>
     <h5>{Math.floor(tv.vote_average) }</h5>
    </div>

    <div>
     <Link to={`/MovieDetails/${tv.id}`}>
     <img className='w-100 shadow-lg rounded-2' src={urlimg+tv.poster_path} alt="" />
     <h6 className='text-center my-2'>{tv.original_name}</h6>
     </Link>
    </div>
    </div>

  ):<><div className="col-md-2">
       <i className='fas fa-spinner fa-spin fa-xl '></i>
      </div></>}

</div>
  </>
 
  )
}

export default Tv