# Android Development Guide - Cozy Life App

## 🎯 Getting Started with Android Development

This guide will walk you through setting up and building the Cozy Life Android application.

---

## 📋 Prerequisites

### Required Software
1. **Android Studio** (Latest version - Hedgehog or newer)
   - Download: https://developer.android.com/studio
   - Includes Android SDK, emulator, and build tools

2. **JDK 17** (Java Development Kit)
   - Usually bundled with Android Studio
   - Verify: `java -version`

3. **Git** (for version control)
   - Already set up ✓

### Recommended Hardware
- **RAM:** 8GB minimum, 16GB recommended
- **Storage:** 10GB free space minimum
- **Processor:** Multi-core processor

---

## 🛠️ Step 1: Install Android Studio

### Installation Steps:

1. **Download Android Studio**
   - Visit: https://developer.android.com/studio
   - Download for your OS (Windows/Mac/Linux)

2. **Install Android Studio**
   - Run the installer
   - Follow the setup wizard
   - Install recommended SDK components

3. **Configure Android SDK**
   - Open Android Studio
   - Go to: Settings/Preferences > Appearance & Behavior > System Settings > Android SDK
   - Install:
     - Android 14.0 (API 34) - Target SDK
     - Android 8.0 (API 26) - Minimum SDK
     - Android SDK Build-Tools
     - Android Emulator
     - Android SDK Platform-Tools

4. **Set up Emulator**
   - Tools > Device Manager
   - Create Virtual Device
   - Choose: Pixel 6 or similar
   - System Image: Android 14 (API 34)

---

## 📱 Step 2: Create Android Project

### Project Setup:

1. **Open Android Studio**
   - Click "New Project"

2. **Select Template**
   - Choose: "Empty Activity" (Jetpack Compose)
   - Click "Next"

3. **Configure Project**
   ```
   Name: Cozy Life
   Package name: com.ninjatech.cozylife
   Save location: [Your workspace]/cozy-life-android
   Language: Kotlin
   Minimum SDK: API 26 (Android 8.0)
   Build configuration language: Kotlin DSL (build.gradle.kts)
   ```

4. **Click "Finish"**
   - Wait for Gradle sync to complete

---

## 📦 Step 3: Add Dependencies

### Update `build.gradle.kts` (app level):

```kotlin
plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
    id("com.google.devtools.ksp") version "1.9.20-1.0.14"
    id("com.google.dagger.hilt.android")
}

android {
    namespace = "com.ninjatech.cozylife"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.ninjatech.cozylife"
        minSdk = 26
        targetSdk = 34
        versionCode = 1
        versionName = "1.0"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
        vectorDrawables {
            useSupportLibrary = true
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }
    
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    
    kotlinOptions {
        jvmTarget = "17"
    }
    
    buildFeatures {
        compose = true
    }
    
    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.4"
    }
    
    packaging {
        resources {
            excludes += "/META-INF/{AL2.0,LGPL2.1}"
        }
    }
}

dependencies {
    // Jetpack Compose
    implementation(platform("androidx.compose:compose-bom:2023.10.01"))
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.activity:activity-compose:1.8.1")
    
    // Core Android
    implementation("androidx.core:core-ktx:1.12.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.6.2")
    
    // Navigation
    implementation("androidx.navigation:navigation-compose:2.7.5")
    
    // ViewModel
    implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.6.2")
    implementation("androidx.lifecycle:lifecycle-runtime-compose:2.6.2")
    
    // Room Database
    implementation("androidx.room:room-runtime:2.6.1")
    implementation("androidx.room:room-ktx:2.6.1")
    ksp("androidx.room:room-compiler:2.6.1")
    
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3")
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    
    // Hilt Dependency Injection
    implementation("com.google.dagger:hilt-android:2.48.1")
    ksp("com.google.dagger:hilt-compiler:2.48.1")
    implementation("androidx.hilt:hilt-navigation-compose:1.1.0")
    
    // Coil Image Loading
    implementation("io.coil-kt:coil-compose:2.5.0")
    
    // DateTime
    implementation("org.jetbrains.kotlinx:kotlinx-datetime:0.5.0")
    
    // Testing
    testImplementation("junit:junit:4.13.2")
    androidTestImplementation("androidx.test.ext:junit:1.1.5")
    androidTestImplementation("androidx.test.espresso:espresso-core:3.5.1")
    androidTestImplementation(platform("androidx.compose:compose-bom:2023.10.01"))
    androidTestImplementation("androidx.compose.ui:ui-test-junit4")
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
```

### Update `build.gradle.kts` (project level):

```kotlin
plugins {
    id("com.android.application") version "8.1.4" apply false
    id("org.jetbrains.kotlin.android") version "1.9.20" apply false
    id("com.google.devtools.ksp") version "1.9.20-1.0.14" apply false
    id("com.google.dagger.hilt.android") version "2.48.1" apply false
}
```

---

## 🏗️ Step 4: Project Structure

Create this folder structure in your Android project:

