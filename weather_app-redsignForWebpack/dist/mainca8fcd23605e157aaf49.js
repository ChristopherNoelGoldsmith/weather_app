/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/api_keys.js":
/*!*********************************!*\
  !*** ./src/scripts/api_keys.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "REVGEO_API_KEY": () => (/* binding */ REVGEO_API_KEY),
/* harmony export */   "WEATHER_API_KEY": () => (/* binding */ WEATHER_API_KEY)
/* harmony export */ });
var WEATHER_API_KEY = 'a609c15503594caf96b28d360952f491';
var REVGEO_API_KEY = 'fc5bef22a20647438f60b2a29a04d8b5';

/***/ }),

/***/ "./src/scripts/models/get_forcast.js":
/*!*******************************************!*\
  !*** ./src/scripts/models/get_forcast.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentLatLon": () => (/* binding */ getCurrentLatLon),
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "reverseGeocode": () => (/* binding */ reverseGeocode)
/* harmony export */ });
/* harmony import */ var _api_keys_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .././api_keys.js */ "./src/scripts/api_keys.js");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

 //uses the openweathermap api to reverse geocode a location entered into the searchbar in the DOM
//needs the api key hidden as it is currently exposed.
//only city is NEEDED to get a response but the state and country peramiters will give
//the reverseGeocode function more accuracy

var reverseGeocode = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(city) {
    var state,
        country,
        limit,
        key,
        options,
        data,
        json,
        _json$,
        lat,
        lon,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            state = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
            country = _args.length > 2 && _args[2] !== undefined ? _args[2] : '';
            limit = 5;
            key = _api_keys_js__WEBPACK_IMPORTED_MODULE_0__.REVGEO_API_KEY; //error handling for certain countries that do not return positive on search due to the api's data;
            //looking for bet[ter fix;

            if (/\d\d/.test(state)) state = '';
            console.log("City:".concat(city), "State:".concat(state), "Country:".concat(country));
            options = {
              method: 'GET',
              headers: {
                'Content-Security-Policy': 'upgrade-insecure-request;'
              }
            };
            _context.next = 9;
            return fetch("http://api.openweathermap.org/geo/1.0/direct?q=".concat(city, ",").concat(state, ",").concat(country, "&limit=").concat(limit, "&appid=").concat(key));

          case 9:
            data = _context.sent;
            _context.next = 12;
            return data.json();

          case 12:
            json = _context.sent;
            console.log(json);
            _json$ = json[0], lat = _json$.lat, lon = _json$.lon;
            return _context.abrupt("return", {
              lat: lat,
              "long": lon
            });

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function reverseGeocode(_x) {
    return _ref.apply(this, arguments);
  };
}(); //gets lat and long

function getCurrentLatLon() {
  // mutate position depending on requirements to give proper city
  try {
    return new Promise(function (res, rej) {
      return navigator.geolocation['getCurrentPosition'](function (position, err) {
        var lat = position.coords.latitude;
        var _long = position.coords.longitude;
        res({
          lat: lat,
          "long": _long
        });
      });
    });
  } catch (err) {
    errorMessage('getLatLon', err);
  }
} //!!obtains data from the weatherbit apit utilizing lat and long obtained from
//!!ither the js geolocation api or the reverseGeocode (openweathermapapi) function
//!!has option to add unit to change to metric. Default is imperial.
//

var getData = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(lat, _long2, unit) {
    var key, data, json;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log(lat, _long2);
            key = _api_keys_js__WEBPACK_IMPORTED_MODULE_0__.WEATHER_API_KEY;
            _context2.next = 5;
            return fetch("https://api.weatherbit.io/v2.0/forecast/daily?key=".concat(key, "&lat=").concat(lat, "&lon=").concat(_long2, "&units=").concat(unit, "&days=14"));

          case 5:
            data = _context2.sent;
            _context2.next = 8;
            return data.json();

          case 8:
            json = _context2.sent;
            return _context2.abrupt("return", json);

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](0);
            errorMessage('getData', _context2.t0);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 12]]);
  }));

  return function getData(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var errorMessage = function errorMessage(fnName, err) {
  console.log("error in \"".concat(fnName, "\" function\b\n        ERROR: ").concat(err));
};

/***/ }),

/***/ "./src/scripts/models/manage_stroage_model.js":
/*!****************************************************!*\
  !*** ./src/scripts/models/manage_stroage_model.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkForFavoritesOnLoad": () => (/* binding */ checkForFavoritesOnLoad),
/* harmony export */   "getFavorites": () => (/* binding */ getFavorites),
/* harmony export */   "manageFavorites": () => (/* binding */ manageFavorites),
/* harmony export */   "setOrGetDefaultLocation": () => (/* binding */ setOrGetDefaultLocation)
/* harmony export */ });
/* harmony import */ var _views_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/dom */ "./src/scripts/views/dom.js");

var getFavorites = function getFavorites() {
  if (!localStorage.getItem('favorites')) return;
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  return favorites;
};
var checkForFavoritesOnLoad = function checkForFavoritesOnLoad() {
  if (!localStorage.getItem('favorites')) return;
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  var favoriteName = $(_views_dom__WEBPACK_IMPORTED_MODULE_0__.dom.locationName).text();
  if (favorites.indexOf(favoriteName) == true || favorites.indexOf(favoriteName) == 0) return true;
};
var manageFavorites = function manageFavorites() {
  //create the favorites array;
  if (!localStorage.getItem('favorites')) localStorage.setItem('favorites', JSON.stringify([]));
  var favoriteToAdd = $(_views_dom__WEBPACK_IMPORTED_MODULE_0__.dom.locationName).text();
  var favorites = JSON.parse(localStorage.getItem('favorites')); //checks to see if duplicates of the favorite to add are present in the localstorage favorites array
  //this will remove any duplicates, which also causes the favorites button to become toggleable;

  var filterFavoritesForDuplicates = favorites.filter(function (fav) {
    if (fav !== favoriteToAdd) return true;
  }); //blelow will cause the function to return if duplicates are found in favorites

  if (filterFavoritesForDuplicates.length < favorites.length) {
    favorites = JSON.stringify(filterFavoritesForDuplicates);
    return localStorage.setItem('favorites', favorites);
  }

  ; //check to make sure not too many oitems are in favorites
  //if (favorites.length >= 5) return alert('You Cannot Have More then 5 Favorites!');

  if (favorites.length >= 5) return alert("You cannot have more then 5 favorites!"); //adds to and sets the favorite array to local storage;

  favorites.push(favoriteToAdd);
  favorites = JSON.stringify(favorites);
  return localStorage.setItem('favorites', favorites);
};
var setOrGetDefaultLocation = function setOrGetDefaultLocation(setOrGet) {
  if (setOrGet !== 'set' && setOrGet !== 'get') return alert('error'); //get location from the current h2 element.

  var locationFromTitle = $(_views_dom__WEBPACK_IMPORTED_MODULE_0__.dom.locationName).text();

  if (setOrGet == 'get') {
    var currentDefault = localStorage.getItem('defaultLocation');
    currentDefault = getJSON(currentDefault);
    return currentDefault;
  }

  return localStorage.setItem('defaultLocation', locationFromTitle);
};

/***/ }),

/***/ "./src/scripts/models/parse_Info.js":
/*!******************************************!*\
  !*** ./src/scripts/models/parse_Info.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertToUsableDataForReverseGeoCoding": () => (/* binding */ convertToUsableDataForReverseGeoCoding),
/* harmony export */   "getFavoritesLocationFromText": () => (/* binding */ getFavoritesLocationFromText),
/* harmony export */   "getMonth": () => (/* binding */ getMonth),
/* harmony export */   "parseData": () => (/* binding */ parseData)
/* harmony export */ });
//parses the data attribute of the API and parses all values used in cards then places them in an array of arrays
//for each day.
var parseData = function parseData(data) {
  data = data.data.map(function (el) {
    var datetime = el.datetime,
        high_temp = el.high_temp,
        low_temp = el.low_temp,
        pop = el.pop,
        pres = el.pres,
        rh = el.rh,
        weather = el.weather,
        wind_spd = el.wind_spd,
        wind_cdir = el.wind_cdir,
        dewpt = el.dewpt,
        vis = el.vis,
        uv = el.uv;
    var icon = weather.icon,
        description = weather.description; //rounds some values returned from api to avoid decimals;

    low_temp = Math.round(low_temp);
    high_temp = Math.round(high_temp);
    dewpt = Math.round(dewpt);
    wind_spd = Math.round(wind_spd); //converts the datetime to a day of the week, date, month ex: Monday, the first, April

    var regExpForMonthAndDay = /(?<=-)(\d\d){1}/g;
    var monthAndDay = datetime.match(regExpForMonthAndDay);
    var month = getMonthString(monthAndDay[0]);
    var day = monthAndDay[1];
    var weekday = createCalWeek(month, day);
    weekday = dayOfWeek(weekday); //

    return {
      weekday: weekday,
      //1
      day: day,
      //2
      month: month,
      //3
      high_temp: high_temp,
      //4
      low_temp: low_temp,
      //5
      pop: pop,
      //6
      pres: pres,
      //7
      rh: rh,
      //8
      wind_spd: wind_spd,
      //9
      wind_cdir: wind_cdir,
      //10
      dewpt: dewpt,
      //11
      vis: vis,
      //12
      uv: uv,
      //13
      icon: icon,
      //14
      description: description //15

    };
  });
  return data;
};
var getMonth = function getMonth(data) {
  data = data.data.map(function (date) {
    date = date.datetime.match(/-\d\d-/)[0];
    date = date.match(/\d\d/)[0];
    date = getMonthString(date);
    return el;
  });
  return data;
}; //Favorites Funtions

var getFavoritesLocationFromText = function getFavoritesLocationFromText(favorite) {
  return $(favorite).text();
}; //Utility Functions

var createCalWeek = function createCalWeek(month, day) {
  var date = new Date();
  var year = date.getFullYear(); //const month = date.getMonth() + 1;
  //Passees values to get the 0-6 numberical value of the day of the week this specified date is on.

  date = new Date("".concat(month, " ").concat(day, ", ").concat(year, " 07:00:00"));
  date = date.getDay();
  return date;
};

var dayOfWeek = function dayOfWeek(day) {
  var _days$day;

  var days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  return (_days$day = days[day]) !== null && _days$day !== void 0 ? _days$day : 'Sun';
};

