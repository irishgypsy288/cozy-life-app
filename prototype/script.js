// Life Management App - Interactive Prototype

// Navigation State
let currentScreen = 'room';

// Sample Data
const booksData = {
    reading: [
        {
            id: 1,
            title: 'The Enchanted Forest',
            author: 'L. Matthews',
            cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop',
            currentPage: 120,
            totalPages: 300,
            progress: 40
        },
        {
            id: 2,
            title: 'Starlit Tales',
            author: 'Emily Harper',
            cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200&h=300&fit=crop',
            currentPage: 85,
            totalPages: 250,
            progress: 34
        }
    ],
    toRead: [
        {
            id: 3,
            title: 'The Cottage by the Sea',
            author: 'Mark Caldwell',
            cover: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop',
            currentPage: 0,
            totalPages: 200,
            progress: 0
        },
        {
            id: 4,
            title: 'Mountain Whispers',
            author: 'Sarah Chen',
            cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200&h=300&fit=crop',
            currentPage: 0,
            totalPages: 350,
            progress: 0
        }
    ],
    completed: [
        {
            id: 5,
            title: 'The Garden Path',
            author: 'James Wilson',
            cover: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=200&h=300&fit=crop',
            currentPage: 280,
            totalPages: 280,
            progress: 100,
            rating: 4.5
        }
    ]
};

const eventsData = [
    {
        id: 1,
        title: 'Team Meeting',
        time: '9:00 AM',
        icon: '💼',
        date: 16
    },
    {
        id: 2,
        title: 'Lunch with Sarah',
        time: '12:30 PM',
        icon: '🍽️',
        date: 16
    },
    {
        id: 3,
        title: 'Yoga Class',
        time: '4:00 PM',
        icon: '🧘',
        date: 16
    }
];

const plantsData = [
    {
        id: 1,
        name: 'Snake Plant',
        species: 'Sansevieria',
        photo: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bb6?w=200&h=200&fit=crop',
        wateringDays: 3,
        status: 'healthy'
    },
    {
        id: 2,
        name: 'Peace Lily',
        species: 'Spathiphyllum',
        photo: 'https://images.unsplash.com/photo-1585318801165-f6d3d5e8b9c1?w=200&h=200&fit=crop',
        wateringDays: 0,
        status: 'urgent'
    },
    {
        id: 3,
        name: 'Pothos',
        species: 'Epipremnum',
        photo: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=200&h=200&fit=crop',
        wateringDays: 2,
        status: 'healthy'
    },
    {
        id: 4,
        name: 'Cactus',
        species: 'Mammillaria',
        photo: 'https://images.unsplash.com/photo-1509937528035-ad76254b0356?w=200&h=200&fit=crop',
        wateringDays: 1,
        status: 'warning'
    }
];

// GLOBAL Navigation Functions - MUST be outside DOMContentLoaded
function navigateToScreen(screenId) {
    console.log('=== NAVIGATING TO:', screenId, '===');
    
    // Hide all screens
    const allScreens = document.querySelectorAll('.screen');
    console.log('Found screens:', allScreens.length);
    
    allScreens.forEach(screen => {
        screen.classList.remove('active');
        screen.style.display = 'none';
        console.log('Hiding screen:', screen.id);
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        targetScreen.style.display = 'block';
        currentScreen = screenId;
        console.log('✓ Successfully showing screen:', screenId);
        
        // Scroll to top
        window.scrollTo(0, 0);
    } else {
        console.error('✗ Screen not found:', screenId);
    }
}

function navigateToRoom() {
    console.log('Navigating back to room');
    navigateToScreen('room-scene');
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== APP INITIALIZED ===');
    
    // Check if first time user
    checkFirstTimeUser();
    
    renderBookTracker();
    renderCalendar();
    renderPlantTracker();
    console.log('=== READY ===');
});

// Check if first time user
function checkFirstTimeUser() {
    const hasVisited = localStorage.getItem('cozylife_visited');
    
    if (!hasVisited) {
        // First time user - show welcome
        console.log('First time user detected');
        localStorage.setItem('cozylife_visited', 'true');
        
        // Redirect to welcome page if not already there
        if (!window.location.pathname.includes('welcome.html')) {
            window.location.href = 'welcome.html';
        }
    }
}

// Book Tracker Functions
function renderBookTracker() {
    setupBookTabs();
    renderBookList('reading');
}

