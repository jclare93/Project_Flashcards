import React, {useEffect, useState} from "react";
import {readCard, updateCard, createCard} from "../../../utils/api";

import {useHistory, Link} from "react-router-dom"

function NewEditCardForm({cardId, deckId}) {
    const history = useHistory();
    const [card, setCard] = useState({front: "", back: ""});
    const handleFrontChange = (event) => setCard({...card, front:event.target.value});
    const handleBackChange = (event) => setCard({...card, back:event.target.value});
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck(){
            if (cardId > 0){
            const foundCard = await readCard(cardId, abortController.signal);
            setCard(foundCard)
            }
        }
        loadDeck()
        return () => abortController.abort();
    },[cardId])

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(cardId > 0){
            const response = await updateCard(card);
            console.log(response); 
            history.push(`/decks/${deckId}`)
        } else{
            await createCard(deckId, card)
            setCard({front: "", back: ""})
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label htmlFor="Front">Front</label>
                <textarea 
                className="form-control" 
                id="Front" 
                rows="3" 
                placeholder="Front Side of Card"
                value = {card.front}
                onChange = {handleFrontChange}>{card.front}</textarea>
            </div>
            <div className="form-group">
                <label htmlFor="Back">Back</label>
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
        </form>
        )

}

export default NewEditCardForm;