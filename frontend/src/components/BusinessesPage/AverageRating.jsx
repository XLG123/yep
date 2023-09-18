import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import "./AverageRating.css";

const AverageRating = ({averageRating, totalReviews}) => {

  const displayRating = (averageRating) => {
    let icons = []

    // No stars
    if (averageRating === 0) {
      for (let i = 0; i < 5; ++i) {
        icons[i] = 
          <span key={`icon-${i}`}>
            <StarBorderIcon fontSize="inherit" />
          </span>;
      }

      // One Star
    } else if (averageRating < 1.25) {
      icons[0] = <span key="icon-0" style={{color: "#C3882E"}}>
        <StarIcon fontSize="inherit" color="inherit" /></span>;

      for (let i = 1; i <= 4; ++i) {
        icons[i] = 
          <span key={`icon-${i}`}>
            <StarBorderIcon fontSize="inherit"/>
          </span>;
      }

      // One star and a half star
    } else if (averageRating >= 1.25 && averageRating < 1.875) {
      icons[0] = <span key="icon-0" style={{ color: "#C3882E" }}>
        <StarIcon fontSize="inherit" /></span>;

      icons[1] = <span key="icon-1" style={{ color: "#C3882E" }}>
        <StarHalfIcon fontSize="inherit" /></span>;

      for (let i = 2; i <= 4; ++i) {
        icons[i] =
          <span key={`icon-${i}`}>
            <StarBorderIcon fontSize="inherit" />
          </span>;
      }

      // Two stars
    } else if (averageRating >= 1.875 && averageRating < 2.25) {
      icons[0] = <span key="icon-0" style={{color: "#D5B53E"}}>
        <StarIcon fontSize="inherit" color="inherit"/></span>;

      icons[1] = <span key="icon-1" style={{color: "#D5B53E" }}>
        <StarIcon fontSize="inherit" color="inherit"/></span>;

      for (let i = 2; i <= 4; ++i) {
        icons[i] =
          <span key={`icon-${i}`}>
            <StarBorderIcon fontSize="inherit" />
          </span>;
      }

      // Two stars and a half star
    } else if (averageRating >= 2.25 && averageRating < 2.875) {
      icons[0] = <span key="icon-0" style={{color: "#D5B53E"}}>
        <StarIcon fontSize="inherit" /></span>;

      icons[1] = <span key="icon-1" style={{color: "#D5B53E" }}>
        <StarIcon fontSize="inherit"/></span>;

      icons[2] = <span key="icon-2" style={{ color: "#D5B53E" }}>
        <StarHalfIcon fontSize="inherit"/></span>;

      icons[3] = <span key="icon-3">
        <StarBorderIcon fontSize="inherit" /></span>;

      icons[4] = <span key="icon-4">
        <StarBorderIcon fontSize="inherit"/></span>;

      // Three stars
    } else if (averageRating >= 2.875 && averageRating < 3.25) {
      for (let i = 0; i < 3; ++i) {
        icons[i] = 
          <span key={`icon-${i}`} style={{color: "#E5A038"}}>
            <StarIcon fontSize="inherit" />
          </span>;
      }

      icons[3] = <span key="icon-3">
        <StarBorderIcon fontSize="inherit"/></span>;
      
      icons[4] = <span key="icon-4">
        <StarBorderIcon fontSize="inherit"/></span>;

      // Three stars and a half star
    } else if (averageRating >= 3.25 && averageRating < 3.875) {
      for (let i = 0; i < 3; ++i) {
        icons[i] =
          <span key={`icon-${i}`} style={{ color:"#E5A038"}}>
            <StarIcon fontSize="inherit" />
          </span>;
      }

      icons[3] = <span key="icon-3" style={{color: "#E5A038"}}>
        <StarHalfIcon fontSize="inherit" /></span>; 

      icons[4] = <span key="icon-4">
        <StarBorderIcon fontSize="inherit"/></span>;
      
      // Four stars
    } else if (averageRating >= 3.875 && averageRating < 4.25) {
      for (let i = 0; i < 4; ++i) {
        icons[i] =
          <span key={`icon-${i}`} style={{ color: "#EB6F3D" }}>
            <StarIcon fontSize="inherit" />
          </span>;
      }

      icons[4] = <span key="icon-4">
        <StarBorderIcon fontSize="inherit" /></span>;

      // Four stars and a half star
    } else if (averageRating >= 4.25 && averageRating < 4.875) {
      for (let i = 0; i < 4; ++i) {
        icons[i] = 
          <span key={`icon-${i}`} style={{ color: "#EB6F3D"}}>
            <StarIcon fontSize="inherit" />
          </span>;
      }

      icons[4] = <span key="icon-4" style={{ color: "#EB6F3D"}}> 
        <StarHalfIcon fontSize="inherit" /></span>; 

      // Five stars
    } else if (averageRating >= 4.875) {
      for (let i = 0; i < 5; ++i) {
        icons[i] = 
          <span key={`icon-${i}`} style={{ color: "#D22E21"}}>
            <StarIcon fontSize="inherit" />
          </span>;
      }
    }

    return icons;
  }

  return (
    <>
      <div className="average-rating-container">
        <span className="average-rating-icon">
          {displayRating(averageRating)}
        </span>

        <span className="average-rating-num">{averageRating}</span>

        <span className="total-reviews">
          (
          {totalReviews === 0
            ? "0 review"
            : totalReviews === 1
            ? "1 review"
            : `${totalReviews} reviews`}
          )
        </span>
      </div>
    </>
  );
}

export default AverageRating;