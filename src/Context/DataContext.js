import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let DataContext =createContext(0);
export let urlimg = 'https://image.tmdb.org/t/p/original' 
  

export function DataContextProvidor(props)
 {

  const [movies, setmovies] = useState([]); 
  const [all, setall] = useState([]);
  const [tv, settv] = useState([]);
  const [people, setpeople] = useState([]);
 
  async function getTrendingMadie(date,madie,callback) {
  let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${madie}/${date}?api_key=5dccbed72bef97f2ae76d727cb83071b`);
  callback(data.results);
  }

  
  useEffect(() => {
    getTrendingMadie('week','movie',setmovies)
    getTrendingMadie('day','all',setall)
    getTrendingMadie('week','tv',settv)
    getTrendingMadie('week','person',setpeople)
   }, [])
   
   return <DataContext.Provider value={{movies , all , tv, people }} >
        {props.children}
    </DataContext.Provider>   
}