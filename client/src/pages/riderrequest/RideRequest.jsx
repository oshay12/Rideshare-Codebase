import React, { useEffect, useState, useRef } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Navigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { getUser } from "../../services/AuthService";
import { createTrip } from "../../services/TripService";

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
  Circle,
} from "@react-google-maps/api";
import "./riderequest.css";

function RideRequest(props) {
  const [isSubmitted, setSubmitted] = useState(false);
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [dropOffAddress, setDropOffAddress] = useState("");
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState("");
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  //stfx coordinates
  const [lat, setLat] = useState(45.6179931);
  const [lng, setLng] = useState(-61.9957703);
  const center = { lat, lng };

  /**@type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /**@type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  // eslint-disable-next-line no-undef
  const circle = new Circle({
    center: { center },
    radius: 1000,
  });

  async function calculateRoute() {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  useEffect(() => {
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    }
  }, []);

  //loading the script
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <text>Loading...</text>;
  }

  const handlePickUpAddressChange = (event) => {
    setPickUpAddress(event.target.value);
  };

  const handleDropOffAddressChange = (event) => {
    setDropOffAddress(event.target.value);
  };

  const onSubmit = (values) => {
    console.log("ADDS: " + pickUpAddress.type + " " + dropOffAddress.type);
    console.log("VALS:" + values.type);
    const rider = getUser();
    createTrip({
      pick_up_address: pickUpAddress,
      drop_off_address: dropOffAddress,
      rider: rider.id,
    });
    setSubmitted(true);
  };

  if (isSubmitted) {
    return <Navigate to="/rider" />;
  }

  return (
    <>
      <Breadcrumb>
        <LinkContainer to="/">
          <Breadcrumb.Item>Home</Breadcrumb.Item>
        </LinkContainer>
        <LinkContainer to="/rider">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </LinkContainer>
        <Breadcrumb.Item active>Request</Breadcrumb.Item>
      </Breadcrumb>

      <div className="request__square">
        <h1>Request Trip</h1>
        <form onSubmit={onSubmit}>
          <div className="request__fields">
            <div className="request__pickup">
              <label>Pick up address:</label>
              <Autocomplete>
                <input
                  data-cy="drop-off-address"
                  name="dropOffAddress"
                  onChange={handlePickUpAddressChange}
                  onPlaceSelected={(place) => handlePickUpAddressChange(place.formatted_address)}
                  values={pickUpAddress}
                  ref={originRef}
                />
              </Autocomplete>
            </div>
            <div className="request__dropoff">
              <label>Drop off address:</label>
              <Autocomplete bounds={circle}>
                <input
                  data-cy="drop-off-address"
                  name="dropOffAddress"
                  onChange={handleDropOffAddressChange}
                  onPlaceSelected={(place) => handleDropOffAddressChange(place.formatted_address)}
                  values={dropOffAddress}
                  ref={destinationRef}
                />
              </Autocomplete>
            </div>
          </div>
          <div className="calculate-route">
            <button type="button" onClick={calculateRoute}>
              Calculate route
            </button>
            <label>Distance:</label>
            <text>{distance}</text>
            <label>Duration:</label>
            <text>{duration}</text>
          </div>
          <div className="google-map">
            <GoogleMap
              center={center}
              zoom={15}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              options={{ streetViewControl: false, fullscreenControl: false }}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={center} />
              <button
                type="button"
                id="middle"
                onClick={() => map.panTo(center)}
              >
                back to middle
              </button>
              {directionResponse && (
                <DirectionsRenderer directions={directionResponse} />
              )}
            </GoogleMap>
          </div>

          {/* <div className="date-picker">
            <label>select a date</label>
            <input type="date" />
          </div> */}
          <button data-cy="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default RideRequest;
