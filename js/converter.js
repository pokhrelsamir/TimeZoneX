/* =========================
   TimeZoneX Converter
========================= */


function getLocalDateTimeParts(
    date,
    timezone
) {

    const formatter =
        new Intl.DateTimeFormat(
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


    const parts =
        formatter.formatToParts(date);


    const values = {};

    parts.forEach(part => {

        if (part.type !== "literal") {
            values[part.type] =
                Number(part.value);
        }

    });


    return values;
}


function getTimezoneOffset(
    date,
    timezone
) {

    const parts =
        getLocalDateTimeParts(
            date,
            timezone
        );


    const utcTimestamp =
        Date.UTC(
            parts.year,
            parts.month - 1,
            parts.day,
            parts.hour,
            parts.minute,
            parts.second
        );


    return (
        utcTimestamp -
        date.getTime()
    );
}


function convertTimezone(
    date,
    fromTimezone,
    toTimezone
) {

    const fromParts =
        getLocalDateTimeParts(
            date,
            fromTimezone
        );


    const assumedUTC =
        Date.UTC(
            fromParts.year,
            fromParts.month - 1,
            fromParts.day,
            fromParts.hour,
            fromParts.minute,
            0
        );


    const fromOffset =
        getTimezoneOffset(
            new Date(assumedUTC),
            fromTimezone
        );


    const utcTime =
        assumedUTC - fromOffset;


    return new Date(utcTime);
}


function formatConvertedTime(
    date,
    timezone
) {

    const format =
        getTimeFormat();


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
            part =>
                part.type === "timeZoneName"
        )?.value || timezone;
}


function performConversion() {

    const dateValue =
        document.getElementById(
            "dateInput"
        ).value;


    const timeValue =
        document.getElementById(
            "timeInput"
        ).value;


    const fromTimezone =
        document.getElementById(
            "fromTimezone"
        ).value;


    const toTimezone =
        document.getElementById(
            "toTimezone"
        ).value;


    if (!dateValue || !timeValue) {
        return;
    }


    const [year, month, day] =
        dateValue
            .split("-")
            .map(Number);


    const [hours, minutes] =
        timeValue
            .split(":")
            .map(Number);


    /*
     * Create an initial UTC approximation.
     * The converter then adjusts it using
     * the actual source timezone offset.
     */

    const initialUTC =
        new Date(
            Date.UTC(
                year,
                month - 1,
                day,
                hours,
                minutes
            )
        );


    const sourceParts =
        getLocalDateTimeParts(
            initialUTC,
            fromTimezone
        );


    const sourceAsUTC =
        Date.UTC(
            sourceParts.year,
            sourceParts.month - 1,
            sourceParts.day,
            sourceParts.hour,
            sourceParts.minute
        );


    const sourceOffset =
        getTimezoneOffset(
            initialUTC,
            fromTimezone
        );


    const actualUTC =
        new Date(
            sourceAsUTC - sourceOffset
        );


    const resultTime =
        formatConvertedTime(
            actualUTC,
            toTimezone
        );


    const resultDate =
        formatConvertedDate(
            actualUTC,
            toTimezone
        );


    const timezoneName =
        getShortTimezoneName(
            actualUTC,
            toTimezone
        );


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
    ).classList.remove(
        "hidden"
    );
}


function setDefaultDateTime() {

    const now = new Date();


    const dateInput =
        document.getElementById(
            "dateInput"
        );


    const timeInput =
        document.getElementById(
            "timeInput"
        );


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