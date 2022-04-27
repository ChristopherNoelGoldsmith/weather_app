export const toggleFavoriteStar = (isFaved) => {
    if (isFaved == 'faved') return $('#favorites-btn').addClass('faved');
    if (isFaved == 'unfaved') return $('#favorites-btn').removeClass('faved');
    return $('#favorites-btn').toggleClass('faved');
};