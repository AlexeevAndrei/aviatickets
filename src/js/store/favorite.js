import locations from "../store/locations";

class Favorite {
  constructor() {
    this.favoriteTickets =
      JSON.parse(localStorage.getItem("favoriteTickets")) || {};
  }

  addFavoriteTickets(id) {
    const selectedTicket = locations.lastSearch.find(
      (ticket) => ticket.id === id
    );

    if (this.favoriteTickets[id]) {
      return;
    }

    this.favoriteTickets[id] = selectedTicket;
    this.saveInLocalStorage();
  }

  deleteFavoriteTicket(id) {
    delete this.favoriteTickets[id];
    this.clearLocalStorage();
    this.saveInLocalStorage();
  }

  saveInLocalStorage() {
    localStorage.setItem(
      "favoriteTickets",
      JSON.stringify(this.favoriteTickets)
    );
  }

  clearLocalStorage() {
    localStorage.removeItem("favoriteTickets");
  }
}

const favorite = new Favorite();

export default favorite;
