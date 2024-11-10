import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import UserContext from "../context/usercontext/Usercontext";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Booking } from "./Booking";
import { Footer } from "./Footer";

import {
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from "@react-google-maps/api";
import { useRef } from "react";
import { useBeforeUnload } from "react-router-dom";
import GoogleMapsEmbed from "./GoogleMapsEmbed";

const center = { lat: 17.98361, lng: 79.5299 };

export const Home = () => {
  const [showbook, setShowBook] = useState(false);

  async function handleShowFare() {
    if (inputref1.current.value == "" || inputref2.current.value == "") {
      return;
    }
    calculateRoute();
    setShowBook(true);
  }

  let navigate = useNavigate();
  const { auth, user } = useContext(UserContext);
  useEffect(() => {
    if (!auth) {
      navigate("/Register");
    }
  }, [auth]);

  /**@type React.MutableRefObject<HTMLInputElement> */
  const inputref1 = useRef(null);
  /**@type React.MutableRefObject<HTMLInputElement> */
  const inputref2 = useRef(null);
  const [map, setMap] = useState(/** @type google.maps.Map*/ null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_KEY,
    libraries: ["places"],
  });
  useEffect(() => {
    console.log(isLoaded);
  }, [isLoaded]);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [distanceinkm, setDistanceinkm] = useState(0);
  if (loadError) {
    return <div>not loaded{loadError}</div>;
  }
  if (!isLoaded) {
    return <span className="loading loading-ring loading-lg"></span>;
  }

  async function calculateRoute() {
    if (inputref1.current.value == "" || inputref2.current.value == "") {
      return;
    }
    console.log(inputref1.current.value);
    //eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: inputref1.current.value,
      destination: inputref2.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    //console.log(results.routers[0].legs[0].distance.text)
    if (
      results.routes &&
      results.routes[0] &&
      results.routes[0].legs &&
      results.routes[0].legs[0]
    ) {
      const distanceText = results.routes[0].legs[0].distance.text;
      const durationText = results.routes[0].legs[0].duration.text;
      let distance1 = results.routes[0].legs[0].distance.value;
      console.log("Distance:", distanceText); // Log distance to confirm
      console.log("Duration:", durationText); // Log duration to confirm
      console.log("distance:", distance1);
      distance1 = distance1 / 1000;
      setDistance(distanceText);
      setDuration(durationText);
      setDistanceinkm(distance1);
    } else {
      console.error("No valid route information found.");
    }
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    setShowBook(false);
    inputref1.current.value = "";
    inputref2.current.value = "";
  }

  return (
    <>
      <Navbar />
      <div
        className="relative md:flex items-center justify-center p-3 "
        id="section"
      >
        <div
          className="absolute inset-0 bg-cover bg-center blur-md"
          id="in123"
        ></div>

        <div className="relative text-neutral-content font-sans md:w-2/5 font-medium ">
          <span className="text-center" id="exp">
            Experience the smarter way to get ride
          </span>
        </div>
        <div className="relative  md:flex gap-2 justify-center bg-cover bg-center md:w-3/5 ">
          <label className="input input-bordered flex items-center gap-2 md:w-2/5 m-2">
            <svg
              fill="#ffffff"
              width="20px"
              height="20px"
              viewBox="-5.5 0 32 32"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>location</title>{" "}
                <path d="M10.406 26.969l10.406-21.938-20.813 11.125h10.406v10.813z" />{" "}
              </g>
            </svg>
            <Autocomplete>
              <input
                type="text"
                className="grow"
                placeholder="From"
                ref={inputref1}
              />
            </Autocomplete>
          </label>

          <label className="md:flex justify-center items-center">
            <button className="btn ">
              <svg
                width="36px"
                height="36px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0" />

                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21 9L9 9"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M15 15L3 15"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M18 12L20.913 9.08704V9.08704C20.961 9.03897 20.961 8.96103 20.913 8.91296V8.91296L18 6"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                  <path
                    d="M6 18L3.08704 15.087V15.087C3.03897 15.039 3.03897 14.961 3.08704 14.913V14.913L6 12"
                    stroke="#ffffff"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />{" "}
                </g>
              </svg>
            </button>
          </label>

          <label className="input input-bordered flex items-center gap-2 md:w-2/5 m-2">
            <svg
              width="20px"
              height="20px"
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0" />

              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />

              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M12 12C14.4853 12 16.5 9.98528 16.5 7.5C16.5 5.01472 14.4853 3 12 3C9.51472 3 7.5 5.01472 7.5 7.5C7.5 9.98528 9.51472 12 12 12Z"
                  stroke="#ffffff"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />{" "}
                <path
                  d="M12 14.0137V22"
                  stroke="#ffffff"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />{" "}
              </g>
            </svg>
            <Autocomplete>
              <input
                type="text"
                className="grow"
                placeholder="To"
                ref={inputref2}
              />
            </Autocomplete>
          </label>
          <label className="btn m-2" onClick={handleShowFare}>
            See Fares
          </label>
        </div>
      </div>
      {showbook && <Booking kms={distanceinkm} />}
      {/* <GoogleMapsEmbed inputref1={inputref1} inputref2={inputref2}/> */}
      <>
        <div className="flex justify-between items-center p-4 m-b-0 pb-0">
          <div className="gap-1 m-2">
            <button
              className="btn btn-neutral btn-wide m-2"
              onClick={calculateRoute}
            >
              Calculate Route
            </button>
            <button
              className="btn btn-neutral btn-wide m-2"
              onClick={clearRoute}
            >
              Clear Route
            </button>
            <button
              className="btn btn-neutral btn-wide m-2"
              onClick={() => map.panTo(center)}
            >
              Center
            </button>
          </div>
          <div className="md:flex justify-center">
            <p className="text-xl text-bold ml-3">
              Distance: {distance ? distance : 0}
            </p>
            <p className="text-xl text-bold ml-3">
              Duration: {duration ? duration : 0}
            </p>
          </div>
        </div>
        <div className="h-[80vh] w-[100%]  z-[modal] p-4 rounded">
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
              onLoad={(map) => setMap(map)}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          )}
        </div>
      </>
      <Footer />
    </>
  );
};
