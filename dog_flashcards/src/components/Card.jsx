import React, { useState, useEffect } from "react";
const Card = ({ card, canFlip }) => {
  const [flipped, setFlipped] = useState(false);
  console.log("Rendering card:", card);
  if (!card) return null;

  const handleFlip = () => {
    if (!canFlip || flipped) return;

    setFlipped(true);

    // Flip back after 30 seconds
    setTimeout(() => {
      setFlipped(false);
    }, 30000); // 30 seconds
  };

  useEffect(() => {
    if (flipped) {
      const timer = setTimeout(() => {
        setFlipped(false);
      }, 30000); // 30 seconds

      // 🧹 Cleanup in case component unmounts or flipped changes early
      return () => clearTimeout(timer);
    }
  }, [flipped]);
  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        <div className="flashcard-face flashcard-front">
          <h1>{card.title}</h1>
          <img
            src={`/images/${card.image}`}
            alt="image"
            className="card-image"
          />
        </div>
        <div className="flashcard-face flashcard-back">
          <div className="card-line title">{card.title}</div>
          <div className="card-line">
            <h1>
              <strong>{card.ans} </strong>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
