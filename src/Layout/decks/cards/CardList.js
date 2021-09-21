import React, {useState} from "react";
import { useHistory, Link} from "react-router-dom"


function CardList({cards, deckId}){
    const history = useHistory()
    const [side, setSide] = useState("front")
    const [cardNumber, setCardNumber] = useState(0)


    const handleFlipClick = () => {
        if (side === "front"){
            return setSide("back")
        } else {
            return setSide("front")
        }
    }
    const handleNextClick = () => {
        if (cardNumber === cards.length-1){
            if (window.confirm("Restart cards?")){
                setSide("front")
                setCardNumber(0)
            } else{
                history.push("/")
        }} else {
            setSide("front")
            setCardNumber(cardNumber + 1)
        }
    }

    if (cards.length >2){
        return(
       <div className="card col 10" >
           <div className="card-body">
                   <h5 className="card-title">{`Card ${cardNumber + 1} of ${cards.length}`}</h5>
                   <p className="card-text">{cards[cardNumber][side]}</p>
               <button className="btn btn-secondary" onClick={handleFlipClick}>Flip</button>
               {side === "back" &&<button className= "btn btn-primary" onClick={handleNextClick}>Next</button>}
           </div>
       </div>
   )} else {
       return( 
       <div className="container">
           <div className="row">
               <h5>Not enough cards</h5>
           </div>
           <div className="row">
               <p>You need at least 3 cards to study. There are {cards.length} cards in this deck.</p>
           </div>
           <div className = "row">
               <Link to={`cards/new`} className= "btn btn-primary">Add Cards</Link>
           </div>
       </div>
    )}

}

export default CardList;