# Create Frontend Architecture Task

## Purpose

To define the technical architecture for the frontend application. This includes selecting appropriate patterns, structuring the codebase, defining component strategy, planning state management, outlining API interactions, and setting up testing and deployment approaches, all while adhering to the guidelines in `front-end-architecture-tmpl` template.

## Inputs

- Product Requirements Document (PRD) (`prd-tmpl` or equivalent)
- Completed UI/UX Specification (`front-end-spec-tmpl` or equivalent)
- Main System Architecture Document (`architecture` or equivalent) - The agent executing this task should particularly note the overall system structure (Monorepo/Polyrepo, backend service architecture) detailed here, as it influences frontend patterns.
- Primary Design Files (Figma, Sketch, etc., linked from UI/UX Spec)

## Key Activities & Instructions

### 1. Confirm Interaction Mode

- Ask the user: "How would you like to proceed with creating the frontend architecture? We can work:
  A. **Incrementally (Default & Recommended):** We'll go through each architectural decision and document section step-by-step. I'll present drafts, and we'll seek your feedback and confirmation before moving to the next part. This is best for complex decisions and detailed refinement.
  B. **"YOLO" Mode:** I can produce a more comprehensive initial draft of the frontend architecture for you to review more broadly first. We can then iterate on specific sections based on your feedback. This can be quicker for generating initial ideas but is generally not recommended if detailed collaboration at each step is preferred."
- Request the user to select their preferred mode (e.g., "Please let me know if you'd prefer A or B.").
- Once the user chooses, confirm the selected mode (e.g., "Okay, we will proceed in Incremental mode."). This chosen mode will govern how subsequent steps are executed.

### 2. Review Inputs & Establish Context

- Thoroughly review the inputs, including the UI/UX Specification and the main Architecture Document (especially "Definitive Tech Stack Selections", API contracts, and the documented overall system structure like monorepo/polyrepo choices).
- Ask clarifying questions to bridge any gaps between the UI/UX vision and the overall system architecture.

### 3. Define Overall Frontend Philosophy & Patterns (for `front-end-architecture`)

- Based on the main architecture's tech stack and overall system structure (monorepo/polyrepo, backend service details), confirm and detail:
  - Framework & Core Libraries choices.
  - High-level Component Architecture strategy.
  - High-level State Management Strategy.
  - Data Flow principles.
  - Styling Approach.
  - Key Design Patterns to be employed.

### 4. Specify Detailed Frontend Directory Structure (for `front-end-architecture`)

- Collaboratively define or refine the frontend-specific directory structure, ensuring it aligns with the chosen framework and promotes modularity and scalability.

### 5. Outline Component Strategy & Conventions (for `front-end-architecture`)

- Define Component Naming & Organization conventions.
- Establish the "Template for Component Specification" (as per `front-end-architecture`), emphasizing that most components will be detailed emergently but must follow this template.
- Optionally, specify a few absolutely foundational/shared UI components (e.g., a generic Button or Modal wrapper if the chosen UI library needs one, or if no UI library is used).

### 6. Detail State Management Setup & Conventions (for `front-end-architecture`)

- Based on the high-level strategy, detail:
  - Chosen Solution and core setup.
  - Conventions for Store Structure / Slices (e.g., "feature-based slices"). Define any genuinely global/core slices (e.g., session/auth).
  - Conventions for Selectors and Actions/Reducers/Thunks. Provide templates or examples.

### 7. Plan API Interaction Layer (for `front-end-architecture`)

- Define the HTTP Client Setup.
- Establish patterns for Service Definitions (how API calls will be encapsulated).
- Outline frontend Error Handling & Retry strategies for API calls.

### 8. Define Routing Strategy (for `front-end-architecture`)

- Confirm the Routing Library.
- Collaboratively define the main Route Definitions and any Route Guards.

### 9. Specify Build, Bundling, and Deployment Details (for `front-end-architecture`)

- Outline the frontend-specific Build Process & Scripts.
- Discuss and document Key Bundling Optimizations.
- Confirm Deployment to CDN/Hosting details relevant to the frontend.

### 10. Refine Frontend Testing Strategy (for `front-end-architecture`)

- Elaborate on the main testing strategy with specifics for: Component Testing, UI Integration/Flow Testing, and E2E UI Testing scope and tools.

### 11. Outline Performance Considerations (for `front-end-architecture`)

- List key frontend-specific performance strategies to be employed.

### 12. Document Drafting & Confirmation (Guided by `front-end-architecture-tmpl`)

