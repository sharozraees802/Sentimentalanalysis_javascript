// var Sentiment = require("sentiment");

import Sentiment from "sentiment"; // this thing use   "type": "module",

let sentiment = new Sentiment();

//let docx = sentiment.analyze("I like apples");
//console.log(docx);

// Applying to An Array

let mydocx = [
  "I love apples",
  "I don't eat pepper",
  "the movie was very nice",
  "this book is the best",
  "this book is the bad condition",
];

let r = sentiment.analyze(...mydocx).score;
if (r < 0) {
  console.log("Negative 😡😠");
} else if (r > 0) {
  console.log("Positive 😍");
} else {
  console.log("Newtral 😐");
}

// mydocx.forEach((s) => {
//   //   console.log(sentiment.analyze(s));
//   console.log(sentiment.analyze(s).score);
// });
