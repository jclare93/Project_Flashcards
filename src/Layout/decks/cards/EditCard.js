import React, { useEffect, useState } from "react";
import {useParams, Link, useHistory} from "react-router-dom";
import {readDeck, readCard, updateCard} from "../../../utils/api";

function EditCard(){
    const history = useHistory();
    const {cardId, deckId} = useParams();
    const [deck, setDeck] = useState([]);
    const [card, setCard] = useState([]);
    const handleFrontChange = (event) => setCard({...card, front:event.target.value});
    const handleBackChange = (event) => setCard({...card, back:event.target.value});
    useEffect(() => {
        async function loadDeck(){
            const foundDeck = await readDeck(deckId);
            const foundCard = await readCard(cardId);
            setDeck(foundDeck);
            setCard(foundCard)
        }
        loadDeck()
    },[deckId, cardId])

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await updateCard(card);
        console.log(response); 
        history.push(`/decks/${deckId}`)
    }

    const breadCrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to = "/">Home</Link></li>
                <li className="breadcrumb-item"><Link to = {`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
            </ol>
        </nav>
    )
    const editCardForm = (
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label for="Front">Front</label>
                <textarea 
                className="form-control" 
                id="Front" 
                rows="3" 
                placeholder="Front Side of Card"
                value = {card.front}
                onChange = {handleFrontChange}>{card.front}</textarea>
            </div>
            <div className="form-group">
                <label for="Back">Back</label>
                <textarea 
                className="form-control" 
                id="Back" 
                rows="3" 
                placeholder = "Back Side of Card"
                value = {card.back}
                onChange = {handleBackChange}>{card.back}</textarea>
            </div>
            <Link to= {`/decks/${deckId}`} className = "btn btn-scondary">Cancel</Link>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>)

    return (
        <div>
            {breadCrumb}
            <br />
            {editCardForm}
        </div>
    )
}

export default EditCard;