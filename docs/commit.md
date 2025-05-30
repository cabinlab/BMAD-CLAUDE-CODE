# Commit Message Convention

This document outlines the commit message conventions for BMAD-CLAUDE-CODE projects.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Type

Must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

## Scope

The scope should be the name of the component or area affected:

- **bmad**: BMAD method changes
- **persona**: Persona modifications
- **template**: Template updates
- **task**: Task file changes
- **checklist**: Checklist modifications
- **docs**: Documentation changes
- **setup**: Setup script changes

## Subject

The subject contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

## Body

The body should include the motivation for the change and contrast this with previous behavior.

## Footer

The footer should contain any information about **Breaking Changes** and is also the place to reference GitHub issues that this commit **closes**.

## Examples

```
feat(persona): add designer persona for UX/UI workflows

Add new designer persona that handles frontend architecture and UX/UI
specifications. This complements the architect persona by focusing
specifically on user experience and interface design.

Closes #42
```

```
fix(template): correct prd template epic numbering

Epic numbering in PRD template was inconsistent. Updated to use
sequential numbering starting from 1.

Fixes #38
```

```
docs(readme): update setup instructions for Claude Code

Updated README with correct directory structure and simplified
setup process for new users.
```

```
refactor(tasks): consolidate story creation tasks

Merged create-next-story-task.md into create-next-story.md for
consistency with other task naming conventions.
```

## Breaking Changes

Breaking changes must be indicated in the footer:

```
feat(template): redesign architecture template structure

BREAKING CHANGE: Architecture template now requires platform type
selection. Existing architecture documents may need updates.
```