var getMonthString = function getMonthString(month) {
  month = month * 1 - 1;
  var months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month];
};

var convertToUsableDataForReverseGeoCoding = function convertToUsableDataForReverseGeoCoding(loc) {
  //regexp parses the location string given by the api to seperate city, state, country into an array;
  var regExpForLoc = /(\w+(\W\w+)?(\W\w+)?|(\w+(\s\w+)?(\s\w+)?))/gi;
  loc = loc.match(regExpForLoc); //this returns your current location if the searchbar has an empty address

  if (!loc || loc[0] === '' || loc[0] == null) {
    return false;
  }

  return loc;
};

/***/ }),

/***/ "./src/scripts/views/C_F_btn_views.js":
/*!********************************************!*\
  !*** ./src/scripts/views/C_F_btn_views.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleCelcFaren": () => (/* binding */ toggleCelcFaren)
/* harmony export */ });
//checks the current status of the DOM's measurement button. If toggle is true it changes C - F;
//if it is false it returns the current value of the button. C or F;
var toggleCelcFaren = function toggleCelcFaren(toggle) {
  var celc = $('#C-F-btn').hasClass('C');
  var far = $('#C-F-btn').hasClass('F');
  var btn = $('#C-F-btn');

  if (!toggle) {
    if (celc) return 'C';
    if (far) return 'F';
  } //if toggle is true, C and F are toggled below and the appropriate value is returned.


  btn.toggleClass('C');
  btn.toggleClass('F');
  if (celc) return 'F';
  if (far) return 'C';
};

/***/ }),

/***/ "./src/scripts/views/card_manager.js":
/*!*******************************************!*\
  !*** ./src/scripts/views/card_manager.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeTitle": () => (/* binding */ changeTitle),
/* harmony export */   "createCard": () => (/* binding */ createCard),
/* harmony export */   "createFavoriteCard": () => (/* binding */ createFavoriteCard),
/* harmony export */   "createMainCards": () => (/* binding */ createMainCards),
/* harmony export */   "getInfoCard": () => (/* binding */ getInfoCard)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/scripts/views/dom.js");

var createMainCards = function createMainCards(data, mes, cardArrIndex) {
  var weekday = data.weekday,
      day = data.day,
      month = data.month,
      high_temp = data.high_temp,
      low_temp = data.low_temp,
      pop = data.pop,
      pres = data.pres,
      rh = data.rh,
      wind_spd = data.wind_spd,
      wind_cdir = data.wind_cdir,
      dewpt = data.dewpt,
      vis = data.vis,
      uv = data.uv,
      icon = data.icon,
      description = data.description;
  var template = $('#main-card-template').html(); //MEASUREMENT REPLACEMENT

  var imperial = {
    temp: 'F',
    wind: 'Mph',
    dewpt: 'F',
    vis: 'Mi'
  };
  var metric = {
    temp: 'C',
    wind: 'Ms',
    dewpt: 'C',
    vis: 'Km'
  };

  var replacer = function replacer(mi) {
    template = template.replace(/%TEMPMES%/g, mi.temp);
    template = template.replace(/%WINDMES%/g, mi.wind);
    template = template.replace(/%DEWPOINTMES%/g, mi.dewpt);
    template = template.replace(/%VISMES%/g, mi.vis);
  };

  if (mes === 'C' || mes === 'M' || mes == false) replacer(metric);
  if (mes === 'F' || mes === 'I') replacer(imperial); //

  cardArrIndex <= 4 ? template = template.replace(/%VISABILITYCLASS%/g, 'visable') : template = template.replace(/%VISABILITYCLASS%/g, '');
  template = template.replace(/%DAYOFWEEK%/g, weekday);
  template = template.replace(/%DAY%/g, day);
  template = template.replace(/%MONTH%/g, month);
  template = template.replace(/%HIGH%/g, high_temp);
  template = template.replace(/%LOW%/g, low_temp);
  template = template.replace(/%PRECIP%/g, pop);
  template = template.replace(/%PRESSURE%/g, pres);
  template = template.replace(/%HUMIDITY%/g, rh);
  template = template.replace(/%WIND_SPD%/g, wind_spd);
  template = template.replace(/%WIND_DIR%/g, wind_cdir);
  template = template.replace(/%DEWPOINT%/g, dewpt);
  template = template.replace(/%VISABILITY%/, vis);
  template = template.replace(/%UV%/g, uv);
  template = template.replace(/%ICON%/g, icon);
  template = template.replace(/%DESC%/g, description);
  return template;
};
var getInfoCard = function getInfoCard() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (type == null) return;
  var template = $(_dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.infoSquareTemplate).html(); //accesses the text object using the sidebar list text as a key.

  var text = _dom_js__WEBPACK_IMPORTED_MODULE_0__.domInfoText[type];
  if (type == 'remove') return $(_dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.infoSquare).removeClass('vis');
  $(_dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.infoSquare).addClass('vis');
  template = template.replace(/%INFOSQUARE%/, text);
  return [template];
};
var createFavoriteCard = function createFavoriteCard(fav) {
  var template = $(_dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.favoritesTemplate).html();
  template = fav.map(function (el) {
    return template.replace(/%FAVORITES%/, el);
  });
  return template;
}; //creates cards that append to the dom

var createCard = function createCard(cards, type) {
  $(type).children().remove();
  cards.forEach(function (el) {
    $(type).append(el);
  });
}; //changes text in navbar upon a search request

var changeTitle = function changeTitle(state, city, country) {
  var text = "".concat(city, ", ").concat(state, " - ").concat(country);
  return $(_dom_js__WEBPACK_IMPORTED_MODULE_0__.dom.locationName).text(text);
};

/***/ }),

/***/ "./src/scripts/views/dom.js":
/*!**********************************!*\
  !*** ./src/scripts/views/dom.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearSearchBar": () => (/* binding */ clearSearchBar),
/* harmony export */   "dom": () => (/* binding */ dom),
/* harmony export */   "domInfoText": () => (/* binding */ domInfoText)
/* harmony export */ });
//likely decomissioning
var dom = {
  cfBtn: "#C-F-btn",
  searchBar: "'.search'",
  leftBtn: "#left",
  rightBtn: "#right",
  searchBtn: "#search-btn",
  locationName: "#location-name",
  toggler: ".toggler",
  favoritesBtn: "#favorites-btn",
  favoritesTemplate: "#favorites-template",
  favoritesMenu: "#favorites-menu",
  infoSquare: "#info-square",
  infoSquareTemplate: "#info-square-template",
  mainCardTemplte: "#main-card-template",
  searchForm: "#search-form"
};
var clearSearchBar = function clearSearchBar(ev) {
  return ev = 0;
}; //changing to json

var domInfoText = {
  "humidity-info": "Humidity is a measure of the amount of water vapor in the air. Relative humidity measures the amount of water in the air in relation to the maximum amount of water vapor (moisture). The higher the temperature, the more water vapor the air can hold. Relative humidity is what your morning weather reporter would refer to.",
  "pressure-info": "Atmospheric pressure refers to the weight of the air. High pressure means the air is heavy, and it sinks. Sinking air makes the environment very stable. Under high pressure you can generally expect sunny skies and calm weather. Low pressure is what causes active weather.",
  "dewpoint-info": "The atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form.",
  "visability-info": "Visibility is a measure of the horizontal opacity of the atmosphere at the point of observation and is expressed in terms of the horizontal distance at which a person should be able to see and identify",
  "uv-info": "The UV Index represents the amount of skin-damaging UV radiation reaching the earth's surface at any instant of time. The basic UV Index forecast is given for solar noon \u2014 the sun's highest point in the sky and the time of the highest fluctuation in UV radiation (under clear sky conditions)."
};

/***/ }),

/***/ "./src/scripts/views/manage_storage_view.js":
/*!**************************************************!*\
  !*** ./src/scripts/views/manage_storage_view.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toggleFavoriteStar": () => (/* binding */ toggleFavoriteStar)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/scripts/views/dom.js");

var toggleFavoriteStar = function toggleFavoriteStar(isFaved) {
  if (isFaved == 'faved') return $(_dom__WEBPACK_IMPORTED_MODULE_0__.dom.favoritesBtn).addClass('faved');
  if (isFaved == 'unfaved') return $(_dom__WEBPACK_IMPORTED_MODULE_0__.dom.favoritesBtn).removeClass('faved');
  return $(_dom__WEBPACK_IMPORTED_MODULE_0__.dom.favoritesBtn).toggleClass('faved');
};

/***/ }),

