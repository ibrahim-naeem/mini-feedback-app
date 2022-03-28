import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext);
  let average =
    feedback.reduce((acc, curr) => {
      return acc + curr.rating;
    }, 0) / feedback.length;
  return (
    <div className="feedback-stats">
      <h4>{feedback.length}</h4>
      <h4>Average Rating: {average ? average : 0}</h4>
    </div>
  );
};

export default FeedbackStats;
