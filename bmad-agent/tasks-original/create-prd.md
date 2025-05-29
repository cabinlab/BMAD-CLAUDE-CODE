# PRD Generate Task

## Purpose

- Transform inputs into core product definition documents conforming to the `prd-tmpl` template.
- Define clear MVP scope focused on essential functionality.
- Provide foundation for Architect and eventually AI dev agents.

Remember as you follow the upcoming instructions:

- Your documents form the foundation for the entire development process.
- Output will be directly used by the Architect to create an architecture document and solution designs to make definitive technical decisions.
- Your epics/stories will ultimately be transformed into development tasks.
- While you focus on the "what" not "how", be precise enough to support a logical sequential order of operations that once later further details can logically be followed where a story will complete what is needed.

## Instructions

### 1. Define Project Workflow Context

- Before PRD generation, ask the user to choose their intended workflow:

  A. **Outcome Focused (Default):** (Agent defines outcome-focused User Stories, leaving detailed technical "how" for Architect/Scrum Master. Capture nuances as "Notes for Architect/Scrum Master in the Prompt for Architect.")

  B. **Very Technical (Not Recommended):** (Agent adopts a "solution-aware" stance, providing more detailed, implementation-aware Acceptance Criteria to bridge to development, potentially with no architect involved at all, instead filling in all of the technical details. \<important_note\>When this workflow is selected, you are also responsible for collaboratively defining and documenting key technical foundations—such as technology stack choices and proposed application structure—directly within a new, dedicated section of the PRD template titled '[OPTIONAL: For Simplified PM-to-Development Workflow Only] Core Technical Decisions & Application Structure'.\</important_note\>)

- Explain this choice sets a default detail level, which can be fine-tuned later per story/epic.

### 2. Determine Interaction Mode (for PRD Structure & Detail)

- Confirm with the user their preferred interaction style for creating the PRD if unknown - INCREMENTAL or YOLO?:
  - **Incrementally (Default):** Address PRD sections sequentially, seeking feedback on each. For Epics/Stories: first present the ordered Epic list for approval, then detail stories for each Epic one by one.
  - **"YOLO" Mode:** Draft a more comprehensive PRD (or significant portions with multiple sections, epics, and stories) for a single, larger review.

### 3. Review inputs provided

Review the inputs provided so far, such as a project brief, any research, and user input and ideas.

### 4. Process PRD Sections

Inform the user we will work through the PRD sections in order 1 at a time (if not YOLO) - the template contains your instructions for each section. After presenting the section to the user, also [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)

<important_note>When working on the "Technical Assumptions" section of the PRD, explicitly guide the user through discussing and deciding on the repository structure (Monorepo vs. Polyrepo) and the high-level service architecture (e.g., Monolith, Microservices, Serverless functions within a Monorepo). Emphasize that this is a critical decision point that will be formally documented here with its rationale, impacting MVP scope and informing the Architect. Ensure this decision is captured in the PRD's `Technical Assumptions` and then reiterated in the `Initial Architect Prompt` section of the PRD.</important_note>

<important_note>Specifically for "Simplified PM-to-Development Workflow":
After discussing initial PRD sections (like Problem, Goals, User Personas) and before or in parallel with defining detailed Epics and Stories, you must introduce and populate the "[OPTIONAL: For Simplified PM-to-Development Workflow Only] Core Technical Decisions & Application Structure" section of the PRD.

    When doing so, first check if a `docs/technical-preferences.md` file exists or has been provided. If it does, inform the user you will consult it to help guide these technical decisions, while still confirming all choices with them. Ask targeted questions such as:

1.  "What are your preliminary thoughts on the primary programming languages and frameworks for the backend and frontend (if applicable)? (I will cross-reference any preferences you've noted in `technical-preferences`.)"
2.  "Which database system are you considering? (Checking preferences...)"
3.  "Are there any specific cloud services, key libraries, or deployment platforms we should plan for at this stage? (Checking preferences...)"
4.  "How do you envision the high-level folder structure or main modules of the application? Could you describe the key components and their responsibilities? (I'll consider any structural preferences noted.)"
5.  "Will this be a monorepo or are you thinking of separate repositories for different parts of the application?"
    This section should be collaboratively filled and updated as needed if subsequent epic/story discussions reveal new requirements or constraints.

