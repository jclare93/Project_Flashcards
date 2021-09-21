import React from "react";
import { useParams } from "react-router-dom";
import CardForm from "../CardForm";

function EditDeck() {
    const { deckId } = useParams()
    return(
         <CardForm deckId= {deckId} />
    )
}

export default EditDeck;