```
app/src/main/java/com/ninjatech/cozylife/
├── data/
│   ├── local/
│   │   ├── dao/
│   │   │   ├── BookDao.kt
│   │   │   ├── CalendarEventDao.kt
│   │   │   └── PlantDao.kt
│   │   ├── entity/
│   │   │   ├── BookEntity.kt
│   │   │   ├── CalendarEventEntity.kt
│   │   │   └── PlantEntity.kt
│   │   └── AppDatabase.kt
│   ├── repository/
│   │   ├── BookRepository.kt
│   │   ├── CalendarRepository.kt
│   │   └── PlantRepository.kt
│   └── model/
│       ├── Book.kt
│       ├── CalendarEvent.kt
│       └── Plant.kt
├── domain/
│   └── usecase/
│       ├── book/
│       ├── calendar/
│       └── plant/
├── presentation/
│   ├── room/
│   │   ├── RoomSceneScreen.kt
│   │   └── RoomSceneViewModel.kt
│   ├── book/
│   │   ├── BookTrackerScreen.kt
│   │   └── BookTrackerViewModel.kt
│   ├── calendar/
│   │   ├── CalendarScreen.kt
│   │   └── CalendarViewModel.kt
│   ├── plant/
│   │   ├── PlantTrackerScreen.kt
│   │   └── PlantTrackerViewModel.kt
│   ├── components/
│   ├── navigation/
│   │   └── NavGraph.kt
│   └── theme/
│       ├── Color.kt
│       ├── Theme.kt
│       └── Type.kt
├── di/
│   ├── AppModule.kt
│   ├── DatabaseModule.kt
│   └── RepositoryModule.kt
├── util/
│   └── Constants.kt
└── CozyLifeApplication.kt
```

---

## 🎨 Step 5: Add Design Assets

1. **Copy room scene image**
   - From: `assets/designs/room_scene.png`
   - To: `app/src/main/res/drawable/room_scene.png`

2. **Copy other design assets**
   - Book tracker, calendar, plant tracker images
   - Place in `res/drawable/`

3. **Create app icon**
   - Use: `assets/designs/app_icon.png`
   - Generate all sizes using Android Studio:
     - Right-click `res` > New > Image Asset
     - Select your icon
     - Generate all densities

---

## 💻 Step 6: Implement Core Components

### Week 1-2: Database Layer

Follow the code examples in `docs/DEVELOPER_HANDOFF.md` to implement:

1. **Entity Classes** (BookEntity, CalendarEventEntity, PlantEntity)
2. **DAO Interfaces** (BookDao, CalendarEventDao, PlantDao)
3. **AppDatabase** (Room database setup)
4. **Repositories** (Data access layer)

### Week 3: Room Scene Interface

1. **Create RoomSceneScreen.kt**
   - Display room image
   - Add interactive hotspots
   - Handle tap detection

2. **Implement Navigation**
   - Set up NavGraph
   - Define routes
   - Handle screen transitions

### Week 4: Book Tracker

1. **Create BookTrackerScreen.kt**
   - Tab layout (Reading, To Read, Completed)
   - Book cards with progress bars
   - Add/edit book functionality

2. **Create BookTrackerViewModel.kt**
   - State management
   - Database operations
   - Business logic

### Week 5: Calendar & Plant Tracker

1. **Implement CalendarScreen.kt**
   - Calendar grid
   - Event list
   - Add/edit events

2. **Implement PlantTrackerScreen.kt**
   - Plant cards
   - Watering status
   - Reminder logic

### Week 6: Polish & Testing

1. **Add Notifications**
2. **Implement Animations**
3. **Test on Multiple Devices**
4. **Fix Bugs**
5. **Optimize Performance**

---

## 🧪 Step 7: Testing

### Run on Emulator:
1. Start emulator from Device Manager
2. Click "Run" (green play button)
3. Select your emulator
4. Wait for app to install and launch

### Run on Physical Device:
1. Enable Developer Options on your phone
2. Enable USB Debugging
3. Connect phone via USB
4. Click "Run" and select your device

---

## 📚 Resources

### Documentation
- **Project Docs:** `docs/` folder in repository
- **Design System:** `docs/UI_UX_DESIGN_GUIDE.md`
- **Technical Specs:** `docs/TECHNICAL_SPECIFICATIONS.md`
- **Implementation Guide:** `docs/DEVELOPER_HANDOFF.md`

### Official Android Resources
- **Jetpack Compose:** https://developer.android.com/jetpack/compose
- **Room Database:** https://developer.android.com/training/data-storage/room
- **Navigation:** https://developer.android.com/guide/navigation
- **Hilt:** https://developer.android.com/training/dependency-injection/hilt-android

### Community
- **Stack Overflow:** Tag questions with `android`, `jetpack-compose`, `kotlin`
- **Android Developers:** https://developer.android.com/community

---

## 🐛 Troubleshooting

### Common Issues:

**Gradle Sync Failed:**
- File > Invalidate Caches > Invalidate and Restart
- Check internet connection
- Update Android Studio

**Emulator Won't Start:**
- Check BIOS virtualization settings
- Allocate more RAM to emulator
- Try different system image

**Build Errors:**
- Clean project: Build > Clean Project
- Rebuild: Build > Rebuild Project
- Check dependency versions

**App Crashes:**
- Check Logcat for error messages
- Verify database migrations
- Check null safety

---

## ✅ Checklist

### Setup Complete When:
- [ ] Android Studio installed
- [ ] Project created with correct settings
- [ ] Dependencies added and synced
- [ ] Project structure created
- [ ] Design assets copied
- [ ] Emulator configured and working
- [ ] First "Hello World" app runs successfully

### Ready for Development When:
- [ ] Database entities created
- [ ] DAOs implemented
- [ ] Repositories set up
- [ ] Navigation configured
- [ ] Theme colors defined
- [ ] First screen displays

---

## 🚀 Next Steps

Once setup is complete:

1. **Follow Week-by-Week Plan** in `docs/DEVELOPER_HANDOFF.md`
2. **Reference Design System** in `docs/UI_UX_DESIGN_GUIDE.md`
3. **Use Prototype** as reference for interactions
4. **Test Frequently** on emulator and device
5. **Commit Often** to version control

---

**Ready to start coding? Let's build Cozy Life! 🏡**

---

*Last Updated: 2024*  
*For questions, refer to the comprehensive documentation in the `docs/` folder*