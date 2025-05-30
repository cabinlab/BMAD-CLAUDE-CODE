# Story Definition of Done (DoD) Checklist

**Purpose**: Validate story completion and quality before marking as done during the `implement-story` task.  
**Used By**: Developer persona during implementation completion, QA Engineer for testing validation, and Orchestrator during quality gates  
**Frequency**: Before marking story as complete and ready for deployment

## Instructions for Developer Agent:

Before marking a story as 'Review', please go through each item in this checklist. Report the status of each item (e.g., [x] Done, [ ] Not Done, [N/A] Not Applicable) and provide brief comments if necessary.

## Checklist Items:

1.  **Requirements Met:**

    - [ ] All functional requirements specified in the story are implemented.
    - [ ] All acceptance criteria defined in the story are met.

2.  **Coding Standards & Project Structure:**

    - [ ] All new/modified code strictly adheres to `Operational Guidelines`.
    - [ ] All new/modified code aligns with `Project Structure` (file locations, naming, etc.).
    - [ ] Adherence to `Tech Stack` for technologies/versions used (if story introduces or modifies tech usage).
    - [ ] Adherence to `Api Reference` and `Data Models` (if story involves API or data model changes).
    - [ ] Basic security best practices (e.g., input validation, proper error handling, no hardcoded secrets) applied for new/modified code.
    - [ ] No new linter errors or warnings introduced.
    - [ ] Code is well-commented where necessary (clarifying complex logic, not obvious statements).

3.  **Testing:**

    - [ ] All required unit tests as per the story and `Operational Guidelines` Testing Strategy are implemented.
    - [ ] All required integration tests (if applicable) as per the story and `Operational Guidelines` Testing Strategy are implemented.
    - [ ] All tests (unit, integration, E2E if applicable) pass successfully.
    - [ ] Test coverage meets project standards (if defined).

4.  **Functionality & Verification:**

    - [ ] Functionality has been manually verified by the developer (e.g., running the app locally, checking UI, testing API endpoints).
    - [ ] Edge cases and potential error conditions considered and handled gracefully.

5.  **Story Administration:**
    - [ ] All tasks within the story file are marked as complete.
    - [ ] Any clarifications or decisions made during development are documented in the story file or linked appropriately.
    - [ ] The story wrap up section has been completed with notes of changes or information relevant to the next story or overall project, the agent model that was primarily used during development, and the changelog of any changes is properly updated.
6.  **Dependencies, Build & Configuration:**

    - [ ] Project builds successfully without errors.
    - [ ] Project linting passes
    - [ ] Any new dependencies added were either pre-approved in the story requirements OR explicitly approved by the user during development (approval documented in story file).
    - [ ] If new dependencies were added, they are recorded in the appropriate project files (e.g., `package.json`, `requirements.txt`) with justification.
    - [ ] No known security vulnerabilities introduced by newly added and approved dependencies.
    - [ ] If new environment variables or configurations were introduced by the story, they are documented and handled securely.

7.  **Documentation (If Applicable):**
    - [ ] Relevant inline code documentation (e.g., JSDoc, TSDoc, Python docstrings) for new public APIs or complex logic is complete.
    - [ ] User-facing documentation updated, if changes impact users.
    - [ ] Technical documentation (e.g., READMEs, system diagrams) updated if significant architectural changes were made.

## Final Confirmation:

- [ ] I, the Developer Agent, confirm that all applicable items above have been addressed.
