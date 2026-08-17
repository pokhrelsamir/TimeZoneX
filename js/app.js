/* =========================
   TimeZoneX Application
========================= */


document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeTheme();

        initializeFormat();

        setDefaultDateTime();

        renderClocks();

        renderFavorites();

        setupEvents();

    }
);


/* =========================
   Theme
========================= */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "timezoneX_theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark"
        );
    }


    updateThemeIcon();
}


function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    localStorage.setItem(
        "timezoneX_theme",
        isDark ? "dark" : "light"
    );


    updateThemeIcon();
}


function updateThemeIcon() {

    const button =
        document.getElementById(
            "themeToggle"
        );


    if (!button) return;


    const isDark =
        document.body.classList.contains(
            "dark"
        );


    button.innerHTML = `
        <i class="bi ${
            isDark
                ? "bi-sun"
                : "bi-moon"
        }"></i>
    `;
}


/* =========================
   Time Format
========================= */

function initializeFormat() {

    if (
        !localStorage.getItem(
            "timezoneX_format"
        )
    ) {

        localStorage.setItem(
            "timezoneX_format",
            "12"
        );
    }


    updateFormatLabel();
}


function toggleFormat() {

    const current =
        getTimeFormat();


    const next =
        current === "12"
            ? "24"
            : "12";


    localStorage.setItem(
        "timezoneX_format",
        next
    );


    updateFormatLabel();

    updateClocks();

    const result =
        document.getElementById(
            "conversionResult"
        );


    if (
        result &&
        !result.classList.contains(
            "hidden"
        )
    ) {

        performConversion();
    }
}


function updateFormatLabel() {

    const label =
        document.getElementById(
            "formatLabel"
        );


    if (!label) return;


    label.textContent =
        `${getTimeFormat()}H`;
}


/* =========================
   Favorites
========================= */

function renderFavorites() {

    const grid =
        document.getElementById(
            "favoritesGrid"
        );


    if (!grid) return;


    const favorites =
        getFavorites();


    if (!favorites.length) {

        grid.innerHTML = `
            <div class="empty-state">

                <i class="bi bi-star"></i>

                <h3>
                    No favorites yet
                </h3>

                <p>
                    Add your frequently used
                    timezones to access them quickly.
                </p>

            </div>
        `;

        return;
    }


    const zones =
        CLOCK_ZONES.filter(
            zone =>
                favorites.includes(
                    zone.timezone
                )
        );


    grid.innerHTML =
        zones.map(zone => {

            const time =
                formatClockTime(
                    zone.timezone
                );


            return `
                <article
                    class="favorite-card"
                >

                    <div class="favorite-info">

                        <i class="bi bi-star-fill"></i>

                        <div>

                            <div class="favorite-city">
                                ${zone.city}
                            </div>

                            <div class="favorite-zone">
                                ${time} · ${zone.country}
                            </div>

                        </div>

                    </div>


                    <button
                        class="remove-favorite"
                        data-remove="${zone.timezone}"
                        type="button"
                        title="Remove favorite"
                        aria-label="Remove favorite"
                    >
                        <i class="bi bi-x-lg"></i>
                    </button>

                </article>
            `;

        }).join("");
}


/* =========================
   Events
========================= */

function setupEvents() {

    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const formatToggle =
        document.getElementById(
            "formatToggle"
        );


    const convertButton =
        document.getElementById(
            "convertButton"
        );


    const swapButton =
        document.getElementById(
            "swapTimezone"
        );


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            toggleTheme
        );
    }


    if (formatToggle) {

        formatToggle.addEventListener(
            "click",
            toggleFormat
        );
    }


    if (convertButton) {

        convertButton.addEventListener(
            "click",
            performConversion
        );
    }


    if (swapButton) {

        swapButton.addEventListener(
            "click",
            swapTimezones
        );
    }


    document.addEventListener(
        "click",
        handleDocumentClick
    );
}


/* =========================
   Document Click Handler
========================= */

function handleDocumentClick(event) {

    const favoriteButton =
        event.target.closest(
            "[data-favorite]"
        );


    if (favoriteButton) {

        const timezone =
            favoriteButton.dataset.favorite;


        if (isFavorite(timezone)) {

            removeFavorite(timezone);

        } else {

            addFavorite(timezone);
        }


        refreshClockFavorites();

        renderFavorites();

        return;
    }


    const removeButton =
        event.target.closest(
            "[data-remove]"
        );


    if (removeButton) {

        const timezone =
            removeButton.dataset.remove;


        removeFavorite(timezone);

        refreshClockFavorites();

        renderFavorites();
    }
}


/* =========================
   Swap Timezones
========================= */

function swapTimezones() {

    const from =
        document.getElementById(
            "fromTimezone"
        );


    const to =
        document.getElementById(
            "toTimezone"
        );


    const temporary =
        from.value;


    from.value =
        to.value;


    to.value =
        temporary;


    performConversion();
}

function populateTimezoneSelects() {

    const fromSelect =
        document.getElementById("fromTimezone");

    const toSelect =
        document.getElementById("toTimezone");


    if (!fromSelect || !toSelect) {
        return;
    }


    const options = CLOCK_ZONES
        .map(zone => `
            <option value="${zone.timezone}">
                ${zone.city} — ${zone.country}
            </option>
        `)
        .join("");


    fromSelect.innerHTML = options;

    toSelect.innerHTML = options;


    fromSelect.value =
        "Asia/Kathmandu";

    toSelect.value =
        "America/New_York";
}