import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom"
import DeckList from "./decks/DeckList"
import {listDecks} from "../utils/api/index"

function Home() {
    const [decks, setDecks] = useState([])
    useEffect(() => {
        async function getDecks() {
            const getDeck = await listDecks();
            setDecks(getDeck);
        }
        getDecks()
    }, [])


    return (
        <div className = "container">
            <div className = "row">
                <Link to = "/decks/new" type="button" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" 
                fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2H9v6a1 1 0 1 1-2 0V9H1a1 1 0 0 1 0-2h6V1a1 1 0 0 1 1-1z"/>
                </svg> Create Deck</Link>
            </div>
                <DeckList decks = {decks}/>
        </div>
    )
}

export default Home;