import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader, InfoWindow } from 
  "@react-google-maps/api";
import "./MapBuilder.css";
import { NavLink } from "react-router-dom";
import AverageRating from "../BusinessesPage/AverageRating";

const MapBuilder = ({restaurants}) => {
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

  const [activeMarker, setActiveMarker] = useState(null);

  const handleClick = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  return isLoaded ? (
    <div style={{ height: 'inherit', width: '33vw' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={() => {setActiveMarker(null)}}>
        
        {restaurants ? restaurants.map((restaurant, idx) => 
          <Marker key={idx}
            position={{lat: restaurant.latitude, lng: restaurant.longitude}} 
            animation={window.google.maps.Animation.DROP}
            label={{
              text: `${idx+1}`, 
              fontSize: '0.8vw', fontWeight: 'bold',
              color: 'inherit', fontFamily: 'inherit'}}
            onClick={() => handleClick(idx)}>

            {activeMarker === idx ? 
            <NavLink to={`/restaurants/${restaurant.id}`}>
              <InfoWindow
                options={{disableAutoPan: false}}
                position={{
                  lat: restaurant.latitude,
                  lng: restaurant.longitude
                }}
                key={`${restaurant.name}-info`}
                onCloseClick={() => {
                  setActiveMarker(null);
                }}>
                
                <div className="restaurant-info-card">
                  <img src={restaurant.pictureUrls[0]} alt="img" 
                    className="info-img"/>
                  <p className="info-title">{restaurant.name}</p>
                  <AverageRating averageRating=
                  {restaurant.averageRating}/>
                </div>
              </InfoWindow>
            </NavLink> : null}
          </Marker>) : null}
      </GoogleMap>
    </div>
  ) : <></>
}

export default MapBuilder;