function setupBookTabs() {
    document.querySelectorAll('.book-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            // Update active tab
            document.querySelectorAll('.book-tab').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            // Render corresponding book list
            const status = e.target.dataset.status;
            renderBookList(status);
        });
    });
}

function renderBookList(status) {
    const container = document.getElementById('book-list');
    const books = booksData[status] || [];
    
    if (books.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <div class="empty-state-text">No books here yet</div>
                <div class="empty-state-subtext">Add your first book to get started</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = books.map(book => `
        <div class="card">
            <img src="${book.cover}" alt="${book.title}" class="card-image">
            <div class="card-content">
                <div class="card-title">${book.title}</div>
                <div class="card-subtitle">${book.author}</div>
                <div class="card-meta">
                    ${book.currentPage} / ${book.totalPages} pages
                    ${book.rating ? `<br>⭐ ${book.rating}/5` : ''}
                </div>
                ${status === 'reading' ? `
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${book.progress}%"></div>
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');
}

// Calendar Functions
function renderCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonth = 'October 2024';
    
    // Render calendar header
    const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    let calendarHTML = daysOfWeek.map(day => 
        `<div class="calendar-header">${day}</div>`
    ).join('');
    
    // Render calendar days (simplified - October 2024)
    const daysInMonth = 31;
    const startDay = 2; // October 1, 2024 is a Tuesday
    
    // Empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
        calendarHTML += '<div class="calendar-day"></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const hasEvent = [5, 13, 16, 19, 21, 27].includes(day);
        const isSelected = day === 16;
        calendarHTML += `
            <div class="calendar-day ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}"
                 onclick="selectDate(${day})">
                ${day}
            </div>
        `;
    }
    
    calendarGrid.innerHTML = calendarHTML;
    
    // Render events for selected date
    renderEvents();
}

function selectDate(day) {
    // Update selected day
    document.querySelectorAll('.calendar-day').forEach(el => {
        el.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Render events for this day (simplified - always show same events)
    renderEvents();
}

function renderEvents() {
    const eventList = document.getElementById('event-list');
    
    eventList.innerHTML = eventsData.map(event => `
        <div class="event-card">
            <div class="event-time">${event.time}</div>
            <div class="event-details">
                <div class="event-title">${event.title}</div>
            </div>
            <div class="event-icon">${event.icon}</div>
        </div>
    `).join('');
}

// Plant Tracker Functions
function renderPlantTracker() {
    const container = document.getElementById('plant-list');
    
    container.innerHTML = plantsData.map(plant => {
        let statusBadge = '';
        let buttonClass = '';
        let statusText = '';
        
        if (plant.status === 'healthy') {
            statusBadge = 'healthy';
            statusText = `Water in ${plant.wateringDays} days`;
        } else if (plant.status === 'warning') {
            statusBadge = 'warning';
            buttonClass = 'urgent';
            statusText = 'Needs Water Soon!';
        } else if (plant.status === 'urgent') {
            statusBadge = 'urgent';
            buttonClass = 'urgent';
            statusText = 'Very Thirsty!';
        }
        
        return `
            <div class="card plant-card">
                <img src="${plant.photo}" alt="${plant.name}" class="card-image" style="border-radius: 50%;">
                <div class="card-content">
                    <div class="card-title">${plant.name}</div>
                    <div class="card-subtitle">${plant.species}</div>
                    <div class="watering-status">
                        ${plant.status === 'healthy' ? 
                            '💧'.repeat(Math.min(plant.wateringDays, 3)) : 
                            ''}
                        <span class="card-meta">${statusText}</span>
                    </div>
                    ${plant.status !== 'healthy' ? 
                        `<span class="status-badge ${statusBadge}">${statusText}</span>` : 
                        ''}
                </div>
                <button class="water-button ${buttonClass}" onclick="waterPlant(${plant.id})">
                    Water Now
                </button>
            </div>
        `;
    }).join('');
}

function waterPlant(plantId) {
    // Find the plant
    const plant = plantsData.find(p => p.id === plantId);
    if (plant) {
        // Update plant status
        plant.status = 'healthy';
        plant.wateringDays = 7;
        
        // Show feedback
        alert(`✅ ${plant.name} has been watered!`);
        
        // Re-render
        renderPlantTracker();
    }
}