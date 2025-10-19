# Data Model: 语音反馈和翻译增强

## Enhanced Entities

### Word (Enhanced)
Individual vocabulary unit with text content that can be pronounced (extends existing Word entity)
- `text` (string): The word text (e.g., "apple")
- `pronunciation` (string, optional): IPA or phonetic spelling (for offline reference)
- `audioUrl` (string, optional): Pre-recorded audio URL (if using fallback approach)

### Sentence (Enhanced)
Language learning unit with text content and an associated translation (extends existing Sentence entity)
- `text` (string): The actual sentence text (e.g., "I like apples")
- `translation` (string): Translation in child-friendly language
- `mastery` (float): Mastery score between 0.0 and 1.0
- `lastReviewed` (date): Timestamp of last review
- `incorrectCount` (integer): Number of times answered incorrectly
- `correctCount` (integer): Number of times answered correctly
- `difficulty` (string): Difficulty level (easy, medium, hard)
- `category` (string): Category of sentence (personal, family, school, food, etc.)

### SoundEffect
Audio feedback element played for correct answers
- `id` (string): Unique identifier for the sound effect
- `name` (string): Descriptive name (e.g., "success-chime", "applause")
- `audioUrl` (string): Path to the audio file
- `volume` (float): Default volume level (0.0 to 1.0)
- `enabled` (boolean): Whether this effect is currently enabled

### TTSConfig (New)
Configuration for text-to-speech functionality
- `enabled` (boolean): Whether TTS is enabled
- `volume` (float): Volume level (0.0 to 1.0)
- `rate` (float): Speech rate (0.1 to 2.0, default 0.6 for children)
- `pitch` (float): Voice pitch (0.0 to 2.0, default 1.0)

### UserInteractionState (New)
Tracks state for managing concurrent audio interactions
- `currentAudioPlaying` (boolean): Whether any audio is currently playing
- `audioQueue` (array): Queue of pending audio requests
- `lastWordClick` (date): Timestamp of last word click for debouncing
- `translationVisible` (boolean): Whether translation is currently displayed

## State Transitions

### Audio Playback State
- `idle`: No audio playing, ready for new requests
- `playing`: Currently playing audio (word pronunciation or sound effect)
- `queued`: Additional audio requests waiting to play

### Translation Display State
- `hidden`: Translation is not shown
- `visible`: Translation is displayed after correct answer
- `transitioning`: Animating appearance/disappearance of translation

## Relationships

- Sentence "has" Translation (for the FR-003 requirement)
- Player "has" TTSConfig (for user preferences)
- Word "triggers" SoundEffect (when clicked)
- UserInteractionState "manages" Audio Playback State