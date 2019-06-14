import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Smurf = props => {
 let id = null;
 const [smurf, setSmurf] = useState({name: '', height: '', age: '', id: 0})

 const fetchSmurf = async (sId) =>  {
  const smurfs = await Axios.get('http://localhost:3333/smurfs')
  const smurf = smurfs.data.filter(smurf => smurf.id = sId)[0];
  setSmurf({...smurf, id: sId});
}

  useEffect(() => {
    console.log(props)
    if(props.match) {
      id = props.match.params.id;
      fetchSmurf(id)
    } else {
      setSmurf({...props})
    }
  }, [])
  const deleteSmurf = (id) => {
    if(props.history) {
      props.deleteSmurf(id)
      props.history.goBack();
    } else {
      props.deleteSmurf(id)
    }
  }

  return (
    <div className="Smurf">
      <Link to={`/smurf/${smurf.id}`}><h3>{smurf.name}</h3></Link>
      <strong>{smurf.height} tall</strong>
      <p>{smurf.age} smurf years old</p>
      <Link style={{marginRight: '1rem'}} to={`/smurfs/${smurf.id}`}>
        <button>Update Smurf</button>
      </Link>
      <button onClick={() => deleteSmurf(smurf.id)}>Remove From Village</button>
    </div>
  );
};

Smurf.defaultProps = {
  name: '',
  height: '',
  age: '',
  id: 0
};

export default Smurf;

