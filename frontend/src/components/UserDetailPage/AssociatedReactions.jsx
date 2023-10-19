import Tooltip from "@mui/material/Tooltip";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/users";

// For css styling, check RestaurantShowPage.css

const AssociatedReactions = ({
  associatedReactions,
  helpfulCount,
  thanksCount,
  loveThisCount,
  ohNoCount,
  currUserId,
  reviewerId,
}) => {
  // console.log(associatedReactions);
  // console.log(helpfulCount);
  // console.log(thanksCount);
  // console.log(loveThisCount);
  // console.log(ohNoCount);
  // console.log(currUserId);
  // console.log(reviewerId);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [associatedReactions]);

  return (
    <div className="associated-reactions-container">
      {/* Reaction buttons on the associated review */}
      <div className="reaction-button-group">
        {/* Helpful Reaction Button */}
        {associatedReactions ? (
          Object.values(associatedReactions)?.filter(
            (reaction) =>
              reaction?.userId === currUserId &&
              reaction?.reactionType === "helpful"
          ).length !== 0 ? (
            <span className="reaction-btn">
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
            <span className="reaction-btn">
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
            <span className="reaction-btn">
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
            <span className="reaction-btn">
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
