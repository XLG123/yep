# Welcome to Yep!

## Introduction
Yep! is a clone of Yelp at the time of creation. Yelp is a platform where users can post rating and reviews on local 
businesses. Users are able to leave ratings and reviews to the restaurants they like or they don't like. The technologies implemented in the project include:
  - Languages: JavaScript, Ruby, HTML, CSS
  - Frontend and State Management: React, React-Redux, Google Maps JavaScript API
  - Database: PSQL
  - Hosting: Render
  - Asset Storage: AWS Simple Cloud Storage (S3)

## User Authentication
Users can browse all the restaurants without logging in. They can have fun searching for the categories they want, such as 
Chinese Cuisine, Italian Cuisine and search for restaurant names. But in order to post ratings and reviews, they have to 
login or sign up for a new account, or login as the demo user to have the same experience. Error handling and password 
protection is included in the login. When users create passwords, they will be shown a password strength bar that indicates 
their password strength. The users will receive errors if they do not pass database and validation checks (handled by Rails 
backend).

When users click on the login button or the sign up button, they will be redirected to either the login form or the sign up form.
![](userAuth.gif)  

## Interacting with Filters
![](filters.gif)

## Interacting with Search bar and Google Map
![](searchAndMap.gif)

## Google Maps
The application utlizes Google Maps in two areas: (1) on the initial index page where all the restaurants are shown and (2) 
on each individual restaurant show page. On the index page, Google Maps is available on the right side bar which shows all 
the restaurants along with markers indicating their locations on the map. When the user clicks on the marker, it will 
display a info window that contains a thumbnail of the restaurant and the corresponding average rating. Users can click on 
the thumbnail to go to the specific restaurant show page or click on the close button to close the info window.

On the restaurant show page, the bottom left corner will have a marker displaying the location of the specific restaurant on the map.

```javascript
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
# Welcome to Yep!

## Introduction
Yep! is a clone of Yelp at the time of creation. Yelp is a platform where users can post rating and reviews on local 
businesses. Users are able to leave ratings and reviews to the restaurants they like or they don't like. The technologies implemented in the project include:
  - Languages: JavaScript, Ruby, HTML, CSS
  - Frontend and State Management: React, React-Redux, Google Maps JavaScript API
  - Database: PSQL
  - Hosting: Render
  - Asset Storage: AWS Simple Cloud Storage (S3)

## User Authentication
Users can browse all the restaurants without logging in. They can have fun searching for the categories they want, such as 
Chinese Cuisine, Italian Cuisine and search for restaurant names. But in order to post ratings and reviews, they have to 
login or sign up for a new account, or login as the demo user to have the same experience. Error handling and password 
protection is included in the login. When users create passwords, they will be shown a password strength bar that indicates 
their password strength. The users will receive errors if they do not pass database and validation checks (handled by Rails 
backend).

When users click on the login button or the sign up button, they will be redirected to either the login form or the sign up form.
![](https://github.com/yep/userAuth.gif)  

## Interacting with Filters
![](https://github.com/yep/filters.gif)

## Interacting with Search bar and Google Map
![](https://github.com/yep/searchAndMap.gif)

## Google Maps
The application utlizes Google Maps in two areas: (1) on the initial index page where all the restaurants are shown and (2) 
on each individual restaurant show page. On the index page, Google Maps is available on the right side bar which shows all 
the restaurants along with markers indicating their locations on the map. When the user clicks on the marker, it will 
display a info window that contains a thumbnail of the restaurant and the corresponding average rating. Users can click on 
the thumbnail to go to the specific restaurant show page or click on the close button to close the info window.

On the restaurant show page, the bottom left corner will have a marker displaying the location of the specific restaurant on the map.

```javascript
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
              fontSize: '1vw', fontWeight: 'bold',
              color: 'inherit', fontFamily: 'inherit'}}
            onClick={() => handleClick(idx)}>
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
              fontSize: '1vw', fontWeight: 'bold',
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
export default MapBuilder;

```
```

## AWS with Seeding
Created a AWS S3 bucket to store all the images of the restaurants and 
attaching them onto the restaurants in our seed data. Each time the web application loads, it will fetch a GET request to the bucket to load the images based on the page that the user is on.
```ruby
def attach_thumbnail(restaurants, category)
  restaurants.each_with_index do |restaurant, index|
    restaurant.picture.attach(io:
      URI.open("https://yep-app-seeds.s3.amazonaws.com/#{category}_#{index+1}.jpg"),
      filename: "#{category}_#{index+1}.jpg")
  end
end
## AWS with Seeding
Created a AWS S3 bucket to store all the images of the restaurants and 
attaching them onto the restaurants in our seed data. Each time the web application loads, it will fetch a GET request to the bucket to load the images based on the page that the user is on.
```ruby
def attach_thumbnail(restaurants, category)
  restaurants.each_with_index do |restaurant, index|
    restaurant.picture.attach(io:
      URI.open("https://yep-app-seeds.s3.amazonaws.com/#{category}_#{index+1}.jpg"),
      filename: "#{category}_#{index+1}.jpg")
  end
end

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
