// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    themeToggle.innerHTML = `<i class="fas fa-${isDarkMode ? 'sun' : 'moon'}"></i>`;
    localStorage.setItem('darkMode', isDarkMode);
}

themeToggle.addEventListener('click', toggleTheme);
if (isDarkMode) {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// View Toggle
const viewToggle = document.getElementById('viewToggle');
const calendarView = document.getElementById('calendarView');
const listView = document.getElementById('listView');
let isCalendarView = true;

viewToggle.addEventListener('click', () => {
    isCalendarView = !isCalendarView;
    calendarView.style.display = isCalendarView ? 'block' : 'none';
    listView.style.display = isCalendarView ? 'none' : 'grid';
    viewToggle.innerHTML = `
        <i class="fas fa-${isCalendarView ? 'calendar-alt' : 'list'}"></i>
        <span>${isCalendarView ? 'Calendar View' : 'List View'}</span>
    `;
    if (!isCalendarView) {
        generateListView();
    }
});

// Calendar Functionality
const calendarGrid = document.getElementById('calendarGrid');
const currentMonthElement = document.getElementById('currentMonth');
let currentDate = new Date();

function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    currentMonthElement.textContent = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long'
    }).format(date);

    calendarGrid.innerHTML = '';

    // Add day headers
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    days.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day';
        dayHeader.style.fontWeight = 'bold';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });

    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day';
        calendarGrid.appendChild(emptyDay);
    }

    // Get entries from localStorage for this month
    const entries = getEntries();
    const monthEntries = entries.filter(entry => {
        const entryDate = new Date(entry.timestamp);
        return entryDate.getMonth() === month && entryDate.getFullYear() === year;
    });

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        
        const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        const dayEntries = monthEntries.filter(entry => entry.timestamp.startsWith(dateStr));
        
        if (dayEntries.length > 0) {
            dayCell.classList.add('has-entry');
        }

        const dayNumber = document.createElement('div');
        dayNumber.className = 'day-number';
        dayNumber.textContent = day;
        dayCell.appendChild(dayNumber);

        // Add mood dots
        if (dayEntries.length > 0) {
            const moodDotsContainer = document.createElement('div');
            moodDotsContainer.className = 'mood-dots';
            
            dayEntries.forEach(entry => {
                const dot = document.createElement('div');
                dot.className = `mood-dot ${entry.mood}`;
                dot.title = `${entry.title} - ${entry.mood}`;
                moodDotsContainer.appendChild(dot);
            });
            
            dayCell.appendChild(moodDotsContainer);
        }

        dayCell.addEventListener('click', () => showDayEntries(dayEntries));
        calendarGrid.appendChild(dayCell);
    }
}

// Navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

// Local Storage Functions
function getEntries() {
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    // Add some sample entries if none exist
    if (entries.length === 0) {
        const sampleEntries = generateSampleEntries();
        localStorage.setItem('journalEntries', JSON.stringify(sampleEntries));
        return sampleEntries;
    }
    return entries;
}

function generateSampleEntries() {
    const today = new Date();
    return [
        {
            title: "Morning Reflection",
            content: "Started the day with meditation. Feeling centered and ready for the day ahead.",
            mood: "calm",
            tags: ["meditation", "morning routine"],
            timestamp: today.toISOString()
        },
        {
            title: "Productive Day",
            content: "Accomplished all my tasks for today. Feeling satisfied with my progress.",
            mood: "happy",
            tags: ["productivity", "achievement"],
            timestamp: new Date(today.getTime() - 86400000).toISOString()
        }
    ];
}

// List View Functions
function generateListView(entries = null) {
    const listView = document.getElementById('listView');
    listView.innerHTML = '';

    if (!entries) {
        entries = getEntries();
    }

    if (entries.length === 0) {
        listView.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-book-open"></i>
                <h2>No Journal Entries</h2>
                <p>Start journaling to see your entries here.</p>
            </div>
        `;
        return;
    }

    entries.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .forEach(entry => {
            const card = document.createElement('div');
            card.className = 'entry-card';
            card.innerHTML = `
                <div class="entry-header">
                    <h3 class="entry-title">${entry.title}</h3>
                    <span class="entry-date">${formatDate(entry.timestamp)}</span>
                </div>
                <div class="entry-mood">
                    <i class="fas fa-${getMoodIcon(entry.mood)}"></i>
                    ${entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}
                </div>
                <p class="entry-preview">${entry.content.substring(0, 150)}${entry.content.length > 150 ? '...' : ''}</p>
                <div class="entry-tags">
                    ${entry.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            `;
            listView.appendChild(card);
        });
}

// Search and Filter Functions
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', handleSearch);

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    const entries = getEntries();
    
    const filteredEntries = entries.filter(entry => {
        const matchesSearch = (
            entry.title.toLowerCase().includes(searchTerm) ||
            entry.content.toLowerCase().includes(searchTerm) ||
            entry.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
        
        const matchesFilter = activeFilter === 'all' || entry.mood === activeFilter;
        
        return matchesSearch && matchesFilter;
    });

    if (isCalendarView) {
        generateCalendar(currentDate);
    } else {
        generateListView(filteredEntries);
    }
}

// Filter buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        handleSearch();
    });
});

// Utility Functions
function formatDate(dateString) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(dateString));
}

function getMoodIcon(mood) {
    const icons = {
        happy: 'smile',
        calm: 'peace',
        neutral: 'meh',
        anxious: 'frown',
        sad: 'sad-tear'
    };
    return icons[mood] || 'meh';
}

function showDayEntries(entries) {
    if (entries.length > 0) {
        isCalendarView = false;
        calendarView.style.display = 'none';
        listView.style.display = 'grid';
        viewToggle.innerHTML = '<i class="fas fa-list"></i> <span>List View</span>';
        generateListView(entries);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(currentDate);
    generateListView();
});