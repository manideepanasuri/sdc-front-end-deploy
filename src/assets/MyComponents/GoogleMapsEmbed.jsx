import React, { useState } from "react";
import { useJsApiLoader, GoogleMap, Marker,DirectionsRenderer } from "@react-google-maps/api";

const center = { lat: 17.98361, lng: 79.5299 };

export default function GoogleMapsEmbed(props) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries: ["places"],
  });
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  if (loadError) {
    return <div>not loaded{loadError}</div>;
  }
  if (!isLoaded) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  async function calculateRoute() {
    if (
      props.inputref1.current.value == "" ||
      props.inputref2.current.value == ""
    ) {
      return;
    }
    //eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: props.inputref1.current.value,
      destination: inputref2.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routers[0].legs[0].distance.text);
    setDuration(results.routers[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    props.inputref1.current.value = "";
    props.inputref2.current.value = "";
  }

  return (
    <>
      <div className="flex justify-evenly items-center p-4">
        <button className="btn btn-primary btn-wide" onClick={calculateRoute}>Calculate Route</button>
        <button className="btn btn-primary btn-wide" onClick={clearRoute}>Clear Route</button>
      </div>
      <div className="h-[100vh] w-[100vw] bg-primary z-[modal]">
        {isLoaded && (
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker position={center} />
            {directionsResponse&& <DirectionsRenderer directions={directionsResponse}/>}
          </GoogleMap>
        )}
      </div>
    </>
  );
}
