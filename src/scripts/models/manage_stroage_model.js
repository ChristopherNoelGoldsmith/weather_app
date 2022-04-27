export const getFavorites = () => {
    if (!localStorage.getItem('favorites')) return;
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    return favorites
}


export const checkForFavoritesOnLoad = () => {
    if (!localStorage.getItem('favorites')) return;
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const favoriteName = $('#location-name').text();
    if (favorites.indexOf(favoriteName) == true ||
        favorites.indexOf(favoriteName) == 0) return true;
}

export const manageFavorites = () => {

    //create the favorites array;
    if (!localStorage.getItem('favorites')) localStorage.setItem('favorites', JSON.stringify([]))

    const favoriteToAdd = $('#location-name').text();

    let favorites = JSON.parse(localStorage.getItem('favorites'));
    //checks to see if duplicates of the favorite to add are present in the localstorage favorites array
    //this will remove any duplicates, which also causes the favorites button to become toggleable;
    const filterFavoritesForDuplicates = favorites.filter(fav => {
        if (fav !== favoriteToAdd) return true;
    });
    //blelow will cause the function to return if duplicates are found in favorites
    if (filterFavoritesForDuplicates.length < favorites.length) {
        favorites = JSON.stringify(filterFavoritesForDuplicates);
        return localStorage.setItem('favorites', favorites);
    };
    //check to make sure not too many oitems are in favorites
    //if (favorites.length >= 5) return alert('You Cannot Have More then 5 Favorites!');
    if (favorites.length >= 5) return alert("You cannot have more then 5 favorites!");
    //adds to and sets the favorite array to local storage;
    favorites.push(favoriteToAdd);
    favorites = JSON.stringify(favorites);
    return localStorage.setItem('favorites', favorites);

}

export const setOrGetDefaultLocation = (setOrGet) => {
    if (setOrGet !== 'set' && setOrGet !== 'get') return alert('error');

    //get location from the current h2 element.
    const locationFromTitle = $('#location-name').text();

    if (setOrGet == 'get') {
        let currentDefault = localStorage.getItem('defaultLocation');
        currentDefault = getJSON(currentDefault);
        return currentDefault;
    }
    return localStorage.setItem('defaultLocation', locationFromTitle);
};

