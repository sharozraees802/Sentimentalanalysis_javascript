import React, { useState } from "react";

import "./App.css";
import Sentiment from "sentiment";
import StarRatings from 'react-star-ratings';

function App() {
  const sentiment = new Sentiment();
  const [sentimentalScore, setSentimentalScore] = useState(null);
  const [genealsentiment, setGenealsentiment] = useState(null);
  const [sentimenttext, setSentimenttext] = useState();
  const [getrating, setgetrating] = useState(0);

  const findsentiment = () => {
    let result = sentiment.analyze(sentimenttext);
    setSentimentalScore(result.score);

    if (result.score < 0) {
      setGenealsentiment("Negative");
      setgetrating( 5*(result.comparative * -1 ))
    } else if (result.score > 0) {
      setGenealsentiment("Positive");
      setgetrating(5*result.comparative)
    } else {
      setGenealsentiment("Neutral");
      setgetrating(5*result.comparative)
    }
    console.log(result);
    // console.log(result.comparative);
    // console.log(result);
    // console.log(result);
  };

  return (
    <div className="App">
      <h2>Text Sentiment Analysis in React</h2>
      <p>Enter text for Real-time Analysis:</p>
      <textarea
        type="text"
        value={sentimenttext}
        rows="25"
        cols="90"
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
      <div style={{ fontFamily: "cursive" }}>
      <StarRatings
        rating={getrating}
        // rating={1.5}
        starDimension="21.5px"
        starSpacing="1px"
        starRatedColor="rgb(255,186,10)"
        starEmptyColor="rgb(220,220,220)"
        numberOfStars={5}
      />
      </div>
      {/* <a href="https://jsfiddle.net/bkanber/DHU7J/">
        Click this a sentimental analysis algo
      </a> */}
    </div>
  );
}

export default App;
