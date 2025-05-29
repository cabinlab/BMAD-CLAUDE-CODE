# Create UI/UX Specification Task

## Purpose

To collaboratively work with the user to define and document the User Interface (UI) and User Experience (UX) specifications for the project. This involves understanding user needs, defining information architecture, outlining user flows, and ensuring a solid foundation for visual design and frontend development. The output will populate a new document called `front-end-spec.md` following the `front-end-spec-tmpl` template.

## Inputs

- Project Brief (`project-brief.md` or equivalent)
- Product Requirements Document (PRD) (`prd.md` or equivalent)
- User feedback or research (if available)

## Key Activities & Instructions

### 1. Understand Core Requirements

- Review Project Brief and PRD to grasp project goals, target audience, key features, and any existing constraints.
- Ask clarifying questions about user needs, pain points, and desired outcomes.

### 2. Define Overall UX Goals & Principles (for `front-end-spec-tmpl`)

- Collaboratively establish and document:
  - Target User Personas (elicit details or confirm existing ones).
  - Key Usability Goals.
  - Core Design Principles for the project.

### 3. Develop Information Architecture (IA) (for `front-end-spec-tmpl`)

- Work with the user to create a Site Map or Screen Inventory.
- Define the primary and secondary Navigation Structure.
- Use Mermaid diagrams or lists as appropriate for the template.

### 4. Outline Key User Flows (for `front-end-spec-tmpl`)

- Identify critical user tasks from the PRD/brief.
- For each flow:
  - Define the user's goal.
  - Collaboratively map out the steps (use Mermaid diagrams or detailed step-by-step descriptions).
  - Consider edge cases and error states.

### 5. Discuss Wireframes & Mockups Strategy (for `front-end-spec-tmpl`)

- Clarify where detailed visual designs will be created (e.g., Figma, Sketch) and ensure the `front-end-spec-tmpl` correctly links to these primary design files.
- If low-fidelity wireframes are needed first, offer to help conceptualize layouts for key screens.

### 6. Define Component Library / Design System Approach (for `front-end-spec-tmpl`)

- Discuss if an existing design system will be used or if a new one needs to be developed.
- If new, identify a few foundational components to start with (e.g., Button, Input, Card) and their key states/behaviors at a high level. Detailed technical specs will be in `front-end-architecture`.

### 7. Establish Branding & Style Guide Basics (for `front-end-spec-tmpl`)

- If a style guide exists, link to it.
- If not, collaboratively define placeholders for: Color Palette, Typography, Iconography, Spacing.

### 8. Specify Accessibility (AX) Requirements (for `front-end-spec-tmpl`)

- Determine the target compliance level (e.g., WCAG 2.1 AA).
- List any known specific AX requirements.

### 9. Define Responsiveness Strategy (for `front-end-spec-tmpl`)

- Discuss and document key Breakpoints.
- Describe the general Adaptation Strategy.

### 10. Output Generation & Iterative Refinement (Guided by `front-end-spec-tmpl`)

- **a. Draft Section:** Incrementally populate one logical section of the `front-end-spec-tmpl` file based on your discussions.
- **b. Present & Incorporate Initial Feedback:** Present the drafted section to the user for review. Discuss, explain and incorporate their initial feedback and revisions directly.
- **c. [Offer Advanced Self-Refinement & Elicitation Options](#offer-advanced-self-refinement--elicitation-options)**

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
