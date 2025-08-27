---
layout: page
title: Events Calendar
permalink: /events/
---

{% include nav.html %}

## 2025–2026 Events Calendar

<style>
.calendar-container {
    max-width: 700px;
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
    min-width: 90px;
    max-width: 120px;
    height: 90px;
    min-height: 90px;
    vertical-align: top;
    border: 1px solid #eee;
    padding: 6px 4px 4px 4px;
    position: relative;
    font-size: 0.97em;
    word-break: break-word;
}
.calendar-table th {
    background: #ffd100;
    color: #003366;
    font-weight: 700;
    font-size: 1rem;
}
.event-day {
    color: #0055a4;
    font-weight: bold;
    font-size: 1.1em;
    margin-right: 4px;
}
.event-list {
    margin: 0.5em 0 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.93em;
}
.event-list li {
    background: #e6f0fa;
    color: #003366;
    border-radius: 6px;
    margin-bottom: 2px;
    padding: 2px 6px;
    font-size: 0.93em;
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
        font-size: 0.85em;
    }
    .event-list li {
        font-size: 0.85em;
    }
}
</style>

<div class="calendar-container">
    <div class="calendar-nav">
        <button id="prevMonth" aria-label="Previous Month">&lt;</button>
        <span id="calendarMonth"></span>
        <button id="nextMonth" aria-label="Next Month">&gt;</button>
    </div>
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

