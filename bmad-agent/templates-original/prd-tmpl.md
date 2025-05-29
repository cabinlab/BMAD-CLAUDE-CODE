# {Project Name} Product Requirements Document (PRD)

## Goal, Objective and Context

This should come mostly from the user or the provided brief, but ask for clarifications as needed.

## Functional Requirements (MVP)

You should have a good idea at this point, but clarify suggest question and explain to ensure these are correct.

## Non Functional Requirements (MVP)

You should have a good idea at this point, but clarify suggest question and explain to ensure these are correct.

## User Interaction and Design Goals

{
If the product includes a User Interface (UI), this section captures the Product Manager's high-level vision and goals for the User Experience (UX). This information will serve as a crucial starting point and brief for the Design Architect.

Consider and elicit information from the user regarding:

- **Overall Vision & Experience:** What is the desired look and feel (e.g., "modern and minimalist," "friendly and approachable," "data-intensive and professional")? What kind of experience should users have?
- **Key Interaction Paradigms:** Are there specific ways users will interact with core features (e.g., "drag-and-drop interface for X," "wizard-style setup for Y," "real-time dashboard for Z")?
- **Core Screens/Views (Conceptual):** From a product perspective, what are the most critical screens or views necessary to deliver the MVP's value? (e.g., "Login Screen," "Main Dashboard," "Item Detail Page," "Settings Page").
- **Accessibility Aspirations:** Any known high-level accessibility goals (e.g., "must be usable by screen reader users").
- **Branding Considerations (High-Level):** Any known branding elements or style guides that must be incorporated?
- **Target Devices/Platforms:** (e.g., "primarily web desktop," "mobile-first responsive web app").

This section is not intended to be a detailed UI specification but rather a product-focused brief to guide the subsequent detailed work by the Design Architect, who will create the comprehensive UI/UX Specification document.
}

## Technical Assumptions

This is where we can list information mostly to be used by the architect to produce the technical details. This could be anything we already know or found out from the user at a technical high level. Inquire about this from the user to get a basic idea of languages, frameworks, knowledge of starter templates, libraries, external apis, potential library choices etc...

- **Repository & Service Architecture:** {CRITICAL DECISION: Document the chosen repository structure (e.g., Monorepo, Polyrepo) and the high-level service architecture (e.g., Monolith, Microservices, Serverless functions within a Monorepo). Explain the rationale based on project goals, MVP scope, team structure, and scalability needs. This decision directly impacts the technical approach and informs the Architect Agent.}

### Testing requirements

How will we validate functionality beyond unit testing? Will we want manual scripts or testing, e2e, integration etc... figure this out from the user to populate this section

## Epic Overview

