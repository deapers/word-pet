# Quickstart Guide: WordPet Development

## Overview
This guide provides instructions for setting up and running the WordPet educational game for children aged 6-12. WordPet is a single-page HTML5 application with offline capabilities focused on sentence formation games and virtual pet engagement.

## Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor for development
- Local web server (optional, for testing)

## Setup Instructions

### For Development
1. Clone or download the repository containing the WordPet files
2. Open `index.html` in your web browser - no build step required
3. All game data is stored in browser's LocalStorage

### For Testing
1. Open the `index.html` file directly in your browser or serve it via a local web server
2. The application works offline - test by disconnecting from the internet
3. Clear LocalStorage to reset the game: `localStorage.clear()` in browser console

## Project Structure
```
wordpet/
├── index.html          # Main application file
├── style.css           # Styling and animations
├── game.js             # Core game logic
├── data.js             # Sentence library and mistake data
├── pet.js              # Pet growth logic
└── utils.js            # Reward calculations, stamina management, TTS
```

## Key Features

### Sentence Puzzle Game
- Drag words to form correct sentences
- 3-5 words per sentence for age-appropriate difficulty
- Positive feedback for correct answers, gentle encouragement for mistakes

### Virtual Pet System
- Pet grows as child completes sentences correctly
- Earn coins to purchase decorations for the pet
- Combo rewards for consecutive correct answers

### Mistake Review
- Incorrect sentences go to a mistake bag
- Mistake bag sentences appear with 30% higher frequency
- Mastered sentences (score ≥ 0.8) are removed from mistake bag

### Stamina System
- Limited daily play to encourage periodic engagement
- Stamina regenerates over time (1 point per 30 minutes)
- Parents can set daily stamina limits in settings

## API Reference (Client-side Only)

### Data Access Functions
```javascript
// Get current player state
const player = getPlayerState();

// Update player state
updatePlayerState({ coins: 5, level: 2 });

// Get sentence mastery
const mastery = getSentenceMastery("I like apples");

// Update sentence mastery
updateSentenceMastery("I like apples", 0.7);
```

### Game Functions
```javascript
// Start a new sentence puzzle
startSentencePuzzle();

// Check if sentence is correctly formed
checkSentenceAnswer(wordsArray, expectedSentence);

// Get next sentence (with 30% chance of mistake bag item)
getNextSentence();
```

## Testing the Game Mechanics

1. **Sentence Puzzle**: Drag words to form sentences and verify feedback
2. **Stamina System**: Complete multiple sentences to see stamina decrease
3. **Mistake Handling**: Intentionally get sentences wrong and verify they go to mistake bag
4. **Pet Growth**: Complete sentences to earn experience and see pet grow
5. **Offline Mode**: Disconnect internet and verify continued functionality

## Troubleshooting

### Game Won't Load
- Ensure JavaScript is enabled in your browser
- Check browser console for error messages (F12)
- Clear browser data if experiencing issues

### Progress Not Saving
- Verify LocalStorage is enabled in your browser
- Check if you're using a private/incognito window
- Some browsers may block LocalStorage in certain contexts

### Drag and Drop Not Working
- Try on a touch device if available (touch events supported)
- Some older browsers may not support HTML5 drag and drop
- Verify no browser extensions are interfering

## Development Tips

### Adding New Sentences
- Add to the `sentences` array in `data.js`
- Include category and initial mastery data
- Follow the sentence structure defined in the data model

### Modifying Game Mechanics
- Core logic is in `game.js`
- Pet growth logic in `pet.js`
- Modify reward calculations in `utils.js`

### UI Customization
- All styling in `style.css`
- Ensure touch targets remain large for child users (≥44px)
- Maintain high contrast for accessibility