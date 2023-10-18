import Tooltip from "@mui/material/Tooltip";
import LightbulbCircleIcon from "@mui/icons-material/LightbulbCircle";
import RecommendIcon from "@mui/icons-material/Recommend";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodBadIcon from "@mui/icons-material/MoodBad";

const AssociatedReactions = ({
  associatedReactions,
  helpfulCount,
  thanksCount,
  loveItCount,
  ohNoCount,
  isCurrUser,
}) => {

  console.log(associatedReactions);
  console.log(helpfulCount);
  console.log(thanksCount);
  console.log(loveItCount);
  console.log(ohNoCount);
  console.log(isCurrUser);

  return (
    <div className="associated-reactions-container">
      
    </div>
  );
};

export default AssociatedReactions;
