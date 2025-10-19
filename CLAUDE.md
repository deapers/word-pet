# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**WordPet** is an educational game designed for children aged 6-12 to learn sentence construction through gamification. It's a single-page HTML5 application with a virtual pet system that grows based on learning progress.

## Codebase Structure

```
index.html     - Main application page with UI structure
style.css      - Child-friendly styling with animations
game.js        - Core game logic for sentence puzzles
data.js        - Sentence database and data management
pet.js         - Pet growth and management system
utils.js       - Utility functions including TTS, storage, and state management
wordpet-spec.md - Complete design specification document
QWEN.md        - Project context and development principles
specs/         - Directory containing feature specifications and implementation plans
```

## Architecture & Key Components

### 1. Core Game System (game.js)
- Sentence puzzle mechanics with word scrambling
- Game state management (current sentence, user selection, etc.)
- Answer validation and feedback system
- Continuous mode with sentence counting and skip functionality

### 2. Data Management (data.js)
- Large sentence database with translations
- Sentence mastery tracking system
- Mistake bag for difficult sentences
- Player progress persistence

### 3. Pet System (pet.js)
- Virtual pet growth based on learning progress
- Experience and level management
- Offline growth calculations
- Visual representation with emoji-based avatars

### 4. Utilities (utils.js)
- **TTS System**: Text-to-speech functionality with audio queue management
- **Storage**: LocalStorage persistence with backward compatibility
- **State Management**: Player stats, settings, and app state
- **Time Utilities**: Stamina recovery and offline progress calculations
- **Avatar Management**: Player avatar updates based on level

## Development Principles

The project follows **Spec-Driven Development (SDD)** where all changes begin with creating or updating specification documents in the `specs/` directory before implementation.

## Common Development Tasks

### Running the Application
Simply open `index.html` in a web browser. No build process is required as this is a client-side HTML5 application.

### Adding New Sentences
1. Edit `data.js` to add new sentence objects in the embedded JSON data array
2. Each sentence should include: `text`, `translation`, `difficulty`, and `category` properties

### Modifying Game Logic
1. Core game mechanics are in `game.js`
2. Follow the existing patterns for state management and UI updates
3. Ensure any changes maintain the child-friendly design philosophy

### Updating Pet System
1. Pet growth and management logic is in `pet.js`
2. Pet data structure and persistence is in `data.js`
3. UI updates are handled through the `updatePetDisplay()` function

### Working with Text-to-Speech
1. TTS functionality is in `utils.js` in the `TTSUtil` object
2. Audio queue management prevents overlapping speech
3. Settings for TTS are in the app state and can be adjusted in the Settings screen

## Key Features

1. **Sentence Jigsaw Game**: Drag-and-drop word arrangement puzzles
2. **Pet Growth System**: Virtual pet that grows with learning progress
3. **Mistake Bag System**: For reviewing difficult sentences (30% priority)
4. **Stamina System**: Prevents overuse with time-based recovery
5. **Text-to-Speech**: Word pronunciation and feedback audio
6. **Combo System**: Rewards for consecutive correct answers
7. **Offline Progress**: Experience and stamina recovery when away

## Technical Implementation

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Storage**: LocalStorage for persistence
- **Audio**: Web Speech API for TTS functionality
- **State Management**: Global appState object with module-specific utilities
- **Responsive Design**: Mobile-friendly interface with touch targets