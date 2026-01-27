# Developer Handoff Document - Cozy Life App

## Project Overview

**App Name:** Cozy Life  
**Platform:** Android (Kotlin)  
**Minimum SDK:** 26 (Android 8.0)  
**Target SDK:** 34 (Android 14)  
**Architecture:** MVVM with Clean Architecture  

## Quick Start Guide

### 1. Project Setup

```bash
# Clone repository (when available)
git clone [repository-url]

# Open in Android Studio
# File > Open > Select project directory

# Sync Gradle files
# Build > Make Project
```

### 2. Key Dependencies

```gradle
// build.gradle (app level)
dependencies {
    // Jetpack Compose
    implementation "androidx.compose.ui:ui:1.5.4"
    implementation "androidx.compose.material3:material3:1.1.2"
    implementation "androidx.compose.ui:ui-tooling-preview:1.5.4"
    
    // Navigation
    implementation "androidx.navigation:navigation-compose:2.7.5"
    
    // ViewModel
    implementation "androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2"
    implementation "androidx.lifecycle:lifecycle-runtime-compose:2.6.2"
    
    // Room Database
    implementation "androidx.room:room-runtime:2.6.0"
    implementation "androidx.room:room-ktx:2.6.0"
    kapt "androidx.room:room-compiler:2.6.0"
    
    // Coroutines
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3"
    
    // Image Loading
    implementation "io.coil-kt:coil-compose:2.5.0"
    
    // Dependency Injection
    implementation "com.google.dagger:hilt-android:2.48"
    kapt "com.google.dagger:hilt-compiler:2.48"
    implementation "androidx.hilt:hilt-navigation-compose:1.1.0"
    
    // Date/Time
    implementation "org.jetbrains.kotlinx:kotlinx-datetime:0.4.1"
    
    // Testing
    testImplementation "junit:junit:4.13.2"
    androidTestImplementation "androidx.test.ext:junit:1.1.5"
    androidTestImplementation "androidx.compose.ui:ui-test-junit4:1.5.4"
}
```

### 3. Project Structure

```
app/
├── src/
│   ├── main/
│   │   ├── java/com/cozylife/
│   │   │   ├── data/
│   │   │   │   ├── local/
│   │   │   │   │   ├── dao/
│   │   │   │   │   │   ├── BookDao.kt
│   │   │   │   │   │   ├── CalendarEventDao.kt
│   │   │   │   │   │   └── PlantDao.kt
│   │   │   │   │   ├── entity/
│   │   │   │   │   │   ├── BookEntity.kt
│   │   │   │   │   │   ├── CalendarEventEntity.kt
│   │   │   │   │   │   └── PlantEntity.kt
│   │   │   │   │   └── AppDatabase.kt
│   │   │   │   ├── repository/
│   │   │   │   │   ├── BookRepository.kt
│   │   │   │   │   ├── CalendarRepository.kt
│   │   │   │   │   └── PlantRepository.kt
│   │   │   │   └── model/
│   │   │   │       ├── Book.kt
│   │   │   │       ├── CalendarEvent.kt
│   │   │   │       └── Plant.kt
│   │   │   ├── domain/
│   │   │   │   ├── usecase/
│   │   │   │   │   ├── book/
│   │   │   │   │   ├── calendar/
│   │   │   │   │   └── plant/
│   │   │   │   └── repository/
│   │   │   ├── presentation/
│   │   │   │   ├── room/
│   │   │   │   │   ├── RoomSceneScreen.kt
│   │   │   │   │   └── RoomSceneViewModel.kt
│   │   │   │   ├── book/
│   │   │   │   │   ├── BookTrackerScreen.kt
│   │   │   │   │   ├── BookTrackerViewModel.kt
│   │   │   │   │   ├── BookDetailScreen.kt
│   │   │   │   │   └── AddEditBookScreen.kt
│   │   │   │   ├── calendar/
│   │   │   │   │   ├── CalendarScreen.kt
│   │   │   │   │   ├── CalendarViewModel.kt
│   │   │   │   │   └── EventDetailScreen.kt
│   │   │   │   ├── plant/
│   │   │   │   │   ├── PlantTrackerScreen.kt
│   │   │   │   │   ├── PlantTrackerViewModel.kt
│   │   │   │   │   └── PlantDetailScreen.kt
│   │   │   │   ├── components/
│   │   │   │   │   ├── CozyCard.kt
│   │   │   │   │   ├── CozyButton.kt
│   │   │   │   │   ├── CozyFAB.kt
│   │   │   │   │   └── CozyHeader.kt
│   │   │   │   ├── navigation/
│   │   │   │   │   └── NavGraph.kt
│   │   │   │   └── theme/
│   │   │   │       ├── Color.kt
│   │   │   │       ├── Theme.kt
│   │   │   │       └── Type.kt
│   │   │   ├── di/
│   │   │   │   ├── AppModule.kt
│   │   │   │   ├── DatabaseModule.kt
│   │   │   │   └── RepositoryModule.kt
│   │   │   ├── util/
│   │   │   │   ├── Constants.kt
│   │   │   │   ├── DateUtils.kt
│   │   │   │   └── NotificationHelper.kt
│   │   │   └── CozyLifeApplication.kt
│   │   ├── res/
│   │   │   ├── drawable/
│   │   │   │   ├── room_scene.xml (or .png)
│   │   │   │   ├── ic_book.xml
│   │   │   │   ├── ic_calendar.xml
│   │   │   │   └── ic_plant.xml
│   │   │   ├── values/
│   │   │   │   ├── colors.xml
│   │   │   │   ├── strings.xml
│   │   │   │   └── themes.xml
│   │   │   └── mipmap/
│   │   │       └── ic_launcher.png (app icon)
│   │   └── AndroidManifest.xml
│   └── test/
└── build.gradle
```

