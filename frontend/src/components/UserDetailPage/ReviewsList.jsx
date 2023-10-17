import { useNavigate } from "react-router-dom";
import "./ReviewsList.css";

const ReviewsList = ({ reviewedRestaurants, isCurrUser }) => {
  console.log(reviewedRestaurants);
  console.log(isCurrUser);

  const navigate = useNavigate();

  return (
    <>
      <div className="reviewed-restaurants-list-title">Reviews</div>
      {reviewedRestaurants !== undefined ? (
        <ul className="reviewed-restaurants-container">
          {Object.values(reviewedRestaurants)?.map((reviewedRestaurant) => (
            <li className="reviewed-restaurant" key={reviewedRestaurant.id}>

              <div className="restaurant-basic-info">
                <div className="restaurant-thumbnail">
                  <img
                    src={reviewedRestaurant?.pictureUrls[0]}
                    alt="thumbnail"
                  />
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
      ) : (
        <div className="empty-reviewed-restaurants-list">
          {isCurrUser
            ? "Leave a review on your favorite restaurant."
            : "This user hasn't left any reviews."}
        </div>
      )}
    </>
  );
};

export default ReviewsList;
