import React, {useState, useEffect} from "react";
import {readDeck,  createCard } from "../../../utils/api";
import {useParams, Link} from "react-router-dom"

function AddCard() {
    const deckId = useParams().deckId
    const [deck, setDeck] = useState({})
    const [newCard, setNewCard] = useState({front: "", back: ""})
    const handleFrontChange = (event) => setNewCard({...newCard, front:event.target.value})
    const handleBackChange = (event) => setNewCard({...newCard, back:event.target.value})

    useEffect(() => {
        async function loadDeck() {
            const getDeck = await readDeck(deckId)
            setDeck(getDeck)
        }
        loadDeck();
    }, [deckId])

    const handleSubmit = async(event) => {
        event.preventDefault()
        await createCard(deckId, newCard)
        setNewCard({front: "", back: ""})
    }

    const breadCrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to = "/">Home</Link></li>
                <li className="breadcrumb-item"><Link to = {`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
    )

    const addCardForm = (
        <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label for="Front">Front</label>
                <textarea 
                className="form-control" 
                id="Front" 
                rows="3" 
                placeholder="Front Side of Card"
                value = {newCard.front}
                onChange = {handleFrontChange}></textarea>
            </div>
            <div className="form-group">
                <label for="Back">Back</label>
                <textarea 
                className="form-control" 
                id="Back" 
                rows="3" 
                placeholder = "Back Side of Card"
                value = {newCard.back}
                onChange = {handleBackChange}></textarea>
            </div>
            <Link to= {`/decks/${deckId}`} className = "btn btn-scondary"> Done </Link>
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    )

    return (
        <div>
            <div>
                {breadCrumb}
            </div>
            <div>
                <h3>{deck.name}</h3>
            </div>
            <div>
                {addCardForm}
            </div>
        </div>
    )
}

export default AddCard;