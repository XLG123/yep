import "./ReviewsList.css";

const ReviewsList = ({ reviewedRestaurants }) => {
  console.log(reviewedRestaurants);

  return (
    <>
      <div className="reviewed-restaurants-list-title">Reviews</div>
      {reviewedRestaurants && (
        <ul className="reviewed-restaurants-container">
          {Object.values(reviewedRestaurants)?.map((reviewedRestaurant) => (
            <li className="reviewed-restaurant" key={reviewedRestaurant.id}>
              <div className="restaurant-basic-info">
                <div className="restaurant-thumbnail">
                  <img src={reviewedRestaurant?.pictureUrls[0]} alt="thumbnail"/>
                </div>

                <div className="text-container">
                  <div className="reviewed-restaurant-name">
                    {reviewedRestaurant?.name}
                  </div>
                  <div className="reviewed-restaurant-category">
                    {reviewedRestaurant?.category}
                  </div>
                  <div className="reviewed-restaurant-address">
                    {reviewedRestaurant?.city}
                    {reviewedRestaurant?.state}
                    {reviewedRestaurant?.zipCode}
                  </div>
                </div>

              </div>
              <div className="reviews-list"></div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default ReviewsList;
