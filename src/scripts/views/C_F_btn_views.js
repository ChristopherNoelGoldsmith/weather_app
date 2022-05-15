//checks the current status of the DOM's measurement button. If toggle is true it changes C - F;
//if it is false it returns the current value of the button. C or F;
export const toggleCelcFaren = (toggle) => {
  const celc = $('#C-F-btn').hasClass('C');
  const far = $('#C-F-btn').hasClass('F');
  const btn = $('#C-F-btn');

  if (!toggle) {
    if (celc) return 'C';
    if (far) return 'F';
  }

  //if toggle is true, C and F are toggled below and the appropriate value is returned.
  btn.toggleClass('C');
  btn.toggleClass('F');
  if (celc) return 'F';
  if (far) return 'C';
};