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

# GitHub repository details
GITHUB_REPO="cabinlab/BMAD-CLAUDE-CODE"
GITHUB_BRANCH="main"
GITHUB_RAW_URL="https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH"

echo -e "${BLUE}🚀 BMAD-CLAUDE-CODE Setup Script${NC}"
echo "=================================="
echo ""

# Check if we're in the BMAD-CLAUDE-CODE repo or downloading from GitHub
if [[ -d "$SCRIPT_DIR/bmad-agent" ]]; then
    echo -e "${YELLOW}Detected BMAD-CLAUDE-CODE repository${NC}"
    SOURCE_MODE="local"
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
    echo -e "${YELLOW}Setting up BMAD in: $(pwd)${NC}"
    echo -e "${BLUE}Files will be downloaded from GitHub repository${NC}"
    SOURCE_MODE="github"
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

# Functions for downloading files from GitHub
download_file() {
    local file_path="$1"
    local target_path="$2"
    local url="$GITHUB_RAW_URL/$file_path"
    
    if command -v curl >/dev/null 2>&1; then
        curl -fsSL "$url" -o "$target_path"
    elif command -v wget >/dev/null 2>&1; then
        wget -q "$url" -O "$target_path"
    else
        echo -e "${YELLOW}Error: Neither curl nor wget found. Cannot download files.${NC}"
        exit 1
    fi
}

