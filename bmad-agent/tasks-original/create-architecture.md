# Architecture Creation Task

## Purpose

- To design a complete, robust, and well-documented technical architecture based on the project requirements (PRD, epics, brief), research findings, and user input.
- To make definitive technology choices and articulate the rationale behind them, leveraging the architecture template as a structural guide.
- To produce all necessary technical artifacts, ensuring the architecture is optimized for efficient implementation, particularly by AI developer agents, and validated against the `architect-checklist`.

## Instructions

1.  **Input Analysis & Dialogue Establishment:**

    - Ensure you have all necessary inputs: PRD document (specifically checking for the 'Technical Assumptions' and 'Initial Architect Prompt' sections for the decided repository and service architecture), project brief, any deep research reports, and optionally a `technical-preferences.md`. Request any missing critical documents.
    - Thoroughly review all inputs.
    - Summarize key technical requirements, constraints, NFRs (Non-Functional Requirements), and the decided repository/service architecture derived from the inputs. Present this summary to the user for confirmation and to ensure mutual understanding.
    - Share initial architectural observations, potential challenges, or areas needing clarification based on the inputs.
      **Establish Interaction Mode for Architecture Creation:**
      - Ask the user: "How would you like to proceed with creating the architecture for this project? We can work:
        A. **Incrementally (Default & Recommended):** We'll go through each architectural decision, document section, or design point step-by-step. I'll present drafts, and we'll seek your feedback and confirmation before moving to the next part. This is best for complex decisions and detailed refinement.
        B. **"YOLO" Mode:** I can produce a more comprehensive initial draft of the architecture (or significant portions) for you to review more broadly first. We can then iterate on specific sections based on your feedback. This can be quicker for generating initial ideas but is generally not recommended if detailed collaboration at each step is preferred."
      - Request the user to select their preferred mode (e.g., "Please let me know if you'd prefer A or B.").
      - Once the user chooses, confirm the selected mode (e.g., "Okay, we will proceed in Incremental mode."). This chosen mode will govern how subsequent steps in this task are executed.

2.  **Resolve Ambiguities & Gather Missing Information:**

    - If key information is missing or requirements are unclear after initial review, formulate specific, targeted questions.
    - **External API Details:** If the project involves integration with external APIs, especially those that are less common or where you lack high confidence in your training data regarding their specific request/response schemas, and if a "Deep Research" phase was not conducted for these APIs:
      - Proactively ask the user to provide precise details. This includes:
        - Links to the official API documentation.
        - Example request structures (e.g., cURL commands, JSON payloads).
        - Example response structures (e.g., JSON responses for typical scenarios, including error responses).
      - Explain that this information is crucial for accurately defining API interaction contracts within the architecture, for creating robust facades/adapters, and for enabling accurate technical planning (e.g., for technical stories or epic refinements).
    - Present questions to the user (batched logically if multiple) and await their input.
    - Document all decisions and clarifications received before proceeding.

3.  **Iterative Technology Selection & Design (Interactive, if not YOLO mode):**

    - For each major architectural component or decision point (e.g., frontend framework, backend language/framework, database system, cloud provider, key services, communication patterns):
      - If multiple viable options exist based on requirements or research, present 2-3 choices, briefly outlining their pros, cons, and relevance to the project. Consider any preferences stated in `technical-preferences.md` when formulating these options and your recommendation.
      - State your recommended choice, providing a clear rationale based on requirements, research findings, user preferences (if known), and best practices (e.g., scalability, cost, team familiarity, ecosystem).
      - Ask for user feedback, address concerns, and seek explicit approval before finalizing the decision.
      - Document the confirmed choice and its rationale within the architecture document.
    - **Starter Templates:** If applicable and requested, research and recommend suitable starter templates or assess existing codebases. Explain alignment with project goals and seek user confirmation.

4.  **Create Technical Artifacts (Incrementally, unless YOLO mode, guided by `architecture-tmpl`):**

    - For each artifact or section of the main Architecture Document:

      - **Explain Purpose:** Briefly describe the artifact/section's importance and what it will cover.
      - **Draft Section-by-Section:** Present a draft of one logical section at a time.
        - Ensure the 'High-Level Overview' and 'Component View' sections accurately reflect and detail the repository/service architecture decided in the PRD.
        - Ensure that documented Coding Standards (either as a dedicated section or referenced) and the 'Testing Strategy' section clearly define:
          - The convention for unit test file location (e.g., co-located with source files, or in a separate folder like `tests/` or `__tests__/`).
          - The naming convention for unit test files (e.g., `*.test.js`, `*.spec.ts`, `test_*.py`).
        - When discussing Coding Standards, inform the user that these will serve as firm rules for the AI developer agent. Emphasize that these standards should be kept to the minimum necessary to prevent undesirable or messy code from the agent. Guide the user to understand that overly prescriptive or obvious standards (e.g., "use SOLID principles," which well-trained LLMs should already know) should be avoided, as the user, knowing the specific agents and tools they will employ, can best judge the appropriate level of detail.
        - **Incorporate Feedback:** Discuss the draft with the user, incorporate their feedback, and iterate as needed.
        - [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)
        - **Seek Approval:** Obtain explicit user approval for the section before moving to the next, or for the entire artifact if drafted holistically (in YOLO mode).