</important_note\>

<important_note>

For the Epic and Story Section (if in Incremental mode for these), prepare in memory what you think the initial epic and story list so we can work through this incrementally, use all of the information you have learned that has been provided thus far to follow the guidelines in the section below [Guiding Principles for Epic and User Story Generation](https://www.google.com/search?q=%23guiding-principles-for-epic-and-user-story-generation).

</important_note>

#### 4A. Epic Presentation and Drafting Strategy

You will first present the user with the epic titles and descriptions, so that the user can determine if it is correct and what is expected, or if there is a major epic missing.

#### 4B. Story Generation and Review within Epics (Incremental Mode)

**Once the Epic List is approved, THEN for each Epic, you will proceed as follows:**

i. **Draft All Stories for the Current Epic:** Based on the Epic's goal and your discussions, draft all the necessary User Stories for this Epic, following the "Guiding Principles for Epic and User Story Generation".
ii. **Perform Internal Story Analysis & Propose Order:** Before presenting the stories for detailed review, you will internally:
a. **Re-evaluate for Cross-Cutting Concerns:** Ensure no drafted stories should actually be ACs or notes within other stories, as per the guiding principle. Make necessary adjustments.
b. **Analyze for Logical Sequence & Dependencies:** For all stories within this Epic, determine their logical implementation order. Identify any direct prerequisite stories (e.g., "Story X must be completed before Story Y because Y consumes the output of X").
c. **Formulate a Rationale for the Order:** Prepare a brief explanation for why the proposed order is logical.
iii. **Present Proposed Story Set & Order for the Epic:** Present to the user:
a. The complete list of (potentially revised) User Stories for the Epic.
b. The proposed sequence for these stories.
c. Your brief rationale for the sequencing and any key dependencies you've noted (e.g., "I suggest this order because Story 2 builds upon the data prepared in Story 1, and Story 3 then uses the results from Story 2.").
iv. **Collaborative Review of Sequence & Story Shells:** Discuss this proposed structure and sequence with the user. Make any adjustments to the story list or their order based on user feedback.
v. Once the overall structure and sequence of stories for the Epic are agreed upon, THEN you will work with the user to review the details (description, Acceptance Criteria) of each story in the agreed-upon sequence for that Epic.
vi. [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)

#### 4C. Present Complete Draft

Present the user with the complete full draft once all sections are completed (or as per YOLO mode interaction).

#### 4D. UI Component Handoff Note

If there is a UI component to this PRD, you can inform the user that the Design Architect should take this final output.

### 5\. Checklist Assessment

- Use the `pm-checklist` to consider each item in the checklist is met (or n/a) against the PRD.
- Document completion status for each item.
- Present the user with summary of each section of the checklist before going to the next section.
- Address deficiencies with user for input or suggested updates or corrections.
- Once complete and address, output the final checklist with all the checked items or skipped items, the section summary table, and any final notes. The checklist should have any findings that were discuss and resolved or ignored also. This will be a nice artifact for the user to keep.

### 6\. Produce the PRD

Produce the PRD with PM Prompt per the `prd-tmpl` utilizing the following guidance:

**General Presentation & Content:**

- Present Project Briefs (drafts or final) in a clean, full format.
- Crucially, DO NOT truncate information that has not changed from a previous version.
- For complete documents, begin directly with the content (no introductory text is needed).

<important_note>
**Next Steps for UI/UX Specification (If Applicable):**

- If the product described in this PRD includes a user interface:

  1.  **Include Design Architect Prompt in PRD:** You will add a dedicated section in the PRD document you are producing, specifically at the location marked `(END Checklist START Design Architect UI/UX Specification Mode Prompt)` (as per the `prd-tmpl` structure). This section will contain a prompt for the **Design Architect** agent.

      - The prompt should clearly state that the Design Architect is to operate in its **'UI/UX Specification Mode'**.

      - It should instruct the Design Architect to use this PRD as primary input to collaboratively define and document detailed UI/UX specifications. This might involve creating/populating a `front-end-spec-tmpl` and ensuring key UI/UX considerations are integrated or referenced back into the PRD to enrich it.

      - Example prompt text to insert:

        ```markdown
        ## Prompt for Design Architect (UI/UX Specification Mode)

        **Objective:** Elaborate on the UI/UX aspects of the product defined in this PRD.
        **Mode:** UI/UX Specification Mode
        **Input:** This completed PRD document.
        **Key Tasks:**

        1. Review the product goals, user stories, and any UI-related notes herein.
        2. Collaboratively define detailed user flows, wire-frames (conceptual), and key screen mockups/descriptions.
        3. Specify usability requirements and accessibility considerations.
        4. Populate or create the `front-end-spec-tmpl` document.
        5. Ensure that this PRD is updated or clearly references the detailed UI/UX specifications derived from your work, so that it provides a comprehensive foundation for subsequent architecture and development phases.

        Please guide the user through this process to enrich the PRD with detailed UI/UX specifications.
        ```

  2.  **Recommend User Workflow:** After finalizing this PRD (with the included prompt for the Design Architect), strongly recommend to the user the following sequence:
      a. First, engage the **Design Architect** agent (using the prompt you've embedded in the PRD) to operate in **'UI/UX Specification Mode'**. Explain that this step is crucial for detailing the user interface and experience, and the output (e.g., a populated `front-end-spec-tmpl` and potentially updated PRD sections) will be vital.
      b. Second, _after_ the Design Architect has completed its UI/UX specification work, the user should then proceed to engage the **Architect** agent (using the 'Initial Architect Prompt' also contained in this PRD). The PRD, now enriched with UI/UX details, will provide a more complete basis for technical architecture design.

- If the product does not include a user interface, you will simply recommend proceeding to the Architect agent using the 'Initial Architect Prompt' in the PRD.
  </important_note>

## Guiding Principles for Epic and User Story Generation

### I. Strategic Foundation: Define Core Value & MVP Scope Rigorously

Understand & Clarify Core Needs: Start by deeply understanding and clarifying the core problem this product solves, the essential needs of the defined User Personas (or system actors), and the key business objectives for the Minimum Viable Product (MVP).
Challenge Scope Relentlessly: Actively challenge all requested features and scope at every stage. For each potential feature or story, rigorously ask, "Does this directly support the core MVP goals and provide significant value to a target User Persona?" Clearly identify and defer non-essential functionalities to a Post-MVP backlog.

### II. Structuring the Work: Value-Driven Epics & Logical Sequencing

Organize into Deployable, Value-Driven Epics: Structure the MVP scope into Epics. Each Epic must be designed to deliver a significant, end-to-end, and fully deployable increment of testable functionality that provides tangible value to the user or business. Epics should represent logical functional blocks or coherent user journeys.

Logical Epic Sequencing & Foundational Work:
Ensure the sequence of Epics follows a logical implementation order, making dependencies between Epics clear and explicitly managed.
The first Epic must always establish the foundational project infrastructure (e.g., initial app setup, Git repository, CI/CD pipeline, core cloud service configurations, basic user authentication shell if needed universally) necessary to support its own deployable functionality and that of subsequent Epics.
Ensure Logical Story Sequencing and Dependency Awareness within Epics:
After initially drafting all User Stories for an Epic, but before detailed review with the user, you (the AI Agent executing this task) must explicitly perform an internal review to establish a logical sequence for these stories.
For each story, identify if it has direct prerequisite stories within the same Epic or from already completed Epics.
Propose a clear story order to the user, explaining the rationale based on these dependencies (e.g., "Story X needs to be done before Story Y because..."). Make significant dependencies visible, perhaps as a note within the story description.

### III. Crafting Effective User Stories: Vertical Slices Focused on Value & Clarity

Define Stories as "Vertical Slices": Within each Epic, define User Stories as "vertical slices". This means each story must deliver a complete piece of functionality that achieves a specific user or system goal, potentially cutting through all necessary layers (e.g., UI, API, business logic, database).
Focus on "What" and "Why," Not "How":
Stories will primarily focus on the functional outcome, the user value ("what"), and the reason ("why"). Avoid detailing technical implementation ("how") in the story's main description.
The "As a {specific User Persona/system actor}, I want {to perform an action / achieve a goal} so that {I can realize a benefit / achieve a reason}" format is standard. Be precise and consistent when defining the '{specific User Persona/system actor}', ensuring it aligns with defined personas.
Ensure User Value, Not Just Technical Tasks: User Stories must articulate clear user or business value. Avoid creating stories that are purely technical tasks (e.g., "Set up database," "Refactor module X"), unless they are part of the foundational infrastructure Epic or are essential enabling tasks that are explicitly linked to, and justified by, a user-facing story that delivers value.
Appropriate Sizing & Strive for Independence:
Ensure User Stories are appropriately sized for a typical development iteration (i.e., can be completed by the team in one sprint/iteration).
If a vertically sliced story is too large or complex, work with the user to split it into smaller, still valuable, and still vertically sliced increments.
Where feasible, define stories so they can be developed, tested, and potentially delivered independently of others. If dependencies are unavoidable, they must be clearly identified and managed through sequencing.

### IV. Detailing Stories: Comprehensive Acceptance Criteria & Developer Enablement

Clear, Comprehensive, and Testable Acceptance Criteria (ACs):
Every User Story will have detailed, unambiguous, and testable Acceptance Criteria.
ACs precisely define what "done" means for that story from a functional perspective and serve as the basis for verification.
Where a specific Non-Functional Requirement (NFR) from the PRD (e.g., a particular performance target for a specific action, a security constraint for handling certain data) is critical to a story, ensure it is explicitly captured or clearly referenced within its Acceptance Criteria.
Integrate Developer Enablement & Iterative Design into Stories:
Local Testability (CLI): For User Stories involving backend processing or data components, ensure the ACs consider or specify the ability for developers to test that functionality locally (e.g., via CLI commands, local service instances).
Iterative Schema Definition: Database schema changes (new tables, columns) should be introduced iteratively within the User Stories that functionally require them, rather than defining the entire schema upfront.
Upfront UI/UX Standards (if UI applicable): For User Stories with a UI component, ACs should explicitly state requirements regarding look and feel, responsiveness, and adherence to chosen frameworks/libraries (e.g., Tailwind CSS, shadcn/ui) from the start.

### V. Managing Complexity: Addressing Cross-Cutting Concerns Effectively

Critically Evaluate for Cross-Cutting Concerns:
Before finalizing a User Story, evaluate if the described functionality is truly a discrete, user-facing piece of value or if it represents a cross-cutting concern (e.g., a specific logging requirement, a UI theme element used by many views, a core technical enabler for multiple other stories, a specific aspect of error handling).
If a piece of functionality is identified as a cross-cutting concern:
a. Avoid creating a separate User Story for it unless it delivers standalone, testable user value.
b. Instead, integrate the requirement as specific Acceptance Criteria within all relevant User Stories it impacts.
c. Alternatively, if it's a pervasive technical enabler or a non-functional requirement that applies broadly, document it clearly within the relevant PRD section (e.g., 'Non Functional Requirements', 'Technical Assumptions'), or as a note for the Architect within the story descriptions if highly specific.

Your aim is to ensure User Stories remain focused on delivering measurable user value, while still capturing all necessary technical and functional details appropriately.

### VI. Ensuring Quality & Smooth Handoff

Maintain Clarity for Handoff and Architectural Freedom: User Stories, their descriptions, and Acceptance Criteria must be detailed enough to provide the Architect with a clear and comprehensive understanding of "what is required," while allowing for architectural flexibility on the "how."
Confirm "Ready" State: Before considering an Epic's stories complete, ensure each story is effectively "ready" for subsequent architectural review or development planning – meaning it's clear, understandable, testable, its dependencies are noted, and any foundational work (like from the first epic) is accounted for.

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
