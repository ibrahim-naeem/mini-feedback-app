import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const FeedbackContext = createContext();


export const FeedbackProvider = ({ children }) => {
    const [feedback, setFeedback] = useState([
      {
        id: 1,
        rating: 10,
        text: "This is form Feedback Context.",
      },
    ]);
  
  const [FeedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })
  
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };
  const updateFeedback = (id, upditem) => {
    setFeedback(feedback.map((item) => (item.id === id ? { ...item, ...upditem } : item)))
    console.log(id, upditem)
  }
  
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }
  
    return (
      <FeedbackContext.Provider
        value={{ feedback, addFeedback, deleteFeedback, FeedbackEdit, updateFeedback, editFeedback }}
      >
        {children}
      </FeedbackContext.Provider>
    );
}
