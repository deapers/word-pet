---
description: "Task list for WordPet implementation"
---

# Tasks: Extract Requirements from WordPet Spec

**Input**: Design documents from `/specs/001-extract-requirements/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: No explicit test requirements in spec - tests are not included in these tasks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions
- **WordPet**: `index.html`, `style.css`, `game.js`, `data.js`, `pet.js`, `utils.js` at repository root
- Paths shown below assume single HTML5 page project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic HTML structure

- [x] T001 Create basic HTML structure with proper viewport meta tag for mobile in index.html
- [x] T002 Initialize CSS with child-friendly colors and large touch targets in style.css
- [x] T003 [P] Setup JS files (game.js, data.js, pet.js, utils.js) with basic module structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Foundational tasks for WordPet:

- [x] T004 Setup LocalStorage persistence system for player progress in utils.js
- [x] T005 [P] Implement basic sentence data model and storage in data.js
- [x] T006 [P] Create data structures for Player and Pet entities in data.js
- [x] T007 Implement stamina/energy management system in utils.js
- [x] T008 Configure basic UI framework for game screens in index.html
- [x] T009 Setup error handling and basic logging for debugging in utils.js
- [x] T010 Create data access functions to get and update player state in utils.js
- [x] T011 Implement sentence mastery tracking functions in utils.js
- [x] T012 Setup main application initialization in index.html
- [x] T013 Implement time-based calculations for offline progress in utils.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Sentence Practice Game (Priority: P1) 🎯 MVP

**Goal**: Enable 6-12 year old child to practice forming sentences by tapping words to arrange them with positive feedback

**Independent Test**: Child can successfully tap words to form a sentence and receive positive feedback when correct, with gentle encouragement when incorrect.

### Implementation for User Story 1

- [x] T014 [P] [US1] Implement sentence scrambling algorithm in game.js
- [✓] T015 [US1] Create tap-based UI component with large touch targets for children in index.html and style.css
- [x] T016 [US1] Implement visual sentence puzzle display with words to tap in index.html and style.css
- [x] T017 [US1] Implement sentence validation logic with positive feedback (coins, experience) in game.js
- [x] T018 [US1] Implement mistake handling with minimal reward and mistake bag addition in game.js
- [x] T019 [US1] Add visual and audio feedback for correct/incorrect answers in game.js and style.css
- [x] T020 [US1] Integrate with LocalStorage to save sentence completion status in utils.js
- [x] T021 [US1] Create next sentence selection logic (with 30% priority for mistake bag) in game.js
- [x] T022 [US1] Implement combo reward calculation for consecutive correct answers in utils.js
- [x] T023 [US1] Add accessibility features for tap-based interaction (keyboard navigation) in index.html and game.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Pet Growth System (Priority: P2)

**Goal**: Implement virtual pet that grows and unlocks features when children practice correctly

**Independent Test**: Child receives visible pet growth (level up, new decorations) and rewards (coins, animations) when successfully completing sentence exercises.

### Implementation for User Story 2

- [x] T024 [P] [US2] Implement pet data model with level, experience, and decorations in pet.js
- [x] T025 [US2] Create visual pet representation with growth animations in index.html and style.css
- [x] T026 [US2] Implement level progression system with experience tracking in pet.js
- [x] T027 [US2] Add decoration unlocking mechanism based on achievements in pet.js
- [x] T028 [US2] Implement pet visual updates when child earns experience in index.html and style.css
- [x] T029 [US2] Create pet interaction UI (feeding, care) in index.html and style.css
- [x] T030 [US2] Implement offline pet growth calculations in pet.js
- [x] T031 [US2] Add pet growth animation sequences in style.css

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Mistake Review (Priority: P3)

**Goal**: Enable review of previously incorrect sentences to improve mastery

**Independent Test**: Child can revisit previously incorrect sentences and successfully complete them to improve their mastery score.

### Implementation for User Story 3

- [x] T032 [P] [US3] Implement mistake bag data structure with mastery tracking in data.js
- [x] T033 [US3] Create review interface for practicing mistake bag sentences in index.html and style.css
- [x] T034 [US3] Implement mastery calculation and sentence removal logic in utils.js
- [x] T035 [US3] Add extra rewards for successfully reviewing mistake bag sentences in game.js
- [x] T036 [US3] Create visual indicators for sentences that need review in index.html and style.css
- [x] T037 [US3] Implement review mode toggle functionality in game.js
- [x] T038 [US3] Add progress tracking for mistake bag sentences in utils.js

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - Home Dashboard (Priority: P2)

**Goal**: Display pet status and learning progress on the home screen so child can understand achievements and next steps

**Independent Test**: Child can view pet level, experience, stamina, and today's learning progress (sentences practiced, coins earned).

### Implementation for User Story 4

- [ ] T039 [P] [US4] Create home dashboard UI structure in index.html and style.css
- [ ] T040 [US4] Implement display of pet status (level, experience, stamina) in index.html and game.js
- [ ] T041 [US4] Create daily progress display (sentences practiced, coins earned) in index.html and game.js
- [ ] T042 [US4] Implement navigation elements to game and other features in index.html
- [ ] T043 [US4] Add quick access buttons to sentence practice, review, and pet care in index.html
- [ ] T044 [US4] Create summary statistics visualization in index.html and style.css
- [ ] T045 [US4] Implement auto-refresh of dashboard stats when returning from activities in game.js

**Checkpoint**: At this point, all previous user stories plus US4 should work independently

---

## Phase 7: User Story 5 - Settings and Parental Controls (Priority: P3)

**Goal**: Allow parents to configure app settings and access parental controls to customize the experience for their child

**Independent Test**: Parents can access settings to adjust volume, set daily stamina limits, and review learning progress.

### Implementation for User Story 5

- [ ] T046 [P] [US5] Create settings UI structure in index.html and style.css
- [ ] T047 [US5] Implement volume and TTS toggle controls in index.html and game.js
- [ ] T048 [US5] Create daily stamina limit configuration in index.html and game.js
- [ ] T049 [US5] Implement parental PIN protection for settings access in game.js
- [ ] T050 [US5] Add animation toggle and language selection options in index.html and game.js
- [ ] T051 [US5] Create learning progress reporting for parents in index.html and game.js
- [ ] T052 [US5] Implement data reset functionality with parental PIN protection in game.js
- [ ] T053 [US5] Add accessibility settings (contrast, font size) in style.css and game.js

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T054 [P] Child-friendly UI polishing and accessibility improvements in style.css
- [ ] T055 Code cleanup and refactoring for performance on low-end devices in all JS files
- [ ] T056 Performance optimization for smooth animations and interactions in style.css
- [ ] T057 [P] Offline functionality validation and improvement in utils.js
- [ ] T058 Child safety and privacy compliance checks in all files
- [ ] T059 Run quickstart.md validation in README.md
- [ ] T060 Error state handling with friendly messages in game.js and index.html
- [ ] T061 Empty state guidance implementation in index.html and game.js
- [ ] T062 Skeleton loading screen implementation in index.html and style.css
- [ ] T063 Implement bundle size optimization to stay under 1MB in build process
- [ ] T064 Add PWA manifest and service worker for offline capability in manifest.json and sw.js
- [ ] T065 Final user testing validation with 6-12 year old children's feedback
- [x] T066 Improve UI layout and typography for better visual appeal
- [x] T067 Consolidate Start Practice and Continuous Mode buttons
- [x] T068 Display core player experience data on game screen
- [x] T069 Improve button layout with vertical stacking for better aesthetics
- [x] T070 Add text-to-speech functionality for word pronunciation
- [x] T071 Implement encouraging feedback messages for correct/incorrect answers

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
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No direct dependencies
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on US1 (sentence handling)
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Depends on US1, US2 (dashboard displays data from other features)
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - No direct dependencies

### Within Each User Story

- Models before services
- Services before UI components
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

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
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All tasks must align with WordPet Core Principles: Child-First Design, Low-Friction Learning, Lightweight Architecture, Gamified Engagement, and Responsible Usage