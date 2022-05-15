import { dom } from "./dom";

export const toggleFavoriteStar = (isFaved) => {
    if (isFaved == 'faved') return $(dom.favoritesBtn).addClass('faved');
    if (isFaved == 'unfaved') return $(dom.favoritesBtn).removeClass('faved');
    return $(dom.favoritesBtn).toggleClass('faved');
};