<script>
// --- Event Data ---
const events = [
    { date: "2025-09-02", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Join us for our regular Den Meeting. Scouts will work on advancement while participating in fun activities and learn new skills. Parents are welcome to attend." },
    { date: "2025-09-16", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll work on advancement and enjoy team-building games." },
    { date: "2025-09-30", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll work on advancement and enjoy team-building games." },
    { date: "2025-10-14", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll be preparing for our upcoming campout. Parents, please attend for important info." },
    { date: "2025-11-04", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll work on advancement and discuss upcoming events. Parents are welcome." },
    { date: "2025-11-18", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll work on a service project for our community." },
    { date: "2025-12-02", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Holiday crafts and activities for all scouts." },
    { date: "2025-12-16", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "End-of-year Den Meeting. We'll celebrate our achievements and enjoy snacks together." },
    { date: "2026-01-06", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "First Den Meeting of the new year! We'll set goals and plan for upcoming adventures." },
    { date: "2026-01-20", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Focus on leadership and teamwork activities." },
    { date: "2026-02-10", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll prepare for the Pinewood Derby and work on car designs." },
    { date: "2026-02-24", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Final touches for Pinewood Derby cars and practice races." },
    { date: "2026-03-10", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll explore science experiments and STEM fun." },
    { date: "2026-03-24", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll explore science experiments and STEM fun." },
    { date: "2026-04-14", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Outdoor games and nature exploration (weather permitting)." },
    { date: "2026-04-28", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Preparing for the Roller Activity at Tempelhofer Feld." },
    { date: "2026-05-05", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. We'll discuss summer plans and review scout skills." },
    { date: "2026-05-19", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. End-of-year review and awards." },
    { date: "2026-06-02", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Outdoor fun and games to celebrate the end of the school year." },
    { date: "2026-06-16", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Summer kickoff and planning for camp." },
    { date: "2026-06-30", desc: "Den Meeting", time: "4pm – 5pm", location: "JFKS Large Aula", detail: "Den Meeting. Final meeting before summer break." },
    { date: "2025-08-19", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers . We'll discuss the upcoming scouting year and volunteer opportunities." },
    { date: "2025-09-09", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. Planning for the Camping and fall events." },
    { date: "2025-10-07", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. Review of September events and preparation for October activities." },
    { date: "2025-11-04", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. We'll discuss upcoming events and planning." },
    { date: "2025-12-09", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. Holiday planning and service project review." },
    { date: "2026-01-13", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. New year planning and Pinewood Derby logistics." },
    { date: "2026-02-17", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. Finalize details for the Pinewood Derby and spring events." },
    { date: "2026-03-10", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. Planning for spring events and activities." },
    { date: "2026-04-21", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. Campout and crossover ceremony planning." },
    { date: "2026-05-12", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. End-of-year wrap-up and feedback." },
    { date: "2026-06-09", desc: "Committee Meeting", time: "8pm – 10pm", location: "Virtual", detail: "Committee Meeting for parent volunteers and leaders. Summer planning and volunteer appreciation." },
    { date: "2025-07-27", desc: "Lakeside Hiking with swimming and picnic", time: "TBD", location: "TBD", detail: "Join us for a day of hiking, swimming, and a picnic by the lake! Bring swimwear, sunscreen, and a packed lunch. <br><img src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' alt='Lakeside' style='max-width:100%;border-radius:8px;margin-top:8px;'>" },
    { date: "2025-09-03", desc: "Info Fair", time: "TBD", location: "TBD", detail: "Visit our booth at the JFKS Info Fair to learn more about Pack 152 and Cub Scouts. Open to all current and prospective member families of JFKS students." },
    { date: "2025-09-06", desc: "Open house", time: "2pm – 5pm", location: "Schönower Park next to JFK School, Zehlendorf", detail: "Open House for new and prospective scouts and families. Meet our leaders, learn about our program, and enjoy fun activities." },
    { date: "2025-09-19", desc: "Welcome back Campout (Day 1)", time: "From 5pm", location: "<a href=\"https://zev-berlin.com\" target=\"_blank\">Zeltlagerplatz Heiligensee</a>", detail: "Annual Welcome Back Campout begins! Enjoy camping, campfire songs, and outdoor games. <br>Location: Grunewald Forest. <br>Bring your tent and camping gear." },
    { date: "2025-09-20", desc: "Welcome back Campout (Day 2)", time: "All Day", location: "<a href=\"https://zev-berlin.com\" target=\"_blank\">Zeltlagerplatz Heiligensee</a>", detail: "Welcome Back Campout continues. More outdoor fun and activities." },
    { date: "2025-09-21", desc: "Welcome back Campout (Day 3)", time: "Until noon", location: "<a href=\"https://zev-berlin.com\" target=\"_blank\">Zeltlagerplatz Heiligensee</a>", detail: "Final day of the Welcome Back Campout. Pack up and say goodbye until next time!" },
    { date: "2025-10-03", desc: "Edelweiss Family campout (Day 1)", time: "See Event Link", location: "Camp Freedom, (Frankenkaserne) Munasiedlung Germany", detail: "Edelweiss District Family Campout. All Cub Scout Families welcome! <a href='https://scoutingevent.com/802-2025FALLEdelweissCubs' target='_blank'>Learn more</a>." },
    { date: "2025-10-04", desc: "Edelweiss Family campout (Day 2)", time: "See Event Link", location: "Camp Freedom, (Frankenkaserne) Munasiedlung Germany", detail: "Edelweiss District Family Campout. All Cub Scout Families welcome! <a href='https://scoutingevent.com/802-2025FALLEdelweissCubs' target='_blank'>Learn more</a>." },
    { date: "2025-10-05", desc: "Edelweiss Family campout (Day 3)", time: "See Event Link", location: "Camp Freedom, (Frankenkaserne) Munasiedlung Germany", detail: "Final day of the Edelweiss District Family Campout. <a href='https://scoutingevent.com/802-2025FALLEdelweissCubs' target='_blank'>Learn more</a>." },
    { date: "2025-10-11", desc: "Hiking/Mauerpark, Bernauer str", time: "TBD", location: "TBD", detail: "Pack hike at Mauerpark and Bernauer Straße. Bring comfortable shoes and a snack." },
    { date: "2025-10-17", desc: "JOTI (Day 1)", time: "TBD", location: "TBD", detail: "Jamboree on the Internet (JOTI) begins: Connect with scouts worldwide online! We'll have computers set up for chatting and games." },
    { date: "2025-10-18", desc: "JOTI (Day 2)", time: "TBD", location: "TBD", detail: "JOTI continues. More online activities and global connections." },
    { date: "2025-10-19", desc: "JOTI (Day 3)", time: "TBD", location: "TBD", detail: "Final day of JOTI. Share your experiences and say goodbye to new friends." },
    { date: "2025-11-16", desc: "Museum Visit", time: "TBD", location: "TBD", detail: "Pack visit to the German Museum of Technology. Explore hands-on exhibits and learn about science and engineering." },
    { date: "2025-12-06", desc: "Food Drive/Church service", time: "TBD", location: "TBD", detail: "Annual food drive and community service at the local church. Please bring non-perishable food items to donate." },
    { date: "2026-01-24", desc: "Pit Stop", time: "TBD", location: "TBD", detail: "Pinewood Derby Pit Stop: Final car checks and practice runs before the big race!" },
    { date: "2026-02-28", desc: "Pinewood Derby", time: "TBD", location: "TBD", detail: "Pinewood Derby Race Day! Bring your car and cheer on your fellow scouts. Prizes for speed and creativity." },
    { date: "2026-03-21", desc: "Futurium Visit", time: "TBD", location: "TBD", detail: "Pack trip to the Futurium museum. Discover the future of science and technology. <a href='https://futurium.de/en' target='_blank'>Futurium Website</a>." },
    { date: "2026-04-25", desc: "Roller Activity/Tempelhofer Feld", time: "TBD", location: "TBD", detail: "Roller skating and games at Tempelhofer Feld. Bring your skates or borrow a pair at the park." },
    { date: "2026-05-22", desc: "Annual Campout (Day 1)", time: "TBD", location: "TBD", detail: "Our biggest campout of the year begins! Three nights of camping, hiking, and fun. Families welcome." },
    { date: "2026-05-23", desc: "Annual Campout (Day 2)", time: "TBD", location: "TBD", detail: "Annual Campout continues. More outdoor fun and activities." },
    { date: "2026-05-24", desc: "Annual Campout (Day 3)", time: "TBD", location: "TBD", detail: "Annual Campout continues. Campfire and group games." },
    { date: "2026-05-25", desc: "Annual Campout (Day 4)", time: "TBD", location: "TBD", detail: "Final day of the Annual Campout. Pack up and say goodbye until next year!" },
    { date: "2026-06-13", desc: "Crossover Ceremony", time: "TBD", location: "TBD", detail: "Celebrate our scouts moving up to the next rank. Ceremony followed by a picnic and games." }
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
