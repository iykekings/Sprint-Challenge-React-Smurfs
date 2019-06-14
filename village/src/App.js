import React, { Component } from 'react';
import Axios from 'axios';

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  baseUrl = 'http://localhost:3333/smurfs';

  fetchSmurfs = async () => {
    const smurfs = await Axios.get(this.baseUrl);
    this.setState({smurfs: smurfs.data})
  }
  componentDidMount() {
    this.fetchSmurfs();
  }
  render() {
    return (
      <div className="App">
        <SmurfForm />
        <Smurfs smurfs={this.state.smurfs} />
      </div>
    );
  }
}

export default App;