## Implementation Guide

### Phase 1: Core Setup (Week 1)

#### Day 1-2: Project Initialization
- [ ] Create new Android Studio project
- [ ] Set up Gradle dependencies
- [ ] Configure Hilt for dependency injection
- [ ] Set up Room database
- [ ] Create base architecture (data, domain, presentation layers)

#### Day 3-4: Database Implementation
- [ ] Create entity classes (BookEntity, CalendarEventEntity, PlantEntity)
- [ ] Implement DAOs with CRUD operations
- [ ] Create AppDatabase class
- [ ] Write database migration strategy
- [ ] Add sample data for testing

#### Day 5: Repository Layer
- [ ] Implement repositories for each feature
- [ ] Add data mapping between entities and domain models
- [ ] Set up coroutine flows for reactive data
- [ ] Write repository unit tests

### Phase 2: Room Scene (Week 2)

#### Day 1-2: Room Scene UI
```kotlin
@Composable
fun RoomSceneScreen(
    onNavigateToBookTracker: () -> Unit,
    onNavigateToCalendar: () -> Unit,
    onNavigateToPlantTracker: () -> Unit
) {
    Box(modifier = Modifier.fillMaxSize()) {
        // Room illustration
        Image(
            painter = painterResource(R.drawable.room_scene),
            contentDescription = "Cozy room",
            modifier = Modifier.fillMaxSize(),
            contentScale = ContentScale.Crop
        )
        
        // Interactive hotspots
        InteractiveHotspot(
            bounds = Rect(0.05f, 0.15f, 0.30f, 0.55f),
            onClick = onNavigateToBookTracker,
            contentDescription = "Book Tracker"
        )
        
        InteractiveHotspot(
            bounds = Rect(0.72f, 0.12f, 0.92f, 0.37f),
            onClick = onNavigateToCalendar,
            contentDescription = "Calendar"
        )
        
        InteractiveHotspot(
            bounds = Rect(0.82f, 0.60f, 1.0f, 0.85f),
            onClick = onNavigateToPlantTracker,
            contentDescription = "Plant Tracker"
        )
    }
}

@Composable
fun InteractiveHotspot(
    bounds: Rect,
    onClick: () -> Unit,
    contentDescription: String
) {
    BoxWithConstraints(modifier = Modifier.fillMaxSize()) {
        val width = maxWidth
        val height = maxHeight
        
        Box(
            modifier = Modifier
                .offset(
                    x = width * bounds.left,
                    y = height * bounds.top
                )
                .size(
                    width = width * (bounds.right - bounds.left),
                    height = height * (bounds.bottom - bounds.top)
                )
                .clickable(
                    onClick = onClick,
                    indication = rememberRipple(),
                    interactionSource = remember { MutableInteractionSource() }
                )
                .semantics { this.contentDescription = contentDescription }
        )
    }
}
```

#### Day 3-5: Navigation Setup
```kotlin
@Composable
fun NavGraph(
    navController: NavHostController = rememberNavController()
) {
    NavHost(
        navController = navController,
        startDestination = Screen.RoomScene.route
    ) {
        composable(Screen.RoomScene.route) {
            RoomSceneScreen(
                onNavigateToBookTracker = {
                    navController.navigate(Screen.BookTracker.route)
                },
                onNavigateToCalendar = {
                    navController.navigate(Screen.Calendar.route)
                },
                onNavigateToPlantTracker = {
                    navController.navigate(Screen.PlantTracker.route)
                }
            )
        }
        
        composable(Screen.BookTracker.route) {
            BookTrackerScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
        
        composable(Screen.Calendar.route) {
            CalendarScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
        
        composable(Screen.PlantTracker.route) {
            PlantTrackerScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
    }
}
```

