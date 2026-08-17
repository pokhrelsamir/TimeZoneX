/* =========================
   TimeZoneX Storage
========================= */

const STORAGE_KEY = "timezoneX_favorites";


function getFavorites() {
    try {
        const favorites = localStorage.getItem(STORAGE_KEY);

        return favorites
            ? JSON.parse(favorites)
            : [];
    } catch (error) {
        console.error(
            "Unable to read favorites:",
            error
        );

        return [];
    }
}


function saveFavorites(favorites) {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        );

        return true;

    } catch (error) {

        console.error(
            "Unable to save favorites:",
            error
        );

        return false;
    }
}


function addFavorite(timezone) {

    const favorites = getFavorites();

    if (!favorites.includes(timezone)) {

        favorites.push(timezone);

        saveFavorites(favorites);
    }
}


function removeFavorite(timezone) {

    const favorites = getFavorites();

    const updatedFavorites =
        favorites.filter(
            item => item !== timezone
        );

    saveFavorites(updatedFavorites);
}


function isFavorite(timezone) {

    return getFavorites()
        .includes(timezone);
}