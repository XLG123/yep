import React, { useEffect } from "react";
import "./Activity.css";
import { useDispatch } from 'react-redux';
import { fetchReviews } from "../../store/reviews";

const Activity = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReviews());
  }, [])

  return (
    <>
      <div className="activity-container">
        <h2 className="activity-container-title">Recent Acitivty</h2>
        <div className="reviews-container">
          {/* placeholder to pull all reviews */}
        </div>
      </div>
    </>
  );
}

export default Activity;