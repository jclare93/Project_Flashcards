import React, {useState} from "react";
import { createDeck } from "../../utils/api";
import {Link, useHistory} from "react-router-dom"

function NewDeck() {
    const [newDeck, setNewDeck] = useState({name : "", description : ""})
    const handleNameChange = (event) => setNewDeck({...newDeck, name:event.target.value});
    const handleInfoChange = (event)=> setNewDeck({...newDeck, description:event.target.value})
    const history = useHistory();

    const breadCrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to = "/">Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
        </nav>
    )

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await createDeck(newDeck);
        history.push(`/decks/${response.id}`)
    }


    return(
    <div>
            {breadCrumb} 
            <form onSubmit = {handleSubmit}>
                <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input type="text" 
                    className="form-control" 
                    id="Name" 
                    placeholder="Deck Name" 
                    value = {newDeck.name}
                    onChange = {handleNameChange} required/> 
                </div>
                <div className="form-group">
                    <label htmlFor="Description">Description</label>
                    <textarea 
                    className="form-control" 
                    id="Description" 
                    placeholder = "Brief description of the deck"
                    rows="3" 
                    value = {newDeck.description}
                    onChange = {handleInfoChange} required></textarea>
                </div>
                <Link to= "/" className = "btn btn-scondary"> Cancel </Link>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
    </div>
    )
}

export default NewDeck;