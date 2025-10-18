# 小词怪 WordPet - Project Context

## Project Overview

**小词怪 WordPet** (WordPet) is an educational game designed for children aged 6-12 to learn sentence construction through gamification. The project is designed as a single-page HTML5 application (PWA) that focuses on:

- **Core Gameplay**: Sentence拼接 (sentence jigsaw) games where children drag and arrange words to form correct sentences
- **Gamification**: Virtual pet growth system tied to learning progress
- **Learning Reinforcement**: Mistake bag system for reviewing difficult sentences
- **Child-Friendly**: Designed to minimize frustration with non-punitive feedback

## Architecture & Technology Stack

The project follows a lightweight architecture using:
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Data Storage**: LocalStorage for persistence
- **Game Mechanics**: Canvas or DOM-based drag-and-drop for sentence assembly
- **Animations**: CSS animations or Lottie JSON for pet growth and reward animations

## Project Structure (Planned)

Based on the specification, the project will include these key files:
```
index.html - Single page framework
style.css - Styling and animations
game.js - Core game logic
data.js - Sentence library and mistake data
pet.js - Pet growth logic
utils.js - Reward calculations, stamina management, TTS
```

## Core Features

### 1. Sentence拼接 Game
- Randomized word sequences from daily life themes
- Drag-and-drop or click-to-order interface
- Reward system for correct answers with combo bonuses
- Mistake bag for incorrect answers

### 2. Pet Growth System
- Experience points earned through correct answers
- Level progression with visual rewards
- Stamina system to prevent overuse
- Offline experience/energy regeneration

### 3. Learning Reinforcement
- Mistake bag with prioritized review
- Mastery tracking for each sentence
- Bonus rewards for correcting mistakes

### 4. Parental Controls
- Settings for audio/TTS
- Daily stamina limits
- Learning progress tracking

## Data Model

The application will use a simple JSON structure stored in LocalStorage:
```json
{
  "player": {
    "level": 1,
    "coins": 0,
    "stamina": 5
  },
  "pet": {
    "level": 1,
    "exp": 0,
    "decorations": []
  },
  "sentences": [
    {"id": 1, "text": "I like apples", "mastery": 0.5},
    {"id": 2, "text": "It is sunny today", "mastery": 0.3}
  ],
  "mistakeBag": [
    {"id": 2, "text": "It is sunny today", "wrongCount": 1, "mastery": 0.3}
  ]
}
```

## Development Approach

The project follows an MVP (Minimum Viable Product) approach with the following development sequence:
1. Single-page framework (HTML + CSS)
2. Core sentence拼接 game logic
3. LocalStorage data persistence
4. Reward and mistake bag mechanisms
5. Pet growth animations and stamina system
6. Mistake review functionality
7. Settings and parental controls

## Current Status

The project is currently in the specification phase with `wordpet.spec.md` containing the complete design specification. No implementation files have been created yet.

## Design Philosophy

- **Lightweight**: Single HTML file with embedded JS/CSS
- **No frustration**: Answering incorrectly provides minimal penalty with opportunities for small rewards
- **Self-motivated learning**: Mistake review offers bonus rewards
- **Gamification**: Pet animations, coins/food, and combo rewards
- **Anti-addiction**: Daily stamina limits and offline growth mechanisms

## Future Implementation Notes

The implementation should focus on:
- Simple drag-and-drop mechanics that work well for children
- Engaging but not overwhelming animations
- Clear visual feedback for correct/incorrect answers
- Intuitive navigation between game, pet care, and review sections
- Performance optimization for mobile devices where children typically use the app