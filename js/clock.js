/* =========================
   TimeZoneX World Clock
========================= */

const CLOCK_ZONES = [
    {
        city: "Kathmandu",
        country: "Nepal",
        timezone: "Asia/Kathmandu"
    },

    {
        city: "New York",
        country: "USA",
        timezone: "America/New_York"
    },

    {
        city: "London",
        country: "United Kingdom",
        timezone: "Europe/London"
    },

    {
        city: "Tokyo",
        country: "Japan",
        timezone: "Asia/Tokyo"
    },

    {
        city: "Sydney",
        country: "Australia",
        timezone: "Australia/Sydney"
    },

    {
        city: "Singapore",
        country: "Singapore",
        timezone: "Asia/Singapore"
    },

    {
        city: "Paris",
        country: "France",
        timezone: "Europe/Paris"
    },

    {
        city: "Dubai",
        country: "UAE",
        timezone: "Asia/Dubai"
    }
];


function getTimeFormat() {

    return localStorage.getItem(
        "timezoneX_format"
    ) || "12";
}


function formatClockTime(timezone) {

    const format = getTimeFormat();

    return new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: timezone,
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: format === "12"
        }
    ).format(new Date());
}


function formatClockDate(timezone) {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: timezone,
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric"
        }
    ).format(new Date());
}


function getTimezoneName(timezone) {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: timezone,
            timeZoneName: "short"
        }
    )
        .formatToParts(new Date())
        .find(
            part => part.type === "timeZoneName"
        )?.value || timezone;
}


function createClockCard(zone) {

    const favorite = isFavorite(
        zone.timezone
    );

    return `
        <article
            class="clock-card"
            data-timezone="${zone.timezone}"
        >

            <div class="clock-top">

                <div class="clock-location">

                    <div class="city-icon">
                        <i class="bi bi-geo-alt"></i>
                    </div>

                    <div>
                        <div class="city-name">
                            ${zone.city}
                        </div>

                        <div class="country-name">
                            ${zone.country}
                        </div>
                    </div>

                </div>


                <button
                    class="favorite-button ${favorite ? "active" : ""}"
                    data-favorite="${zone.timezone}"
                    type="button"
                    title="Toggle favorite"
                    aria-label="Toggle favorite"
                >
                    <i class="bi ${favorite
                        ? "bi-star-fill"
                        : "bi-star"
                    }"></i>
                </button>

            </div>


            <div
                class="clock-time"
                data-time="${zone.timezone}"
            >
                --
            </div>


            <div
                class="clock-date"
                data-date="${zone.timezone}"
            >
                --
            </div>


            <span
                class="clock-zone"
                data-zone="${zone.timezone}"
            >
                --
            </span>

        </article>
    `;
}


function renderClocks() {

    const grid =
        document.getElementById("clockGrid");

    if (!grid) return;

    grid.innerHTML =
        CLOCK_ZONES
            .map(createClockCard)
            .join("");

    updateClocks();
}


function updateClocks() {

    document
        .querySelectorAll("[data-time]")
        .forEach(element => {

            const timezone =
                element.dataset.time;

            element.textContent =
                formatClockTime(timezone);
        });


    document
        .querySelectorAll("[data-date]")
        .forEach(element => {

            const timezone =
                element.dataset.date;

            element.textContent =
                formatClockDate(timezone);
        });


    document
        .querySelectorAll("[data-zone]")
        .forEach(element => {

            const timezone =
                element.dataset.zone;

            element.textContent =
                getTimezoneName(timezone);
        });
}


function refreshClockFavorites() {

    document
        .querySelectorAll("[data-favorite]")
        .forEach(button => {

            const timezone =
                button.dataset.favorite;

            const active =
                isFavorite(timezone);

            button.classList.toggle(
                "active",
                active
            );

            button.innerHTML = `
                <i class="bi ${
                    active
                        ? "bi-star-fill"
                        : "bi-star"
                }"></i>
            `;
        });
}


setInterval(
    updateClocks,
    1000
);