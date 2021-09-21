import React, { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom";
import {readDeck} from "../../../utils/api";
import NewEditCardForm from "./NewEditCardForm";

function EditCard(){
    const {cardId, deckId} = useParams();
    const [deck, setDeck] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck(){
            const foundDeck = await readDeck(deckId, abortController.signal);
            setDeck(foundDeck);
        }
        loadDeck()
        return ()=> abortController.abort();
    },[deckId, cardId])

    const breadCrumb = (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to = "/">Home</Link></li>
                <li className="breadcrumb-item"><Link to = {`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
            </ol>
        </nav>
    )

    return (
        <>
            {breadCrumb}
            <br />
            <NewEditCardForm deckId = {deckId} cardId = {cardId}/>
        </>
    )
}

export default EditCard;