### Phase 3: Book Tracker (Week 3)

#### Implementation Steps
1. Create BookTrackerViewModel with StateFlow
2. Implement tab switching logic
3. Create book card composable
4. Add progress bar component
5. Implement add/edit book screens
6. Add book detail screen

#### Key Code Example
```kotlin
@Composable
fun BookTrackerScreen(
    viewModel: BookTrackerViewModel = hiltViewModel(),
    onNavigateBack: () -> Unit
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    
    Scaffold(
        topBar = {
            CozyTopBar(
                title = "My Books",
                onNavigateBack = onNavigateBack
            )
        },
        floatingActionButton = {
            CozyFAB(
                onClick = { viewModel.onAddBookClick() },
                icon = Icons.Default.Add
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            // Tabs
            TabRow(
                selectedTabIndex = uiState.selectedTab,
                containerColor = CozyTheme.colors.background
            ) {
                BookStatus.values().forEachIndexed { index, status ->
                    Tab(
                        selected = uiState.selectedTab == index,
                        onClick = { viewModel.onTabSelected(index) },
                        text = { Text(status.displayName) }
                    )
                }
            }
            
            // Book list
            LazyColumn(
                modifier = Modifier.fillMaxSize(),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                items(uiState.books) { book ->
                    BookCard(
                        book = book,
                        onClick = { viewModel.onBookClick(book.id) }
                    )
                }
            }
        }
    }
}
```

### Phase 4: Calendar (Week 4)

#### Implementation Steps
1. Create calendar grid composable
2. Implement date selection logic
3. Create event list view
4. Add event detail screen
5. Implement add/edit event functionality
6. Set up notification scheduling

#### Key Components
```kotlin
@Composable
fun CalendarGrid(
    selectedDate: LocalDate,
    events: Map<LocalDate, List<CalendarEvent>>,
    onDateSelected: (LocalDate) -> Unit
) {
    val daysInMonth = selectedDate.lengthOfMonth()
    val firstDayOfMonth = selectedDate.withDayOfMonth(1)
    val startDayOfWeek = firstDayOfMonth.dayOfWeek.value % 7
    
    LazyVerticalGrid(
        columns = GridCells.Fixed(7),
        contentPadding = PaddingValues(8.dp),
        horizontalArrangement = Arrangement.spacedBy(4.dp),
        verticalArrangement = Arrangement.spacedBy(4.dp)
    ) {
        // Day headers
        items(7) { index ->
            Text(
                text = DayOfWeek.of((index + 1) % 7 + 1).getDisplayName(
                    TextStyle.SHORT,
                    Locale.getDefault()
                ),
                style = MaterialTheme.typography.labelSmall,
                textAlign = TextAlign.Center
            )
        }
        
        // Empty cells before month starts
        items(startDayOfWeek) {
            Spacer(modifier = Modifier.aspectRatio(1f))
        }
        
        // Days of month
        items(daysInMonth) { day ->
            val date = selectedDate.withDayOfMonth(day + 1)
            CalendarDay(
                date = date,
                isSelected = date == selectedDate,
                hasEvents = events.containsKey(date),
                onClick = { onDateSelected(date) }
            )
        }
    }
}
```

### Phase 5: Plant Tracker (Week 5)

#### Implementation Steps
1. Create plant card with circular image
2. Implement watering status logic
3. Add watering action with confirmation
4. Create plant detail screen
5. Implement watering history
6. Set up watering reminders

#### Watering Logic
```kotlin
class PlantTrackerViewModel @Inject constructor(
    private val plantRepository: PlantRepository,
    private val notificationHelper: NotificationHelper
) : ViewModel() {
    
    fun waterPlant(plantId: Long) {
        viewModelScope.launch {
            val plant = plantRepository.getPlantById(plantId)
            val now = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault()).date
            
            // Record watering
            plantRepository.recordWatering(
                plantId = plantId,
                date = now
            )
            
            // Update next watering date
            val nextWateringDate = now.plus(plant.wateringFrequencyDays, DateTimeUnit.DAY)
            plantRepository.updatePlant(
                plant.copy(
                    lastWateredDate = now,
                    nextWateringDate = nextWateringDate
                )
            )
            
            // Schedule next reminder
            notificationHelper.schedulePlantWateringReminder(
                plantId = plantId,
                plantName = plant.name,
                reminderDate = nextWateringDate
            )
        }
    }
}
```

### Phase 6: Notifications (Week 6)

