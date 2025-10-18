<!-- 
Sync Impact Report:
- Version change: N/A (initial creation) → 1.0.0
- Modified principles: N/A
- Added sections: All sections (initial creation)
- Removed sections: N/A
- Templates requiring updates: ⚠ pending - .specify/templates/plan-template.md, .specify/templates/spec-template.md, .specify/templates/tasks-template.md
- Follow-up TODOs: None
-->
# 小词怪 WordPet Constitution

## Core Principles

### Child-First Design
User experience must prioritize the cognitive and motor skills of 6-12 year olds; UI elements must be large enough for small fingers, colors must be engaging but not overstimulating, reading level appropriate for target age group.

### Low-Friction Learning
Mistakes must not be punitive - incorrect answers provide minimal penalty with opportunities for small rewards; focus on positive reinforcement to maintain motivation and reduce frustration.

### Lightweight Architecture
Single HTML page implementation with embedded JS/CSS; All logic and interface controlled from single file; No external dependencies or service requirements; LocalStorage for persistence; Offline functionality supported.

### Gamified Engagement
Game mechanics must include sentence拼接 (jigsaw puzzles), pet growth system, rewarding animations, and incentive structures (coins, experience, combo bonuses); Learning progress directly tied to pet growth.

### Responsible Usage
Daily stamina limits to prevent overuse; offline growth mechanisms to encourage periodic engagement rather than continuous play; parental controls and progress tracking for oversight.

## Additional Constraints

### Technical Implementation
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Storage: LocalStorage only (no external services)
- Graphics: CSS animations or Lottie JSON for pet animations
- Game mechanics: Drag-and-drop or click-to-order interface for sentence assembly
- Offline-first: Support for offline play with sync on reconnect

### Content Strategy
- Sentences focused on daily life themes: greetings, weather, family, school, food, transportation
- Difficulty progression aligned with learning mastery
- Mistake bag system with priority for incorrect answers
- Mastery threshold (≥0.8) for removing sentences from review queue

## Development Workflow

### MVP Priorities
Implementation must follow MVP sequence: single-page framework → core game logic → data persistence → reward mechanisms → pet growth → review features → parental controls; Additional features deferred until MVP complete.

### Quality Gates
- Core gameplay must function without internet connection
- Drag-and-drop interface must work smoothly on mobile devices
- All animations must perform well on low-end devices
- Learning progress must persist reliably across sessions

## Governance

Constitution supersedes all other practices and implementation decisions; all code and feature additions must align with principles; amendments require explicit documentation and approval; all PRs/reviews must verify compliance with child-first design and low-friction learning principles.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): initial creation | **Last Amended**: 2025-10-18