import "./MapBuilder.css";
import  GoogleMapReact  from 'google-map-react';

const MapBuilder = ({restaurants}) => {

  // console.log(restaurants);
  
  const defaultProps = {
    center: {
      lat: 40.7362902,
      lng: -73.9986631
    },
    zoom: 13
  };

  return (
    <div style={{ height: 'inherit', width: '27vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>
        {/* <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text="My Marker"
        /> */}
      </GoogleMapReact>
    </div>
  );
}

export default MapBuilder;