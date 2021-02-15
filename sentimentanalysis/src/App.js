import React, { useState } from "react";

import "./App.css";
import Sentiment from "sentiment";

function App() {
  const sentiment = new Sentiment();
  const [sentimentalScore, setSentimentalScore] = useState(null);
  const [genealsentiment, setGenealsentiment] = useState(null);
  const [sentimenttext, setSentimenttext] = useState();

  const findsentiment = () => {
    let result = sentiment.analyze(sentimenttext);
    setSentimentalScore(result.score);

    if (result.score < 0) {
      setGenealsentiment("Negative");
    } else if (result.score > 0) {
      setGenealsentiment("Positive");
    } else {
      setGenealsentiment("Neutral");
    }
    console.log(result);
  };

  return (
    <div className="App">
      <h2>Text Sentiment Analysis in React</h2>
      <p>Enter text for Real-time Analysis:</p>
      <textarea
        type="text"
        value={sentimenttext}
        onChange={(e) => setSentimenttext(e.target.value)}
      />
      <button
        style={{
          backgroundColor: "#4CAF50",
          border: "none",
          color: "white",
          padding: "15px 32px",
          textAlign: "center",
          textDecoration: "none",
          display: "inline-block",
          fontSize: "16px",
        }}
        onClick={findsentiment}
      >
        analysis
      </button>
      <p style={{ fontFamily: "cursive" }}>
        Sentiment Score: {sentimentalScore}
      </p>
      <p style={{ fontFamily: "cursive" }}>
        General Sentiment: {genealsentiment}
      </p>
    </div>
  );
}

export default App;
