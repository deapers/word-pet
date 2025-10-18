# Fix Skip Button Stamina Consumption Specification

## Current Issue
The "Skip Sentence" button is incorrectly consuming 1 stamina point each time it's clicked, which is not the intended behavior.

## Root Cause Analysis
In the current implementation:
1. When a sentence puzzle starts (via startSentencePuzzle), 1 stamina point is consumed
2. When a user skips a sentence, a new sentence puzzle is started for the next sentence
3. This new puzzle starts via the same startSentencePuzzle function, which again consumes 1 stamina point
4. This results in stamina being consumed twice: once for the original sentence and once for the replacement sentence after skipping

## Requirements
1. Stamina should only be consumed once when starting a sentence puzzle, regardless of whether the user answers, skips, or commits
2. When a user skips a sentence and a new sentence is presented, no additional stamina should be consumed
3. When a user reaches 5 skips and returns to the home screen, the total stamina consumed should be exactly 1 (from the initial puzzle start)
4. The skip counter should continue to work as intended (return to home after 5 skips)

## Expected Behavior
- When a game session starts, 1 stamina point is consumed
- Skipping a sentence does not consume additional stamina
- After 5 skips, the game returns to the home screen with only 1 stamina consumed total
- The user experience remains the same (new sentences after skips until 5 skips are reached)

## Implementation Plan
1. Modify the skip logic to not consume stamina when starting a new sentence after a skip
2. Ensure stamina is only consumed when initially starting a game session
3. Test to verify that skipping does not consume additional stamina