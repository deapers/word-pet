# Skip Button Functionality Specification

## Current Issue
The "Skip Sentence" button currently returns the user to the home screen immediately after skipping a sentence. This is not the desired behavior.

## Requirements
1. The "Skip Sentence" button should NOT return to the home screen immediately
2. The game should track the number of skipped sentences in the current session
3. After accumulating 5 skipped sentences, the game should return to the home screen
4. A game session can end in three ways:
   - User clicks "Back to Home" button
   - User accumulates 5 skipped sentences
   - User reaches the sentence limit (for continuous mode)

## Expected Behavior
- When the "Skip Sentence" button is clicked, a new sentence should be presented
- A counter should track the number of skipped sentences in the current session
- When the counter reaches 5, the game should return to the home screen automatically
- The counter should reset when a new game session starts
- The counter should reset when returning to the home screen

## Implementation Plan
1. Update the game.js file to add skip counter tracking
2. Modify the skipCurrentSentence function to handle the skip counter logic
3. Ensure the counter is reset at appropriate times
4. Test the functionality to ensure all three exit conditions work properly