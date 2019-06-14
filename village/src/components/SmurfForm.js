import React, { Component } from 'react';
import Axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      height: ''
    };
  }
  id  = this.props.match.params.id;
  componentDidMount() {
    if(this.id) {
      this.fetchSmurf();
    }
  }
  fetchSmurf = async () =>  {
    const smurfs = await Axios.get('http://localhost:3333/smurfs')
    console.log(smurfs.data);
    const smurf = smurfs.data.filter(smurf => smurf.id === parseInt(this.id))[0];
    this.setState({...smurf});
  }
  addSmurf = async event => {
    event.preventDefault();
    // add code to create the smurf using the api
    const { name, height, age } = this.state;
    if(this.id) {
      this.props.updateSmurf(this.id, {name, height, age: parseInt(age)})
    } else {
      this.props.createSmurf({name, height, age: parseInt(age)});
    }
    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="SmurfForm">
        <form onSubmit={this.addSmurf}>
          <input
            onChange={this.handleInputChange}
            placeholder="name"
            value={this.state.name}
            name="name"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="age"
            value={this.state.age}
            name="age"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="height"
            value={this.state.height}
            name="height"
          />
          <button type="submit">{!!this.id ? 'Update Smurf':'Add to the village'}</button>
        </form>
      </div>
    );
  }
}

export default SmurfForm;
