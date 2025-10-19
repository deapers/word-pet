# Research Findings: 语音反馈和翻译增强

## Decision: Web Speech API Implementation
**Rationale**: Using the browser's built-in Web Speech API (specifically speechSynthesis) is the most appropriate solution for word pronunciation as it:
- Works offline (fulfilling FR-005 requirement)
- Is supported by all modern browsers
- Requires no external dependencies (aligns with lightweight architecture)
- Allows control of rate, pitch, and volume (fulfilling FR-004)

**Alternatives considered**:
- External TTS services: Would require internet connection, violating offline requirement
- Pre-recorded audio files: Would significantly increase bundle size
- Third-party TTS libraries: Would add external dependencies

## Decision: Translation Service Implementation
**Rationale**: For translation functionality, implementing a fallback approach where:
- Primary: Integration with translation API (when online) 
- Fallback: Predefined translations in the sentence data structure (for offline use)
This approach ensures functionality both online and offline (fulfilling FR-008 requirement).

**Alternatives considered**:
- Full offline translation dictionary: Would significantly increase bundle size
- Always-online translation: Would fail when offline, violating offline requirement
- No translation: Would not fulfill core requirement FR-003

## Decision: Sound Effects Implementation
**Rationale**: Using Web Audio API or embedded audio files for sound effects as:
- They're lightweight and don't require external APIs
- Can be bundled with the application
- Provide immediate auditory feedback as required in FR-002

**Alternatives considered**:
- External sound service: Would require internet connection
- Generated tones: Would be less engaging for children

## Decision: Audio Concurrency Management
**Rationale**: Implement queuing system for pronunciation requests to handle rapid clicks (addressing edge case). This prevents overlapping audio which would violate FR-007 (no interference).

**Mechanism**:
- Cancel any ongoing speech before starting new pronunciation
- Queue subsequent requests if multiple words are clicked rapidly
- Prioritize most recent request after current speech completes

## Decision: Performance Optimization
**Rationale**: To maintain performance on limited devices (SC-006), implement:
- Throttling of rapid pronunciation requests
- Preloading of speech synthesis voices during app initialization
- Efficient translation display updates to prevent UI jank