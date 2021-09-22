class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector(".tickets-sections .row");
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = "";

    tickets.forEach((ticket) => {
      const template = TicketsUI.ticketTemplate(ticket);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  clearContainer() {
    this.container.innerHTML = "";
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgtemplate();
    this.container.insertAdjacentHTML("afterbegin", template);
  }

  static emptyMsgtemplate() {
    return `
    <div class="tickets-empty-res-msg">
      По вашему запросу билетов не найдено.
    </div>`;
  }

  static ticketTemplate(ticket) {
    return `
    <div class="col s12 m6" data-ticket-id = ${ticket.id}>
    <div class="card ticket-card">
      <div class="ticket-airline d-flex align-items-center">
        <img
          src="${ticket.airline_logo}"
          class="ticket-airline-img"
        />
        <span class="ticket-airline-name"
          >${ticket.airline_name}</span
        >
      </div>
      <div class="ticket-destination d-flex align-items-center">
        <div class="d-flex align-items-center mr-auto">
          <span class="ticket-city">${ticket.origin_name} </span>
          <i class="medium material-icons">flight_takeoff</i>
        </div>
        <div class="d-flex align-items-center">
          <i class="medium material-icons">flight_land</i>
          <span class="ticket-city">${ticket.destination_name}</span>
        </div>
      </div>
      <div class="ticket-time-price d-flex align-items-center">
        <span class="ticket-time-departure">${ticket.departure_at}</span>
        <span class="ticket-price ml-auto">${ticket.currency_symbol}${ticket.price}</span>
      </div>
      <div class="ticket-additional-info">
        <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
        <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
      </div>
      <a
        class="waves-effect waves-light btn-small green darken-1 add-favorite ml-auto"
        >Add to favorites</a
      >
    </div>
  </div>
    `;
  }
}

const ticketsUI = new TicketsUI();

export default ticketsUI;
