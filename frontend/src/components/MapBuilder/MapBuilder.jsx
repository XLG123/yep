import  GoogleMapReact  from 'google-map-react';
import MapMarker from "./MapMarker";

const MapBuilder = ({restaurants}) => {

  // console.log(restaurants);
  // const points = [
  //   {id :}
  // ];

  // testing purposes
  const points = [
    { id: 1, title: "Round Pond", lat: 40.7361918, lng: -73.9958515 },
    { id: 2, title: "The Long Water", lat: 40.7338834, lng: -74.0048117 },
    { id: 3, title: "The Serpentine", lat: 40.7218804, lng: -73.9988491 }
  ];
  
  const defaultProps = {
    center: {
      lat: 40.7362902,
      lng: -73.9986631
    },
    zoom: 15,
    hoverDistance: 25,
  };

  return (
    <div style={{ height: 'inherit', width: '30vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>

      {points.map(({ lat, lng, id, title }) => {
        return (
          <MapMarker key={id} lat={lat} lng={lng} text={id} tooltip={title} />
        );
      })}
    </GoogleMapReact>
    </div>
  );
}

export default MapBuilder;