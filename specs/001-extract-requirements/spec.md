# Feature Specification: Extract Requirements from WordPet Spec

**Feature Branch**: `001-extract-requirements`  
**Created**: 2025-10-18  
**Status**: Draft  
**Input**: User description: "从wordpet.spec.md中提取对应的需求说明"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  All stories must align with WordPet's Core Principles: Child-First Design, Low-Friction Learning, Lightweight Architecture, Gamified Engagement, and Responsible Usage.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Sentence Practice Game (Priority: P1)

As a 6-12 year old child, I want to practice forming sentences by tapping words to arrange them so that I can improve my language skills while having fun.

**Why this priority**: This is the core learning mechanism of WordPet - the sentence拼接 game that engages children in language learning.

**Independent Test**: Child can successfully tap words to form a sentence and receive positive feedback when correct, with gentle encouragement when incorrect.

**Acceptance Scenarios**:

1. **Given** a scrambled sentence with 3-5 words displayed on screen, **When** child taps words to arrange them in correct order, **Then** sentence is marked as correct and child receives coins and experience points
2. **Given** a scrambled sentence with 3-5 words displayed on screen, **When** child arranges words incorrectly, **Then** sentence is marked as incorrect but child still receives minimal reward and sentence is added to mistake bag

---

### User Story 2 - Pet Growth System (Priority: P2)

As a child, I want to see my virtual pet grow and unlock new features when I practice correctly so that I'm motivated to continue learning.

**Why this priority**: The gamification element is essential to maintain long-term engagement and motivation for learning.

**Independent Test**: Child receives visible pet growth (level up, new decorations) and rewards (coins, animations) when they successfully complete sentence exercises.

**Acceptance Scenarios**:

1. **Given** child has accumulated sufficient experience points, **When** experience threshold is reached, **Then** pet level increases with visual animation
2. **Given** child has earned sufficient coins, **When** visiting pet care section, **Then** child can purchase decorations for pet

---

### User Story 3 - Mistake Review (Priority: P3)

As a child or parent, I want to review sentences I've struggled with so that I can improve in areas where I need more practice.

**Why this priority**: The learning reinforcement mechanism helps children overcome specific difficulties and builds mastery.

**Independent Test**: Child can revisit previously incorrect sentences and successfully complete them to improve their mastery score.

**Acceptance Scenarios**:

1. **Given** child has incorrect sentences in mistake bag, **When** child accesses review mode, **Then** can practice these specific sentences with extra rewards
2. **Given** child successfully answers a mistake bag sentence multiple times, **When** mastery threshold is reached (>=0.8), **Then** sentence is removed from mistake bag

---

### User Story 4 - Home Dashboard (Priority: P2)

As a child, I want to see my pet status and learning progress on the home screen so I can understand my achievements and next steps.

**Why this priority**: Central hub for all major features and progress tracking that children and parents will use frequently.

**Independent Test**: Child can view pet level, experience, stamina, and today's learning progress (sentences practiced, coins earned).

**Acceptance Scenarios**:

1. **Given** child opens the app, **When** home screen loads, **Then** displays pet status (level, experience, stamina) and daily progress
2. **Given** child has completed practice sessions, **When** viewing home screen, **Then** shows today's statistics (number of sentences practiced, coins earned)

---

### User Story 5 - Settings and Parental Controls (Priority: P3)

As a parent, I want to configure app settings and access parental controls so I can customize the experience for my child.

**Why this priority**: Essential for parents to control the learning environment and set appropriate limits.

**Independent Test**: Parents can access settings to adjust volume, set daily stamina limits, and review learning progress.

**Acceptance Scenarios**:

1. **Given** parent accesses settings, **When** adjusting volume controls, **Then** audio/TTS settings change accordingly
2. **Given** parent accesses settings, **When** setting daily stamina limits, **Then** child's daily practice is constrained accordingly

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
  Remember to consider child users and ensure all scenarios follow Low-Friction Learning principle.
-->

