import "../sass/main.scss";
import "../sass/cards_arrows.scss";
import "../sass/navbar.scss";
import "../sass/C_F_btn.scss";
import "../sass/weather_cards.scss";
//For babel
import regeneratorRuntime from "regenerator-runtime";
//
//Location controller could become
//Params = default or location string
//checks for string to convert through geolocation/if false useses default location
//runs default or geolocation through api to get data
//parsers activate on it
//information is extracted from parsed data
//the appropriate card type is selected and generated

import * as getForcast from "./models/get_forcast.js";
import * as parseInfo from "./models/parse_Info.js";
import * as cardManager from "./views/card_manager.js";
import * as manageStorageModel from "./models/manage_stroage_model.js";
import * as manageStorageView from "./views/manage_storage_view.js";
import { toggleCelcFaren } from "./views/C_F_btn_views.js";
import { changeArrows } from "./views/side_arrows.js";
import { dom, clearSearchBar } from "./views/dom.js";

//connects to the api, retrives the data then parses it.
const locationController = async (locationLatLong, mesType) => {
  //targets a location with lat and long to obtain weather data from the api

  if (locationLatLong) {
    locationLatLong =
      parseInfo.convertToUsableDataForReverseGeoCoding(locationLatLong);
    locationLatLong = await getForcast.reverseGeocode(...locationLatLong);
  } else {
    locationLatLong = await getForcast.getCurrentLatLon();
  }

  const { lat, long } = locationLatLong;

  //returns json from the weather api using lat and long as its target
  const data = await getForcast.getData(lat, long, mesType);
  //obtains all values held in the cards which will be appended to the dom
  const weatherData = parseInfo.parseData(data);

  //the below values are located outside of the daily values in the returned data from the api
  //which is why they are destructured in this way
  const { state_code, city_name, country_code } = data;

  //parses the data from the weather api and constructs html elements fot the DOM
  const cards = weatherData.map((measurments, index) => {
    return cardManager.createMainCards(measurments, mesType, index);
  });
  //plugs data into cards then creates and appends them to the DOM
  cardManager.changeTitle(state_code, city_name, country_code);
  cardManager.createCard(cards, "#container");
};

const favoritesListController = () => {
  const populate = () => {
    const favoritesListData = manageStorageModel.getFavorites();
    const favoritesCards = cardManager.createFavoriteCard(favoritesListData);
    cardManager.createCard(favoritesCards, dom.favoritesMenu);
  };

  const checkIfFavorite = () => {
    if (manageStorageModel.checkForFavoritesOnLoad() === true)
      return manageStorageView.toggleFavoriteStar("faved");
    return manageStorageView.toggleFavoriteStar("unfaved");
  };

  return {
    populate,
    checkIfFavorite,
  };
};

const addEventListeners = () => {
  //search button
  $(dom.searchForm).on("submit", async (event) => {
    event.preventDefault();
    const location = event.target[0].value;
    const mesToggle = toggleCelcFaren();
    activate(location, mesToggle);
    return (event.target[0].value = "");
  });
  //page left
  $(dom.leftBtn).on("click", () => {
    const page = changeArrows("left");
    return cardManager.createCard(page, "#container");
  });
  //page right
  $(dom.rightBtn).on("click", () => {
    const page = changeArrows("right");
    return cardManager.createCard(page, "#container");
  });
  $(dom.cfBtn).on("click", async () => {
    const mesToggle = toggleCelcFaren(true);
    const location = $(dom.locationName).text();
    return activate(location, mesToggle);
  });
  //To close leftover elements of the sidebar
  $(dom.toggler).on("click", () => cardManager.getInfoCard("remove"));
  $(dom.infoSquare).on("click", () => cardManager.getInfoCard("remove"));

  //give funtionality to the favorite button
  $(dom.favoritesBtn).on("click", () => {
    manageStorageModel.manageFavorites();
    manageStorageView.toggleFavoriteStar();
    favoritesListController().populate();
    addDynamicEventListeners();
  });

  //info-cards in menu
  const sideBarInfoList = [
    "humidity-info",
    "pressure-info",
    "dewpoint-info",
    "visability-info",
    "uv-info",
  ];
  sideBarInfoList.forEach((element) => {
    return $(`#${element}`).on("click", () => {
      const infoCard = cardManager.getInfoCard(element);
      return cardManager.createCard(infoCard, dom.infoSquare);
    });
  });
};

const addDynamicEventListeners = () => {
  //Makes favorites in sidebar functional
  $(".favorite").on("click", async (el) => {
    const name = parseInfo.getFavoritesLocationFromText(el.target);
    const mesType = manage_stroage_model.getTempPreference();
    activate(name, mesType);
  });
};

//initiates the api and cards //the default value of mesType = 'F' is to default it to imperial measurements
const activate = async (latLong, mesType = "F") => {
  const data = await locationController(latLong, mesType);
  favoritesListController().populate();
  favoritesListController().checkIfFavorite();
  addDynamicEventListeners();
};

activate();
addEventListeners();
