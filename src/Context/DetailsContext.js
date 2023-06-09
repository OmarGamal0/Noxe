import axios from 'axios';
import  { createContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

export let DetailsContext=createContext(0);

function DetailsContextProvider (props) {

    let prams = useParams();
    const [movieDetails, setmovieDetails] = useState({})

    async function getDetails(id) {
        let {data} = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=5dccbed72bef97f2ae76d727cb83071b&language=en-US`)
        setmovieDetails(data);
        console.log('omar')
        }
        
    useEffect(() => {
    getDetails(prams.id)
    }, [])
    
  return<DetailsContext.Provider value={{movieDetails}}>
    {props.children}
  </DetailsContext.Provider>
}

export default DetailsContextProvider