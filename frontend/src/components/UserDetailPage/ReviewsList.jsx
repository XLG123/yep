import { useNavigate } from "react-router-dom";
import "./ReviewsList.css";

const ReviewsList = ({ reviews, isCurrUser }) => {
  // console.log(reviews);
  // console.log(isCurrUser);

  const navigate = useNavigate();

  return (
    <>
      <div className="reviews-list-title">Reviews</div>
      {reviews !== undefined ? (
        <ul className="reviews-list-container">
          {Object.values(reviews)
            ?.reverse()
            .map((review) => (
              <li className="reviewed-restaurant" key={review.id}>
                <div className="restaurant-basic-info">
                  <div className="restaurant-thumbnail">
                    <img src={review.restaurantPictures[0]} alt="thumbnail" />
                  </div>
                  <div className="text-container">

                    {/* Restaurant name */}
                    <div className="reviewed-restaurant-name">
                      {review?.restaurantName}
                    </div>

                    {/* Restaurant category */}
                    <div className="reviewed-restaurant-category">
                      {review?.restaurantCategory.replaceAll("_", ", ")}
                    </div>

                    {/* Restaurant address */}
                    <div className="reviewed-restaurant-address">
                      <span className="reviewed-restaurant-city">
                        {review?.restaurantCity},
                      </span>
                      <span className="reviewed-restaurant-state">
                        {review?.restaurantState},
                      </span>
                      <span className="reviewed-restaurant-zipcode">
                        {review?.restaurantZipCode}
                      </span>
                    </div>

                  </div>
                </div>

                <div className=""></div>
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
