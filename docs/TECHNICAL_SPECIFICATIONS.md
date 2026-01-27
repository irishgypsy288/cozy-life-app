# Technical Specifications - Life Management Android App

## 1. Application Architecture

### Architecture Pattern: MVVM (Model-View-ViewModel)

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│  (Jetpack Compose UI + ViewModels)     │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│            Domain Layer                 │
│     (Use Cases + Business Logic)        │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│             Data Layer                  │
│  (Repositories + Data Sources + Room)   │
└─────────────────────────────────────────┘
```

## 2. Database Schema

### Room Database Tables

#### Books Table
```sql
CREATE TABLE books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT,
    cover_image_uri TEXT,
    status TEXT CHECK(status IN ('reading', 'to_read', 'completed')),
    current_page INTEGER DEFAULT 0,
    total_pages INTEGER,
    rating REAL,
    notes TEXT,
    start_date INTEGER,
    finish_date INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

#### Calendar Events Table
```sql
CREATE TABLE calendar_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    event_date INTEGER NOT NULL,
    event_time TEXT,
    reminder_enabled INTEGER DEFAULT 0,
    reminder_time INTEGER,
    is_all_day INTEGER DEFAULT 0,
    category TEXT,
    color TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

#### Plants Table
```sql
CREATE TABLE plants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT,
    photo_uri TEXT,
    location TEXT,
    watering_frequency_days INTEGER,
    last_watered_date INTEGER,
    next_watering_date INTEGER,
    care_notes TEXT,
    acquired_date INTEGER,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
);
```

#### Watering History Table
```sql
CREATE TABLE watering_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    plant_id INTEGER NOT NULL,
    watered_date INTEGER NOT NULL,
    notes TEXT,
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);
```

#### App Settings Table
```sql
CREATE TABLE app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);
```

## 3. Core Components Structure

### 3.1 Main Room Scene Component

**RoomSceneScreen.kt**
- Displays the main room illustration
- Handles tap detection on interactive objects
- Manages navigation to different trackers
- Implements parallax or subtle animations

**Interactive Hotspots:**
```kotlin
data class InteractiveObject(
    val id: String,
    val bounds: Rect,  // Tappable area
    val destination: Screen,
    val rippleEffect: Boolean = true
)

// Example hotspots
val bookshelfHotspot = InteractiveObject(
    id = "bookshelf",
    bounds = Rect(100, 200, 300, 500),
    destination = Screen.BookTracker
)
```

### 3.2 Book Tracker Module

**Screens:**
- BookListScreen (shows all books by status)
- BookDetailScreen (individual book details)
- AddEditBookScreen (add/edit book information)

**ViewModel:**
```kotlin
class BookTrackerViewModel : ViewModel() {
    val readingBooks: StateFlow<List<Book>>
    val toReadBooks: StateFlow<List<Book>>
    val completedBooks: StateFlow<List<Book>>
    
    fun addBook(book: Book)
    fun updateBook(book: Book)
    fun deleteBook(bookId: Long)
    fun updateReadingProgress(bookId: Long, currentPage: Int)
    fun markAsCompleted(bookId: Long, rating: Float)
}
```

### 3.3 Calendar Module

**Screens:**
- CalendarMonthView (monthly calendar grid)
- CalendarDayView (detailed day view)
- EventDetailScreen (view/edit event)
- AddEventScreen (create new event)

**ViewModel:**
```kotlin
class CalendarViewModel : ViewModel() {
    val eventsForMonth: StateFlow<Map<LocalDate, List<CalendarEvent>>>
    val upcomingEvents: StateFlow<List<CalendarEvent>>
    
    fun addEvent(event: CalendarEvent)
    fun updateEvent(event: CalendarEvent)
    fun deleteEvent(eventId: Long)
    fun getEventsForDate(date: LocalDate): List<CalendarEvent>
}
```

### 3.4 Plant Tracker Module

**Screens:**
- PlantListScreen (all plants with watering status)
- PlantDetailScreen (individual plant details)
- AddEditPlantScreen (add/edit plant)
- WateringHistoryScreen (watering log)

**ViewModel:**
```kotlin
class PlantTrackerViewModel : ViewModel() {
    val allPlants: StateFlow<List<Plant>>
    val plantsNeedingWater: StateFlow<List<Plant>>
    
