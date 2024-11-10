import { GoogleMap, useJsApiLoader,StandaloneSearchBox } from '@react-google-maps/api'

import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useBeforeUnload } from 'react-router-dom'

export default function Book() {
  const inputref=useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries:["places"]
  })
  useEffect(()=>{
    console.log(isLoaded);
  },[isLoaded])

  function handleOnPlacesChanged() {
    let addresses=inputref.current.getPlaces();
    console.log(addresses);
  }

  return (
    <div>
      {isLoaded&&
        <StandaloneSearchBox
          onLoad={(ref)=>inputref.current=ref}
          onPlacesChanged={handleOnPlacesChanged}
        ><>
          <div>hijio</div>
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
          </>
        </StandaloneSearchBox>
      }
    </div>
  )
}