5.  **Identify Missing Technical Stories / Refine Epics (Interactive):**

    - Based on the designed architecture, identify any necessary technical stories/tasks that are not yet captured in the PRD or epics (e.g., "Set up CI/CD pipeline for frontend deployment," "Implement authentication module using JWT," "Create base Docker images for backend services," "Configure initial database schema based on data models").
    - Explain the importance of these technical stories for enabling the functional requirements and successful project execution.
    - Collaborate with the user to refine these stories (clear description, acceptance criteria) and suggest adding them to the project backlog or relevant epics.
    - Review existing epics/stories from the PRD and suggest technical considerations or acceptance criteria refinements to ensure they are implementable based on the chosen architecture. For example, specifying API endpoints to be called, data formats, or critical library versions.
    - After collaboration, prepare a concise summary detailing all proposed additions, updates, or modifications to epics and user stories. If no changes are identified, explicitly state this.

6.  **Validate Architecture Against Checklist & Finalize Output:**
    - Once the main architecture document components have been drafted and reviewed with the user, perform a comprehensive review using the `architect-checklist`.
    - Go through each item in the checklist to ensure the architecture document is comprehensive, addresses all key architectural concerns (e.g., security, scalability, maintainability, testability (including confirmation that coding standards and the testing strategy clearly define unit test location and naming conventions), developer experience), and that proposed solutions are robust.
    - For each checklist item, confirm its status (e.g., \[x] Completed, \[ ] N/A, \[!] Needs Attention).
    - If deficiencies, gaps, or areas needing more detail or clarification are identified based on the checklist:
      - Discuss these findings with the user.
      - Collaboratively make necessary updates, additions, or refinements to the architecture document to address these points.
    - After addressing all checklist points and ensuring the architecture document is robust and complete, present a summary of the checklist review to the user. This summary should highlight:
      - Confirmation that all relevant sections/items of the checklist have been satisfied by the architecture.
      - Any items marked N/A, with a brief justification.
      - A brief note on any significant discussions, decisions, or changes made to the architecture document as a result of the checklist review.
    - **Offer Design Architect Prompt (If Applicable):**
      - If the architecture includes UI components, ask the user if they would like to include a dedicated prompt for a "Design Architect" at the end of the main architecture document.
      - Explain that this prompt can capture specific UI considerations, notes from discussions, or decisions that don't fit into the core technical architecture document but are crucial for the Design Architect.
      - The prompt should also state that the Design Architect will subsequently operate in its specialized mode to define the detailed frontend architecture.
      - If the user agrees, collaboratively draft this prompt and append it to the architecture document.
    - Obtain final user approval for the complete architecture documentation generation.
    - **Recommend Next Steps for UI (If Applicable):**
      - After the main architecture document is finalized and approved:
      - If the project involves a user interface (as should be evident from the input PRD and potentially the architecture document itself mentioning UI components or referencing outputs from a Design Architect's UI/UX Specification phase):
        - Strongly recommend to the user that the next critical step for the UI is to engage the **Design Architect** agent.
        - Specifically, advise them to use the Design Architect's **'Frontend Architecture Mode'**.
        - Explain that the Design Architect will use the now-completed main Architecture Document and the detailed UI/UX specifications (e.g., `front-end-spec-tmpl.txt` or enriched PRD) as primary inputs to define the specific frontend architecture, select frontend libraries/frameworks (if not already decided), structure frontend components, and detail interaction patterns.

### Output Deliverables for Architecture Creation Phase

- A comprehensive Architecture Document, structured according to the `architecture-tmpl` (which is all markdown) or an agreed-upon format, including all sections detailed above.
- Clear Mermaid diagrams for architecture overview, data models, etc.
- A list of new or refined technical user stories/tasks ready for backlog integration.
- A summary of any identified changes (additions, updates, modifications) required for existing epics or user stories, or an explicit confirmation if no such changes are needed.
- A completed `architect-checklist` (or a summary of its validation).
- Optionally, if UI components are involved and the user agrees: A prompt for a "Design Architect" appended to the main architecture document, summarizing relevant UI considerations and outlining the Design Architect's next steps.

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
