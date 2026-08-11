---
layout: page
title: Calendar
permalink: /calendar/
---

## 2026–2027 Events Calendar

Den meetings start at **4:30pm**. Pack meeting times are subject to venue availability and may change; please check pack communications for confirmation.

<style>
.calendar-container {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    margin: 2rem auto;
    background: #fff;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,51,102,0.07);
}
.calendar-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}
.calendar-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}
.calendar-table th, .calendar-table td {
    width: 14.28%;
    min-width: 100px; /* was 90px */
    max-width: 140px; /* was 120px */
    height: 90px;
    min-height: 90px;
    vertical-align: top;
    border: 1px solid #eee;
    padding: 6px 2px 4px 2px;
    position: relative;
    font-size: 0.93rem; /* changed from em to rem */
    word-break: normal;         /* Prevent mid-word breaks */
    overflow-wrap: break-word;  /* Break at word boundaries */
    font-family: 'Open Sans', 'Segoe UI', Arial, sans-serif;
}
.calendar-table th {
    background: linear-gradient(120deg, #000428, #004e92) !important;
    color: #fff !important;
    font-weight: 700;
    font-size: 0.93rem; /* changed from em to rem */
    border-bottom: 2px solid #ffd100;
}
.event-day {
    color: #0055a4;
    font-weight: bold;
    font-size: 0.93rem; /* changed from em to rem */
    margin-right: 4px;
}
.event-list {
    margin: 0.5em 0 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.93rem; /* changed from em to rem */
}
.event-list li {
    background: #e6f0fa;
    color: #003366;
    border-radius: 6px;
    margin-bottom: 2px;
    padding: 2px 6px;
    font-size: 0.90rem; /* changed from em to rem */
    word-break: normal;
    overflow-wrap: break-word;
    font-family: 'Open Sans', 'Segoe UI', Arial, sans-serif;
}
.calendar-table td.today {
    border: 2px solid #0055a4;
}
@media (max-width: 800px) {
    .calendar-table th, .calendar-table td {
        min-width: 60px;
        max-width: 80px;
        height: 70px;
        min-height: 70px;
        font-size: 0.85rem; /* changed from em to rem */
    }
    .event-list li {
        font-size: 0.85rem; /* changed from em to rem */
    }
}
</style>

<div class="calendar-container">
    <div class="calendar-nav">
        <button id="prevMonth" aria-label="Previous Month">&lt;</button>
        <span id="calendarMonth"></span>
        <button id="nextMonth" aria-label="Next Month">&gt;</button>
    </div>
    <div style="overflow-x:auto;">
        <table class="calendar-table">
            <thead>
                <tr>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th>
                </tr>
            </thead>
            <tbody id="calendarBody">
                <!-- Calendar will be rendered here -->
            </tbody>
        </table>
    </div>
</div>

<script>
// --- Event Data ---
const events = [
    { date: "2026-08-25", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2026-09-08", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2026-09-22", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2026-10-06", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2026-11-03", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2026-11-17", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2026-12-01", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2026-12-15", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-01-05", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-01-19", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-02-09", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-02-23", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-03-09", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-04-06", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-04-20", desc: "Den Meeting and Swim Test", time: "4:30pm", location: "Pool (details TBD)", detail: "Den meeting at a pool for the swim test. Please check pack communications for the confirmed location and what to bring." },
    { date: "2027-05-04", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-05-25", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },
    { date: "2027-06-08", desc: "Den Meeting", time: "4:30pm", location: "JFKS Large Aula", detail: "Regular den meeting. Scouts will work on advancement, learn new skills, and take part in age-appropriate activities." },

    { date: "2026-09-11", desc: "Pack Campout (Day 1)", time: "TBD", location: "TBD", detail: "Pack camping weekend. Check pack communications for arrival time, location, and packing information." },
    { date: "2026-09-12", desc: "Pack Campout (Day 2)", time: "All day", location: "TBD", detail: "Pack camping weekend continues." },
    { date: "2026-09-13", desc: "Pack Campout (Day 3)", time: "TBD", location: "TBD", detail: "Final day of the pack camping weekend. Check pack communications for departure time." },
    { date: "2027-05-15", desc: "Pack Campout (Day 1)", time: "TBD", location: "TBD", detail: "Pack camping weekend. Check pack communications for arrival time, location, and packing information." },
    { date: "2027-05-16", desc: "Pack Campout (Day 2)", time: "All day", location: "TBD", detail: "Pack camping weekend continues." },
    { date: "2027-05-17", desc: "Pack Campout (Day 3)", time: "TBD", location: "TBD", detail: "Final day of the pack camping weekend. Check pack communications for departure time." },

    { date: "2026-08-15", desc: "Ferry to Kladow", time: "2pm – 4pm", location: "Kladow (meeting point TBD)", detail: "Pack meeting and ferry outing. Time is subject to availability; check pack communications for confirmation." },
    { date: "2026-10-10", desc: "Pfaueninsel", time: "2:30pm – 5:30pm", location: "Pfaueninsel", detail: "Pack outing to Pfaueninsel. Time is subject to availability; check pack communications for confirmation." },
    { date: "2026-11-15", desc: "AlliiertenMuseum", time: "10:30am – 12:30pm", location: "AlliiertenMuseum", detail: "Pack visit to the AlliiertenMuseum. Time is subject to availability; check pack communications for confirmation." },
    { date: "2026-12-05", desc: "Food Drive and Christmas Party", time: "2pm – 6pm", location: "TBD", detail: "Pack food drive and Christmas party. Time is subject to availability; check pack communications for confirmation." },
    { date: "2027-01-09", desc: "Pinewood Derby Pit Stop", time: "2pm – 4pm", location: "TBD", detail: "Pinewood Derby pit stop for car checks and preparation. Time is subject to availability; check pack communications for confirmation." },
    { date: "2027-02-13", desc: "Pinewood Derby", time: "1pm – 5pm", location: "TBD", detail: "Pinewood Derby race day. Time is subject to availability; check pack communications for confirmation." },
    { date: "2027-03-13", desc: "Blue and Gold Dinner", time: "4pm – 6pm", location: "TBD", detail: "Pack Blue and Gold dinner. Time is subject to availability; check pack communications for confirmation." },
    { date: "2027-04-18", desc: "Service Project", time: "TBD", location: "TBD", detail: "Pack service project. Details will be announced in pack communications." },
    { date: "2027-06-19", desc: "Year-End, Crossover, and Rank Ceremony", time: "4pm – 6pm", location: "TBD", detail: "Year-end celebration, crossover, and rank ceremony. Time is subject to availability; check pack communications for confirmation." }
];

// --- Helper Functions ---
function parseEvents(events) {
    const map = {};
    for (const ev of events) {
        map[ev.date] = map[ev.date] || [];
        map[ev.date].push({
            desc: ev.desc,
            detail: ev.detail,
            time: ev.time,
            location: ev.location
        });
    }
    return map;
}

const eventMap = parseEvents(events);

// --- Modal Logic ---
function createModal() {
    let modal = document.getElementById('eventModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'eventModal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div id="eventModalBg" style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,51,102,0.25);z-index:1000;"></div>
            <div id="eventModalContent" style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:2rem 1.5rem;max-width:420px;width:90vw;border-radius:12px;box-shadow:0 4px 24px rgba(0,51,102,0.18);z-index:1001;">
                <button id="eventModalClose" style="position:absolute;top:10px;right:16px;background:none;border:none;font-size:1.5rem;color:#0055a4;cursor:pointer;">&times;</button>
                <div id="eventModalBody"></div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('eventModalBg').onclick = closeModal;
        document.getElementById('eventModalClose').onclick = closeModal;
    }
    return modal;
}
function showModal(html) {
    const modal = createModal();
    document.getElementById('eventModalBody').innerHTML = html;
    modal.style.display = 'block';
}
function closeModal() {
    const modal = document.getElementById('eventModal');
    if (modal) modal.style.display = 'none';
}

// --- Calendar Rendering ---
const calendarBody = document.getElementById("calendarBody");
const calendarMonth = document.getElementById("calendarMonth");
let current = new Date();

function renderCalendar(year, month) {
    calendarBody.innerHTML = "";
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const today = new Date();
    calendarMonth.textContent = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });

    let row = document.createElement("tr");
    for (let i = 0; i < firstDay.getDay(); i++) {
        row.appendChild(document.createElement("td"));
    }
    for (let date = 1; date <= lastDay.getDate(); date++) {
        if (row.children.length === 7) {
            calendarBody.appendChild(row);
            row = document.createElement("tr");
        }
        const cell = document.createElement("td");
        const iso = `${year}-${String(month+1).padStart(2,'0')}-${String(date).padStart(2,'0')}`;
        if (
            today.getFullYear() === year &&
            today.getMonth() === month &&
            today.getDate() === date
        ) {
            cell.classList.add("today");
        }
        // Event highlight
        if (eventMap[iso]) {
            const dayNum = document.createElement("span");
            dayNum.className = "event-day";
            dayNum.textContent = date;
            cell.appendChild(dayNum);

            const ul = document.createElement("ul");
            ul.className = "event-list";
            eventMap[iso].forEach((eventObj, idx) => {
                const li = document.createElement("li");
                li.textContent = eventObj.desc;
                li.style.cursor = "pointer";
                li.onclick = (e) => {
                    e.stopPropagation();
                    showModal(
                        `<h3 style="color:#0055a4;margin-top:0;">${eventObj.desc}</h3>
                        <div style="margin-bottom:0.5em;font-size:1.05em;color:#003366;">
                            <strong>Time:</strong> ${eventObj.time}<br>
                            <strong>Location:</strong> ${eventObj.location}
                        </div>
                        <div style="font-size:1.05em;color:#003366;">${eventObj.detail}</div>`
                    );
                };
                ul.appendChild(li);
            });
            cell.appendChild(ul);
            // Make the whole cell clickable for the first event
            cell.style.cursor = "pointer";
            cell.onclick = (e) => {
                if (e.target.tagName.toLowerCase() === 'li') return;
                const eventObj = eventMap[iso][0];
                showModal(
                    `<h3 style="color:#0055a4;margin-top:0;">${eventObj.desc}</h3>
                    <div style="margin-bottom:0.5em;font-size:1.05em;color:#003366;">
                        <strong>Time:</strong> ${eventObj.time}<br>
                        <strong>Location:</strong> ${eventObj.location}
                    </div>
                    <div style="font-size:1.05em;color:#003366;">${eventObj.detail}</div>`
                );
            };
        } else {
            cell.textContent = date;
        }
        row.appendChild(cell);
    }
    while (row.children.length < 7) {
        row.appendChild(document.createElement("td"));
    }
    calendarBody.appendChild(row);
}

// --- Navigation ---
function showMonth(offset) {
    current.setMonth(current.getMonth() + offset);
    renderCalendar(current.getFullYear(), current.getMonth());
}
document.getElementById("prevMonth").onclick = () => showMonth(-1);
document.getElementById("nextMonth").onclick = () => showMonth(1);

// --- Initial Render ---
renderCalendar(current.getFullYear(), current.getMonth());
</script>
