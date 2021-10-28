import React, { Component } from 'react';
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
    //else we use map to map the each line of the json into the table
    return (
      <div className="App">
        <div>
          <h2>Data:</h2>
          <table border={2} cellPadding={5}>
            <thead>
              <tr>
                <td>date</td>
                <td>source number</td>
                <td>destination number</td>
              </tr>
            </thead>
            <tbody>
              {
                this.state.response.map(function (element) {
                  return Object.keys(element).map(function (key) {
                    return <td>{element[key]}</td>;
                  })
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
