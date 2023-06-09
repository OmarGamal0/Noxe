import React from 'react'
import { Movies , All ,Tv, Person, Footer } from '../../container';
import Carousel from '../Carousel/Carousel';



export default function Home() {

  return (<>
  <Carousel/>
  <Movies/>
  <All/>
  <Tv/>
  <Person/>
  <br/><br/>
  <Footer/>
  </>
  )
}
