import React, { useState, useEffect } from "react";
import { Link, useHistory} from "react-router-dom"
import { readDeck, updateDeck } from "../utils/api"

function CardForm({deckId}) {
    const history = useHistory();
    const [deckName, setDeckName] = useState('')
    const [deckInfo, setDeckInfo] = useState('')
    const [deck, setDeck] = useState({})
    const handleNameChange = (event) => setDeckName(event.target.value);
    const handleInfoChange = (event)=> setDeckInfo(event.target.value)
    
    const abortController = new AbortController();

    useEffect(() => {
        async function loadDeck(){
            const foundDeck = await readDeck(deckId, abortController.signal);
            setDeck(foundDeck); 
            setDeckName(foundDeck.name);
            setDeckInfo(foundDeck.description)
        }   
        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newDeck = {...deck, deckName, deckInfo}
        const response = await updateDeck(newDeck, abortController.signal)
        setDeck(response)
        history.push(`/decks/${deck.id}`)
        
    }

    return(
    <form onSubmit = {handleSubmit}>
        <div className="form-group">
            <label for="Name">Name</label>
            <input type="text" 
            className="form-control" 
            id="Name" 
            placeholder="Deck Name" 
            value = {deckName}
            onChange = {handleNameChange}/> 
        </div>
        <div className="form-group">
            <label for="Description">Description</label>
            <textarea 
            className="form-control" 
            id="Description" 
            rows="3" 
            value = {deckInfo}
            onChange = {handleInfoChange}></textarea>
        </div>
        <Link to= "/" className = "btn btn-scondary"> Cancel </Link>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )   
}

export default CardForm;