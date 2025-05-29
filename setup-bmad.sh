#!/bin/bash

# BMAD-CLAUDE-CODE Quick Setup Script
# This script sets up the BMAD Method in your project for use with Claude Code

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${BLUE}🚀 BMAD-CLAUDE-CODE Setup Script${NC}"
echo "=================================="
echo ""

# Check if we're in the BMAD-CLAUDE-CODE repo or if user wants to set up in current directory
if [[ -d "$SCRIPT_DIR/bmad-agent" ]]; then
    echo -e "${YELLOW}Detected BMAD-CLAUDE-CODE repository${NC}"
    echo "Where would you like to set up BMAD?"
    echo "1) Current directory: $(pwd)"
    echo "2) Different directory"
    echo "3) Cancel"
    read -p "Choose (1-3): " choice
    
    case $choice in
        1)
            TARGET_DIR="$(pwd)"
            ;;
        2)
            read -p "Enter target directory path: " TARGET_DIR
            TARGET_DIR="${TARGET_DIR/#\~/$HOME}"  # Expand ~ to home directory
            ;;
        3)
            echo "Setup cancelled"
            exit 0
            ;;
        *)
            echo "Invalid choice"
            exit 1
            ;;
    esac
else
    echo -e "${YELLOW}Running from: $(pwd)${NC}"
    TARGET_DIR="$(pwd)"
fi

# Create target directory if it doesn't exist
if [[ ! -d "$TARGET_DIR" ]]; then
    echo -e "${BLUE}Creating directory: $TARGET_DIR${NC}"
    mkdir -p "$TARGET_DIR"
fi

cd "$TARGET_DIR"

echo ""
echo -e "${BLUE}Setting up BMAD in: $TARGET_DIR${NC}"
echo ""

# Check if files already exist
OVERWRITE=false
if [[ -d "bmad-agent" ]] || [[ -f "CLAUDE.md" ]]; then
    echo -e "${YELLOW}⚠️  BMAD files already exist in this directory${NC}"
    read -p "Overwrite existing files? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        OVERWRITE=true
    else
        echo "Setup cancelled"
        exit 0
    fi
fi

# Copy files
echo -e "${BLUE}📁 Copying BMAD files...${NC}"

# Copy bmad-agent folder
if [[ -d "$SCRIPT_DIR/bmad-agent" ]]; then
    cp -r "$SCRIPT_DIR/bmad-agent" .
    echo "  ✓ bmad-agent/ folder"
else
    echo -e "${YELLOW}  ⚠️  bmad-agent/ folder not found in $SCRIPT_DIR${NC}"
fi

# Copy CLAUDE.md (prefer enhanced version if user wants full features)
if [[ -f "$SCRIPT_DIR/CLAUDE-ENHANCED.md" ]]; then
    echo ""
    echo "Which version of CLAUDE.md would you like?"
    echo "1) Enhanced (with full planning & session continuity)"
    echo "2) Basic (simpler, without session management)"
    read -p "Choose (1-2) [1]: " claude_choice
    claude_choice=${claude_choice:-1}
    
    if [[ "$claude_choice" == "2" ]] && [[ -f "$SCRIPT_DIR/CLAUDE.md" ]]; then
        cp "$SCRIPT_DIR/CLAUDE.md" ./CLAUDE.md
        echo "  ✓ CLAUDE.md (basic version)"
    else
        cp "$SCRIPT_DIR/CLAUDE-ENHANCED.md" ./CLAUDE.md
        echo "  ✓ CLAUDE.md (enhanced version)"
    fi
elif [[ -f "$SCRIPT_DIR/CLAUDE.md" ]]; then
    cp "$SCRIPT_DIR/CLAUDE.md" .
    echo "  ✓ CLAUDE.md"
fi

# Copy guide files
if [[ -f "$SCRIPT_DIR/BMAD-CLAUDE-CODE-GUIDE.md" ]]; then
    cp "$SCRIPT_DIR/BMAD-CLAUDE-CODE-GUIDE.md" .
    echo "  ✓ BMAD-CLAUDE-CODE-GUIDE.md"
fi

if [[ -f "$SCRIPT_DIR/BMAD-SESSION-CONTINUITY.md" ]]; then
    cp "$SCRIPT_DIR/BMAD-SESSION-CONTINUITY.md" .
    echo "  ✓ BMAD-SESSION-CONTINUITY.md"
fi

# Create docs directory structure
echo ""
echo -e "${BLUE}📂 Creating project structure...${NC}"

mkdir -p docs/.bmad-session
mkdir -p docs/stories
mkdir -p docs/technical

echo "  ✓ docs/"
echo "  ✓ docs/.bmad-session/"
echo "  ✓ docs/stories/"
echo "  ✓ docs/technical/"

# Initialize planning journal if it doesn't exist
if [[ ! -f "docs/bmad-journal.md" ]]; then
    cat > docs/bmad-journal.md << 'EOF'
# BMAD Planning Journal

This journal tracks all BMAD planning sessions for continuity across Claude Code sessions.

## How to Use This Journal

1. Each session gets a new entry with date and role
2. Log key decisions, open questions, and next steps
3. Update status as you progress
4. Reference this when resuming planning

---

## Session: [DATE] - Project Initialization
**Role**: Setup
**Phase**: Initialization
**Status**: Completed

### Session Goals:
- [x] Initialize BMAD structure
- [x] Set up planning journal
- [ ] Begin project planning

### Notes:
BMAD Method initialized. Ready to begin planning!

---
EOF
    echo "  ✓ docs/bmad-journal.md (initialized)"
fi

# Initialize session state
if [[ ! -f "docs/.bmad-session/current-state.md" ]]; then
    cat > docs/.bmad-session/current-state.md << 'EOF'
# Current BMAD Session State

**Last Updated**: [Not yet started]
**Active Role**: None
**Current Phase**: Initialization
**Working On**: Project setup

## Context Summary:
BMAD Method has been initialized. Ready to begin project planning.

## Key Constraints:
- [To be determined]

## Recent Decisions:
- BMAD Method selected for project planning

## Open Items:
- [ ] Define project vision
- [ ] Identify constraints
- [ ] Begin discovery phase

## Immediate Next Action:
Start with "Let's plan a new app using BMAD" or "I have an idea for..."

## Session History:
- **[Today]**: BMAD Setup - Initialized project structure
EOF
    echo "  ✓ docs/.bmad-session/current-state.md (initialized)"
fi

# Create .gitignore if it doesn't exist
if [[ ! -f ".gitignore" ]]; then
    cat > .gitignore << 'EOF'
# BMAD Session Files (optional - remove if you want to track these)
docs/.bmad-session/checkpoint-*.md

# OS Files
.DS_Store
Thumbs.db

# Editor Files
.vscode/
.idea/
*.swp
*.swo
EOF
    echo "  ✓ .gitignore (created)"
fi

echo ""
echo -e "${GREEN}✅ BMAD setup complete!${NC}"
echo ""
echo -e "${BLUE}📚 Next Steps:${NC}"
echo "1. Open this folder in VS Code with Claude Code enabled"
echo "2. Start with: \"Let's plan a new app using BMAD\""
echo "3. Or continue planning with: \"Continue BMAD planning\""
echo ""
echo -e "${BLUE}📖 Documentation:${NC}"
echo "- CLAUDE.md - Main instructions for Claude Code"
echo "- BMAD-CLAUDE-CODE-GUIDE.md - Quick reference"
echo "- BMAD-SESSION-CONTINUITY.md - Session management details"
echo ""
echo -e "${GREEN}Happy planning with BMAD! 🚀${NC}"