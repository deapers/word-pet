# 小词怪 WordPet - Project Context

## Project Overview

**小词怪 WordPet** (WordPet) is an educational game designed for children aged 6-12 to learn sentence construction through gamification. The project is a single-page HTML5 application (PWA) that focuses on:

- **Core Gameplay**: Sentence拼接 (sentence jigsaw) games where children drag and arrange words to form correct sentences
- **Gamification**: Virtual pet growth system tied to learning progress
- **Learning Reinforcement**: Mistake bag system for reviewing difficult sentences
- **Child-Friendly**: Designed to minimize frustration with non-punitive feedback

## Architecture & Technology Stack

The project follows a lightweight architecture using:
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Storage**: LocalStorage for persistence
- **Game Mechanics**: Click-based drag-and-drop for sentence assembly
- **Animations**: CSS animations for pet growth and reward animations
- **Accessibility**: Text-to-speech (TTS) for learning support

## Project Structure

```
index.html - Single page framework
style.css - Styling and animations
game.js - Core game logic
data.js - Sentence library and mistake data
pet.js - Pet growth logic
utils.js - Reward calculations, stamina management, TTS, and utilities
wordpet.spec.md - Complete design specification
```

## Core Features

### 1. Sentence拼接 Game
- Randomized word sequences from daily life themes (food, animals, weather, family, school, etc.)
- Click-to-order interface for sentence construction
- Reward system for correct answers with combo bonuses
- Mistake bag for incorrect answers

### 2. Pet Growth System
- Experience points earned through correct answers
- Level progression with visual rewards (emoji changes)
- Stamina system to prevent overuse (recharges over time)
- Offline experience/energy regeneration

### 3. Learning Reinforcement
- Mistake bag with prioritized review (30% chance of appearing)
- Mastery tracking for each sentence
- Bonus rewards for correcting mistakes (60% more coins, 50% more experience)

### 4. User Experience Elements
- Combo tracking for consecutive correct answers
- Encouraging feedback messages for both correct and incorrect answers
- Text-to-speech for both words and feedback messages
- Visual animations for level-ups and rewards

## Data Model

The application uses a JSON structure stored in LocalStorage:
```json
{
  "player": {
    "level": 1,
    "coins": 0,
    "stamina": 5,
    "currentCombo": 0,
    "maxCombo": 0,
    "totalSentencesCompleted": 0,
    "totalMistakesMade": 0
  },
  "pet": {
    "level": 1,
    "exp": 0,
    "expToNextLevel": 100,
    "decorations": [],
    "lastGrowthUpdate": "timestamp",
    "offlineExpGain": 10
  },
  "sentences": [
    {
      "text": "I like apples",
      "mastery": 0.5,
      "lastReviewed": "timestamp",
      "incorrectCount": 1,
      "correctCount": 2,
      "difficulty": "easy",
      "category": "food"
    }
  ],
  "mistakeBag": {
    "sentences": ["sentence text"],
    "reviewPriority": 0.3
  },
  "failedSentences": {
    "sentences": ["sentence text"],
    "failureCounts": {"sentence text": 2},
    "lastFailedDate": {"sentence text": "timestamp"}
  }
}
```

## Implementation Details

### Game Flow
1. Player starts on the home screen with pet display and stats
2. Player selects "Start Practice" to begin sentence puzzle
3. Game checks if player has stamina and retrieves next sentence (with 30% priority for mistake bag items)
4. Sentence words are scrambled and presented for arrangement
5. Player arranges words by clicking them into the sentence target
6. Upon submitting, correctness is checked and appropriate rewards/feedback given
7. Game updates player/pet stats and returns to home screen or continues based on mode

### Sentence Mastery System
- Correct answer: +0.15 mastery, minimum 0.0, maximum 1.0
- Incorrect answer: -0.05 mastery, minimum 0.0, maximum 1.0
- Sentences with <0.8 mastery go to mistake bag
- Sentences with ≥0.8 mastery are removed from mistake bag
- Mastery determines when a sentence is considered "learned"

### Stamina System
- Default 5 stamina points with a maximum daily limit
- Stamina decreases over time, recharging automatically
- Each completed sentence (correct or incorrect) costs 1 stamina
- Prevents overuse and encourages spaced learning

### Pet Growth System
- Pet gains experience from correct answers and pet care activities
- Experience thresholds increase as the pet levels up (100 + level * 50)
- Pet emoji changes as levels increase (🐶 → 🐩 → 🐕‍🦺)
- Offline experience gained based on time elapsed since last play

## Development Approach

The project follows an MVP (Minimum Viable Product) approach with fully implemented:
1. Single-page framework with responsive design
2. Core sentence拼接 game logic with click-based interactions
3. LocalStorage data persistence for all game state
4. Reward and mistake bag mechanisms
5. Pet growth animations and stamina system
6. Mistake review functionality
7. Text-to-speech integration for accessibility
8. Combo system and encouraging feedback messages

## Design Philosophy

- **Lightweight**: Single HTML file with embedded JS/CSS
- **No frustration**: Answering incorrectly provides minimal penalty with opportunities for small rewards
- **Self-motivated learning**: Mistake review offers bonus rewards
- **Gamification**: Pet animations, coins/food, and combo rewards
- **Anti-addiction**: Daily stamina limits and offline growth mechanisms
- **Accessibility**: Text-to-speech, large touch targets, and keyboard navigation support