- What happens when child's stamina reaches zero but they want to continue playing?
- How does system handle offline usage and sync progress when connection returns?
- What if child accidentally closes browser - is progress saved automatically?
- How does the system handle time progression when offline (stamina recovery, pet growth)?
- What happens when a child reaches maximum pet level?
- How does the system present error states to children in a friendly way with retry options?
- What guidance is shown to children when there are no sentences available (empty states)?
- How does the system provide feedback during loading operations?

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: All requirements must align with WordPet's Core Constitution:
  - Child-First Design
  - Low-Friction Learning  
  - Lightweight Architecture
  - Gamified Engagement
  - Responsible Usage
-->

### Functional Requirements

- **FR-001**: System MUST implement drag-and-drop interface with large touch targets suitable for children's motor skills
- **FR-002**: System MUST provide non-punitive feedback when answers are incorrect, with minimal rewards to maintain engagement
- **FR-003**: Users MUST be able to play offline without internet connection, with progress saved in browser storage
- **FR-004**: System MUST persist learning progress, pet status, and coins using client-side storage
- **FR-005**: System MUST include stamina limitations to prevent overuse and encourage periodic engagement
- **FR-006**: System MUST randomize word order in sentence拼接 games from a curated list of daily life sentences
- **FR-007**: System MUST prioritize mistake bag sentences 30% of the time during regular gameplay
- **FR-008**: System MUST calculate and track mastery scores for each sentence to determine when to remove from mistake bag
- **FR-009**: System MUST implement combo rewards for consecutive correct answers to encourage continued engagement
- **FR-010**: System MUST support offline experience/energy regeneration based on elapsed time since last session
- **FR-011**: System MUST support basic accessibility features for children with disabilities including sufficient color contrast, screen reader compatibility, and alternative interaction methods if needed
- **FR-012**: System MUST comply with children's privacy regulations (e.g., COPPA) and retain user data only as long as necessary for the educational purpose, with clear deletion policies
- **FR-013**: Core functionality MUST operate without external dependencies; analytics and progress synchronization MUST work through local storage with eventual sync when online

### Out of Scope

- Social features between users (messaging, friend lists, collaborative learning)
- Complex multi-player functionality 
- Real-time communication features
- Advanced reporting or analytics beyond basic progress tracking
- Integration with external learning management systems

### Key Entities *(include if feature involves data)*

- **Player**: Represents the child's profile including level, coins, and stamina
- **Pet**: Virtual pet with level, experience, and decorative items 
- **Sentence**: Language learning unit identified by its text content with mastery score
- **MistakeBag**: Collection of sentences the child has answered incorrectly, with tracking for review
- **Settings**: Configuration options for audio, stamina limits, and parental controls

## Clarifications

### Session 2025-10-18

- Q: How should sentences be uniquely identified in the system? → A: Sentences identified by their text content rather than numeric IDs
- Q: How should the system handle error, empty, and loading states? → A: Show friendly error messages with retry options, display empty states with clear guidance, and use skeleton loading screens
- Q: What are the expected performance targets for the application? → A: Page/app loads in under 3 seconds, animations run at 60fps, and interactions respond within 100ms
- Q: What are the external dependencies and how should failure modes be handled? → A: No external dependencies for core functionality; analytics and progress synchronization handled through local storage with eventual sync when online
- Q: What features are explicitly out of scope? → A: Social features between users, complex multi-player functionality, and real-time communication are explicitly out of scope

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must align with WordPet's core mission of child-friendly learning.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: Child can successfully complete a sentence拼接 exercise within 2 minutes on first attempt
- **SC-002**: System maintains smooth animations and interactions on devices with limited processing power
- **SC-003**: At least 80% of attempted sentences result in positive reinforcement (correct answers or minimal rewards for incorrect answers)
- **SC-004**: Learning progress is reliably preserved across browser sessions and device restarts
- **SC-005**: Pet growth occurs at an appropriate pace to maintain long-term engagement (e.g., level up after 10-20 successful sentences)
- **SC-006**: At least 70% of the sentences presented are from the current daily life collection, with 30% from mistake bag
- **SC-007**: System supports offline usage for at least 1 week without losing learning progress
- **SC-008**: Children can successfully recognize and interact with the drag-and-drop interface (success rate >85% on first try)
- **SC-009**: Application loads completely within 3 seconds on target devices
- **SC-010**: Animations maintain 60fps performance during all interactive elements
- **SC-011**: User interactions respond within 100ms to maintain responsive feel