/***/ "./src/scripts/views/side_arrows.js":
/*!******************************************!*\
  !*** ./src/scripts/views/side_arrows.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "changeArrows": () => (/* binding */ changeArrows)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var changeArrows = function changeArrows(dir) {
  //!!!!NOTE:$()Jquery not working with the below command, look into why
  var cards = $("#container").children(); //spread used to convert NodeList into an Array;

  cards = _toConsumableArray(cards);

  var cardVisabilityToggle = function cardVisabilityToggle() {
    cards.map(function (node, index) {
      if (index < 5) return node.classList.add("visable");
      if (index >= 5) return node.classList.remove("visable");
    });
  };

  if (dir == "right") {
    cards.push(cards[0]);
    cards.shift();
    cardVisabilityToggle();
  }

  if (dir == "left") {
    cards.unshift(cards[cards.length - 1]);
    cards.pop();
    cardVisabilityToggle();
  }

  return cards;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/C_F_btn.scss":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/C_F_btn.scss ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! .././img/normal.jpg */ "./src/img/normal.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n  overflow: hidden;\n  width: 100vw;\n  font-family: Arial, Helvetica, sans-serif;\n  color: ivory;\n}\n\n.flex-it {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  flex-wrap: wrap;\n}\n\n@keyframes scrolling {\n  0% {\n    transform: translateX(0px);\n  }\n  50% {\n    transform: translateX(-300px);\n  }\n  100% {\n    transform: translateX(0px);\n  }\n}\n.background {\n  z-index: -1000;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.background::before {\n  content: \"\";\n  position: absolute;\n  background-position-y: center;\n  box-sizing: content-box;\n  background-size: cover;\n  width: 200%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  animation-name: scrolling;\n  animation-duration: 60s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\n.weather-icon {\n  animation-name: weather-icon;\n  animation-duration: 5s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\nnav.navbar section .menu li #C-F-btn {\n  height: 5vh;\n  width: 3rem;\n  border: none;\n  color: ivory;\n  background: rgba(50, 100, 150, 0.8);\n  border-radius: 30%;\n  margin: auto 5%;\n}\nnav.navbar section .menu li #C-F-btn:hover {\n  opacity: 0.7;\n}\nnav.navbar section .menu li .C .c-unit,\nnav.navbar section .menu li .F .f-unit {\n  border: 2px solid white;\n  display: none;\n  height: inherit;\n  width: inherit;\n  border-radius: inherit;\n  position: justify;\n  z-index: 1000;\n  transition: all 0.5s ease;\n}\nnav.navbar section .menu li .c-unit,\nnav.navbar section .menu li .f-unit {\n  font-size: 2rem;\n  display: none;\n}\nnav.navbar section .menu li button.C .c-unit {\n  display: inherit;\n  background: cyan;\n}\nnav.navbar section .menu li button.F .f-unit {\n  display: inherit;\n  background: crimson;\n}\n\n@media (max-width: 768px) {\n  .navbar section .menu li #C-F-btn {\n    margin: 0px auto 0px 3%;\n  }\n\n  .navbar section .menu {\n    width: 100vw;\n  }\n\n  .navbar section .menu li#learning-info ul li {\n    width: 100vw;\n    font-size: 1.25rem;\n    margin-left: 3%;\n  }\n}", "",{"version":3,"sources":["webpack://./src/sass/main.scss","webpack://./src/sass/C_F_btn.scss"],"names":[],"mappings":"AAcA;EACI,sBAAA;EACA,SAAA;EACA,UAAA;ACbJ;;ADgBA;EACI,aAAA;EACA,gBAAA;EACA,YAAA;EACA,yCAxBS;EAyBT,YAhBiB;ACGrB;;ADkBA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;ACfJ;;ADoBA;EAEI;IACI,0BAAA;EClBN;EDqBE;IACI,6BAAA;ECnBN;EDsBE;IACI,0BAAA;ECpBN;AACF;ADuBA;EACI,cAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;ACrBJ;;ADwBA;EACI,WAAA;EACA,kBAAA;EACA,6BAAA;EACA,uBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,yDAAA;EACA,yBAAA;EACA,uBAAA;EACA,mCAAA;EACA,sCAAA;ACrBJ;;ADyBA;EACI,4BAAA;EACA,sBAAA;EACA,mCAAA;EACA,sCAAA;ACtBJ;;AA1DE;EACE,WAAA;EACA,WAAA;EACA,YAAA;EACA,YDCiB;ECAjB,mCDFc;ECGd,kBAAA;EACA,eAAA;AA6DJ;AA3DE;EACE,YAAA;AA6DJ;AAzDE;;EAEE,uBAAA;EACA,aAAA;EACA,eAAA;EACA,cAAA;EACA,sBAAA;EACA,iBAAA;EACA,aAAA;EACA,yBAAA;AA2DJ;AAzDE;;EAEE,eD1Bc;EC2Bd,aAAA;AA2DJ;AAzDE;EACE,gBAAA;EACA,gBAAA;AA2DJ;AAzDE;EACE,gBAAA;EACA,mBAAA;AA2DJ;;AAvDA;EACE;IACE,uBAAA;EA0DF;;EAvDA;IACE,YAAA;EA0DF;;EAvDA;IACE,YD1CwB;IC2CxB,kBDnDY;ICoDZ,eAAA;EA0DF;AACF","sourcesContent":["$font-stack: Arial,\nHelvetica,\nsans-serif;\n$font-size-small: 0.75rem;\n$font-size-mid: 1.25rem;\n$font-size-large: 2rem;\n$main-color: rgba(0, 0, 0, 0.8);\n$secondary-color: rgba(50, 100, 150, 0.8);\n$third-color: aquamarine;\n$font-color-primary: ivory;\n$normal-padding: 5px;\n$sidebar-menu-width: 20vw;\n$sidebar-menu-width-mobile: 100vw;\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    overflow: hidden;\n    width: 100vw;\n    font-family: $font-stack;\n    color: $font-color-primary;\n}\n\n//Utilities\n\n.flex-it {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    flex-wrap: wrap;\n}\n\n\n//For animated background\n@keyframes scrolling {\n\n    0% {\n        transform: translateX(0px);\n    }\n\n    50% {\n        transform: translateX(-300px);\n    }\n\n    100% {\n        transform: translateX(0px);\n    }\n}\n\n.background {\n    z-index: -1000;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n\n.background::before {\n    content: '';\n    position: absolute;\n    background-position-y: center;\n    box-sizing: content-box;\n    background-size: cover;\n    width: 200%;\n    height: 100%;\n    background-image: url('.././img/normal.jpg');\n    animation-name: scrolling;\n    animation-duration: 60s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n//For the animation of the weather icons in the cards\n.weather-icon {\n    animation-name: weather-icon;\n    animation-duration: 5s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n","@use \"main\";\r\n\r\n//Sidebar C-F Button\r\nnav.navbar section .menu li {\r\n  #C-F-btn {\r\n    height: 5vh;\r\n    width: 3rem;\r\n    border: none;\r\n    color: main.$font-color-primary;\r\n    background: main.$secondary-color;\r\n    border-radius: 30%;\r\n    margin: auto 5%;\r\n  }\r\n  #C-F-btn:hover {\r\n    opacity: 0.7;\r\n  }\r\n  //Toggles display for cel and far button to control imperial vs metric measurement\r\n  //Upon click the javascript with change the class of #C-F-btn to C or F then the CSS takes effect\r\n  .C .c-unit,\r\n  .F .f-unit {\r\n    border: 2px solid white;\r\n    display: none;\r\n    height: inherit;\r\n    width: inherit;\r\n    border-radius: inherit;\r\n    position: justify;\r\n    z-index: 1000;\r\n    transition: all 0.5s ease;\r\n  }\r\n  .c-unit,\r\n  .f-unit {\r\n    font-size: main.$font-size-large;\r\n    display: none;\r\n  }\r\n  button.C .c-unit {\r\n    display: inherit;\r\n    background: cyan;\r\n  }\r\n  button.F .f-unit {\r\n    display: inherit;\r\n    background: crimson;\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  .navbar section .menu li #C-F-btn {\r\n    margin: 0px auto 0px 3%;\r\n  }\r\n\r\n  .navbar section .menu {\r\n    width: 100vw;\r\n  }\r\n\r\n  .navbar section .menu li#learning-info ul li {\r\n    width: main.$sidebar-menu-width-mobile;\r\n    font-size: main.$font-size-mid;\r\n    margin-left: 3%;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/cards_arrows.scss":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/cards_arrows.scss ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! .././img/normal.jpg */ "./src/img/normal.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n  overflow: hidden;\n  width: 100vw;\n  font-family: Arial, Helvetica, sans-serif;\n  color: ivory;\n}\n\n.flex-it {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  flex-wrap: wrap;\n}\n\n@keyframes scrolling {\n  0% {\n    transform: translateX(0px);\n  }\n  50% {\n    transform: translateX(-300px);\n  }\n  100% {\n    transform: translateX(0px);\n  }\n}\n.background {\n  z-index: -1000;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.background::before {\n  content: \"\";\n  position: absolute;\n  background-position-y: center;\n  box-sizing: content-box;\n  background-size: cover;\n  width: 200%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  animation-name: scrolling;\n  animation-duration: 60s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\n.weather-icon {\n  animation-name: weather-icon;\n  animation-duration: 5s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\n#left-right-btn button {\n  border: transparent;\n  background: transparent;\n  z-index: 100;\n}\n#left-right-btn button:hover {\n  opacity: 0.8;\n}\n#left-right-btn button#left {\n  position: absolute;\n  left: 0;\n  top: 45%;\n  height: 10%;\n}\n#left-right-btn button#right {\n  position: absolute;\n  right: 0;\n  top: 45%;\n  height: 10%;\n}\n\n@media (max-width: 768px) {\n  #left-right-btn {\n    display: none;\n  }\n}", "",{"version":3,"sources":["webpack://./src/sass/main.scss","webpack://./src/sass/cards_arrows.scss"],"names":[],"mappings":"AAcA;EACI,sBAAA;EACA,SAAA;EACA,UAAA;ACbJ;;ADgBA;EACI,aAAA;EACA,gBAAA;EACA,YAAA;EACA,yCAxBS;EAyBT,YAhBiB;ACGrB;;ADkBA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;ACfJ;;ADoBA;EAEI;IACI,0BAAA;EClBN;EDqBE;IACI,6BAAA;ECnBN;EDsBE;IACI,0BAAA;ECpBN;AACF;ADuBA;EACI,cAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;ACrBJ;;ADwBA;EACI,WAAA;EACA,kBAAA;EACA,6BAAA;EACA,uBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,yDAAA;EACA,yBAAA;EACA,uBAAA;EACA,mCAAA;EACA,sCAAA;ACrBJ;;ADyBA;EACI,4BAAA;EACA,sBAAA;EACA,mCAAA;EACA,sCAAA;ACtBJ;;AA3DE;EACE,mBAAA;EACA,uBAAA;EACA,YAAA;AA8DJ;AA3DE;EACE,YAAA;AA6DJ;AA1DE;EACE,kBAAA;EACA,OAAA;EACA,QAAA;EACA,WAAA;AA4DJ;AAzDE;EACE,kBAAA;EACA,QAAA;EACA,QAAA;EACA,WAAA;AA2DJ;;AAvDA;EACE;IACE,aAAA;EA0DF;AACF","sourcesContent":["$font-stack: Arial,\nHelvetica,\nsans-serif;\n$font-size-small: 0.75rem;\n$font-size-mid: 1.25rem;\n$font-size-large: 2rem;\n$main-color: rgba(0, 0, 0, 0.8);\n$secondary-color: rgba(50, 100, 150, 0.8);\n$third-color: aquamarine;\n$font-color-primary: ivory;\n$normal-padding: 5px;\n$sidebar-menu-width: 20vw;\n$sidebar-menu-width-mobile: 100vw;\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    overflow: hidden;\n    width: 100vw;\n    font-family: $font-stack;\n    color: $font-color-primary;\n}\n\n//Utilities\n\n.flex-it {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    flex-wrap: wrap;\n}\n\n\n//For animated background\n@keyframes scrolling {\n\n    0% {\n        transform: translateX(0px);\n    }\n\n    50% {\n        transform: translateX(-300px);\n    }\n\n    100% {\n        transform: translateX(0px);\n    }\n}\n\n.background {\n    z-index: -1000;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n\n.background::before {\n    content: '';\n    position: absolute;\n    background-position-y: center;\n    box-sizing: content-box;\n    background-size: cover;\n    width: 200%;\n    height: 100%;\n    background-image: url('.././img/normal.jpg');\n    animation-name: scrolling;\n    animation-duration: 60s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n//For the animation of the weather icons in the cards\n.weather-icon {\n    animation-name: weather-icon;\n    animation-duration: 5s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n","@use \"main\";\n//Below are the arrow buttons for desktop\n#left-right-btn {\n  button {\n    border: transparent;\n    background: transparent;\n    z-index: 100;\n  }\n\n  button:hover {\n    opacity: 0.8;\n  }\n\n  button#left {\n    position: absolute;\n    left: 0;\n    top: 45%;\n    height: 10%;\n  }\n\n  button#right {\n    position: absolute;\n    right: 0;\n    top: 45%;\n    height: 10%;\n  }\n}\n\n@media (max-width: 768px) {\n  #left-right-btn {\n    display: none;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/main.scss":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/main.scss ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! .././img/normal.jpg */ "./src/img/normal.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n  overflow: hidden;\n  width: 100vw;\n  font-family: Arial, Helvetica, sans-serif;\n  color: ivory;\n}\n\n.flex-it {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  flex-wrap: wrap;\n}\n\n@keyframes scrolling {\n  0% {\n    transform: translateX(0px);\n  }\n  50% {\n    transform: translateX(-300px);\n  }\n  100% {\n    transform: translateX(0px);\n  }\n}\n.background {\n  z-index: -1000;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.background::before {\n  content: \"\";\n  position: absolute;\n  background-position-y: center;\n  box-sizing: content-box;\n  background-size: cover;\n  width: 200%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  animation-name: scrolling;\n  animation-duration: 60s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\n.weather-icon {\n  animation-name: weather-icon;\n  animation-duration: 5s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}", "",{"version":3,"sources":["webpack://./src/sass/main.scss"],"names":[],"mappings":"AAcA;EACI,sBAAA;EACA,SAAA;EACA,UAAA;AAbJ;;AAgBA;EACI,aAAA;EACA,gBAAA;EACA,YAAA;EACA,yCAxBS;EAyBT,YAhBiB;AAGrB;;AAkBA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;AAfJ;;AAoBA;EAEI;IACI,0BAAA;EAlBN;EAqBE;IACI,6BAAA;EAnBN;EAsBE;IACI,0BAAA;EApBN;AACF;AAuBA;EACI,cAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;AArBJ;;AAwBA;EACI,WAAA;EACA,kBAAA;EACA,6BAAA;EACA,uBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,yDAAA;EACA,yBAAA;EACA,uBAAA;EACA,mCAAA;EACA,sCAAA;AArBJ;;AAyBA;EACI,4BAAA;EACA,sBAAA;EACA,mCAAA;EACA,sCAAA;AAtBJ","sourcesContent":["$font-stack: Arial,\nHelvetica,\nsans-serif;\n$font-size-small: 0.75rem;\n$font-size-mid: 1.25rem;\n$font-size-large: 2rem;\n$main-color: rgba(0, 0, 0, 0.8);\n$secondary-color: rgba(50, 100, 150, 0.8);\n$third-color: aquamarine;\n$font-color-primary: ivory;\n$normal-padding: 5px;\n$sidebar-menu-width: 20vw;\n$sidebar-menu-width-mobile: 100vw;\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    overflow: hidden;\n    width: 100vw;\n    font-family: $font-stack;\n    color: $font-color-primary;\n}\n\n//Utilities\n\n.flex-it {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    flex-wrap: wrap;\n}\n\n\n//For animated background\n@keyframes scrolling {\n\n    0% {\n        transform: translateX(0px);\n    }\n\n    50% {\n        transform: translateX(-300px);\n    }\n\n    100% {\n        transform: translateX(0px);\n    }\n}\n\n.background {\n    z-index: -1000;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n\n.background::before {\n    content: '';\n    position: absolute;\n    background-position-y: center;\n    box-sizing: content-box;\n    background-size: cover;\n    width: 200%;\n    height: 100%;\n    background-image: url('.././img/normal.jpg');\n    animation-name: scrolling;\n    animation-duration: 60s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n//For the animation of the weather icons in the cards\n.weather-icon {\n    animation-name: weather-icon;\n    animation-duration: 5s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/navbar.scss":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/navbar.scss ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! .././img/normal.jpg */ "./src/img/normal.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n  overflow: hidden;\n  width: 100vw;\n  font-family: Arial, Helvetica, sans-serif;\n  color: ivory;\n}\n\n.flex-it {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  flex-wrap: wrap;\n}\n\n@keyframes scrolling {\n  0% {\n    transform: translateX(0px);\n  }\n  50% {\n    transform: translateX(-300px);\n  }\n  100% {\n    transform: translateX(0px);\n  }\n}\n.background {\n  z-index: -1000;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.background::before {\n  content: \"\";\n  position: absolute;\n  background-position-y: center;\n  box-sizing: content-box;\n  background-size: cover;\n  width: 200%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  animation-name: scrolling;\n  animation-duration: 60s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\n.weather-icon {\n  animation-name: weather-icon;\n  animation-duration: 5s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\nheader .navbar {\n  display: flex;\n  flex-direction: row;\n  align-content: center;\n  justify-content: space-between;\n  position: fixed;\n  height: 7vh;\n  width: 100%;\n  z-index: 10;\n  background: rgba(0, 0, 0, 0.8);\n  border-bottom: 2px solid rgba(50, 100, 150, 0.8);\n  overflow: none;\n}\nheader .navbar section#search-bar {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  width: 100vw;\n  margin: 0 3vw;\n}\nheader .navbar section#search-bar h2 {\n  color: ivory;\n  padding: 5px;\n}\nheader .navbar section#search-bar form#search-form {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\nheader .navbar section#search-bar form#search-form * {\n  margin: 2%;\n}\nheader .navbar section#search-bar form#search-form .search-btn {\n  border: none;\n  background: transparent;\n  color: white;\n  font-size: 1.25rem;\n}\nheader .navbar section#search-bar form#search-form .search-btn:hover {\n  opacity: 0.9;\n  transform: scale(1.2);\n}\nheader .navbar section#search-bar form#search-form input {\n  text-align: center;\n  border-radius: 5px;\n  padding: 5px;\n}\nheader .navbar section#search-bar form#search-form input:hover {\n  text-align: center;\n  border-radius: 10%;\n  opacity: 0.95;\n}\nheader .navbar section#search-bar form#search-form #favorites-btn {\n  border: none;\n  background: transparent;\n}\nheader .navbar section#search-bar form#search-form #favorites-btn i {\n  animation: star-spin 5s ease infinite;\n  color: white;\n  font-size: 1.25rem;\n}\nheader .navbar section#search-bar form#search-form #favorites-btn i:hover {\n  color: gold;\n}\nheader .navbar section#search-bar form#search-form #favorites-btn.faved i {\n  color: gold;\n  animation: star-spin 5s ease infinite;\n}\n\n@keyframes star-spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.navbar section .hamburger {\n  position: absolute;\n  top: 20px;\n  left: 10px;\n  width: 20px;\n  background: ivory;\n  height: 3px;\n  z-index: 100;\n  transition: all 0.8s ease;\n}\n.navbar section .hamburger::after {\n  content: \"\";\n  position: absolute;\n  top: -8px;\n  width: 20px;\n  background: ivory;\n  height: 3px;\n  z-index: 100;\n  transition: all 0.8s ease;\n}\n.navbar section .hamburger::before {\n  content: \"\";\n  position: absolute;\n  top: 8px;\n  width: 20px;\n  background: ivory;\n  height: 3px;\n  z-index: 100;\n  transition: all 0.8s ease;\n}\n.navbar section .toggler {\n  opacity: 0;\n  position: absolute;\n  z-index: 10000;\n  height: 50px;\n  width: 30px;\n  top: 0px;\n  left: 5px;\n}\n.navbar section .menu {\n  opacity: 0;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100vh;\n  width: 30vw;\n  padding: 3vh 5%;\n  background: rgba(0, 0, 0, 0.8);\n  border-right: 2px solid rgba(50, 100, 150, 0.8);\n  transform: translateX(-1000px);\n  transition: all 0.5s ease;\n}\n.navbar section .menu li {\n  list-style: none;\n  border-bottom: 1px dotted aquamarine;\n  padding: 5px;\n  display: flex;\n  vertical-align: middle;\n  justify-content: center;\n  align-items: center;\n  text-align: justify;\n}\n.navbar section .menu li#learning-info ul li {\n  text-align: justify;\n  display: flex;\n  justify-content: start;\n  font-size: 0.75rem;\n  width: 20vw;\n  padding: 5px;\n  border: none;\n  margin: 2px;\n}\n.navbar section .menu li#learning-info ul li p {\n  padding: 2%;\n}\n.navbar section .menu li#learning-info ul li:hover {\n  color: aquamarine;\n  opacity: 0.8;\n  cursor: pointer;\n}\n.navbar section .menu li#learning-info ul li .fa-chevron-right {\n  justify-self: end;\n}\n.navbar section .menu li ul#favorites-menu li {\n  font-size: 0.75rem;\n  width: 20vw;\n  border-bottom: none;\n  cursor: pointer;\n}\n.navbar section .menu li ul#favorites-menu li p {\n  color: ivory;\n}\n.navbar section .menu li ul#favorites-menu li p:hover {\n  opacity: 0.7;\n  color: aquamarine;\n}\n.navbar section .menu li ul#favorites-menu li i {\n  color: aquamarine;\n  margin-left: auto;\n}\n.navbar section .menu li ul#favorites-menu li i:hover {\n  color: red;\n  transform: scale(1.3);\n}\n\n.navbar section .toggler:checked + .hamburger::before,\n.navbar section .toggler:checked + .hamburger::after {\n  top: 0;\n  transform: rotate(90deg);\n}\n\n.navbar section .toggler:checked + .hamburger {\n  transform: rotate(225deg);\n}\n\n.navbar section .toggler:checked ~ .menu {\n  opacity: 1;\n  z-index: 10;\n  transform: translateX(0px);\n  transition: all 0.5s ease;\n}\n\n#info-square {\n  display: block;\n  position: absolute;\n  width: 40%;\n  height: 40%;\n  top: 30%;\n  left: 30%;\n  z-index: 1000;\n  background: rgba(0, 0, 0, 0.8);\n  padding: 4%;\n  font-size: 0.75rem;\n  opacity: 1;\n  transform: scale(0);\n  transition: all 0.6s ease-in-out;\n}\n\n#info-square.vis {\n  display: block;\n  opacity: 1;\n  transform: scale(1);\n  border-radius: 20%;\n  transition: all 0.6s ease-in-out;\n}\n\n@media (max-width: 768px) {\n  body header nav.navbar {\n    padding: 10% 0;\n    height: 10vh;\n  }\n  body header nav.navbar section#search-bar {\n    display: flex;\n    flex-direction: column;\n    align-content: center;\n    justify-content: center;\n  }\n  body header nav.navbar section#search-bar form#search-form {\n    display: flex;\n    flex-direction: row;\n    align-content: center;\n  }\n  body header nav.navbar section#search-bar form#search-form input.search {\n    height: 5vh;\n  }\n  body header nav.navbar section#search-bar form#search-form button {\n    margin: 0 1%;\n  }\n  body header nav.navbar section#search-bar h2#location-name {\n    font-size: 1.25rem;\n  }\n  body header nav.navbar .navbar section .menu li#learning-info ul li {\n    width: 100vw;\n    font-size: 1.25rem;\n    margin-left: 3%;\n    width: 100%;\n  }\n  body header nav.navbar #info-square {\n    top: 0;\n    left: 50%;\n    width: 50%;\n    height: 35%;\n    padding: 5%;\n  }\n  body header nav.navbar .navbar section .menu li ul#favorites-menu {\n    margin: 5vh auto 1vh 3vw;\n  }\n  body header nav.navbar .navbar section .menu li ul#favorites-menu li {\n    width: 100%;\n  }\n  body header nav.navbar .navbar section .menu li ul#favorites-menu li p {\n    font-size: 1.25rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/sass/main.scss","webpack://./src/sass/navbar.scss"],"names":[],"mappings":"AAcA;EACI,sBAAA;EACA,SAAA;EACA,UAAA;ACbJ;;ADgBA;EACI,aAAA;EACA,gBAAA;EACA,YAAA;EACA,yCAxBS;EAyBT,YAhBiB;ACGrB;;ADkBA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;ACfJ;;ADoBA;EAEI;IACI,0BAAA;EClBN;EDqBE;IACI,6BAAA;ECnBN;EDsBE;IACI,0BAAA;ECpBN;AACF;ADuBA;EACI,cAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;ACrBJ;;ADwBA;EACI,WAAA;EACA,kBAAA;EACA,6BAAA;EACA,uBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,yDAAA;EACA,yBAAA;EACA,uBAAA;EACA,mCAAA;EACA,sCAAA;ACrBJ;;ADyBA;EACI,4BAAA;EACA,sBAAA;EACA,mCAAA;EACA,sCAAA;ACtBJ;;AA3DA;EACE,aAAA;EACA,mBAAA;EACA,qBAAA;EACA,8BAAA;EACA,eAAA;EACA,WAAA;EACA,WAAA;EACA,WAAA;EACA,8BDNW;ECOX,gDAAA;EACA,cAAA;AA8DF;AA7DE;EACE,aAAA;EACA,mBAAA;EACA,8BAAA;EACA,mBAAA;EACA,YAAA;EACA,aAAA;AA+DJ;AA9DI;EACE,YDde;ECef,YDdW;AC8EjB;AA9DI;EACE,aAAA;EACA,uBAAA;EACA,mBAAA;AAgEN;AA/DM;EACE,UAAA;AAiER;AA/DM;EACE,YAAA;EACA,uBAAA;EACA,YAAA;EACA,kBDjCQ;ACkGhB;AA/DM;EACE,YAAA;EACA,qBAAA;AAiER;AA/DM;EACE,kBAAA;EACA,kBAAA;EACA,YDpCS;ACqGjB;AA/DM;EACE,kBAAA;EACA,kBAAA;EACA,aAAA;AAiER;AA/DM;EACE,YAAA;EACA,uBAAA;AAiER;AA/DQ;EACE,qCAAA;EACA,YAAA;EACA,kBDxDM;ACyHhB;AA9DQ;EACE,WAAA;AAgEV;AA5DM;EACE,WAAA;EACA,qCAAA;AA8DR;;AAxDA;EACE;IACE,uBAAA;EA2DF;EAxDA;IACE,yBAAA;EA0DF;AACF;AApDE;EACE,kBAAA;EACA,SAAA;EACA,UAAA;EACA,WAAA;EACA,iBDrFiB;ECsFjB,WAAA;EACA,YAAA;EACA,yBAAA;AAsDJ;AAnDE;EACE,WAAA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,iBDhGiB;ECiGjB,WAAA;EACA,YAAA;EACA,yBAAA;AAqDJ;AAlDE;EACE,WAAA;EACA,kBAAA;EACA,QAAA;EACA,WAAA;EACA,iBD3GiB;EC4GjB,WAAA;EACA,YAAA;EACA,yBAAA;AAoDJ;AAhDE;EACE,UAAA;EACA,kBAAA;EACA,cAAA;EACA,YAAA;EACA,WAAA;EACA,QAAA;EACA,SAAA;AAkDJ;AA9CE;EACE,UAAA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;EACA,aAAA;EACA,WAAA;EACA,eAAA;EACA,8BDxIS;ECyIT,+CAAA;EACA,8BAAA;EACA,yBAAA;AAgDJ;AA3CI;EACE,gBAAA;EACA,oCAAA;EACA,YD/IW;ECgJX,aAAA;EACA,sBAAA;EACA,uBAAA;EACA,mBAAA;EACA,mBAAA;AA6CN;AA1CI;EACE,mBAAA;EACA,aAAA;EACA,sBAAA;EACA,kBDlKY;ECmKZ,WD3Je;EC4Jf,YD7JW;EC8JX,YAAA;EACA,WAAA;AA4CN;AA1CI;EACE,WAAA;AA4CN;AA1CI;EACE,iBAAA;EACA,YAAA;EACA,eAAA;AA4CN;AA1CI;EACE,iBAAA;AA4CN;AA1CI;EACE,kBDpLY;ECqLZ,WD7Ke;EC8Kf,mBAAA;EACA,eAAA;AA4CN;AA1CI;EACE,YDpLe;ACgOrB;AA1CI;EACE,YAAA;EACA,iBDzLQ;ACqOd;AA1CI;EACE,iBD5LQ;EC6LR,iBAAA;AA4CN;AA1CI;EACE,UAAA;EACA,qBAAA;AA4CN;;AArCA;;EAEE,MAAA;EACA,wBAAA;AAwCF;;AArCA;EACE,yBAAA;AAwCF;;AArCA;EACE,UAAA;EACA,WAAA;EACA,0BAAA;EACA,yBAAA;AAwCF;;AAnCA;EACE,cAAA;EACA,kBAAA;EACA,UAAA;EACA,WAAA;EACA,QAAA;EACA,SAAA;EACA,aAAA;EACA,8BDrOW;ECsOX,WAAA;EACA,kBD1OgB;EC2OhB,UAAA;EACA,mBAAA;EACA,gCAAA;AAsCF;;AAnCA;EACE,cAAA;EACA,UAAA;EACA,mBAAA;EACA,kBAAA;EACA,gCAAA;AAsCF;;AAlCA;EACE;IACE,cAAA;IACA,YAAA;EAqCF;EApCE;IACE,aAAA;IACA,sBAAA;IACA,qBAAA;IACA,uBAAA;EAsCJ;EArCI;IACE,aAAA;IACA,mBAAA;IACA,qBAAA;EAuCN;EAtCM;IACE,WAAA;EAwCR;EAtCM;IACE,YAAA;EAwCR;EArCI;IACE,kBD7QQ;ECoTd;EAnCE;IACE,YD1QsB;IC2QtB,kBDnRU;ICoRV,eAAA;IACA,WAAA;EAqCJ;EAlCE;IACE,MAAA;IACA,SAAA;IACA,UAAA;IACA,WAAA;IACA,WAAA;EAoCJ;EAjCE;IACE,wBAAA;EAmCJ;EAhCE;IACE,WAAA;EAkCJ;EA/BE;IACE,kBDzSU;EC0Ud;AACF","sourcesContent":["$font-stack: Arial,\nHelvetica,\nsans-serif;\n$font-size-small: 0.75rem;\n$font-size-mid: 1.25rem;\n$font-size-large: 2rem;\n$main-color: rgba(0, 0, 0, 0.8);\n$secondary-color: rgba(50, 100, 150, 0.8);\n$third-color: aquamarine;\n$font-color-primary: ivory;\n$normal-padding: 5px;\n$sidebar-menu-width: 20vw;\n$sidebar-menu-width-mobile: 100vw;\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    overflow: hidden;\n    width: 100vw;\n    font-family: $font-stack;\n    color: $font-color-primary;\n}\n\n//Utilities\n\n.flex-it {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    flex-wrap: wrap;\n}\n\n\n//For animated background\n@keyframes scrolling {\n\n    0% {\n        transform: translateX(0px);\n    }\n\n    50% {\n        transform: translateX(-300px);\n    }\n\n    100% {\n        transform: translateX(0px);\n    }\n}\n\n.background {\n    z-index: -1000;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n\n.background::before {\n    content: '';\n    position: absolute;\n    background-position-y: center;\n    box-sizing: content-box;\n    background-size: cover;\n    width: 200%;\n    height: 100%;\n    background-image: url('.././img/normal.jpg');\n    animation-name: scrolling;\n    animation-duration: 60s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n//For the animation of the weather icons in the cards\n.weather-icon {\n    animation-name: weather-icon;\n    animation-duration: 5s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n","@use \"main\";\r\n\r\n//Navbar Styles\r\nheader .navbar {\r\n  display: flex;\r\n  flex-direction: row;\r\n  align-content: center;\r\n  justify-content: space-between;\r\n  position: fixed;\r\n  height: 7vh;\r\n  width: 100%;\r\n  z-index: 10;\r\n  background: main.$main-color;\r\n  border-bottom: 2px solid main.$secondary-color;\r\n  overflow: none;\r\n  section#search-bar {\r\n    display: flex;\r\n    flex-direction: row;\r\n    justify-content: space-between;\r\n    align-items: center;\r\n    width: 100vw;\r\n    margin: 0 3vw;\r\n    h2 {\r\n      color: main.$font-color-primary;\r\n      padding: main.$normal-padding;\r\n    }\r\n    form#search-form {\r\n      display: flex;\r\n      justify-content: center;\r\n      align-items: center;\r\n      * {\r\n        margin: 2%;\r\n      }\r\n      .search-btn {\r\n        border: none;\r\n        background: transparent;\r\n        color: white;\r\n        font-size: main.$font-size-mid;\r\n      }\r\n      .search-btn:hover {\r\n        opacity: 0.9;\r\n        transform: scale(1.2);\r\n      }\r\n      input {\r\n        text-align: center;\r\n        border-radius: 5px;\r\n        padding: main.$normal-padding;\r\n      }\r\n      input:hover {\r\n        text-align: center;\r\n        border-radius: 10%;\r\n        opacity: 0.95;\r\n      }\r\n      #favorites-btn {\r\n        border: none;\r\n        background: transparent;\r\n\r\n        i {\r\n          animation: star-spin 5s ease infinite;\r\n          color: white;\r\n          font-size: main.$font-size-mid;\r\n        }\r\n\r\n        i:hover {\r\n          color: gold;\r\n        }\r\n      }\r\n\r\n      #favorites-btn.faved i {\r\n        color: gold;\r\n        animation: star-spin 5s ease infinite;\r\n      }\r\n    }\r\n  }\r\n}\r\n\r\n@keyframes star-spin {\r\n  0% {\r\n    transform: rotate(0deg);\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n//Hamburger Menu Animation and Positioning\r\n\r\n.navbar section {\r\n  .hamburger {\r\n    position: absolute;\r\n    top: 20px;\r\n    left: 10px;\r\n    width: 20px;\r\n    background: main.$font-color-primary;\r\n    height: 3px;\r\n    z-index: 100;\r\n    transition: all 0.8s ease;\r\n  }\r\n\r\n  .hamburger::after {\r\n    content: \"\";\r\n    position: absolute;\r\n    top: -8px;\r\n    width: 20px;\r\n    background: main.$font-color-primary;\r\n    height: 3px;\r\n    z-index: 100;\r\n    transition: all 0.8s ease;\r\n  }\r\n\r\n  .hamburger::before {\r\n    content: \"\";\r\n    position: absolute;\r\n    top: 8px;\r\n    width: 20px;\r\n    background: main.$font-color-primary;\r\n    height: 3px;\r\n    z-index: 100;\r\n    transition: all 0.8s ease;\r\n  }\r\n\r\n  //Create the menu toggler from a checkbox\r\n  .toggler {\r\n    opacity: 0;\r\n    position: absolute;\r\n    z-index: 10000;\r\n    height: 50px;\r\n    width: 30px;\r\n    top: 0px;\r\n    left: 5px;\r\n  }\r\n\r\n  //Sidebar Functionality\r\n  .menu {\r\n    opacity: 0;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    height: 100vh;\r\n    width: 30vw;\r\n    padding: 3vh 5%;\r\n    background: main.$main-color;\r\n    border-right: 2px solid main.$secondary-color;\r\n    transform: translateX(-1000px);\r\n    transition: all 0.5s ease;\r\n  }\r\n\r\n  //Sidebar List Styles\r\n  .menu {\r\n    li {\r\n      list-style: none;\r\n      border-bottom: 1px dotted main.$third-color;\r\n      padding: main.$normal-padding;\r\n      display: flex;\r\n      vertical-align: middle;\r\n      justify-content: center;\r\n      align-items: center;\r\n      text-align: justify;\r\n    }\r\n    //Styles for the information list in the menu\r\n    li#learning-info ul li {\r\n      text-align: justify;\r\n      display: flex;\r\n      justify-content: start;\r\n      font-size: main.$font-size-small;\r\n      width: main.$sidebar-menu-width;\r\n      padding: main.$normal-padding;\r\n      border: none;\r\n      margin: 2px;\r\n    }\r\n    li#learning-info ul li p {\r\n      padding: 2%;\r\n    }\r\n    li#learning-info ul li:hover {\r\n      color: aquamarine;\r\n      opacity: 0.8;\r\n      cursor: pointer;\r\n    }\r\n    li#learning-info ul li .fa-chevron-right {\r\n      justify-self: end;\r\n    }\r\n    li ul#favorites-menu li {\r\n      font-size: main.$font-size-small;\r\n      width: main.$sidebar-menu-width;\r\n      border-bottom: none;\r\n      cursor: pointer;\r\n    }\r\n    li ul#favorites-menu li p {\r\n      color: main.$font-color-primary;\r\n    }\r\n    li ul#favorites-menu li p:hover {\r\n      opacity: 0.7;\r\n      color: main.$third-color;\r\n    }\r\n    li ul#favorites-menu li i {\r\n      color: main.$third-color;\r\n      margin-left: auto;\r\n    }\r\n    li ul#favorites-menu li i:hover {\r\n      color: red;\r\n      transform: scale(1.3);\r\n    }\r\n  }\r\n}\r\n\r\n//Hamburger menu toggler\r\n\r\n.navbar section .toggler:checked + .hamburger::before,\r\n.navbar section .toggler:checked + .hamburger::after {\r\n  top: 0;\r\n  transform: rotate(90deg);\r\n}\r\n\r\n.navbar section .toggler:checked + .hamburger {\r\n  transform: rotate(225deg);\r\n}\r\n\r\n.navbar section .toggler:checked ~ .menu {\r\n  opacity: 1;\r\n  z-index: 10;\r\n  transform: translateX(0px);\r\n  transition: all 0.5s ease;\r\n}\r\n\r\n//Information square in center of screen\r\n\r\n#info-square {\r\n  display: block;\r\n  position: absolute;\r\n  width: 40%;\r\n  height: 40%;\r\n  top: 30%;\r\n  left: 30%;\r\n  z-index: 1000;\r\n  background: main.$main-color;\r\n  padding: 4%;\r\n  font-size: main.$font-size-small;\r\n  opacity: 1;\r\n  transform: scale(0);\r\n  transition: all 0.6s ease-in-out;\r\n}\r\n\r\n#info-square.vis {\r\n  display: block;\r\n  opacity: 1;\r\n  transform: scale(1);\r\n  border-radius: 20%;\r\n  transition: all 0.6s ease-in-out;\r\n}\r\n\r\n//Mobile Config\r\n@media (max-width: 768px) {\r\n  body header nav.navbar {\r\n    padding: 10% 0;\r\n    height: 10vh;\r\n    section#search-bar {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-content: center;\r\n      justify-content: center;\r\n      form#search-form {\r\n        display: flex;\r\n        flex-direction: row;\r\n        align-content: center;\r\n        input.search {\r\n          height: 5vh;\r\n        }\r\n        button {\r\n          margin: 0 1%;\r\n        }\r\n      }\r\n      h2#location-name {\r\n        font-size: main.$font-size-mid;\r\n      }\r\n    }\r\n\r\n    .navbar section .menu li#learning-info ul li {\r\n      width: main.$sidebar-menu-width-mobile;\r\n      font-size: main.$font-size-mid;\r\n      margin-left: 3%;\r\n      width: 100%;\r\n    }\r\n\r\n    #info-square {\r\n      top: 0;\r\n      left: 50%;\r\n      width: 50%;\r\n      height: 35%;\r\n      padding: 5%;\r\n    }\r\n\r\n    .navbar section .menu li ul#favorites-menu {\r\n      margin: 5vh auto 1vh 3vw;\r\n    }\r\n\r\n    .navbar section .menu li ul#favorites-menu li {\r\n      width: 100%;\r\n    }\r\n\r\n    .navbar section .menu li ul#favorites-menu li p {\r\n      font-size: main.$font-size-mid;\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/weather_cards.scss":
/*!******************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/weather_cards.scss ***!
  \******************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! .././img/normal.jpg */ "./src/img/normal.jpg"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  height: 100vh;\n  overflow: hidden;\n  width: 100vw;\n  font-family: Arial, Helvetica, sans-serif;\n  color: ivory;\n}\n\n.flex-it {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  text-align: center;\n  flex-wrap: wrap;\n}\n\n@keyframes scrolling {\n  0% {\n    transform: translateX(0px);\n  }\n  50% {\n    transform: translateX(-300px);\n  }\n  100% {\n    transform: translateX(0px);\n  }\n}\n.background {\n  z-index: -1000;\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.background::before {\n  content: \"\";\n  position: absolute;\n  background-position-y: center;\n  box-sizing: content-box;\n  background-size: cover;\n  width: 200%;\n  height: 100%;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n  animation-name: scrolling;\n  animation-duration: 60s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\n.weather-icon {\n  animation-name: weather-icon;\n  animation-duration: 5s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\n\nli {\n  list-style: none;\n}\n\n@keyframes bob-up-down {\n  0% {\n    transform: translateY(0px);\n  }\n  50% {\n    transform: translateY(2vh);\n  }\n  100% {\n    transform: translateY(0px);\n  }\n}\ni {\n  margin-right: 3px;\n}\n\nmain {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  width: 100vw;\n  height: 100vh;\n}\nmain #container {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: center;\n  flex-wrap: none;\n}\nmain #container .weather-card {\n  border-radius: 10px;\n  background: rgba(0, 0, 0, 0.8);\n  display: none;\n  flex-direction: column;\n  width: 17vw;\n  height: 70vh;\n  font-size: 0.75rem;\n  margin: 0.5%;\n  opacity: 0;\n  transition: all 0.4s ease;\n}\nmain #container .weather-card ul {\n  padding-left: 0;\n  list-style: none;\n  margin: 1vh 0;\n  padding: 10px;\n}\nmain #container .weather-card ul li ul.day {\n  justify-content: center;\n  align-items: center;\n  padding: 5px;\n  flex-direction: column;\n  font-size: 1.25rem;\n}\nmain #container .weather-card ul li.img .weather-icon {\n  animation-name: bob-up-down;\n  animation-duration: 5s;\n  animation-iteration-count: infinite;\n  animation-timing-function: ease-in-out;\n}\nmain #container .weather-card ul li.temp {\n  text-align: center;\n  align-items: center;\n  font-size: 1.25rem;\n}\nmain #container .weather-card ul li.precipitation {\n  text-align: center;\n}\nmain #container .weather-card ul li.precipitation progress {\n  width: 50%;\n}\nmain #container .weather-card ul li.desc {\n  text-align: center;\n  font-size: 1.25rem;\n  border-bottom: 1px rgba(50, 100, 150, 0.8) solid;\n  margin-bottom: 3px;\n}\nmain #container .weather-card .misc li {\n  width: 14vw;\n  text-align: justify;\n  padding: 5%;\n  font-size: 1.25rem;\n  border-bottom: 1px dotted ivory;\n}\nmain #container .weather-card.visable {\n  display: flex;\n  opacity: 1;\n  transition: all 0.4s ease;\n}\n\n@media (max-width: 768px) {\n  body {\n    overflow-y: scroll;\n  }\n\n  main {\n    justify-content: start;\n  }\n  main #container {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: start;\n    padding: 0;\n  }\n  main #container .weather-card {\n    margin: 11vh 0;\n    height: 70vh;\n    width: 80vw;\n    min-height: 575px;\n    flex-direction: column;\n  }\n  main #container .weather-card .misc {\n    display: flex;\n    flex-direction: row;\n    flex-wrap: wrap;\n    align-items: center;\n    justify-content: center;\n  }\n  main #container .weather-card .misc li {\n    height: 5vh;\n    width: 15vw;\n    text-align: center;\n    margin: 10% 4%;\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    font-size: 0.75rem;\n    border: none;\n  }\n  main #container .weather-card .misc li span {\n    margin-top: 5%;\n    width: 200%;\n  }\n  main #container .weather-card .misc li i {\n    font-size: 1.25rem;\n  }\n}", "",{"version":3,"sources":["webpack://./src/sass/main.scss","webpack://./src/sass/weather_cards.scss"],"names":[],"mappings":"AAcA;EACI,sBAAA;EACA,SAAA;EACA,UAAA;ACbJ;;ADgBA;EACI,aAAA;EACA,gBAAA;EACA,YAAA;EACA,yCAxBS;EAyBT,YAhBiB;ACGrB;;ADkBA;EACI,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,kBAAA;EACA,eAAA;ACfJ;;ADoBA;EAEI;IACI,0BAAA;EClBN;EDqBE;IACI,6BAAA;ECnBN;EDsBE;IACI,0BAAA;ECpBN;AACF;ADuBA;EACI,cAAA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,MAAA;EACA,OAAA;ACrBJ;;ADwBA;EACI,WAAA;EACA,kBAAA;EACA,6BAAA;EACA,uBAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,yDAAA;EACA,yBAAA;EACA,uBAAA;EACA,mCAAA;EACA,sCAAA;ACrBJ;;ADyBA;EACI,4BAAA;EACA,sBAAA;EACA,mCAAA;EACA,sCAAA;ACtBJ;;AA5DA;EACE,gBAAA;AA+DF;;AA3DA;EACE;IACE,0BAAA;EA8DF;EA3DA;IACE,0BAAA;EA6DF;EA1DA;IACE,0BAAA;EA4DF;AACF;AAzDA;EACE,iBAAA;AA2DF;;AAvDA;EACE,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,uBAAA;EACA,YAAA;EACA,aAAA;AA0DF;AAzDE;EACE,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,uBAAA;EACA,eAAA;AA2DJ;AAzDI;EACE,mBAAA;EACA,8BDpCO;ECqCP,aAAA;EACA,sBAAA;EACA,WAAA;EACA,YAAA;EACA,kBD5CY;EC6CZ,YAAA;EACA,UAAA;EACA,yBAAA;AA2DN;AAzDM;EACE,eAAA;EACA,gBAAA;EACA,aAAA;EACA,aAAA;AA2DR;AAzDQ;EACE,uBAAA;EACA,mBAAA;EACA,YAAA;EACA,sBAAA;EACA,kBD3DM;ACsHhB;AAvDU;EACE,2BAAA;EACA,sBAAA;EACA,mCAAA;EACA,sCAAA;AAyDZ;AApDQ;EACE,kBAAA;EACA,mBAAA;EACA,kBD3EM;ACiIhB;AAlDQ;EACE,kBAAA;AAoDV;AAlDU;EACE,UAAA;AAoDZ;AA/CQ;EACE,kBAAA;EACA,kBD1FM;EC2FN,gDAAA;EACA,kBAAA;AAiDV;AA3CQ;EACE,WAAA;EACA,mBAAA;EACA,WAAA;EACA,kBDtGM;ECuGN,+BAAA;AA6CV;AAxCI;EACE,aAAA;EACA,UAAA;EACA,yBAAA;AA0CN;;AArCA;EACE;IACE,kBAAA;EAwCF;;EArCA;IACE,sBAAA;EAwCF;EAvCE;IACE,aAAA;IACA,sBAAA;IACA,mBAAA;IACA,sBAAA;IACA,UAAA;EAyCJ;EAvCI;IACE,cAAA;IACA,YAAA;IACA,WAAA;IACA,iBAAA;IACA,sBAAA;EAyCN;EAvCM;IACE,aAAA;IACA,mBAAA;IACA,eAAA;IACA,mBAAA;IACA,uBAAA;EAyCR;EAvCQ;IACE,WAAA;IACA,WAAA;IACA,kBAAA;IACA,cAAA;IACA,aAAA;IACA,sBAAA;IACA,mBAAA;IACA,kBDzJM;IC0JN,YAAA;EAyCV;EAxCU;IACE,cAAA;IACA,WAAA;EA0CZ;EAxCU;IACE,kBD/JE;ECyMd;AACF","sourcesContent":["$font-stack: Arial,\nHelvetica,\nsans-serif;\n$font-size-small: 0.75rem;\n$font-size-mid: 1.25rem;\n$font-size-large: 2rem;\n$main-color: rgba(0, 0, 0, 0.8);\n$secondary-color: rgba(50, 100, 150, 0.8);\n$third-color: aquamarine;\n$font-color-primary: ivory;\n$normal-padding: 5px;\n$sidebar-menu-width: 20vw;\n$sidebar-menu-width-mobile: 100vw;\n\n* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    overflow: hidden;\n    width: 100vw;\n    font-family: $font-stack;\n    color: $font-color-primary;\n}\n\n//Utilities\n\n.flex-it {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    text-align: center;\n    flex-wrap: wrap;\n}\n\n\n//For animated background\n@keyframes scrolling {\n\n    0% {\n        transform: translateX(0px);\n    }\n\n    50% {\n        transform: translateX(-300px);\n    }\n\n    100% {\n        transform: translateX(0px);\n    }\n}\n\n.background {\n    z-index: -1000;\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n}\n\n.background::before {\n    content: '';\n    position: absolute;\n    background-position-y: center;\n    box-sizing: content-box;\n    background-size: cover;\n    width: 200%;\n    height: 100%;\n    background-image: url('.././img/normal.jpg');\n    animation-name: scrolling;\n    animation-duration: 60s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n//For the animation of the weather icons in the cards\n.weather-icon {\n    animation-name: weather-icon;\n    animation-duration: 5s;\n    animation-iteration-count: infinite;\n    animation-timing-function: ease-in-out;\n}\n\n","@use \"main\";\r\n\r\nli {\r\n  list-style: none;\r\n}\r\n\r\n//for the .weather-icon animation\r\n@keyframes bob-up-down {\r\n  0% {\r\n    transform: translateY(0px);\r\n  }\r\n\r\n  50% {\r\n    transform: translateY(2vh);\r\n  }\r\n\r\n  100% {\r\n    transform: translateY(0px);\r\n  }\r\n}\r\n\r\ni {\r\n  margin-right: 3px;\r\n}\r\n\r\n//Styles for the main wethaer cards;\r\nmain {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  justify-content: center;\r\n  width: 100vw;\r\n  height: 100vh;\r\n  #container {\r\n    display: flex;\r\n    flex-direction: row;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-wrap: none;\r\n\r\n    .weather-card {\r\n      border-radius: 10px;\r\n      background: main.$main-color;\r\n      display: none;\r\n      flex-direction: column;\r\n      width: 17vw;\r\n      height: 70vh;\r\n      font-size: main.$font-size-small;\r\n      margin: 0.5%;\r\n      opacity: 0;\r\n      transition: all 0.4s ease;\r\n\r\n      ul {\r\n        padding-left: 0;\r\n        list-style: none;\r\n        margin: 1vh 0;\r\n        padding: main.$normal-padding * 2;\r\n\r\n        li ul.day {\r\n          justify-content: center;\r\n          align-items: center;\r\n          padding: 5px;\r\n          flex-direction: column;\r\n          font-size: main.$font-size-mid;\r\n        }\r\n\r\n        li.img {\r\n          .weather-icon {\r\n            animation-name: bob-up-down;\r\n            animation-duration: 5s;\r\n            animation-iteration-count: infinite;\r\n            animation-timing-function: ease-in-out;\r\n          }\r\n        }\r\n\r\n        //Tempurature line\r\n        li.temp {\r\n          text-align: center;\r\n          align-items: center;\r\n          font-size: main.$font-size-mid;\r\n        }\r\n\r\n        //Precipitation line\r\n        li.precipitation {\r\n          text-align: center;\r\n\r\n          progress {\r\n            width: 50%;\r\n          }\r\n        }\r\n\r\n        //The description of the forcast\r\n        li.desc {\r\n          text-align: center;\r\n          font-size: main.$font-size-mid;\r\n          border-bottom: 1px main.$secondary-color solid;\r\n          margin-bottom: 3px;\r\n        }\r\n      }\r\n\r\n      //The Details for the Weather Cards\r\n      .misc {\r\n        li {\r\n          width: 14vw;\r\n          text-align: justify;\r\n          padding: 5%;\r\n          font-size: main.$font-size-mid;\r\n          border-bottom: 1px dotted ivory;\r\n        }\r\n      }\r\n    }\r\n\r\n    .weather-card.visable {\r\n      display: flex;\r\n      opacity: 1;\r\n      transition: all 0.4s ease;\r\n    }\r\n  }\r\n}\r\n\r\n@media (max-width: 768px) {\r\n  body {\r\n    overflow-y: scroll;\r\n  }\r\n\r\n  main {\r\n    justify-content: start;\r\n    #container {\r\n      display: flex;\r\n      flex-direction: column;\r\n      align-items: center;\r\n      justify-content: start;\r\n      padding: 0;\r\n\r\n      .weather-card {\r\n        margin: 11vh 0;\r\n        height: 70vh;\r\n        width: 80vw;\r\n        min-height: 575px;\r\n        flex-direction: column;\r\n\r\n        .misc {\r\n          display: flex;\r\n          flex-direction: row;\r\n          flex-wrap: wrap;\r\n          align-items: center;\r\n          justify-content: center;\r\n\r\n          li {\r\n            height: 5vh;\r\n            width: 15vw;\r\n            text-align: center;\r\n            margin: 10% 4%;\r\n            display: flex;\r\n            flex-direction: column;\r\n            align-items: center;\r\n            font-size: main.$font-size-small;\r\n            border: none;\r\n            span {\r\n              margin-top: 5%;\r\n              width: 200%;\r\n            }\r\n            i {\r\n              font-size: main.$font-size-mid;\r\n            }\r\n          }\r\n        }\r\n      }\r\n    }\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./src/sass/C_F_btn.scss":
/*!*******************************!*\
  !*** ./src/sass/C_F_btn.scss ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_C_F_btn_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./C_F_btn.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/C_F_btn.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_C_F_btn_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_C_F_btn_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_C_F_btn_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_C_F_btn_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/sass/cards_arrows.scss":
/*!************************************!*\
  !*** ./src/sass/cards_arrows.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_cards_arrows_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./cards_arrows.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/cards_arrows.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_cards_arrows_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_cards_arrows_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_cards_arrows_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_cards_arrows_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/sass/main.scss":
/*!****************************!*\
  !*** ./src/sass/main.scss ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./main.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/main.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/sass/navbar.scss":
/*!******************************!*\
  !*** ./src/sass/navbar.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./navbar.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/navbar.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_navbar_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/sass/weather_cards.scss":
/*!*************************************!*\
  !*** ./src/sass/weather_cards.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_weather_cards_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!../../node_modules/sass-loader/dist/cjs.js!./weather_cards.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/sass/weather_cards.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_weather_cards_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_weather_cards_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_weather_cards_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_weather_cards_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/img/normal.jpg":
/*!****************************!*\
  !*** ./src/img/normal.jpg ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "e9286831fa90538e390a.jpg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ "./src/sass/main.scss");
/* harmony import */ var _sass_cards_arrows_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../sass/cards_arrows.scss */ "./src/sass/cards_arrows.scss");
/* harmony import */ var _sass_navbar_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../sass/navbar.scss */ "./src/sass/navbar.scss");
/* harmony import */ var _sass_C_F_btn_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../sass/C_F_btn.scss */ "./src/sass/C_F_btn.scss");
/* harmony import */ var _sass_weather_cards_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../sass/weather_cards.scss */ "./src/sass/weather_cards.scss");
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _models_get_forcast_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./models/get_forcast.js */ "./src/scripts/models/get_forcast.js");
/* harmony import */ var _models_parse_Info_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./models/parse_Info.js */ "./src/scripts/models/parse_Info.js");
/* harmony import */ var _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./views/card_manager.js */ "./src/scripts/views/card_manager.js");
/* harmony import */ var _models_manage_stroage_model_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./models/manage_stroage_model.js */ "./src/scripts/models/manage_stroage_model.js");
/* harmony import */ var _views_manage_storage_view_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./views/manage_storage_view.js */ "./src/scripts/views/manage_storage_view.js");
/* harmony import */ var _views_C_F_btn_views_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./views/C_F_btn_views.js */ "./src/scripts/views/C_F_btn_views.js");
/* harmony import */ var _views_side_arrows_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./views/side_arrows.js */ "./src/scripts/views/side_arrows.js");
/* harmony import */ var _views_dom_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./views/dom.js */ "./src/scripts/views/dom.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }





 //For babel

 //
