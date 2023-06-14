import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';


function PlantItem({plant}) {
    const dispatch = useDispatch();
    console.log(plant);
    const reduxState = useSelector(store => store);

    useEffect(() => {
        console.log('component did mount');
        dispatch({type: 'GET_LIST'})
        console.log(reduxState);
    }, []); 

    return (
      <tr key={plant.id}>
        <td>{plant.name}</td>
        <td>{plant.kingdom}</td>
        <td>{plant.clade}</td>
        <td>{plant.order}</td>
        <td>{plant.family}</td>
        <td>{plant.subfamily}</td>
        <td>{plant.genus}</td>
        <td><button onClick={() => (dispatch({type: 'REMOVE_PLANT', payload: plant.id}))}>Delete</button></td>
      </tr>
    );
}

export default PlantItem;
