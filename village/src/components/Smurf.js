import React from 'react';
import { Link } from 'react-router-dom';

const Smurf = props => {
  return (
    <div className="Smurf">
      <h3>{props.name}</h3>
      <strong>{props.height} tall</strong>
      <p>{props.age} smurf years old</p>
      <Link style={{marginRight: '1rem'}} to={`/smurfs/${props.id}`}>
        <button>Update Smurf</button>
      </Link>
      <button onClick={() => props.deleteSmurf(props.id)}>Remove From Village</button>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: ''
};

export default Smurf;