- **Epic {#}: {Title}**
  - Goal: {A concise 1-2 sentence statement describing the primary objective and value of this Epic.}
  - Story {#}: As a {type of user/system}, I want {to perform an action / achieve a goal} so that {I can realize a benefit / achieve a reason}.
    - {Acceptance Criteria List}
  - Story {#}: As a {type of user/system}, I want {to perform an action / achieve a goal} so that {I can realize a benefit / achieve a reason}.
    - {Acceptance Criteria List}
- **Epic {#}: {Title}**
  - Goal: {A concise 1-2 sentence statement describing the primary objective and value of this Epic.}
  - Story {#}: As a {type of user/system}, I want {to perform an action / achieve a goal} so that {I can realize a benefit / achieve a reason}.
    - {Acceptance Criteria List}
  - Story {#}: As a {type of user/system}, I want {to perform an action / achieve a goal} so that {I can realize a benefit / achieve a reason}.
    - {Acceptance Criteria List}

## Key Reference Documents

{ This section will be created later, from the sections prior to this being carved up into smaller documents }

## Out of Scope Ideas Post MVP

Anything you and the user agreed it out of scope or can be removed from scope to keep MVP lean. Consider the goals of the PRD and what might be extra gold plating or additional features that could wait until the MVP is completed and delivered to assess functionality and market fit or usage.

## [OPTIONAL: For Simplified PM-to-Development Workflow Only] Core Technical Decisions & Application Structure

{This section is to be populated ONLY if the PM is operating in the 'Simplified PM-to-Development Workflow'. It captures essential technical foundations that would typically be defined by an Architect, allowing for a more direct path to development. This information should be gathered after initial PRD sections (Goals, Users, etc.) are drafted, and ideally before or in parallel with detailed Epic/Story definition, and updated as needed.}

### Technology Stack Selections

{Collaboratively define the core technologies. Be specific about choices and versions where appropriate.}

- **Primary Backend Language/Framework:** {e.g., Python/FastAPI, Node.js/Express, Java/Spring Boot}
- **Primary Frontend Language/Framework (if applicable):** {e.g., TypeScript/React (Next.js), JavaScript/Vue.js}
- **Database:** {e.g., PostgreSQL, MongoDB, AWS DynamoDB}
- **Key Libraries/Services (Backend):** {e.g., Authentication (JWT, OAuth provider), ORM (SQLAlchemy), Caching (Redis)}
- **Key Libraries/Services (Frontend, if applicable):** {e.g., UI Component Library (Material-UI, Tailwind CSS + Headless UI), State Management (Redux, Zustand)}
- **Deployment Platform/Environment:** {e.g., Docker on AWS ECS, Vercel, Netlify, Kubernetes}
- **Version Control System:** {e.g., Git with GitHub/GitLab}

### Proposed Application Structure

{Describe the high-level organization of the codebase. This might include a simple text-based directory layout, a list of main modules/components, and a brief explanation of how they interact. The goal is to provide a clear starting point for developers.}

Example:

```
/
├── app/                  # Main application source code
│   ├── api/              # Backend API routes and logic
│   │   ├── v1/
│   │   └── models.py
│   ├── web/              # Frontend components and pages (if monolithic)
│   │   ├── components/
│   │   └── pages/
│   ├── core/             # Shared business logic, utilities
│   └── main.py           # Application entry point
├── tests/                # Unit and integration tests
├── scripts/              # Utility scripts
├── Dockerfile
├── requirements.txt
└── README.md
```

- **Monorepo/Polyrepo:** {Specify if a monorepo or polyrepo structure is envisioned, and briefly why.}
- **Key Modules/Components and Responsibilities:**
  - {Module 1 Name}: {Brief description of its purpose and key responsibilities}
  - {Module 2 Name}: {Brief description of its purpose and key responsibilities}
  - ...
- **Data Flow Overview (Conceptual):** {Briefly describe how data is expected to flow between major components, e.g., Frontend -> API -> Core Logic -> Database.}

## Change Log

| Change | Date | Version | Description | Author |
| ------ | ---- | ------- | ----------- | ------ |

----- END PRD START CHECKLIST OUTPUT ------

## Checklist Results Report

----- END Checklist START Design Architect `UI/UX Specification Mode` Prompt ------

----- END Design Architect `UI/UX Specification Mode` Prompt START Architect Prompt ------

## Initial Architect Prompt

Based on our discussions and requirements analysis for the {Product Name}, I've compiled the following technical guidance to inform your architecture analysis and decisions to kick off Architecture Creation Mode:

### Technical Infrastructure

- **Repository & Service Architecture Decision:** {Reiterate the decision made in 'Technical Assumptions', e.g., Monorepo with Next.js frontend and Python FastAPI backend services within the same repo; or Polyrepo with separate Frontend (Next.js) and Backend (Spring Boot Microservices) repositories.}
- **Starter Project/Template:** {Information about any starter projects, templates, or existing codebases that should be used}
- **Hosting/Cloud Provider:** {Specified cloud platform (AWS, Azure, GCP, etc.) or hosting requirements}
- **Frontend Platform:** {Framework/library preferences or requirements (React, Angular, Vue, etc.)}
- **Backend Platform:** {Framework/language preferences or requirements (Node.js, Python/Django, etc.)}
- **Database Requirements:** {Relational, NoSQL, specific products or services preferred}

### Technical Constraints

- {List any technical constraints that impact architecture decisions}
- {Include any mandatory technologies, services, or platforms}
- {Note any integration requirements with specific technical implications}

### Deployment Considerations

- {Deployment frequency expectations}
- {CI/CD requirements}
- {Environment requirements (local, dev, staging, production)}

### Local Development & Testing Requirements

{Include this section only if the user has indicated these capabilities are important. If not applicable based on user preferences, you may remove this section.}

- {Requirements for local development environment}
- {Expectations for command-line testing capabilities}
- {Needs for testing across different environments}
- {Utility scripts or tools that should be provided}
- {Any specific testability requirements for components}

### Other Technical Considerations

- {Security requirements with technical implications}
- {Scalability needs with architectural impact}
- {Any other technical context the Architect should consider}

----- END Architect Prompt -----
