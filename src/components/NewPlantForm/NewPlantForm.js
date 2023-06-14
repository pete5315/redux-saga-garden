import React, {useState}from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NewPlantForm = () => {
    const dispatch = useDispatch();    
  
    
    //Initial state is an OBJECT, with keys id and name
    let [newPlant, setPlant] = useState({name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: ''});

    const handleNameChange = (event, property) => {
        console.log('event happened', event);
        //Similar to in redux -- we dont want to get rid of the id field when we update name
        setPlant({...newPlant, [property]: event.target.value})
        console.log(newPlant);
    }

    const addNewPlant = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_PLANT', payload: newPlant });
        //updates the next plant to have a new id
        setPlant({name: '', kingdom: '', clade: '', order: '', family: '', subfamily: '', genus: ''});
    }
    return (
        <div>
            <h3>This is the form</h3>
            <pre>{JSON.stringify(newPlant)}</pre>
            <form onSubmit={addNewPlant}>
            <label forHtml='name'>Name</label>
            <input type='text' value={newPlant.name} onChange={(event) => handleNameChange(event, "name")} />
            <label>Kingdom</label>
            <input type='text' value={newPlant.kingdom} onChange={(event) => handleNameChange(event, "kingdom")} />
            <label>Clade</label>
            <input type='text' value={newPlant.clade} onChange={(event) => handleNameChange(event, "clade")} />
            <label>Order</label>
            <input type='text' value={newPlant.order} onChange={(event) => handleNameChange(event, "order")} />
            <label>Family</label>
            <input type='text' value={newPlant.family} onChange={(event) => handleNameChange(event, "family")} />
            <label>Subfamily</label>
            <input type='text' value={newPlant.subfamily} onChange={(event) => handleNameChange(event, "subfamily")} />
            <label>Genus</label>
            <input type='text' value={newPlant.genus} onChange={(event) => handleNameChange(event, "genus")} />
                <input type='submit' value='Add New Plant' />
            </form>
        </div>
    );
}


export default NewPlantForm;
