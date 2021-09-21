import React, {useState, useEffect} from "react";
import { readDeck } from "../../../utils/api";
import {useParams, Link} from "react-router-dom"
import NewEditCardForm from "./NewEditCardForm";

function AddCard() {
    const deckId = useParams().deckId;
    const cardId = 0;
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function loadDeck() {
            const getDeck = await readDeck(deckId)
            setDeck(getDeck)
        }
        loadDeck();
    }, [deckId])

    const breadCrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to = "/">Home</Link></li>
                <li className="breadcrumb-item"><Link to = {`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            </ol>
        </nav>
    )

    return (
        <>
            <div>
                {breadCrumb}
            </div>
            <div>
                <h3>{deck.name}</h3>
            </div>
            <div>
                <NewEditCardForm deckId = {deckId} cardId = {cardId}/>
            </div>
        </>
    )
}

export default AddCard;