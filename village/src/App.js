import React, { Component } from 'react';
import Axios from 'axios';
import { Route, NavLink } from 'react-router-dom';

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

  createSmurf = async smurf => {
    const smurfs = await Axios.post(this.baseUrl, smurf);
    this.setState({smurfs: smurfs.data});
  }
  deleteSmurf = async id => {
    const smurfs = await Axios.delete(`${this.baseUrl}/${id}`);
    this.setState({smurfs: smurfs.data});
  }
  updateSmurf = async (id, smurf) => {
    const smurfs = await Axios.put(`${this.baseUrl}/${id}`, smurf);
    this.setState({smurfs: smurfs.data});
  }

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
        <div className="nav">
          <NavLink to="/" exact activeClassName="active">Smurfs</NavLink>
          <NavLink to="/smurf-form" activeClassName="active">Smurf Form</NavLink>
        </div>
        <Route exact path="/" 
          render={(rProps) => <Smurfs 
              {...rProps} 
              smurfs={this.state.smurfs}
              deleteSmurf={this.deleteSmurf} /> }
        />
        <Route path="/smurf-form" 
          render={(rProps) => <SmurfForm 
              {...rProps} 
              createSmurf={this.createSmurf}
               /> }
        />
        <Route path="/smurfs/:id" 
          render={(rProps) => <SmurfForm 
              {...rProps}
              updateSmurf={this.updateSmurf}
               /> }
        />
      </div>
    );
  }
}

export default App;
