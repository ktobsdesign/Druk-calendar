const holidays = {
    "2025-01-02": "Winter Solstice (Nyilo)",
    "2025-01-30": "Traditional Day of Offerings",
    "2025-02-21": "King's Birthday",
    "2025-02-22": "King's Birthday Holiday",
    "2025-02-23": "King's Birthday Holiday",
    "2025-02-28": "Losar (New Year)",
    "2025-03-01": "Losar Holiday",
    "2025-05-02": "Birth Anniversary of Third Druk Gyalpo",
    "2025-05-07": "Death Anniversary of Zhabdrung (Zhabdrung Kuchoe)",
    "2025-06-11": "Buddha's Parinirvana",
    "2025-07-05": "Birth Anniversary of Guru Rinpoche",
    "2025-07-28": "Buddha's First Sermon",
    "2025-09-23": "Blessed Rainy Day",
    "2025-10-02": "Dashain",
    "2025-11-01": "King Jigme Khesar Namgyel's Coronation",
    "2025-11-11": "Descending Day of Lord Buddha",
    "2025-11-11": "Birth Anniversary of the Fourth Druk Gyalpo",
    "2025-12-17": "National Day"
};

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentMonth = 0; // January (0 index based)

// Initialize the calendar
function loadCalendar(month) {
    const daysGrid = document.getElementById('days-grid');
    daysGrid.innerHTML = ''; // Clear previous days

    // Set month name
    document.getElementById('month-name').textContent = monthNames[month];

    // Generate days of the month
    const firstDay = new Date(2025, month, 1).getDay();
    const lastDate = new Date(2025, month + 1, 0).getDate();

    let dayCount = 1;
    
    // Add blank days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const blankDay = document.createElement('div');
        blankDay.classList.add('day');
        daysGrid.appendChild(blankDay);
    }

    // Add actual days
    for (let i = firstDay; i < firstDay + lastDate; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.textContent = dayCount;

        const date = `2025-${String(month + 1).padStart(2, '0')}-${String(dayCount).padStart(2, '0')}`;

        if (holidays[date]) {
            dayDiv.classList.add('holiday');
            dayDiv.addEventListener('click', () => showPopup(date));
        }

        daysGrid.appendChild(dayDiv);
        dayCount++;
    }
}

// Show holiday detail pop-up
function showPopup(date) {
    const popup = document.getElementById('popup');
    const popupDate = document.getElementById('popup-date');
    const popupEvent = document.getElementById('popup-event');
    
    popupDate.textContent = date;
    popupEvent.textContent = holidays[date];
    
    popup.style.display = 'flex';
}

// Close the holiday pop-up
document.getElementById('popup-close').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

// Navigate to next or previous month
document.getElementById('next-month').addEventListener('click', () => {
    currentMonth = (currentMonth + 1) % 12;
    loadCalendar(currentMonth);
});

document.getElementById('prev-month').addEventListener('click', () => {
    currentMonth = (currentMonth - 1 + 12) % 12;
    loadCalendar(currentMonth);
});

// Load the initial month
loadCalendar(currentMonth);
