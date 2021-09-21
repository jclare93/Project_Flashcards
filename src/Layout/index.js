import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home"
import Deck from "./decks/Deck"
import EditDeck from "./decks/EditDeck"
import Study from "./decks/Study"
import NewDeck from "./decks/NewDeck"
import AddCard from "./decks/cards/AddCard"
import EditCard from "./decks/cards/EditCard"
import {Switch, Route} from "react-router-dom"

function Layout() {
  //put in NOTFOUND
  return (
    <div>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path = "/">
            <Home />
          </Route>
          <Route exact path = "/decks/new">
            <NewDeck />
          </Route>
          <Route exact path = "/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route exact path = "/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route exact path = "/decks/:deckId">
            <Deck />
          </Route>
          <Route path = "/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path = "/decks/:deckId/study">
            <Study />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;
