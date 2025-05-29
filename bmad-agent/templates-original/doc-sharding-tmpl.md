# Document Sharding Plan Template

This plan directs the agent on how to break down large source documents into smaller, granular files during its Librarian Phase. The agent will refer to this plan to identify source documents, the specific sections to extract, and the target filenames for the sharded content.

---

## 1. Source Document: PRD (Project Requirements Document)

- **Note to Agent:** Confirm the exact filename of the PRD with the user (e.g., `PRD.md`, `ProjectRequirements.md`, `prdx.y.z.md`).

### 1.1. Epic Granulation

- **Instruction:** For each Epic identified within the PRD:
- **Source Section(s) to Copy:** The complete text for the Epic, including its main description, goals, and all associated user stories or detailed requirements under that Epic. Ensure to capture content starting from a heading like "**Epic X:**" up to the next such heading or end of the "Epic Overview" section.
- **Target File Pattern:** `docs/epic-<id>.md`
  - _Agent Note: `<id>` should correspond to the Epic number._

---

## 2. Source Document: Main Architecture Document

- **Note to Agent:** Confirm the exact filename with the user (e.g., `architecture.md`, `SystemArchitecture.md`).

### 2.1. Core Architecture Granules

- **Source Section(s) to Copy:** Section(s) detailing "API Reference", "API Endpoints", or "Service Interfaces".
- **Target File:** `docs/api-reference.md`

- **Source Section(s) to Copy:** Section(s) detailing "Data Models", "Database Schema", "Entity Definitions".
- **Target File:** `docs/data-models.md`

- **Source Section(s) to Copy:** Section(s) titled "Environment Variables Documentation", "Configuration Settings", "Deployment Parameters", or relevant subsections within "Infrastructure and Deployment Overview" if a dedicated section is not found.
- **Target File:** `docs/environment-vars.md`

  - _Agent Note: Prioritize a dedicated 'Environment Variables' section or linked 'environment-vars.md' source if available. If not, extract relevant configuration details from 'Infrastructure and Deployment Overview'. This shard is for specific variable definitions and usage._

- **Source Section(s) to Copy:** Section(s) detailing "Project Structure".
- **Target File:** `docs/project-structure.md`

  - _Agent Note: If the project involves multiple repositories (not a monorepo), ensure this file clearly describes the structure of each relevant repository or links to sub-files if necessary._

- **Source Section(s) to Copy:** Section(s) detailing "Technology Stack", "Key Technologies", "Libraries and Frameworks", or "Definitive Tech Stack Selections".
- **Target File:** `docs/tech-stack.md`

- **Source Section(s) to Copy:** Sections detailing "Coding Standards", "Development Guidelines", "Best Practices", "Testing Strategy", "Testing Decisions", "QA Processes", "Overall Testing Strategy", "Error Handling Strategy", and "Security Best Practices".
- **Target File:** `docs/operational-guidelines.md`

  - _Agent Note: This file consolidates several key operational aspects. Ensure that the content from each source section ("Coding Standards", "Testing Strategy", "Error Handling Strategy", "Security Best Practices") is clearly delineated under its own H3 (###) or H4 (####) heading within this document._

- **Source Section(s) to Copy:** Section(s) titled "Component View" (including sub-sections like "Architectural / Design Patterns Adopted").
- **Target File:** `docs/component-view.md`

- **Source Section(s) to Copy:** Section(s) titled "Core Workflow / Sequence Diagrams" (including all sub-diagrams).
- **Target File:** `docs/sequence-diagrams.md`

- **Source Section(s) to Copy:** Section(s) titled "Infrastructure and Deployment Overview".
- **Target File:** `docs/infra-deployment.md`

  - _Agent Note: This is for the broader overview, distinct from the specific `docs/environment-vars.md`._

- **Source Section(s) to Copy:** Section(s) titled "Key Reference Documents".
- **Target File:** `docs/key-references.md`

---

## 3. Source Document(s): Front-End Specific Documentation

- **Note to Agent:** Confirm filenames with the user (e.g., `front-end-architecture.md`, `front-end-spec.md`, `ui-guidelines.md`). Multiple FE documents might exist.

### 3.1. Front-End Granules

- **Source Section(s) to Copy:** Section(s) detailing "Front-End Project Structure" or "Detailed Frontend Directory Structure".
- **Target File:** `docs/front-end-project-structure.md`

- **Source Section(s) to Copy:** Section(s) detailing "UI Style Guide", "Brand Guidelines", "Visual Design Specifications", or "Styling Approach".
- **Target File:** `docs/front-end-style-guide.md`

  - _Agent Note: This section might be a sub-section or refer to other documents (e.g., `ui-ux-spec.txt`). Extract the core styling philosophy and approach defined within the frontend architecture document itself._

- **Source Section(s) to Copy:** Section(s) detailing "Component Library", "Reusable UI Components Guide", "Atomic Design Elements", or "Component Breakdown & Implementation Details".
- **Target File:** `docs/front-end-component-guide.md`

- **Source Section(s) to Copy:** Section(s) detailing "Front-End Coding Standards" (specifically for UI development, e.g., JavaScript/TypeScript style, CSS naming conventions, accessibility best practices for FE).
- **Target File:** `docs/front-end-coding-standards.md`

  - _Agent Note: A dedicated top-level section for this might not exist. If not found, this shard might be empty or require cross-referencing with the main architecture's coding standards. Extract any front-end-specific coding conventions mentioned._

- **Source Section(s) to Copy:** Section(s) titled "State Management In-Depth".
- **Target File:** `docs/front-end-state-management.md`

- **Source Section(s) to Copy:** Section(s) titled "API Interaction Layer".
- **Target File:** `docs/front-end-api-interaction.md`

- **Source Section(s) to Copy:** Section(s) titled "Routing Strategy".
- **Target File:** `docs/front-end-routing-strategy.md`

- **Source Section(s) to Copy:** Section(s) titled "Frontend Testing Strategy".
- **Target File:** `docs/front-end-testing-strategy.md`

---

CRITICAL: **Index Management:** After creating the files, update `docs/index.md` as needed to reference and describe each doc - do not mention granules or where it was sharded from, just doc purpose - as the index also contains other doc references potentially.
