# Research: WordPet Implementation

## Overview
This research document addresses technical decisions and unknowns for the WordPet educational game implementation, focusing on the core gameplay of sentence拼接 (jigsaw puzzles) with a virtual pet growth system for children aged 6-12.

## Drag-and-Drop Implementation for Children

### Decision: Use HTML5 Drag and Drop API with large touch targets
### Rationale: The HTML5 Drag and Drop API provides native support across modern browsers and works well on mobile devices. For children aged 6-12, large touch targets (minimum 44x44 pixels as per accessibility guidelines) will be implemented to accommodate developing motor skills.

### Alternatives considered:
- Custom mouse/touch event handling: More complex but allows for better customization
- Third-party libraries like SortableJS: More features but increases bundle size
- Pure CSS animations: Insufficient for complex drag interactions

## Offline-First Architecture

### Decision: Use LocalStorage with structured data model
### Rationale: Aligns with the Lightweight Architecture principle from the constitution. LocalStorage provides simple key-value storage that works offline with no external dependencies. For the WordPet application, this is sufficient for storing user progress, pet status, and sentence mastery data.

### Alternatives considered:
- IndexedDB: More complex but allows for more structured data
- WebSQL: Deprecated technology, not recommended
- File system APIs: Not available in browser context

## Animation Implementation

### Decision: Use CSS animations and transitions with requestAnimationFrame for complex sequences
### Rationale: CSS animations provide smooth 60fps performance in most browsers and are accessible to screen readers. For more complex animations like pet growth sequences, requestAnimationFrame will ensure smooth performance tied to the browser's refresh rate.

### Alternatives considered:
- Canvas animations: More performance but complex implementation
- SVG animations: Good for vector graphics but limited for complex sequences
- Web animations API: Modern but less browser support

## Sentence Data Model

### Decision: Store sentences as text-based objects with mastery scores
### Rationale: Per the clarification in the spec, sentences are identified by their text content rather than numeric IDs. Each sentence object contains the text, mastery score, and other metadata needed for the learning algorithm.

### Structure:
```
{
  text: "I like apples",
  mastery: 0.3,
  lastReviewed: "2025-10-18T10:00:00Z",
  incorrectCount: 2
}
```

## Performance Targets

### Decision: Target 60fps animations and <100ms interaction response
### Rationale: As clarified in the specification, the app must load within 3 seconds, maintain 60fps animations, and respond to interactions within 100ms. This ensures smooth user experience even on lower-end devices commonly used by families.

## Accessibility Implementation

### Decision: Implement WCAG 2.1 AA compliance with large touch targets and color contrast
### Rationale: Following the constitution's requirement for accessibility features for children with disabilities, the implementation will ensure sufficient color contrast (4.5:1 minimum), large touch targets, and screen reader compatibility.

## Data Persistence Strategy

### Decision: LocalStorage with periodic saving and data backup
### Rationale: Core functionality must operate without external dependencies per the specification. LocalStorage is used with periodic saving to prevent data loss and a structured data model to ensure reliability across sessions.

## Error/Empty/Loading States

### Decision: Friendly messages with retry options and skeleton loading
### Rationale: As clarified in the spec, error states will show friendly messages with retry options, empty states will provide clear guidance, and loading states will use skeleton screens to maintain engagement.