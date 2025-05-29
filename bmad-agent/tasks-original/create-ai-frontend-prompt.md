# Create AI Frontend Prompt Task

## Purpose

To generate a masterful, comprehensive, and optimized prompt that can be used with AI-driven frontend development tools (e.g., Lovable, Vercel v0, or similar) to scaffold or generate significant portions of the frontend application.

## Inputs

- Completed UI/UX Specification (`front-end-spec-tmpl`)
- Completed Frontend Architecture Document (`front-end-architecture`)
- Main System Architecture Document (`architecture` - for API contracts and tech stack)
- Primary Design Files (Figma, Sketch, etc. - for visual context if the tool can accept it or if descriptions are needed)

## Key Activities & Instructions

1.  **Confirm Target AI Generation Platform:**

    - Ask the user to specify which AI frontend generation tool/platform they intend to use (e.g., "Lovable.ai", "Vercel v0", "GPT-4 with direct code generation instructions", etc.).
    - Explain that prompt optimization might differ slightly based on the platform's capabilities and preferred input format.

2.  **Synthesize Inputs into a Structured Prompt:**

    - **Overall Project Context:**
      - Briefly state the project's purpose (from brief/PRD).
      - Specify the chosen frontend framework, core libraries, and UI component library (from `front-end-architecture` and main `architecture`).
      - Mention the styling approach (e.g., Tailwind CSS, CSS Modules).
    - **Design System & Visuals:**
      - Reference the primary design files (e.g., Figma link).
      - If the tool doesn't directly ingest design files, describe the overall visual style, color palette, typography, and key branding elements (from `front-end-spec-tmpl`).
      - List any global UI components or design tokens that should be defined or adhered to.
    - **Application Structure & Routing:**
      - Describe the main pages/views and their routes (from `front-end-architecture` - Routing Strategy).
      - Outline the navigation structure (from `front-end-spec-tmpl`).
    - **Key User Flows & Page-Level Interactions:**
      - For a few critical user flows (from `front-end-spec-tmpl`):
        - Describe the sequence of user actions and expected UI changes on each relevant page.
        - Specify API calls to be made (referencing API endpoints from the main `architecture`) and how data should be displayed or used.
    - **Component Generation Instructions (Iterative or Key Components):**
      - Based on the chosen AI tool's capabilities, decide on a strategy:
        - **Option 1 (Scaffolding):** Prompt for the generation of main page structures, layouts, and placeholders for components.
        - **Option 2 (Key Component Generation):** Select a few critical or complex components from the `front-end-architecture` (Component Breakdown) and provide detailed specifications for them (props, state, basic behavior, key UI elements).
        - **Option 3 (Holistic, if tool supports):** Attempt to describe the entire application structure and key components more broadly.
      - <important_note>Advise the user that generating an entire complex application perfectly in one go is rare. Iterative prompting or focusing on sections/key components is often more effective.</important_note>
    - **State Management (High-Level Pointers):**
      - Mention the chosen state management solution (e.g., "Use Redux Toolkit").
      - For key pieces of data, indicate if they should be managed in global state.
    - **API Integration Points:**
      - For pages/components that fetch or submit data, clearly state the relevant API endpoints (from `architecture`) and the expected data shapes (can reference schemas in `data-models` or `api-reference` sections of the architecture doc).
    - **Critical "Don'ts" or Constraints:**
      - e.g., "Do not use deprecated libraries." "Ensure all forms have basic client-side validation."
    - **Platform-Specific Optimizations:**
      - If the chosen AI tool has known best practices for prompting (e.g., specific keywords, structure, level of detail), incorporate them. (This might require the agent to have some general knowledge or to ask the user if they know any such specific prompt modifiers for their chosen tool).

3.  **Present and Refine the Master Prompt:**
    - Output the generated prompt in a clear, copy-pasteable format (e.g., a large code block).
    - Explain the structure of the prompt and why certain information was included.
    - Work with the user to refine the prompt based on their knowledge of the target AI tool and any specific nuances they want to emphasize.
    - <important_note>Remind the user that the generated code from the AI tool will likely require review, testing, and further refinement by developers.</important_note>
