import React, { Component } from 'react';
import * as d3 from 'd3';
import './App.css';

class App extends Component {
  state = {
    response: '',
  };

  //get the data and set the state
  componentDidMount() {
    this.callApi()
      .then(res => { this.setState({ response: JSON.parse(res.express) }); })
      .catch(err => console.log(err));
  }

  //function to fetch the data
  callApi = async () => {
    const response = await fetch('/data');
    const body = await response.json();
    return body;
  };
  render() {
    //if its not loaded yet- the response from server hasnt arrived yet
    if (!this.state.response) {
      return <span>Loading...</span>;
    }
    //else we use map to map each line of the json into the table, and append it using d3

    //if no table exists- create and append a new table using d3
    if (d3.select("div").selectAll("table").size() == 0) {
      var table= d3.select("div").append("table");
      table.append("tbody");
    }

    //append the keys to the first line of the table- the title for each row
    Object.keys(this.state.response[0]).map(function (key) {
      return d3.select("div").select("table").select("tbody").append("td").text(key);
    });

    //append the values of the keys, each one in a different row
    this.state.response.map(function (element) {
      d3.select("div").select("table").select("tbody").append("tr");
      return Object.keys(element).map(function (key) {
        d3.select("div").select("table").select("tbody").append("td").text(element[key]);
      });
    });

    //the page we return will initially empty and then appended the table using d3
    return (<div className="App"></div>);
  }
}

export default App;
