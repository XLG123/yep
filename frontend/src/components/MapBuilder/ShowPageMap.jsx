import React, { useCallback, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from
  "@react-google-maps/api";

const ShowPageMap = ({restaurant}) => {
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

  return isLoaded ? (
    <div style={{width: "inherit", height: "inherit"}}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{lat: restaurant.latitude, lng: restaurant.longitude}}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        
      <Marker
        position={{lat: restaurant.latitude, lng: restaurant.longitude}}
        animation={window.google.maps.Animation.BOUNCE}/>
      </GoogleMap>
    </div>
  ) : <></>
}

export default ShowPageMap;