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
    
    // Note: Tracker screens now use design PNG images
    // No need to render dynamic content - designs are static
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

// Note: Tracker screens now display static design PNG images
// The designs in assets/designs/ folder are used directly
// This maintains visual cohesion with the overall app aesthetic

// Sample data kept for reference but not rendered
// When building the Android app, this data structure can be used