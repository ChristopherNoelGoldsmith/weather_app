# I Wonder Whether We'll Have Good Weather? - ft: Weatherbit & OpenWeatherMap

![alt text](./src/img/markdown.jpg)

### Features

- Weather report for the week.
- Changing graphics depending on forcast
- Mobile support

### Uses

- OpenWeatherMap for Reverse Geocoding
- Weatherbit API for Weather Data
- Jquery
- Sass

# BASIC ARCHITECTURE GUIDE

### INDEX.JS

The index.js file in this project is bulky. It holds the paths for the webpack config, and is the controller for all actions. The event listener bindings, and the functions connecting the APIs together are present in this file.

### GET_FORCAST.JS

Holds the logic connecting to the APIs

- ReverseGeocoding API - openweathermap
- Weather API - weatherbit.io

### PARSE_INFO.JS

Holds the logic to parse the data recieved from the api which is then passed to the card_manager.js to convert into a DOM element.

### CARD_MANAGER.JS

The file containing he logic to manipulate the AI via generating dom elements. Weather cards and all things generated via the hamburger menu.

### MANAGE_STORAGE.JS

Holds the logic for favorites menu. The favorites menu uses the localStorage API to keep track of locations held in the favorites menu.