    fun addPlant(plant: Plant)
    fun updatePlant(plant: Plant)
    fun deletePlant(plantId: Long)
    fun recordWatering(plantId: Long, date: LocalDate, notes: String?)
    fun getWateringHistory(plantId: Long): List<WateringRecord>
}
```

## 4. Navigation Structure

```kotlin
sealed class Screen(val route: String) {
    object RoomScene : Screen("room_scene")
    object BookTracker : Screen("book_tracker")
    object Calendar : Screen("calendar")
    object PlantTracker : Screen("plant_tracker")
    object BookDetail : Screen("book_detail/{bookId}")
    object EventDetail : Screen("event_detail/{eventId}")
    object PlantDetail : Screen("plant_detail/{plantId}")
}
```

## 5. Data Models

### Book Model
```kotlin
data class Book(
    val id: Long = 0,
    val title: String,
    val author: String?,
    val coverImageUri: String?,
    val status: BookStatus,
    val currentPage: Int = 0,
    val totalPages: Int?,
    val rating: Float?,
    val notes: String?,
    val startDate: LocalDate?,
    val finishDate: LocalDate?,
    val createdAt: Instant,
    val updatedAt: Instant
)

enum class BookStatus {
    READING, TO_READ, COMPLETED
}
```

### Calendar Event Model
```kotlin
data class CalendarEvent(
    val id: Long = 0,
    val title: String,
    val description: String?,
    val eventDate: LocalDate,
    val eventTime: LocalTime?,
    val reminderEnabled: Boolean = false,
    val reminderTime: Instant?,
    val isAllDay: Boolean = false,
    val category: String?,
    val color: String?,
    val createdAt: Instant,
    val updatedAt: Instant
)
```

### Plant Model
```kotlin
data class Plant(
    val id: Long = 0,
    val name: String,
    val species: String?,
    val photoUri: String?,
    val location: String?,
    val wateringFrequencyDays: Int,
    val lastWateredDate: LocalDate?,
    val nextWateringDate: LocalDate?,
    val careNotes: String?,
    val acquiredDate: LocalDate?,
    val createdAt: Instant,
    val updatedAt: Instant
)

