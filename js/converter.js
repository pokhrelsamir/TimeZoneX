/* =========================
   TimeZoneX Converter
========================= */


/**
 * Get the timezone offset in milliseconds
 * for a specific instant.
 */
function getTimezoneOffset(date, timezone) {

    const formatter = new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: timezone,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hourCycle: "h23"
        }
    );

    const parts = formatter.formatToParts(date);

    const values = {};

    parts.forEach(part => {

        if (part.type !== "literal") {
            values[part.type] = Number(part.value);
        }

    });

    const localTimeAsUTC = Date.UTC(
        values.year,
        values.month - 1,
        values.day,
        values.hour,
        values.minute,
        values.second
    );

    return localTimeAsUTC - date.getTime();
}


/**
 * Convert a wall-clock time in one timezone
 * into the corresponding UTC Date.
 *
 * Example:
 *
 * 17 Aug 2026 19:30 Kathmandu
 *        ↓
 * UTC
 */
function zonedTimeToUTC(
    dateString,
    timeString,
    timezone
) {

    const [year, month, day] =
        dateString.split("-").map(Number);

    const [hours, minutes] =
        timeString.split(":").map(Number);


    /*
     * Treat the user's selected local date/time
     * as if it were UTC first.
     */
    const wallTime = new Date(
        Date.UTC(
            year,
            month - 1,
            day,
            hours,
            minutes,
            0
        )
    );


    /*
     * Find the offset for this approximate instant.
     */
    let offset = getTimezoneOffset(
        wallTime,
        timezone
    );


    /*
     * Apply the offset.
     */
    let utcTime = new Date(
        wallTime.getTime() - offset
    );


    /*
     * Recalculate once more.
     *
     * This is important around DST transitions
     * because the timezone offset can change.
     */
    offset = getTimezoneOffset(
        utcTime,
        timezone
    );


    utcTime = new Date(
        wallTime.getTime() - offset
    );


    return utcTime;
}


/**
 * Format converted time.
 */
function formatConvertedTime(
    date,
    timezone
) {

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
    ).format(date);
}


/**
 * Format converted date.
 */
function formatConvertedDate(
    date,
    timezone
) {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: timezone,
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    ).format(date);
}


/**
 * Get the full timezone name.
 */
function getShortTimezoneName(
    date,
    timezone
) {

    return new Intl.DateTimeFormat(
        "en-US",
        {
            timeZone: timezone,
            timeZoneName: "long"
        }
    )
        .formatToParts(date)
        .find(
            part => part.type === "timeZoneName"
        )?.value || timezone;
}


/**
 * Perform timezone conversion.
 */
function performConversion() {

    const dateInput =
        document.getElementById("dateInput");

    const timeInput =
        document.getElementById("timeInput");

    const fromTimezone =
        document.getElementById("fromTimezone");

    const toTimezone =
        document.getElementById("toTimezone");


    const dateValue =
        dateInput.value;

    const timeValue =
        timeInput.value;

    const fromZone =
        fromTimezone.value;

    const toZone =
        toTimezone.value;


    /*
     * Make sure both date and time exist.
     */
    if (!dateValue || !timeValue) {
        return;
    }


    /*
     * Convert source timezone's wall-clock
     * time into an actual UTC instant.
     */
    const utcDate = zonedTimeToUTC(
        dateValue,
        timeValue,
        fromZone
    );


    /*
     * Convert that UTC instant into
     * the destination timezone.
     */
    const resultTime =
        formatConvertedTime(
            utcDate,
            toZone
        );


    const resultDate =
        formatConvertedDate(
            utcDate,
            toZone
        );


    const timezoneName =
        getShortTimezoneName(
            utcDate,
            toZone
        );


    /*
     * Display result.
     */
    document.getElementById(
        "resultTime"
    ).textContent = resultTime;


    document.getElementById(
        "resultDate"
    ).textContent = resultDate;


    document.getElementById(
        "resultTimezone"
    ).textContent = timezoneName;


    document.getElementById(
        "conversionResult"
    ).classList.remove("hidden");
}


/**
 * Set current date and time
 * when the application starts.
 */
function setDefaultDateTime() {

    const now = new Date();


    const dateInput =
        document.getElementById("dateInput");

    const timeInput =
        document.getElementById("timeInput");


    /*
     * Use local browser date.
     */
    const year =
        now.getFullYear();

    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            now.getDate()
        ).padStart(2, "0");


    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    dateInput.value =
        `${year}-${month}-${day}`;

    timeInput.value =
        `${hours}:${minutes}`;
}