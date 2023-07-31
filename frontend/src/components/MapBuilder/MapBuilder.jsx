import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import "./MapBuilder.css";

const MapBuilder = ({restaurants}) => {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const containerStyle = {
    width: 'inherit',
    height: 'inherit'
  }

  const center = {
    lat: 40.7361339,
    lng: -73.9937922,
  }

  const position = {
    lat: 40.7367,
    lng: -73.98,
  }

  return isLoaded ? (
    <div style={{ height: 'inherit', width: '30vw' }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}>
        
        { restaurants.map(restaurant => 
          <Marker 
            position={{lat: restaurant.latitude, lng: restaurant.longitude}} label={{text: restaurant.name, fontSize: '1vw'}} />) 
        }

      </GoogleMap>
    </div>
  ) : <></>
}

export default MapBuilder;