//Location controller could become
//Params = default or location string
//checks for string to convert through geolocation/if false useses default location
//runs default or geolocation through api to get data
//parsers activate on it
//information is extracted from parsed data
//the appropriate card type is selected and generated








 //connects to the api, retrives the data then parses it.

var locationController = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee(locationLatLong, mesType) {
    var _locationLatLong, lat, _long, data, weatherData, state_code, city_name, country_code, cards;

    return regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!locationLatLong) {
              _context.next = 7;
              break;
            }

            locationLatLong = _models_parse_Info_js__WEBPACK_IMPORTED_MODULE_7__.convertToUsableDataForReverseGeoCoding(locationLatLong);
            _context.next = 4;
            return _models_get_forcast_js__WEBPACK_IMPORTED_MODULE_6__.reverseGeocode.apply(_models_get_forcast_js__WEBPACK_IMPORTED_MODULE_6__, _toConsumableArray(locationLatLong));

          case 4:
            locationLatLong = _context.sent;
            _context.next = 10;
            break;

          case 7:
            _context.next = 9;
            return _models_get_forcast_js__WEBPACK_IMPORTED_MODULE_6__.getCurrentLatLon();

          case 9:
            locationLatLong = _context.sent;

          case 10:
            _locationLatLong = locationLatLong, lat = _locationLatLong.lat, _long = _locationLatLong["long"]; //returns json from the weather api using lat and long as its target

            _context.next = 13;
            return _models_get_forcast_js__WEBPACK_IMPORTED_MODULE_6__.getData(lat, _long, mesType);

          case 13:
            data = _context.sent;
            //obtains all values held in the cards which will be appended to the dom
            weatherData = _models_parse_Info_js__WEBPACK_IMPORTED_MODULE_7__.parseData(data); //the below values are located outside of the daily values in the returned data from the api
            //which is why they are destructured in this way

            state_code = data.state_code, city_name = data.city_name, country_code = data.country_code; //parses the data from the weather api and constructs html elements fot the DOM

            cards = weatherData.map(function (measurments, index) {
              return _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.createMainCards(measurments, mesType, index);
            }); //plugs data into cards then creates and appends them to the DOM

            _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.changeTitle(state_code, city_name, country_code);
            _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.createCard(cards, "#container");

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function locationController(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var favoritesListController = function favoritesListController() {
  var populate = function populate() {
    var favoritesListData = _models_manage_stroage_model_js__WEBPACK_IMPORTED_MODULE_9__.getFavorites();
    var favoritesCards = _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.createFavoriteCard(favoritesListData);
    _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.createCard(favoritesCards, _views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.favoritesMenu);
  };

  var checkIfFavorite = function checkIfFavorite() {
    if (_models_manage_stroage_model_js__WEBPACK_IMPORTED_MODULE_9__.checkForFavoritesOnLoad() === true) return _views_manage_storage_view_js__WEBPACK_IMPORTED_MODULE_10__.toggleFavoriteStar("faved");
    return _views_manage_storage_view_js__WEBPACK_IMPORTED_MODULE_10__.toggleFavoriteStar("unfaved");
  };

  return {
    populate: populate,
    checkIfFavorite: checkIfFavorite
  };
};

var addEventListeners = function addEventListeners() {
  //search button
  $(_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.searchForm).on("submit", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee2(event) {
      var location, mesToggle;
      return regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              event.preventDefault();
              location = event.target[0].value;
              mesToggle = (0,_views_C_F_btn_views_js__WEBPACK_IMPORTED_MODULE_11__.toggleCelcFaren)();
              (0,_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.clearSearchBar)(event.target[0].value);
              return _context2.abrupt("return", activate(location, mesToggle));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }()); //page left

  $(_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.leftBtn).on("click", function () {
    var page = (0,_views_side_arrows_js__WEBPACK_IMPORTED_MODULE_12__.changeArrows)("left");
    return _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.createCard(page, "#container");
  }); //page right

  $(_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.rightBtn).on("click", function () {
    var page = (0,_views_side_arrows_js__WEBPACK_IMPORTED_MODULE_12__.changeArrows)("right");
    return _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.createCard(page, "#container");
  });
  $(_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.cfBtn).on("click", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee3() {
    var mesToggle, location;
    return regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            mesToggle = (0,_views_C_F_btn_views_js__WEBPACK_IMPORTED_MODULE_11__.toggleCelcFaren)(true);
            location = $(_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.locationName).text();
            return _context3.abrupt("return", activate(location, mesToggle));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }))); //To close leftover elements of the sidebar

  $(_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.toggler).on("click", function () {
    return _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.getInfoCard("remove");
  }); //give funtionality to the favorite button

  $(_views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.favoritesBtn).on("click", function () {
    _models_manage_stroage_model_js__WEBPACK_IMPORTED_MODULE_9__.manageFavorites();
    _views_manage_storage_view_js__WEBPACK_IMPORTED_MODULE_10__.toggleFavoriteStar();
    favoritesListController().populate();
    addDynamicEventListeners();
  }); //info-cards in menu

  var sideBarInfoList = ["humidity-info", "pressure-info", "dewpoint-info", "visability-info", "uv-info"];
  sideBarInfoList.forEach(function (element) {
    return $("#".concat(element)).on("click", function () {
      var infoCard = _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.getInfoCard(element);
      return _views_card_manager_js__WEBPACK_IMPORTED_MODULE_8__.createCard(infoCard, _views_dom_js__WEBPACK_IMPORTED_MODULE_13__.dom.infoSquare);
    });
  });
};

var addDynamicEventListeners = function addDynamicEventListeners() {
  //Makes favorites in sidebar functional
  $(".favorite").on("click", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee4(el) {
      var name;
      return regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              name = _models_parse_Info_js__WEBPACK_IMPORTED_MODULE_7__.getFavoritesLocationFromText(el.target);
              activate(name);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }());
}; //initiates the api and cards //the default value of mesType = 'I' is to default it to imperial measurements


var activate = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee5(latLong) {
    var mesType,
        data,
        _args5 = arguments;
    return regenerator_runtime__WEBPACK_IMPORTED_MODULE_5___default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            mesType = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : "I";
            _context5.next = 3;
            return locationController(latLong, mesType);

          case 3:
            data = _context5.sent;
            favoritesListController().populate();
            favoritesListController().checkIfFavorite();
            addDynamicEventListeners();

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function activate(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

activate();
addEventListeners();
})();

/******/ })()
;
//# sourceMappingURL=mainca8fcd23605e157aaf49.js.map