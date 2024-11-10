import React, { useState } from 'react'
import TravelContext from './Travelcontext'

export default function Travelstate(props) {
  const [source,setSource]=useState(null);
  const [dest,setDest]=useState(null);
  const [distance,setDistance]=useState('');
  const [duration,setDuration]=useState('');


  function setSourceAs(loca) {
    setSource(loca);
  }
  function setDestAs(loca) {
    setDest(loca);
  }

  function calculatedist(){

  }

  function calculateRoute(){
    if(!source||!dest){return;}
    const directionService=new google.maps.DirectionsService()
  }

  return (
    <TravelContext.Provider values={{source,dest,setSourceAs,setDestAs,distance}}>
      {props.children}
    </TravelContext.Provider>
  )
}
