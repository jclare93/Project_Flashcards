import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch, useHistory} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api"
import { Link } from "react-router-dom"

function Deck(){
    const history = useHistory();
    const trashCan = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>;
    const pencilEdit = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
    </svg>;
    const bookStudy = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book" viewBox="0 0 16 16">
    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
    </svg>;
    const [deck, setDeck] = useState({})
    const deckId = useParams().deckId;
    const {url, path} = useRouteMatch();
    useEffect(() => {
        const abortController = new AbortController();
        async function loadDeck(){
            const foundDeck = await readDeck(deckId, abortController.signal);
            setDeck(foundDeck);
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId])

    const handleClick = (event) => {
        event.preventDefault();
        if (window.confirm("Do you really want to delete this deck? Recovery is futile.")) {
           const response = deleteDeck(deckId)
           console.log(response)
           history.push("/")
       } 
    }

    const breadCrumb = (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to = "/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
        </ol>
    </nav>
    )

    return (
        <div className= "container">
            <div className = "row">
                {breadCrumb}
            </div>
            <div className = "row">
                <div className = "container">
                    <div className="row">
                        <h3>{deck.name}</h3>
                    </div>
                    <div className = "row">
                        <p>{deck.description}</p>
                    </div>
                    <div className = "row justify-content-between">
                        <div className = "col-4">
                            <Link to = {`${url}/study`}className="btn btn-primary">{bookStudy} Study</Link>
                            <Link to={`${url}/cards/new`} className= "btn btn-primary">Add Cards</Link>
                        </div>
                        <div className = "col-4">
                            <button className="btn btn-danger" onClick={handleClick}>{trashCan}</button>
                            <Link to = {`${url}/edit`}  className="btn btn-secondary">{pencilEdit} Edit</Link>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <div className = "row">
                <h3>Cards</h3>
            </div>
            {deck.cards && deck.cards.map((card) => {
            const front = card.front
            const back = card.back
            return(
                <div className="row card" key = {card.id}>
                    <div className="card-body">
                        <div className = "row">
                            <div className = "col">
                                {front}
                            </div>
                            <div className = "col">
                                {back}
                            </div>
                        </div>
                        <br />
                        <div className = "row">
                            <div className = "offset-10">
                                <Link to = {`${url}/cards/${card.id}/edit`} className="btn btn-secondary">{pencilEdit} Edit</Link>
                                <button className="btn btn-danger" 
                                onClick= {async(event) => {
                                        event.preventDefault();
                                        if (window.confirm("Are you sure you want to delete this card?")){
                                            const response = await deleteCard(card.id)
                                            console.log(response)
                                            history.go(`${url}`)
                                        }
                                }}>{trashCan}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
            )
            })}
        </div>
    )
}

export default Deck;