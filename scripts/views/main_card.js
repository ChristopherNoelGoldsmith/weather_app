export class MainCard {
  constructor(
    time = 'NA',
    today = 'NA',
    month = 'NA',
    day = 'NA',
    temp = 'NA',
    desc = 'Sunny',
    icon = 'c02n'
  ) {
    this.time = time;
    this.today = today;
    this.month = month;
    this.day = day;
    this.temp = temp;
    this.desc = desc;
    this.icon = icon;
  }
  //<i class="fa-solid fa-cloud-bolt"></i>

  getTemplate = () => {
    return `
    <div class="widget">
    <div class="inner-widget">
      <div class="time">${this.time}:00</div>
      <div class="day">
        <span class="weekday">${this.today}</span>
        <span class="date">${this.month}/${this.day}</span>
      </div>
      <img src="https://www.weatherbit.io/static/img/icons/${this.icon}.png" alt="">
      
           <div class="temp">

        <span class="desc">${this.desc}</span>
        
        <span class="high">${this.temp} F</span>
        
      </div>
    </div>
    </div>`;
  };
}
