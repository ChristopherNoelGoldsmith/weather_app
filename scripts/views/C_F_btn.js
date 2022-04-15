//checks the current status of the DOM's measurement button. If toggle is true it changes C - F;
//if it is false it returns the current value of the button. C or F;
export const toggleUnits = (toggle) => {
  const celc = document.querySelector('#C-F-btn').classList.contains('C');
  const far = document.querySelector('#C-F-btn').classList.contains('F');
  const btn = document.querySelector('#C-F-btn');

  if (!toggle) {
    if (celc) return 'C';
    if (far) return 'F';
  }

  //if toggle is true, C and F are toggled below and the appropriate value is returned.
  btn.classList.toggle('C');
  btn.classList.toggle('F');
  if (celc) return 'F';
  if (far) return 'C';
};
