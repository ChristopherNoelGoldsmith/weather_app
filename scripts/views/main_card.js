export class MainCard {
  constructor(
    time = 'NA',
    today = 'NA',
    month = 'NA',
    day = 'NA',
    temp = 'NA'
  ) {
    this.time = time;
    this.today = today;
    this.month = month;
    this.day = day;
    this.temp = temp;
  }

  getTemplate = () => {
    return `
    <div class="widget">
    <div class="inner-widget">
      <div class="time">${this.time}:00</div>
      <div class="day">
        <span class="weekday">${this.today}</span>
        <span class="date">${this.month}/${this.day}</span>
      </div>
      <i class="fa-solid fa-cloud-bolt"></i>
      <div class="temp">
        <span class="high">${this.temp} Degrees</span>
        
      </div>
    </div>
    </div>`;
  };
}
