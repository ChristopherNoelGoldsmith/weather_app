export class MainCard {
  constructor(...args) {
    this.time = args[0];
    this.today = args[1];
    this.month = args[2];
    this.day = args[3];
    this.temp = args[4];
    this.desc = args[5];
    this.icon = args[6];
    this.wind = args[7];
    this.pressure = args[8];
    this.humidity = args[9];
    this.dewpoint = args[10];
    this.visability = args[11];
    this.uv = args[12];
    this.precip = args[13];
    this.vis = args[14];
    this.low = args[15];
  }
  //<i class="fa-solid fa-cloud-bolt"></i>

  getTemplate = () => {
    return `<div class="widget ${this.vis} main-wid widget-1">
    <div class="inner-widget">
      <div class="day">
        <span class="weekday">${this.today}</span>
        <span class="date">${this.month}, ${this.day}</span>
      </div>
      <div class="img">
        <img
          class="weather-icon"
          src="https://www.weatherbit.io/static/img/icons/${this.icon}.png"
          alt=""
        />
      </div>

      <div class="misc">
        <div class="temp">
          <i class="fa-solid fa-temperature-half"></i>${this.temp} -
          ${this.low} F
        </div>
        <span>
          <i class="fa-solid fa-cloud-sun-rain"></i>
          <progress min="0" max="100" value="${this.precip}"></progress>
          ${this.precip}%</span
        >

        <div class="desc">${this.desc}</div>
        <div class="wind">
          <i class="fa-solid fa-wind"></i>Wind ${this.wind}mph
        </div>
        <div class="humidity">
          <i class="fa-solid fa-water"></i>Humidity ${this.humidity}
        </div>
        <div class="pressure">
          <i class="fa-solid fa-circle"></i>Pressure ${this.pressure}
        </div>
        <div class="dewpoint">
          <i class="fa-solid fa-droplet"></i>Dewpoint ${this.dewpoint}F
        </div>
        <div class="visability">
          <i class="fa-solid fa-eye"></i>Visability ${this.visability}
        </div>
        <div class="uv-index">
          <i class="fa-solid fa-sun"></i>UV Index ${this.uv}
        </div>
      </div>
    </div>
  </div>`;
  };

  tickWidget = (i) => {
    return (this.widget += i);
  };

  notVis = () => {
    this.vis = 'not-vis';
  };
  getLow = () => {
    let rando = Math.floor(Math.random() * 10);
    this.low = this.temp - 15 - rando;
  };
}