- **If "Incremental Mode" was selected:**

  - For each relevant section of the `front-end-architecture` (as outlined in steps 3-11 above, covering topics from Overall Philosophy to Performance Considerations):

    - **a. Explain Purpose & Draft Section:** Explain the purpose of the section and present a draft for that section.
    - **b. Initial Discussion & Feedback:** Discuss the draft with the user, incorporate their feedback, and iterate as needed for initial revisions.
    - **c. [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)**

    - **d. Final Approval & Documentation:** Obtain explicit user approval for the section. Ensure all placeholder links and references are correctly noted within each section. Then proceed to the next section.

  - Once all sections are individually approved through this process, confirm with the user that the overall `front-end-architecture` document is populated and ready for Step 13 (Epic/Story Impacts) and then the checklist review (Step 14).

- **If "YOLO Mode" was selected:**
  - Collaboratively populate all relevant sections of the `front-end-architecture-tmpl` (as outlined in steps 3-11 above) to create a comprehensive first draft.
  - Present the complete draft of `front-end-architecture` to the user for a holistic review.
  - <important_note>After presenting the full draft in YOLO mode, you MAY still offer a condensed version of the 'Advanced Reflective & Elicitation Options' menu, perhaps focused on a few key overarching review actions (e.g., overall requirements alignment, major risk assessment) if the user wishes to perform a structured deep dive before detailed section-by-section feedback.</important_note>
  - Obtain explicit user approval for the entire `front-end-architecture` document before proceeding to Step 13 (Epic/Story Impacts) and then the checklist review (Step 14).

### 13. Identify & Summarize Epic/Story Impacts (Frontend Focus)

- After the `front-end-architecture` is confirmed, review it in context of existing epics and user stories (if provided or known).
- Identify any frontend-specific technical tasks that might need to be added as new stories or sub-tasks (e.g., "Implement responsive layout for product details page based on defined breakpoints," "Set up X state management slice for user profile," "Develop reusable Y component as per specification").
- Identify if any existing user stories require refinement of their acceptance criteria due to frontend architectural decisions (e.g., specifying interaction details, component usage, or performance considerations for UI elements).
- Collaborate with the user to define these additions or refinements.
- Prepare a concise summary detailing all proposed additions, updates, or modifications to epics and user stories related to the frontend. If no changes are identified, explicitly state this (e.g., "No direct impacts on existing epics/stories were identified from the frontend architecture").

### 14. Checklist Review and Finalization

- Once the `front-end-architecture` has been populated and reviewed with the user, and epic/story impacts have been summarized, use the `frontend-architecture-checklist`.
- Go through each item in the checklist to ensure the `front-end-architecture` is comprehensive and all sections are adequately addressed - for each checklist item you MUST consider if it is really complete or deficient.
- For each checklist section, confirm its status (e.g., \[x] Completed, \[ ] N/A, \[!] Needs Attention).
- If deficiencies or areas needing more detail are identified with a section:
  - Discuss these with the user.
  - Collaboratively make necessary updates or additions to the `front-end-architecture`.
- After addressing all points and ensuring the document is robust, present a summary of the checklist review to the user. This summary should highlight:
  - Confirmation that all relevant sections of the checklist have been satisfied.
  - Any items marked N/A and a brief reason.
  - A brief note on any significant discussions or changes made as a result of the checklist review.
- The goal is to ensure the `front-end-architecture` is a complete and actionable document.

## Offer Advanced Self-Refinement & Elicitation Options

(This section is called when needed prior to this)

Present the user with the following list of 'Advanced Reflective, Elicitation & Brainstorming Actions'. Explain that these are optional steps to help ensure quality, explore alternatives, and deepen the understanding of the current section before finalizing it and moving on. The user can select an action by number, or choose to skip this and proceed to finalize the section.

"To ensure the quality of the current section: **[Specific Section Name]** and to ensure its robustness, explore alternatives, and consider all angles, I can perform any of the following actions. Please choose a number (8 to finalize and proceed):

**Advanced Reflective, Elicitation & Brainstorming Actions I Can Take:**

{Instruction for AI Agent: Display the title of each numbered item below. If the user asks what a specific option means, provide a brief explanation of the action you will take, drawing from detailed descriptions tailored for the context.}

1.  **Critical Self-Review & User Goal Alignment**
2.  **Generate & Evaluate Alternative Design Solutions**
3.  **User Journey & Interaction Stress Test (Conceptual)**
4.  **Deep Dive into Design Assumptions & Constraints**
5.  **Usability & Accessibility Audit Review & Probing Questions**
6.  **Collaborative Ideation & UI Feature Brainstorming**
7.  **Elicit 'Unforeseen User Needs' & Future Interaction Questions**
8.  **Finalize this Section and Proceed.**

After I perform the selected action, we can discuss the outcome and decide on any further revisions for this section."

REPEAT by Asking the user if they would like to perform another Reflective, Elicitation & Brainstorming Action UNIT the user indicates it is time to proceed ot the next section (or selects #8)