#### Implementation
```kotlin
class NotificationHelper @Inject constructor(
    private val context: Context,
    private val workManager: WorkManager
) {
    fun scheduleEventReminder(event: CalendarEvent) {
        val reminderTime = event.reminderTime ?: return
        
        val workRequest = OneTimeWorkRequestBuilder<EventReminderWorker>()
            .setInitialDelay(
                reminderTime.toEpochMilliseconds() - Clock.System.now().toEpochMilliseconds(),
                TimeUnit.MILLISECONDS
            )
            .setInputData(
                workDataOf(
                    "eventId" to event.id,
                    "eventTitle" to event.title
                )
            )
            .build()
        
        workManager.enqueueUniqueWork(
            "event_reminder_${event.id}",
            ExistingWorkPolicy.REPLACE,
            workRequest
        )
    }
    
    fun schedulePlantWateringReminder(
        plantId: Long,
        plantName: String,
        reminderDate: LocalDate
    ) {
        val reminderTime = reminderDate.atTime(9, 0) // 9 AM
        val now = Clock.System.now().toLocalDateTime(TimeZone.currentSystemDefault())
        
        if (reminderTime <= now) return
        
        val delay = reminderTime.toInstant(TimeZone.currentSystemDefault())
            .toEpochMilliseconds() - Clock.System.now().toEpochMilliseconds()
        
        val workRequest = OneTimeWorkRequestBuilder<PlantWateringReminderWorker>()
            .setInitialDelay(delay, TimeUnit.MILLISECONDS)
            .setInputData(
                workDataOf(
                    "plantId" to plantId,
                    "plantName" to plantName
                )
            )
            .build()
        
        workManager.enqueueUniqueWork(
            "plant_reminder_$plantId",
            ExistingWorkPolicy.REPLACE,
            workRequest
        )
    }
}
```

## Testing Strategy

### Unit Tests
```kotlin
class BookRepositoryTest {
    @Test
    fun `addBook should insert book and return id`() = runTest {
        // Arrange
        val book = Book(...)
        val repository = BookRepository(fakeDao)
        
        // Act
        val id = repository.addBook(book)
        
        // Assert
        assertTrue(id > 0)
        assertEquals(book, repository.getBookById(id))
    }
}
```

### UI Tests
```kotlin
class BookTrackerScreenTest {
    @Test
    fun `clicking on book card navigates to detail screen`() {
        composeTestRule.setContent {
            BookTrackerScreen(...)
        }
        
        composeTestRule
            .onNodeWithText("The Enchanted Forest")
            .performClick()
        
        composeTestRule
            .onNodeWithText("Book Details")
            .assertIsDisplayed()
    }
}
```

## Performance Optimization

### Image Loading
```kotlin
// Use Coil for efficient image loading
AsyncImage(
    model = ImageRequest.Builder(LocalContext.current)
        .data(imageUri)
        .crossfade(true)
        .memoryCachePolicy(CachePolicy.ENABLED)
        .diskCachePolicy(CachePolicy.ENABLED)
        .build(),
    contentDescription = "Book cover",
    modifier = Modifier.size(80.dp)
)
```

### Database Queries
```kotlin
// Use indices for frequently queried columns
@Entity(
    tableName = "books",
    indices = [
        Index(value = ["status"]),
        Index(value = ["created_at"])
    ]
)
data class BookEntity(...)
```

### LazyColumn Optimization
```kotlin
LazyColumn {
    items(
        items = books,
        key = { it.id } // Stable keys for better performance
    ) { book ->
        BookCard(book = book)
    }
}
```

## Deployment Checklist

### Pre-Release
- [ ] All features implemented and tested
- [ ] No critical bugs
- [ ] Performance metrics met
- [ ] Accessibility tested
- [ ] Localization complete (if applicable)
- [ ] Privacy policy added
- [ ] Terms of service added

### Release Build
- [ ] Update version code and name
- [ ] Enable ProGuard/R8
- [ ] Sign APK/AAB with release key
- [ ] Test release build thoroughly
- [ ] Prepare store listing
- [ ] Create screenshots and promotional materials

### Post-Release
- [ ] Monitor crash reports
- [ ] Track user feedback
- [ ] Plan updates based on analytics
- [ ] Prepare bug fix releases

## Support & Resources

### Documentation
- [Jetpack Compose Documentation](https://developer.android.com/jetpack/compose)
- [Room Database Guide](https://developer.android.com/training/data-storage/room)
- [Material Design 3](https://m3.material.io/)

### Contact
For questions or clarifications, refer to:
- PROJECT_OVERVIEW.md - High-level concept
- TECHNICAL_SPECIFICATIONS.md - Detailed specs
- UI_UX_DESIGN_GUIDE.md - Design guidelines

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Prepared by:** NinjaTech AI - SuperNinja Agent