// Serialize the same events shown on the page as an RFC 5545 calendar.
const berlinTimezone = [
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Berlin',
    'BEGIN:DAYLIGHT',
    'DTSTART:19960331T020000',
    'TZOFFSETFROM:+0100',
    'TZOFFSETTO:+0200',
    'TZNAME:CEST',
    'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
    'END:DAYLIGHT',
    'BEGIN:STANDARD',
    'DTSTART:19961027T030000',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0100',
    'TZNAME:CET',
    'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
    'END:STANDARD',
    'END:VTIMEZONE'
];

function escapeText(value) {
    return value.replace(/\\/g, '\\\\').replace(/\r\n|\r|\n/g, '\\n')
        .replace(/;/g, '\\;').replace(/,/g, '\\,');
}

// Fold at 75 UTF-8 octets without splitting a Unicode character.
function foldLine(line) {
    const encoder = new TextEncoder();
    let result = '';
    let length = 0;
    for (const character of line) {
        const bytes = encoder.encode(character).length;
        if (length + bytes > 75) {
            result += '\r\n ';
            length = 1;
        }
        result += character;
        length += bytes;
    }
    return result;
}

function clockTime(value) {
    const match = value.trim().match(/^(1[0-2]|[1-9])(?::([0-5]\d))?\s*(am|pm)$/i);
    if (!match) throw new Error(`Unsupported calendar time: ${value}`);
    const hour = Number(match[1]) % 12 + (match[3].toLowerCase() === 'pm' ? 12 : 0);
    return `${String(hour).padStart(2, '0')}${match[2] || '00'}00`;
}

export function createCalendar(events, now = new Date()) {
    const timestamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Pack 152 Berlin//Events Calendar//EN',
        'CALSCALE:GREGORIAN',
        'X-WR-CALNAME:Pack 152 Berlin 2026–2027',
        'X-WR-TIMEZONE:Europe/Berlin',
        ...berlinTimezone
    ];

    for (const event of [...events].sort((a, b) => a.date.localeCompare(b.date))) {
        const date = event.date.replace(/-/g, '');
        const slug = event.desc.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const timeTbd = event.time === 'TBD';
        const allDay = timeTbd || event.time === 'All day';
        const times = allDay ? [] : event.time.split(/\s*[–—-]\s*/);
        let description = `${event.detail}\nTime: ${event.time}\nLocation: ${event.location}`;

        lines.push('BEGIN:VEVENT', `UID:${event.date}-${slug}@pack152berlin.com`, `DTSTAMP:${timestamp}`);
        if (allDay) {
            const nextDay = new Date(`${event.date}T00:00:00Z`);
            nextDay.setUTCDate(nextDay.getUTCDate() + 1);
            lines.push(`DTSTART;VALUE=DATE:${date}`,
                `DTEND;VALUE=DATE:${nextDay.toISOString().slice(0, 10).replace(/-/g, '')}`,
                'TRANSP:TRANSPARENT');
            if (timeTbd) description += '\nAll-day placeholder; the time is to be confirmed.';
        } else {
            lines.push(`DTSTART;TZID=Europe/Berlin:${date}T${clockTime(times[0])}`);
            if (times.length === 2) {
                lines.push(`DTEND;TZID=Europe/Berlin:${date}T${clockTime(times[1])}`);
            } else {
                description += '\nEnd time is to be confirmed.';
            }
        }
        lines.push(`SUMMARY:${escapeText(event.desc + (timeTbd ? ' (Time TBD)' : ''))}`,
            `DESCRIPTION:${escapeText(description)}`,
            `LOCATION:${escapeText(event.location)}`,
            'END:VEVENT');
    }

    lines.push('END:VCALENDAR');
    return lines.map(foldLine).join('\r\n') + '\r\n';
}
