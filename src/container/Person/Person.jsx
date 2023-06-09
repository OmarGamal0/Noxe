import React, { useContext } from 'react'

import { DataContext, urlimg } from '../../Context/DataContext';
import InfoCard from '../InfoCard/InfoCard';


function Person() {
    let{people}=useContext(DataContext);
  return (<>
    <div className=" w-75 mx-auto" id='People'>
    <div  className="row noxe__section-background p-4 ">
    <InfoCard title={'people'}/>

        {people.length >0 ? people.map((people ,index )=>
        <div key={index} className="col-md-2 my-2 relative">
            <div>
            <img className='w-100 shadow-lg rounded-2' src={urlimg+people.profile_path} alt="" />
            <h6 className='text-center my-2'>{people.original_name}</h6>
            </div>
        </div>):<><div className=" col-md-2  ">
        <i className='fas fa-spinner fa-spin fa-xl '></i>
        </div></>}

    </div>
    </div> 
  </>
  )
}

export default Person