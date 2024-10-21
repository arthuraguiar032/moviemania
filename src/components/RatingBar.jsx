import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const getColorByRating = (rating) => {
    if (rating < 50) {
        return ["red", "#ff000040"];
    } else if (rating < 70) {
        return ["yellow", "#ffff0040"];
    } else {
        return ["#43ff64", "#43ff6440"];
    }
};

const RatingBar = ({ rating, diameter }) => {
    const [color_path, color_trail] = getColorByRating(rating);

    return (
    
    <div style={{ width: diameter, height: diameter }}>
      <CircularProgressbar
        value={rating}
        text={`${rating}%`}
        strokeWidth={diameter*0.07}
        background
        backgroundPadding={diameter*0.05}
        styles={buildStyles({
            backgroundColor: "#14181c",
            textColor: "white",
            pathColor: color_path,
            trailColor: color_trail,
        })}
      />
    </div>
  );
};

export default RatingBar;
