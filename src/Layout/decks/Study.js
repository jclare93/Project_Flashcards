import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api"
import CardList from "./cards/CardList"

function Study(){
    const { deckId } = useParams();
    const [deck, setDeck] = useState({})
    
    
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck(){
            const foundDeck = await readDeck(deckId, abortController.signal);
            setDeck(foundDeck)
        }
        loadDeck()
        return () => abortController.abort();
    }, [deckId])

    const breadcrumb = (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to = "/">Home</Link></li>
            <li className="breadcrumb-item"><Link to ={`/decks/${deckId}`}>{deck.name}</Link> </li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
    </nav>
    )

    if (deck.cards){
        return(
        <div className= "container">
            <div className = "row">
                {breadcrumb}
            </div>
            <div className = "row">
                <h3>Study: {deck.name}</h3>
            </div>
            <div className = "row">
                <CardList cards = {deck.cards} deckId = {deckId}/>
            </div>
        </div>
    )} else {
        return <h4>One Moment Please...</h4>;
        }
}

export default Study;