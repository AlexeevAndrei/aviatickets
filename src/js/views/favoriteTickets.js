import { getDropdownInstance } from "../plugins/materialize";

class FavoriteTicketsUI {
  constructor(getDropdownInstance) {
    this.favoriteContainer = document.querySelector(".dropdown-content");
    this.dropdown = document.querySelector(".dropdown-trigger");
    this.dropdownInstance = getDropdownInstance(this.dropdown);
  }

  renderFavoriteTicket(favoriteTickets) {
    this.clearContainer();

    favoriteTickets = Object.values(favoriteTickets);

    if (!favoriteTickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";

    favoriteTickets.forEach((favoriteTicket) => {
      const template = FavoriteTicketsUI.ticketTemplate(favoriteTicket);
      fragment += template;
    });

    this.favoriteContainer.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.favoriteContainer.innerHTML = "";
  }

  showEmptyMsg() {
    const template = FavoriteTicketsUI.emptyMsgtemplate();
    this.favoriteContainer.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgtemplate() {
    return `
    <div class="favorite-tickets-empty-res-msg">
      Избранных билетов нет.
    </div>`;
  }

  static ticketTemplate(favoriteTicket) {
    return `
    <div class="favorite-item  d-flex align-items-start" data-ticket-id=${favoriteTicket.id}>
      <img
        src="${favoriteTicket.airline_logo}"
        class="favorite-item-airline-img"
      />
      <div class="favorite-item-info d-flex flex-column">
        <div
          class="favorite-item-destination d-flex align-items-center"
        >
          <div class="d-flex align-items-center mr-auto">
            <span class="favorite-item-city">${favoriteTicket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="favorite-item-city">${favoriteTicket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${favoriteTicket.departure_at}</span>
          <span class="ticket-price ml-auto">${favoriteTicket.currency_symbol}${favoriteTicket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${favoriteTicket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${favoriteTicket.flight_number}</span>
        </div>
        <a
          class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
          >Delete</a
        >
      </div>
    </div>
    `;
  }

  changeStyleTicketBtn(id, container, type) {
    let ticketBtn = container
      .querySelector(`[data-ticket-id="${id}"]`)
      .querySelector(".add-favorite");
    if (type === "added") {
      ticketBtn.textContent = "Ticket Added";
      ticketBtn.classList.remove("green");
      ticketBtn.classList.add("orange");
    }
    if (type === "return") {
      ticketBtn.textContent = "Add to favorites";
      ticketBtn.classList.remove("orange");
      ticketBtn.classList.add("green");
    }
  }

  recalculateSizeDropdown(dropdown) {
    this.dropdownInstance.recalculateDimensions(dropdown);
  }
}

const favoriteTicketsUI = new FavoriteTicketsUI(getDropdownInstance);

export default favoriteTicketsUI;
