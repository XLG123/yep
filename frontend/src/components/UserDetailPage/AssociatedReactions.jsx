import toast, { Toaster } from "react-hot-toast";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../store/users";
import { useNavigate } from "react-router-dom";
import { createReaction, deleteReaction, getReactions, removeReaction } from '../../store/reactions';

// For css styling, check RestaurantShowPage.css

const AssociatedReactions = ({
  associatedReactions,
  helpfulCount,
  thanksCount,
  loveThisCount,
  ohNoCount,
  currUserId,
  reviewerId,
  reviewId,
}) => {
  // console.log(associatedReactions);
  // console.log(helpfulCount);
  // console.log(thanksCount);
  // console.log(loveThisCount);
  // console.log(ohNoCount);
  // console.log(currUserId);
  // console.log(reviewerId);
  // console.log(reviewId);

  const allReactions = useSelector(getReactions);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const createUserReaction = (e, currUserId, reviewId, reviewerId, reaction) => {
    // e.preventDefault();
    if (currUserId && currUserId !== reviewerId) {
      const reactionObj = {
        reaction_type: reaction,
        user_id: currUserId,
        review_id: reviewId,
      };
      // console.log(reactionObj);
      dispatch(createReaction(reactionObj));
    } else if (currUserId && currUserId === reviewerId) {
      // This prevents current user from giving reactions to their own reviews
      // Notifies the user by displaying a warning message
      toast("You can't react to your own review.", {
        id: "warning-message",
        style: {
          border: "1px solid rgba(202, 201, 202, 1)",
          fontSize: "1.1vw",
          boxShadow: "0px 3px 3px 1px rgba(0, 0, 0, 0.05)",
          backgroundColor: "rgb(255, 255, 255)",
          height: "1vw",
          padding: "1em",
          minWidth: "fit-content",
        },
        icon: "❗️",
        duration: 2000,
      });
    } else {
      navigate("/login");
    }
  };

  const removeUserReaction = (e, currUserId, reviewerId, reactionId) => {
    e.preventDefault();
    if (currUserId && currUserId !== reviewerId ) {
      dispatch(deleteReaction(reactionId));
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, [allReactions?.length]);

  return (
    <div className="associated-reactions-container">
      <Toaster /> {/* To display the warning message */}
      {/* Reaction buttons on the associated review */}
      <div className="reaction-button-group">
        {/* Helpful Reaction Button */}
        {associatedReactions ? (
          Object.values(associatedReactions)?.filter(
            (reaction) =>
              reaction?.userId === currUserId &&
              reaction?.reactionType === "helpful"
          ).length !== 0 ? (
            <span
              className="reaction-btn"
              onClick={(e) =>
                removeUserReaction(
                  e,
                  currUserId,
                  reviewerId,
                  Object.values(associatedReactions)?.filter(
                    (reaction) =>
                      reaction?.userId === currUserId &&
                      reaction?.reactionType === "helpful"
                  )[0]?.id
                )
              }
            >
              <div className="reaction-btn-icon">
                <LightbulbCircleIcon
                  sx={{
                    color: "#FFCC4B",
                    fontSize: "2vw",
                    stroke: "#3D3E3F",
                    strokeWidth: "0.5",
                  }}
                />
              </div>
              <div className="reaction-btn-text already-clicked-btn-text">
                Helpful <span className="reaction-count">{helpfulCount}</span>
              </div>
            </span>
          ) : (
            <span
              className={
                currUserId !== reviewerId
                  ? "reaction-btn"
                  : "reaction-btn disabled-reaction-btn"
              }
              onClick={(e) =>
                createUserReaction(
                  e,
                  currUserId,
                  reviewId,
                  reviewerId,
                  "helpful"
                )
              }
            >
              <div className="reaction-btn-icon">
                <LightbulbCircleIcon
                  sx={{
                    color: "rgb(138, 141, 144)",
                    fontSize: "2vw",
                  }}
                />
              </div>
              <div className="reaction-btn-text">
                Helpful <span className="reaction-count">{helpfulCount}</span>
              </div>
            </span>
          )
        ) : (
          <span
            className={
              currUserId !== reviewerId
                ? "reaction-btn"
                : "reaction-btn disabled-reaction-btn"
            }
            onClick={(e) =>
              createUserReaction(e, currUserId, reviewId, reviewerId, "helpful")
            }
          >
            <div className="reaction-btn-icon">
              <LightbulbCircleIcon
                sx={{
                  color: "rgb(138, 141, 144)",
                  fontSize: "2vw",
                }}
              />
            </div>
            <div className="reaction-btn-text">
              Helpful <span className="reaction-count">{helpfulCount}</span>
            </div>
          </span>
        )}

        {/* Thanks Reaction Button */}
        {associatedReactions ? (
          Object.values(associatedReactions)?.filter(
            (reaction) =>
              reaction?.userId === currUserId &&
              reaction?.reactionType === "thanks"
          ).length !== 0 ? (
            <span
              className="reaction-btn"
              onClick={(e) =>
                removeUserReaction(
                  e,
                  currUserId,
                  reviewerId,
                  Object.values(associatedReactions)?.filter(
                    (reaction) =>
                      reaction?.userId === currUserId &&
                      reaction?.reactionType === "thanks"
                  )[0]?.id
                )
              }
            >
              <div className="reaction-btn-icon">
                <RecommendIcon
                  sx={{
                    color: "#ABE1A2",
                    fontSize: "2vw",
                    stroke: "#3D3E3F",
                    strokeWidth: "0.5",
                  }}
                />
              </div>
              <div className="reaction-btn-text already-clicked-btn-text">
                Thanks <span className="reaction-count">{thanksCount}</span>
              </div>
            </span>
          ) : (
            <span
              className={
                currUserId !== reviewerId
                  ? "reaction-btn"
                  : "reaction-btn disabled-reaction-btn"
              }
              onClick={(e) =>
                createUserReaction(
                  e,
                  currUserId,
                  reviewId,
                  reviewerId,
                  "thanks"
                )
              }
            >
              <div className="reaction-btn-icon">
                <RecommendIcon
                  sx={{
                    color: "rgb(138, 141, 144)",
                    fontSize: "2vw",
                  }}
                />
              </div>
              <div className="reaction-btn-text">
                Thanks <span className="reaction-count">{thanksCount}</span>
              </div>
            </span>
          )
        ) : (
          <span
            className={
              currUserId !== reviewerId
                ? "reaction-btn"
                : "reaction-btn disabled-reaction-btn"
            }
            onClick={(e) =>
              createUserReaction(e, currUserId, reviewId, reviewerId, "thanks")
            }
          >
            <div className="reaction-btn-icon">
              <RecommendIcon
                sx={{
                  color: "rgb(138, 141, 144)",
                  fontSize: "2vw",
                }}
              />
            </div>
            <div className="reaction-btn-text">
              Thanks <span className="reaction-count">{thanksCount}</span>
            </div>
          </span>
        )}

        {/* Love this Reaction Button */}
        {associatedReactions ? (
          Object.values(associatedReactions)?.filter(
            (reaction) =>
              reaction?.userId === currUserId &&
              reaction?.reactionType === "love_this"
          ).length !== 0 ? (
            <span
              className="reaction-btn"
              onClick={(e) =>
                removeUserReaction(
                  e,
                  currUserId,
                  reviewerId,
                  Object.values(associatedReactions)?.filter(
                    (reaction) =>
                      reaction?.userId === currUserId &&
                      reaction?.reactionType === "love_this"
                  )[0]?.id
                )
              }
            >
              <div className="reaction-btn-icon">
                <FavoriteIcon
                  sx={{
                    color: "#E68D8D",
                    fontSize: "2vw",
                    stroke: "#3D3E3F",
                    strokeWidth: "0.5",
                  }}
                />
              </div>
              <div className="reaction-btn-text already-clicked-btn-text">
                Love this{" "}
                <span className="reaction-count">{loveThisCount}</span>
              </div>
            </span>
          ) : (
            <span
              className={
                currUserId !== reviewerId
                  ? "reaction-btn"
                  : "reaction-btn disabled-reaction-btn"
              }
              onClick={(e) =>
                createUserReaction(
                  e,
                  currUserId,
                  reviewId,
                  reviewerId,
                  "love_this"
                )
              }
            >
              <div className="reaction-btn-icon">
                <FavoriteIcon
                  sx={{
                    color: "rgb(138, 141, 144)",
                    fontSize: "2vw",
                  }}
                />
              </div>
              <div className="reaction-btn-text">
                Love this{" "}
                <span className="reaction-count">{loveThisCount}</span>
              </div>
            </span>
          )
        ) : (
          <span
            className={
              currUserId !== reviewerId
                ? "reaction-btn"
                : "reaction-btn disabled-reaction-btn"
            }
            onClick={(e) =>
              createUserReaction(
                e,
                currUserId,
                reviewId,
                reviewerId,
                "love_this"
              )
            }
          >
            <div className="reaction-btn-icon">
              <FavoriteIcon
                sx={{
                  color: "rgb(138, 141, 144)",
                  fontSize: "2vw",
                }}
              />
            </div>
            <div className="reaction-btn-text">
              Love this <span className="reaction-count">{loveThisCount}</span>
            </div>
          </span>
        )}

        {/* Oh no Reaction Button */}
        {associatedReactions ? (
          Object.values(associatedReactions)?.filter(
            (reaction) =>
              reaction?.userId === currUserId &&
              reaction?.reactionType === "oh_no"
          ).length !== 0 ? (
            <span
              className="reaction-btn"
              onClick={(e) =>
                removeUserReaction(
                  e,
                  currUserId,
                  reviewerId,
                  Object.values(associatedReactions)?.filter(
                    (reaction) =>
                      reaction?.userId === currUserId &&
                      reaction?.reactionType === "oh_no"
                  )[0]?.id
                )
              }
            >
              <div className="reaction-btn-icon">
                <MoodBadIcon
                  sx={{
                    color: "#8FBEE5",
                    fontSize: "2vw",
                    stroke: "#7Fa9CC",
                    strokeWidth: "0.5",
                  }}
                />
              </div>
              <div className="reaction-btn-text already-clicked-btn-text">
                Oh no <span className="reaction-count">{ohNoCount}</span>
              </div>
            </span>
          ) : (
            <span
              className={
                currUserId !== reviewerId
                  ? "reaction-btn"
                  : "reaction-btn disabled-reaction-btn"
              }
              onClick={(e) =>
                createUserReaction(e, currUserId, reviewId, reviewerId, "oh_no")
              }
            >
              <div className="reaction-btn-icon">
                <MoodBadIcon
                  sx={{
                    color: "rgb(138, 141, 144)",
                    fontSize: "2vw",
                  }}
                />
              </div>
              <div className="reaction-btn-text">
                Oh no <span className="reaction-count">{ohNoCount}</span>
              </div>
            </span>
          )
        ) : (
          <span
            className={
              currUserId !== reviewerId
                ? "reaction-btn"
                : "reaction-btn disabled-reaction-btn"
            }
            onClick={(e) =>
              createUserReaction(e, currUserId, reviewId, reviewerId, "oh_no")
            }
          >
            <div className="reaction-btn-icon">
              <MoodBadIcon
                sx={{
                  color: "rgb(138, 141, 144)",
                  fontSize: "2vw",
                }}
              />
            </div>
            <div className="reaction-btn-text">
              Oh no <span className="reaction-count">{ohNoCount}</span>
            </div>
          </span>
        )}
      </div>
    </div>
  );
};

export default AssociatedReactions;
