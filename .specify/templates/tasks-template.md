---
description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **WordPet**: `index.html`, `style.css`, `game.js`, `data.js`, `pet.js`, `utils.js` at repository root
- Paths shown below assume single HTML5 page project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  Remember to align all tasks with WordPet's Core Constitution:
  - Child-First Design
  - Low-Friction Learning  
  - Lightweight Architecture
  - Gamified Engagement
  - Responsible Usage
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic HTML structure

- [ ] T001 Create basic HTML structure with proper viewport meta tag for mobile
- [ ] T002 Initialize CSS with child-friendly colors and large touch targets
- [ ] T003 [P] Setup JS files (game.js, data.js, pet.js, utils.js) with basic module structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Foundational tasks for WordPet:

- [ ] T004 Setup LocalStorage persistence system for player progress
- [ ] T005 [P] Implement basic sentence data model and storage
- [ ] T006 [P] Create data structures for Player and Pet entities
- [ ] T007 Implement stamina/energy management system
- [ ] T008 Configure basic UI framework for game screens
- [ ] T009 Setup error handling and basic logging for debugging

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Child Sentence Practice (Priority: P1) 🎯 MVP

**Goal**: Enable children to practice forming sentences by dragging and arranging words with positive feedback

**Independent Test**: Child can successfully drag words to form a sentence and receive rewards when correct, with gentle encouragement when incorrect.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

**NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Test drag-and-drop functionality works with large touch targets
- [ ] T011 [P] [US1] Test correct sentence receives positive feedback and rewards

### Implementation for User Story 1

- [ ] T012 [P] [US1] Implement sentence scrambling algorithm in game.js
- [ ] T013 [P] [US1] Create drag-and-drop UI component with large touch targets for children
- [ ] T014 [US1] Implement sentence validation logic with positive feedback (coins, experience)
- [ ] T015 [US1] Implement mistake handling with minimal reward and mistake bag addition
- [ ] T016 [US1] Add visual and audio feedback for correct/incorrect answers
- [ ] T017 [US1] Integrate with LocalStorage to save sentence completion status

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Pet Growth and Rewards (Priority: P2)

**Goal**: Implement virtual pet that grows and unlocks features when children practice correctly

**Independent Test**: Child receives visible pet growth (level up, new decorations) and rewards (coins, animations) when successfully completing sentence exercises.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Test pet level increases after accumulating sufficient experience
- [ ] T019 [P] [US2] Test pet decorations unlock at specified milestones

### Implementation for User Story 2

- [ ] T020 [P] [US2] Implement pet data model with level, experience, and decorations in pet.js
- [ ] T021 [US2] Create visual pet representation with growth animations
- [ ] T022 [US2] Implement level progression system with experience tracking
- [ ] T023 [US2] Add decoration unlocking mechanism based on achievements

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Mistake Review System (Priority: P3)

**Goal**: Enable review of previously incorrect sentences to improve mastery

**Independent Test**: Child can revisit previously incorrect sentences and successfully complete them to improve their mastery score.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Test mistake bag properly stores incorrect sentences
- [ ] T025 [P] [US3] Test sentences are removed from mistake bag after achieving mastery >=0.8

### Implementation for User Story 3

- [ ] T026 [P] [US3] Implement mistake bag data structure with mastery tracking
- [ ] T027 [US3] Create review interface for practicing mistake bag sentences
- [ ] T028 [US3] Implement mastery calculation and sentence removal logic

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Child-friendly UI polishing and accessibility improvements
- [ ] TXXX Code cleanup and refactoring for performance on low-end devices
- [ ] TXXX Performance optimization for smooth animations and interactions
- [ ] TXXX [P] Offline functionality validation and improvement
- [ ] TXXX Child safety and privacy compliance checks
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All tasks must align with WordPet Core Principles: Child-First Design, Low-Friction Learning, Lightweight Architecture, Gamified Engagement, and Responsible Usage



