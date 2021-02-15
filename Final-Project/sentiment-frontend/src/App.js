import React from 'react';
import logo from './logo.svg';
import './App.css';
import Signup from './containers/Signup'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SearchBar from './containers/SearchBar';
import Login from './containers/Login'

class App extends React.Component {

  constructor(props) {
    super(props) 
    this.state = {
      render: false,
      img: '' 
    }
  }

  

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <Login/><br/><br/>
        <img src='https://www.repugen.com/Images/sentiment-analysis.png' className="App-logo" alt="logo" />
        <h1 style={{fontFamily: 'Comic Sans MS'}}>
          React/Rails Sentiment Analysis
        </h1>
        <Router>
          <Switch>
            <Route exact path='/target' render={props => 
              <SearchBar {...props}/>}/> 
            <Route exact path='/' component={Signup}/> 
          </Switch>
        </Router>
        <br/>
        <a
          className="App-link"
          href="https://en.wikipedia.org/wiki/Sentiment_analysis"
          target="_blank"
          
        >
          About Sentiment Analysis
        </a><br/><br/>
      {/* <Signup /> */}
      </header>
      
    </div>
  )}
}

export default App;
