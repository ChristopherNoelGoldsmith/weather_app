export const metric = (toggle) => {
  if (toggle) $('#C-F-btn').toggleClass('C').toggleClass('F');
  if ($('#C-F').text() === 'C') {
    if (toggle) {
      $('#C-F').text('F');
      return 'I';
    }
    return false;
  }
  if ($('#C-F').text() === 'F') {
    if (toggle) {
      $('#C-F').text('C');
      return false;
    }
    return 'I';
  }
};
