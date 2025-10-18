# Stamina System Updates Specification

## Current Issue
The "Review Mistakes" mode does not require stamina nor consume stamina when used, which is correct behavior.

## Requirements
1. The "Review Mistakes" functionality should NOT require stamina to start
2. The "Review Mistakes" functionality should NOT consume stamina when a review session starts
3. The "Review Mistakes" button should remain enabled even when stamina is 0
4. Other game modes (Start Practice, Continuous Mode) should continue to require and consume stamina

## Expected Behavior
- The "Review Mistakes" button remains enabled regardless of stamina level
- Starting a review session does not require or consume stamina
- Other game modes continue to have stamina requirements
- Consistent behavior across game modes that DO require stamina

## Implementation Plan
1. Update the `startMistakeReview` function to remove stamina checks and consumption
2. Update the `updateHomeScreen` function to keep the review button enabled regardless of stamina
3. Test to ensure other game modes still properly handle stamina requirements