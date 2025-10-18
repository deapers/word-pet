# Data Model: WordPet

## Overview
The WordPet data model is designed for client-side storage using LocalStorage, following the lightweight architecture principles. The data is structured as a single JSON object containing all necessary application state.

## Core Entities

### Player
Represents the child's profile and progress in the game.

```
{
  "level": 1,           // Current player level (integer)
  "coins": 0,           // Accumulated coins (integer)
  "stamina": 5,         // Current stamina points (integer, depletes with play)
  "maxStamina": 5,      // Maximum stamina (can increase with level)
  "staminaRechargeTime": 1800000, // Time in ms to recharge 1 stamina point (30 min)
  "lastStaminaUpdate": "2025-10-18T10:00:00Z", // Last time stamina was updated
  "totalSentencesCompleted": 0,   // Total sentences correctly completed
  "totalMistakesMade": 0,         // Total mistakes made
  "currentCombo": 0,              // Current correct answer streak
  "maxCombo": 0                   // Highest combo achieved
}
```

### Pet
Virtual pet that grows with the child's learning progress.

```
{
  "level": 1,                   // Pet level (integer)
  "exp": 0,                     // Current experience points (integer)
  "expToNextLevel": 100,        // Exp needed for next level (integer)
  "decorations": [              // List of unlocked decorations
    {
      "id": "hat-blue",
      "name": "Blue Hat",
      "unlockedAtLevel": 2
    }
  ],
  "lastGrowthUpdate": "2025-10-18T10:00:00Z", // Last time pet grew (for offline calc)
  "offlineExpGain": 10,         // Exp gained while offline per hour
  "type": "dog"                 // Pet type (determines visuals)
}
```

### Sentence
Learning content unit identified by text content.

```
{
  "text": "I like apples",      // The actual sentence string (primary identifier)
  "mastery": 0.3,               // Mastery score (0.0 to 1.0, float)
  "lastReviewed": "2025-10-18T10:00:00Z", // Last time attempted
  "incorrectCount": 2,          // Number of times answered incorrectly
  "correctCount": 1,            // Number of times answered correctly
  "difficulty": "easy",         // Difficulty level ("easy", "medium", "hard")
  "category": "food"            // Category for grouping ("greetings", "weather", etc.)
}
```

### MistakeBag
Collection of sentences the child has answered incorrectly.

```
{
  "sentences": [                // Array of sentence texts in mistake bag
    "It is sunny today",
    "I have a red ball"
  ],
  "lastReviewDate": "2025-10-18T10:00:00Z", // Last time reviewed
  "reviewPriority": 0.3         // Percentage of review sentences to show (30%)
}
```

### Settings
User-configurable options for the application.

```
{
  "volume": 0.8,                // Audio volume (0.0 to 1.0)
  "enableTTS": true,            // Whether text-to-speech is enabled
  "maxDailyStamina": 10,        // Parent-configured daily stamina limit
  "enableAnimations": true,      // Whether animations are enabled
  "language": "en",             // App language
  "parentalPin": "1234"         // Optional PIN for parental controls
}
```

## Data Relationships

### Player and Pet
- Player level and pet level are related but independent
- Both gain experience through correct answers
- Pet growth provides rewards for player engagement

### Sentences and MistakeBag
- Sentences can be in the mistake bag if mastery < 0.8
- Mistake bag sentences have higher priority (30%) during gameplay
- Mastery determines removal from mistake bag (threshold ≥ 0.8)

### Player and Sentences
- Player progress is tracked through sentence mastery
- Combo rewards and experience points come from sentence completion
- Stamina consumption affects sentence practice frequency

## Validation Rules

### Player Validation
- Level must be ≥ 1
- Coins must be ≥ 0
- Stamina must be between 0 and maxStamina
- Max stamina grows with player level (every 5 levels)

### Pet Validation
- Level must be ≥ 1
- Exp must be ≥ 0
- Exp to next level increases with current level (base 100, +50 per level)

### Sentence Validation
- Text must not be empty
- Mastery must be between 0.0 and 1.0
- Category must be from predefined list
- Difficulty must be "easy", "medium", or "hard"

## State Transitions

### Stamina System
```
[Full Stamina] → [Used in gameplay] → [Recharge over time] → [Full Stamina]
```
- Stamina decreases by 1 per sentence attempt
- Recharges at rate of 1 point per 30 minutes
- Max stamina increases every 5 player levels

### Mastery System
```
[New Sentence] → [Incorrect Answer] → [Mastery decreases] → [Correct Answer] → [Mastery increases]
```
- New sentences start with mastery 0.0
- Incorrect answers decrease mastery (minimum 0.0)
- Correct answers increase mastery (maximum 1.0)
- Sentences with mastery ≥ 0.8 are removed from mistake bag

### Pet Level System
```
[Current Level] → [Earn Exp] → [Check Level Threshold] → [Level Up] → [Reward Animation]
```
- Exp earned from correct answers and combo rewards
- Level increases when exp threshold is reached
- Rewards include visual animations and unlockable decorations