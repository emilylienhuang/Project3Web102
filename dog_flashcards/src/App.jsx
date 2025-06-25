import "./App.css";
import Card from "./components/Card";
import { cards } from "./data/cards";
import { useState } from "react";
const App = () => {
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [canFlip, setCanFlip] = useState(false);
  const handleGuessSubmit = (e) => {
    e.preventDefault();
    const correct = cards[idx].ans.trim().toLowerCase();
    const userGuess = guess.trim().toLowerCase();
    if (userGuess === correct) {
      setCanFlip(true);
      setFeedback("✅ Correct! Now click the card to flip.");
    } else {
      setFeedback("❌ Incorrect. Try again.");
    }
  };

  const goToCard = (newIdx) => {
    setIdx(newIdx);
    setGuess("");
    setFeedback("");
    setCanFlip(false);
    setCardFlipped(false); // <- Reset flip here
  };
  return (
    <div className="App">
      {" "}
      <h1> Can I pet that Dog?</h1>
      <h3>Wilderness survival guide for what you can pet in the wild. </h3>
      <h3>Put your knowledge to the test!</h3>
      <p>Deck Length: {cards.length}</p>
      <div className="center-page">
        {cards.length > 0 ? (
          <Card key={idx} card={cards[idx]} canFlip={canFlip} />
        ) : (
          <p>No cards found.</p>
        )}
      </div>
      <div className="form-box">
        <form onSubmit={handleGuessSubmit} className="guess-form">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Can you pet that dog?"
          />
          <button type="submit">Check</button>
        </form>
        {feedback && <p className="feedback">{feedback}</p>}
      </div>
      <div className="nav-buttons">
        {idx === 0 && <p className="deck-message">Start of deck</p>}
        <button onClick={() => goToCard(idx - 1)} disabled={idx === 0}>
          Previous
        </button>

        <button
          onClick={() => goToCard(idx + 1)}
          disabled={idx === cards.length - 1}
        >
          Next
        </button>
        {idx === cards.length - 1 && (
          <p className="deck-message">End of deck</p>
        )}
      </div>
    </div>
  );
};

export default App;
