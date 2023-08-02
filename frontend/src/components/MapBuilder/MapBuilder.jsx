import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow} from "@react-google-maps/api";
import "./MapBuilder.css";
import { useNavigate } from "react-router-dom";
import AverageRating from "../BusinessesPage/AverageRating";

const MapBuilder = ({restaurants}) => {

  const navigate = useNavigate();

  const handleClick = (restaurant) => {
    navigate(`/restaurants/${restaurant.id}`);
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  })

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, [])

  // Inherit size from parent container
  const containerStyle = {
    width: 'inherit',
    height: 'inherit'
  }

  // Using App Academy's location as the center of the map
  const center = {
    lat: 40.7361339,
    lng: -73.9937922,
  }

  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  useEffect(() => {
    if (!showInfoWindow) return;

    const closeInfoWindow = () => {
      setShowInfoWindow(false);
    };

    document.addEventListener("mouseover", closeInfoWindow);

    return () => document.removeEventListener("mouseover", closeInfoWindow);
  }, [showInfoWindow]);

  useEffect(()=> {
    setSelectedRestaurant(null);
  }, []);

  return isLoaded ? (
    <div style={{ height: 'inherit', width: '33vw' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        
        {restaurants ? restaurants.map((restaurant, idx) => 
          <Marker key={idx}
            position={{lat: restaurant.latitude, lng: restaurant.longitude}} 
            animation={window.google.maps.Animation.DROP}
            label={{
              text: `${idx+1}`, 
              fontSize: '1vw', fontWeight: 'bold',
              color: 'inherit', fontFamily: 'inherit'}}
            onClick={() => handleClick(restaurant)}
            onMouseOver={() => {
              setSelectedRestaurant(restaurant);
            }}/>) : <></>}

          {selectedRestaurant ? 
            <InfoWindow
              options={{disableAutoPan: true}}
              position={{lat: selectedRestaurant.latitude, lng: selectedRestaurant.longitude}}
              key={`${selectedRestaurant.name}-info`}
              visible={showInfoWindow}
              onMouseLeave={() => {
                setSelectedRestaurant(null);
              }}>
              <div className="restaurant-info-card">
                <img src={selectedRestaurant.pictureUrls[0]} alt="img" 
                  className="info-img"/>
                <p className="info-title">{selectedRestaurant.name}</p>
                <AverageRating averageRating=
                {selectedRestaurant.averageRating}/>
              </div>
            </InfoWindow> : <></>}

      </GoogleMap>
    </div>
  ) : <></>
}

export default MapBuilder;