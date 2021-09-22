import "../css/style.css";
import "./plugins";
import locations from "./store/locations";
import formUI from "./views/form";
import currencyUI from "./views/currency";
import ticketsUI from "./views/tickets";
import favorite from "./store/favorite";
import favoriteTicketsUI from "./views/favoriteTickets";

document.addEventListener("DOMContentLoaded", () => {
  initApp();

  const form = formUI.form;
  const container = ticketsUI.container;
  const favoriteContainer = favoriteTicketsUI.favoriteContainer;
  const dropdown = favoriteTicketsUI.dropdown;

  favoriteTicketsUI.renderFavoriteTicket(favorite.favoriteTickets);

  //Events
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    onFormSubmit();
  });

  container.addEventListener("click", onContainerClickHandler);
  favoriteContainer.addEventListener("click", onFavoriteContainerClickHandler);

  //Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    //собрать данные из инпутов

    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    // CODE, CODE, 2019-09, 2019-10
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    ticketsUI.renderTickets(locations.lastSearch);

    locations.lastSearch.forEach((ticket) => {
      if (Object.keys(favorite.favoriteTickets).includes(ticket.id)) {
        favoriteTicketsUI.changeStyleTicketBtn(ticket.id, container, "added");
      } else return;
    });
  }

  function onContainerClickHandler({ target }) {
    if (target.classList.contains("add-favorite")) {
      const favoriteTicket = target.closest("[data-ticket-id]");
      const id = favoriteTicket.dataset.ticketId;
      favorite.addFavoriteTickets(id);
      favoriteTicketsUI.renderFavoriteTicket(favorite.favoriteTickets);
      favoriteTicketsUI.changeStyleTicketBtn(id, container, "added");
    }
  }

  function onFavoriteContainerClickHandler({ target }) {
    if (target.classList.contains("delete-favorite")) {
      const favoriteTicket = target.closest("[data-ticket-id]");
      const id = favoriteTicket.dataset.ticketId;
      favorite.deleteFavoriteTicket(id);
      favoriteTicketsUI.renderFavoriteTicket(favorite.favoriteTickets);
      favoriteTicketsUI.recalculateSizeDropdown(dropdown);

      if (
        !locations.lastSearch.length ||
        !locations.lastSearch.find((ticket) => ticket.id === id)
      )
        return;
      favoriteTicketsUI.changeStyleTicketBtn(id, container, "return");
    }
  }
});