download_directory() {
    local dir_path="$1"
    
    # Use GitHub's git tree API to get all files recursively
    local tree_url="https://api.github.com/repos/$GITHUB_REPO/git/trees/$GITHUB_BRANCH?recursive=1"
    
    # Get the entire tree structure
    if command -v curl >/dev/null 2>&1; then
        local tree_data=$(curl -fsSL "$tree_url")
    elif command -v wget >/dev/null 2>&1; then
        local tree_data=$(wget -qO- "$tree_url")
    else
        echo -e "${YELLOW}Error: Neither curl nor wget found. Cannot download directory.${NC}"
        exit 1
    fi
    
    # Check if we got valid JSON
    if [[ "$tree_data" == *"\"message\":"* ]]; then
        echo -e "${YELLOW}Warning: Could not access repository tree${NC}"
        return 1
    fi
    
    # Extract file paths that start with our directory path and save to temp file
    local temp_file=$(mktemp)
    echo "$tree_data" | grep -o '"path":"[^"]*"' | sed 's/"path":"//;s/"//' > "$temp_file"
    
    # Process each file path
    while IFS= read -r file_path; do
        if [[ "$file_path" == "$dir_path"/* ]]; then
            # This is a file in our target directory
            local relative_path="${file_path#$dir_path/}"
            local target_file="$file_path"
            local target_dir=$(dirname "$target_file")
            
            # Show directory creation
            if [[ ! -d "$target_dir" ]]; then
                mkdir -p "$target_dir"
                # Show the directory structure being created
                local display_dir="${target_dir#./}"
                if [[ "$display_dir" != "$dir_path" ]]; then
                    echo -e "    ${BLUE}📁${NC} Creating: $display_dir/"
                fi
            fi
            
            # Download the file
            local file_url="$GITHUB_RAW_URL/$file_path"
            if command -v curl >/dev/null 2>&1; then
                curl -fsSL "$file_url" -o "$target_file" 2>/dev/null
            else
                wget -q "$file_url" -O "$target_file" 2>/dev/null
            fi
            
            # Show file download with proper formatting
            local display_file="${relative_path}"
            local file_icon="📄"
            
            # Use different icons for different file types
            case "$display_file" in
                *.md) file_icon="📝" ;;
                *.yml|*.yaml) file_icon="⚙️" ;;
                *.json) file_icon="🔧" ;;
                *.sh) file_icon="🔨" ;;
                *.py) file_icon="🐍" ;;
                *.js|*.ts) file_icon="⚡" ;;
            esac
            
            echo -e "    ${file_icon} Downloaded: ${GREEN}$display_file${NC}"
        fi
    done < "$temp_file"
    
    # Clean up temp file
    rm -f "$temp_file"
}

# Copy or download files
if [[ "$SOURCE_MODE" == "local" ]]; then
    echo -e "${BLUE}📁 Copying BMAD files...${NC}"
    
    # Copy bmad-agent folder
    if [[ -d "$SCRIPT_DIR/bmad-agent" ]]; then
        cp -r "$SCRIPT_DIR/bmad-agent" .
        echo -e "  📁 ${GREEN}bmad-agent/${NC} folder copied"
    else
        echo -e "${YELLOW}  ⚠️  bmad-agent/ folder not found in $SCRIPT_DIR${NC}"
    fi
else
    echo -e "${BLUE}📁 Downloading BMAD files from GitHub...${NC}"
    
    # Download bmad-agent folder
    echo "  📥 Downloading bmad-agent/ folder..."
    echo ""
    download_directory "bmad-agent"
    echo ""
    echo "  ✅ bmad-agent/ folder complete"
fi

# Copy or download CLAUDE.md
echo ""
echo "Which version of CLAUDE.md would you like?"
echo "1) Enhanced (with full planning & session continuity)"
echo "2) Basic (simpler, without session management)"
read -p "Choose (1-2) [1]: " claude_choice
claude_choice=${claude_choice:-1}

if [[ "$SOURCE_MODE" == "local" ]]; then
    if [[ "$claude_choice" == "2" ]] && [[ -f "$SCRIPT_DIR/CLAUDE.md" ]]; then
        cp "$SCRIPT_DIR/CLAUDE.md" ./CLAUDE.md
        echo -e "  📝 ${GREEN}CLAUDE.md${NC} (basic version)"
    elif [[ -f "$SCRIPT_DIR/CLAUDE-ENHANCED.md" ]]; then
        cp "$SCRIPT_DIR/CLAUDE-ENHANCED.md" ./CLAUDE.md
        echo -e "  📝 ${GREEN}CLAUDE.md${NC} (enhanced version)"
    elif [[ -f "$SCRIPT_DIR/CLAUDE.md" ]]; then
        cp "$SCRIPT_DIR/CLAUDE.md" ./CLAUDE.md
        echo -e "  📝 ${GREEN}CLAUDE.md${NC}"
    fi
else
    if [[ "$claude_choice" == "2" ]]; then
        download_file "CLAUDE.md" "./CLAUDE.md"
        echo -e "  📝 ${GREEN}CLAUDE.md${NC} (basic version)"
    else
        download_file "CLAUDE-ENHANCED.md" "./CLAUDE.md"
        echo -e "  📝 ${GREEN}CLAUDE.md${NC} (enhanced version)"
    fi
fi

# Copy or download guide files
if [[ "$SOURCE_MODE" == "local" ]]; then
    if [[ -f "$SCRIPT_DIR/BMAD-CLAUDE-CODE-GUIDE.md" ]]; then
        cp "$SCRIPT_DIR/BMAD-CLAUDE-CODE-GUIDE.md" .
        echo -e "  📚 ${GREEN}BMAD-CLAUDE-CODE-GUIDE.md${NC}"
    fi
    
    if [[ -f "$SCRIPT_DIR/BMAD-SESSION-CONTINUITY.md" ]]; then
        cp "$SCRIPT_DIR/BMAD-SESSION-CONTINUITY.md" .
        echo -e "  🔄 ${GREEN}BMAD-SESSION-CONTINUITY.md${NC}"
    fi
else
    download_file "BMAD-CLAUDE-CODE-GUIDE.md" "./BMAD-CLAUDE-CODE-GUIDE.md"
    echo -e "  📚 ${GREEN}BMAD-CLAUDE-CODE-GUIDE.md${NC}"
    
    download_file "BMAD-SESSION-CONTINUITY.md" "./BMAD-SESSION-CONTINUITY.md"
    echo -e "  🔄 ${GREEN}BMAD-SESSION-CONTINUITY.md${NC}"
fi

# Create docs directory structure
echo ""
echo -e "${BLUE}📂 Creating project structure...${NC}"

mkdir -p docs/.bmad-session
mkdir -p docs/stories
mkdir -p docs/technical

echo -e "  📁 ${GREEN}docs/${NC}"
echo -e "  📁 ${GREEN}docs/.bmad-session/${NC}"
echo -e "  📁 ${GREEN}docs/stories/${NC}"
echo -e "  📁 ${GREEN}docs/technical/${NC}"

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
    echo -e "  📓 ${GREEN}docs/bmad-journal.md${NC} (initialized)"
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
    echo -e "  ⚙️ ${GREEN}docs/.bmad-session/current-state.md${NC} (initialized)"
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
    echo -e "  🚫 ${GREEN}.gitignore${NC} (created)"
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