data class WateringRecord(
    val id: Long = 0,
    val plantId: Long,
    val wateredDate: LocalDate,
    val notes: String?
)
```

## 6. Notification System

### Reminder Types
1. **Calendar Event Reminders**
   - Configurable time before event
   - Notification with event details
   - Action to open event

2. **Plant Watering Reminders**
   - Daily check for plants needing water
   - Notification with plant names
   - Action to mark as watered

3. **Reading Goals** (Future)
   - Daily reading reminders
   - Weekly progress notifications

### Implementation
```kotlin
class NotificationManager {
    fun scheduleEventReminder(event: CalendarEvent)
    fun schedulePlantWateringReminder(plant: Plant)
    fun cancelReminder(reminderId: String)
}
```

## 7. UI/UX Specifications

### Main Room Scene
- **Resolution:** Support multiple screen sizes (phone & tablet)
- **Orientation:** Portrait primary, landscape optional
- **Interactive Feedback:**
  - Ripple effect on tap
  - Subtle scale animation (0.95x) on press
  - Haptic feedback on interaction
  - Visual highlight on selected object

### Transitions
- **Room to Tracker:** Slide up animation (300ms)
- **Tracker to Room:** Slide down animation (300ms)
- **Between Trackers:** Cross-fade (200ms)

### Color Palette (Cozy Theme)
```kotlin
val CozyColorPalette = lightColorScheme(
    primary = Color(0xFF8B7355),      // Warm brown
    secondary = Color(0xFF9CAF88),    // Sage green
    tertiary = Color(0xFFD4A574),     // Warm beige
    background = Color(0xFFF5F1E8),   // Cream
    surface = Color(0xFFFFFFFF),      // White
    onPrimary = Color(0xFFFFFFFF),
    onSecondary = Color(0xFF2D3319),
    onBackground = Color(0xFF3D3D3D),
    onSurface = Color(0xFF3D3D3D)
)
```

### Typography
```kotlin
val CozyTypography = Typography(
    displayLarge = TextStyle(
        fontFamily = FontFamily.Serif,
        fontSize = 57.sp,
        lineHeight = 64.sp
    ),
    headlineMedium = TextStyle(
        fontFamily = FontFamily.Serif,
        fontSize = 28.sp,
        lineHeight = 36.sp
    ),
    bodyLarge = TextStyle(
        fontFamily = FontFamily.SansSerif,
        fontSize = 16.sp,
        lineHeight = 24.sp
    )
)
```

## 8. Performance Requirements

### Target Metrics
- **App Launch Time:** < 2 seconds (cold start)
- **Room Scene Load:** < 500ms
- **Tracker Navigation:** < 200ms
- **Database Queries:** < 100ms for typical operations
- **Memory Usage:** < 150MB average
- **Battery Impact:** Minimal (< 2% per hour of active use)

### Optimization Strategies
1. **Image Loading:** Use Coil with memory caching
2. **Database:** Index frequently queried columns
3. **UI:** Lazy loading for lists, pagination for large datasets
4. **Background Work:** Use WorkManager for scheduled tasks
5. **Room Scene:** Use vector graphics where possible, optimize bitmap sizes

## 9. Testing Strategy

### Unit Tests
- ViewModels business logic
- Use cases
- Repository implementations
- Data transformations

### Integration Tests
- Database operations
- Repository + Data source interactions
- Navigation flows

### UI Tests
- Critical user flows
- Room scene interactions
- Tracker CRUD operations

## 10. Security & Privacy

### Data Storage
- All data stored locally using Room (SQLite)
- No cloud sync in MVP (future feature)
- Encrypted shared preferences for sensitive settings

### Permissions Required
- **CAMERA:** For taking plant photos (optional)
- **READ_EXTERNAL_STORAGE:** For selecting book covers/plant photos
- **POST_NOTIFICATIONS:** For reminders (Android 13+)
- **SCHEDULE_EXACT_ALARM:** For precise event reminders

### Privacy Considerations
- No analytics in MVP
- No third-party SDKs
- All data remains on device
- Clear data deletion options

## 11. Build Configuration

### Minimum Requirements
- **Min SDK:** 26 (Android 8.0)
- **Target SDK:** 34 (Android 14)
- **Compile SDK:** 34

### Dependencies (Key Libraries)
```gradle
// Jetpack Compose
implementation "androidx.compose.ui:ui:1.5.4"
implementation "androidx.compose.material3:material3:1.1.2"

// Room Database
implementation "androidx.room:room-runtime:2.6.0"
kapt "androidx.room:room-compiler:2.6.0"
implementation "androidx.room:room-ktx:2.6.0"

// Navigation
implementation "androidx.navigation:navigation-compose:2.7.5"

// ViewModel
implementation "androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2"

// Coroutines
implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3"

// Image Loading
implementation "io.coil-kt:coil-compose:2.5.0"

// Dependency Injection
implementation "com.google.dagger:hilt-android:2.48"
kapt "com.google.dagger:hilt-compiler:2.48"
```

## 12. Future Enhancements

### Phase 2 Features
- Room customization (furniture, colors, decorations)
- Additional trackers (habits, mood, fitness)
- Widgets for home screen
- Dark mode support
- Backup/restore functionality

### Phase 3 Features
- Cloud sync across devices
- Social features (share reading lists, etc.)
- Multiple room themes
- Advanced statistics and insights
- Integration with external services (Goodreads, Google Calendar)