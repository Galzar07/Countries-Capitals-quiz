import React, { Component } from "react";
import "./style/App.css";
import Question from "./components/Question";
import Answers from "./components/Answers";

class App extends Component {
  state = {
    data: [],
    points: 0,
    country: "",
    capital: "",
    answers: [],
    isCorected: false,
    counter: 0,
  };

  componentDidMount() {
    fetch("https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "ajayakv-rest-countries-v1.p.rapidapi.com",
        "x-rapidapi-key": "9bfdc4ea8dmsh88f4ab710ed6562p15f1fcjsn7069fd957510",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  drawCountry = () => {
    let data = [...this.state.data];
    const answers = [];
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * data.length);
      answers.push(data[index]);
      data.splice(index,1);
    }
    const correctId = Math.floor(Math.random() * 4);

    this.setState({
      country: answers[correctId].name,
      capital: answers[correctId].capital,
      answers,
    });
  };

  checkAnswer = (e) => {

    if (
      e.target.innerText === this.state.capital ||
      (this.state.capital === "" && e.target.innerText === "x")
    ) {
      this.setState({
        points: this.state.points + 1,
        counter: this.state.counter + 1,
      });
      e.target.className += " correct";
    } else {
      this.setState({
        counter: this.state.counter + 1,
      });
      e.target.className += " incorrect";
    }
  };

  render() {
    const wynik = this.state.counter <=0 ? this.state.points : 
    this.state.points+ "/" +this.state.counter
    return (
      <div className="container">
        <div className="card">
          <Question country={this.state.country} />
          <Answers
            capital={this.state.capital}
            answers={this.state.answers}
            check={this.checkAnswer}
            isCorected={this.state.isCorected}
          />
          <div className="result">
            <button className="next" onClick={this.drawCountry}>
              {this.state.counter ? "next" : "start"}
            </button>
            <h3>
              Score: {wynik }
            </h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
