import { useEffect, useState } from "react";
import RatingSelect from "./RatingSelect";
import Button from "./shared/Button";
import Card from "./shared/Card";
import { useContext } from "react";
import { FeedbackContext } from "../context/FeedbackContext";


const FeedbackForm = () => {
  const { addFeedback, updateFeedback, FeedbackEdit } =
    useContext(FeedbackContext);
  const [text, setText] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState();

  const handleTextChange = (e) => {
    if (text == "") {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== "" && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage("Text must be atleast 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage(null);
    }
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };

      if (FeedbackEdit.edit === true) {
        updateFeedback(FeedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback);
      }

      setText('')
    }
  };

  useEffect(() => {
    if (FeedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(FeedbackEdit.item.text)
      setRating(FeedbackEdit.item.rating);
    }
  },[FeedbackEdit])

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(selected) => setRating(selected)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisbaled={btnDisabled}>
            Send
          </Button>
        </div>
      </form>
      {message && <p>{message}</p>}
    </Card>
  );
};

export default FeedbackForm