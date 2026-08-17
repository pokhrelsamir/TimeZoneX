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
        city: "New Delhi",
        country: "India",
        timezone: "Asia/Kolkata"
    },
    {
        city: "Dhaka",
        country: "Bangladesh",
        timezone: "Asia/Dhaka"
    },
    {
        city: "Bangkok",
        country: "Thailand",
        timezone: "Asia/Bangkok"
    },
    {
        city: "Singapore",
        country: "Singapore",
        timezone: "Asia/Singapore"
    },
    {
        city: "Shanghai",
        country: "China",
        timezone: "Asia/Shanghai"
    },
    {
        city: "Hong Kong",
        country: "Hong Kong",
        timezone: "Asia/Hong_Kong"
    },
    {
        city: "Tokyo",
        country: "Japan",
        timezone: "Asia/Tokyo"
    },
    {
        city: "Seoul",
        country: "South Korea",
        timezone: "Asia/Seoul"
    },
    {
        city: "Dubai",
        country: "UAE",
        timezone: "Asia/Dubai"
    },
    {
        city: "Riyadh",
        country: "Saudi Arabia",
        timezone: "Asia/Riyadh"
    },
    {
        city: "Istanbul",
        country: "Turkey",
        timezone: "Europe/Istanbul"
    },
    {
        city: "Moscow",
        country: "Russia",
        timezone: "Europe/Moscow"
    },
    {
        city: "London",
        country: "United Kingdom",
        timezone: "Europe/London"
    },
    {
        city: "Paris",
        country: "France",
        timezone: "Europe/Paris"
    },
    {
        city: "Berlin",
        country: "Germany",
        timezone: "Europe/Berlin"
    },
    {
        city: "Rome",
        country: "Italy",
        timezone: "Europe/Rome"
    },
    {
        city: "Madrid",
        country: "Spain",
        timezone: "Europe/Madrid"
    },
    {
        city: "Cairo",
        country: "Egypt",
        timezone: "Africa/Cairo"
    },
    {
        city: "Johannesburg",
        country: "South Africa",
        timezone: "Africa/Johannesburg"
    },
    {
        city: "New York",
        country: "USA",
        timezone: "America/New_York"
    },
    {
        city: "Chicago",
        country: "USA",
        timezone: "America/Chicago"
    },
    {
        city: "Denver",
        country: "USA",
        timezone: "America/Denver"
    },
    {
        city: "Los Angeles",
        country: "USA",
        timezone: "America/Los_Angeles"
    },
    {
        city: "Honolulu",
        country: "USA",
        timezone: "Pacific/Honolulu"
    },
    {
        city: "Toronto",
        country: "Canada",
        timezone: "America/Toronto"
    },
    {
        city: "Vancouver",
        country: "Canada",
        timezone: "America/Vancouver"
    },
    {
        city: "São Paulo",
        country: "Brazil",
        timezone: "America/Sao_Paulo"
    },
    {
        city: "Buenos Aires",
        country: "Argentina",
        timezone: "America/Argentina/Buenos_Aires"
    },
    {
        city: "Sydney",
        country: "Australia",
        timezone: "Australia/Sydney"
    },
    {
        city: "Melbourne",
        country: "Australia",
        timezone: "Australia/Melbourne"
    },
    {
        city: "Perth",
        country: "Australia",
        timezone: "Australia/Perth"
    },
    {
        city: "Auckland",
        country: "New Zealand",
        timezone: "Pacific/Auckland"
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