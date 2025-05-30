#!/bin/bash

# BMAD-CLAUDE-CODE Quick Setup Script
# This script sets up the BMAD Method in your project for use with Claude Code

set -e  # Exit on error

# Claude Code Theme Color Palette
ORANGE='\033[38;2;244;132;95m'       # Claude orange #F4845F
BRIGHT_ORANGE='\033[1;38;2;244;132;95m'  # Bright Claude orange
CYAN='\033[38;2;79;195;193m'         # Complementary cyan #4FC3C1  
BRIGHT_CYAN='\033[1;38;2;79;195;193m'    # Bright cyan
DARK_ORANGE='\033[38;2;232;114;58m'  # Darker orange #E8723A
GREEN='\033[0;32m'                   # Success green (for checkmarks)
BRIGHT_GREEN='\033[1;32m'            # Bright green
RED='\033[0;31m'                     # Error red
WHITE='\033[1;37m'                   # White
GRAY='\033[0;90m'                    # Muted gray
NC='\033[0m' # No Color

# Legacy color mappings for compatibility
BLUE=$CYAN
YELLOW=$ORANGE
PURPLE=$DARK_ORANGE

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# GitHub repository details
GITHUB_REPO="cabinlab/BMAD-CLAUDE-CODE"
GITHUB_BRANCH="main"
GITHUB_RAW_URL="https://raw.githubusercontent.com/$GITHUB_REPO/$GITHUB_BRANCH"

# Clear screen for better presentation
clear

# Display CLAUDE CODE style ASCII art header
echo -e "\n${ORANGE}     ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗${NC}"
echo -e "${ORANGE}    ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝${NC}"
echo -e "${ORANGE}    ██║     ██║     ███████║██║   ██║██║  ██║█████╗  ${NC}"
echo -e "${ORANGE}    ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  ${NC}"
echo -e "${ORANGE}    ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗${NC}"
echo -e "${ORANGE}     ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝${NC}"
echo -e ""
echo -e "${ORANGE}    ██████╗ ███╗   ███╗ █████╗ ██████╗ ${NC}"
echo -e "${ORANGE}    ██╔══██╗████╗ ████║██╔══██╗██╔══██╗${NC}"
echo -e "${ORANGE}    ██████╔╝██╔████╔██║███████║██║  ██║${NC}"
echo -e "${ORANGE}    ██╔══██╗██║╚██╔╝██║██╔══██║██║  ██║${NC}"
echo -e "${ORANGE}    ██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝${NC}"
echo -e "${ORANGE}    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ ${NC}"
echo -e ""






# Check if we're in the BMAD-CLAUDE-CODE repo or downloading from GitHub
if [[ -d "$SCRIPT_DIR/bmad-agent" ]]; then
    echo -e "${CYAN}◆${NC} ${DARK_ORANGE}Detected BMAD-CLAUDE-CODE repository${NC}"
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
    echo -e "${CYAN}◆${NC} Setting up BMAD in: ${BRIGHT_CYAN}$(pwd)${NC}"
    echo -e "${PURPLE}▶${NC} Files will be downloaded from GitHub repository"
    SOURCE_MODE="github"
    TARGET_DIR="$(pwd)"
fi

# Create target directory if it doesn't exist
if [[ ! -d "$TARGET_DIR" ]]; then
    echo -e "${PURPLE}▶${NC} Creating directory: ${BRIGHT_CYAN}$TARGET_DIR${NC}"
    mkdir -p "$TARGET_DIR"
fi

cd "$TARGET_DIR"

echo ""
echo -e "${CYAN}◆${NC} ${BRIGHT_ORANGE}Setting up BMAD in:${NC} ${BRIGHT_CYAN}$TARGET_DIR${NC}"
echo ""

# Check if files already exist
OVERWRITE=false
if [[ -d "bmad-agent" ]] || [[ -f "CLAUDE.md" ]]; then
    echo -e "${RED}⚠️  BMAD files already exist in this directory${NC}"
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
        echo -e "${RED}Error: Neither curl nor wget found. Cannot download files.${NC}"
        exit 1
    fi
}

download_directory() {
    local dir_path="$1"
    
    # Try GitHub API first, with fallback to hardcoded list
    local tree_url="https://api.github.com/repos/$GITHUB_REPO/git/trees/$GITHUB_BRANCH?recursive=1"
    local tree_data=""
    local api_success=false
    
    # Show spinner while fetching file list
    echo -ne "  ${PURPLE}◐${NC} Fetching file list from GitHub..."
    
    # Attempt to get tree data from GitHub API with timeout
    if command -v curl >/dev/null 2>&1; then
        (
            tree_data=$(curl -fsSL --max-time 10 "$tree_url" 2>/dev/null)
            echo "$tree_data" > /tmp/bmad_tree_data.tmp
            echo $? > /tmp/bmad_curl_status.tmp
        ) &
        local fetch_pid=$!
        
        # Show spinner while fetching
        local spinstr='⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏'
        while kill -0 $fetch_pid 2>/dev/null; do
            local temp=${spinstr#?}
            printf "\r  [${CYAN}%c${NC}] Fetching file list from GitHub..." "$spinstr"
            local spinstr=$temp${spinstr%"$temp"}
            sleep 0.1
        done
        
        wait $fetch_pid
        local curl_status=$(cat /tmp/bmad_curl_status.tmp 2>/dev/null || echo 1)
        tree_data=$(cat /tmp/bmad_tree_data.tmp 2>/dev/null || echo "")
        rm -f /tmp/bmad_tree_data.tmp /tmp/bmad_curl_status.tmp
        
        if [[ $curl_status -eq 0 && "$tree_data" != *"\"message\":"* && -n "$tree_data" ]]; then
            api_success=true
            printf "\r  ${CYAN}✔${NC} File list retrieved successfully    \n"
        else
            printf "\r  ${RED}✗${NC} GitHub API unavailable              \n"
        fi
    elif command -v wget >/dev/null 2>&1; then
        tree_data=$(wget -qO- --timeout=10 "$tree_url" 2>/dev/null)
        if [[ $? -eq 0 && "$tree_data" != *"\"message\":"* && -n "$tree_data" ]]; then
            api_success=true
        fi
    fi
    
    
    if [[ "$api_success" == true ]]; then
        # Use API data - avoid subshell by using temp file
        local temp_file=$(mktemp)
        # Extract only files (blobs) paths from JSON, not directories (trees)
        # The GitHub API returns objects like: {"path": "file.txt", "mode": "100644", "type": "blob", ...}
        # We need to extract path only when type is blob
        echo "$tree_data" | jq -r '.tree[] | select(.type == "blob") | .path' 2>/dev/null > "$temp_file" || \
        echo "$tree_data" | grep -B2 '"type": *"blob"' | grep '"path":' | sed 's/.*"path": *"\([^"]*\)".*/\1/' > "$temp_file"
        
        # Count total files and group by directory
        local total_files=0
        local current_files=0
        declare -A dir_files
        
        while IFS= read -r file_path; do
            # We already filtered for blobs only, so just check if it's under our directory
            # Skip node_modules and other build artifacts
            if [[ "$file_path" == "$dir_path"/* ]] && [[ "$file_path" != */node_modules/* ]] && [[ "$file_path" != */.next/* ]]; then
                total_files=$((total_files + 1))
                local file_dir=$(dirname "$file_path")
                dir_files["$file_dir"]=$((${dir_files["$file_dir"]:-0} + 1))
            fi
        done < "$temp_file"
        
        # Now download files with progress
        local current_dir=""
        local dir_file_count=0
        local dir_current=0
        local dir_failed=0
        local color_index=0
        local colors=($DARK_ORANGE $CYAN)
        declare -A failed_files
        
        while IFS= read -r file_path; do
            # We already filtered for blobs only, so just check if it's under our directory
            # Skip node_modules and other build artifacts
            if [[ "$file_path" == "$dir_path"/* ]] && [[ "$file_path" != */node_modules/* ]] && [[ "$file_path" != */.next/* ]]; then
                local file_dir=$(dirname "$file_path")
                
                # Check if we're entering a new directory
                if [[ "$file_dir" != "$current_dir" ]]; then
                    # Add newline if not the first directory
                    if [[ -n "$current_dir" ]]; then
                        echo ""  # Ensure previous progress bar line is complete
                        # Show failed files if any
                        if [[ $dir_failed -gt 0 ]]; then
                            echo -e "      ${RED}⚠ Failed to download $dir_failed file(s)${NC}"
                        fi
                    fi
                    current_dir="$file_dir"
                    dir_current=0
                    dir_failed=0
                    dir_file_count=${dir_files["$file_dir"]}
                    echo -e "    ${CYAN}📦${NC} Creating: ${GRAY}${file_dir#./}/${NC}"
                    # Move to next color in rotation
                    color_index=$(( (color_index + 1) % ${#colors[@]} ))
                fi
                
                # Download file silently
                if download_file_silent "$file_path"; then
                    # Update progress only if download succeeded
                    dir_current=$((dir_current + 1))
                    current_files=$((current_files + 1))
                else
                    # Track failed downloads
                    dir_failed=$((dir_failed + 1))
                    failed_files["$file_path"]=1
                    # Debug: log which file failed
                    echo -e "\n      ${RED}DEBUG: Failed to download: $file_path${NC}" >&2
                fi
                
                # Show progress bar for current directory with rotating colors
                local bar_color=${colors[$color_index]}
                show_progress_bar "$dir_current" "$dir_file_count" "      " "$bar_color"
            fi
        done < "$temp_file"
        
        # Ensure final progress bar has a newline and show final failed count
        if [[ -n "$current_dir" ]]; then
            echo ""
            if [[ $dir_failed -gt 0 ]]; then
                echo -e "      ${RED}⚠ Failed to download $dir_failed file(s)${NC}"
            fi
        fi
        
        # Show total summary if there were any failures
        local total_failed=${#failed_files[@]}
        if [[ $total_failed -gt 0 ]]; then
            echo ""
            echo -e "    ${RED}⚠ Total files failed: $total_failed${NC}"
        fi
        
        rm -f "$temp_file"
    else
        # Fallback: Use hardcoded file list
        echo -e "    ${RED}⚠️  GitHub API unavailable, using fallback file list${NC}"
        download_bmad_fallback
    fi
}

download_file_silent() {
    local file_path="$1"
    local target_file="$file_path"
    local target_dir=$(dirname "$target_file")
    
    # Create directory if needed
    if [[ ! -d "$target_dir" ]]; then
        mkdir -p "$target_dir"
    fi
    
    # Download the file silently and return status
    # URL encode the file path to handle special characters
    local encoded_path=$(echo "$file_path" | sed 's/ /%20/g; s/#/%23/g')
    local file_url="$GITHUB_RAW_URL/$encoded_path"
    local status=0
    
    if command -v curl >/dev/null 2>&1; then
        # Try downloading with curl, capture error for debugging
        local error_output=$(mktemp)
        if ! curl -fsSL "$file_url" -o "$target_file" 2>"$error_output"; then
            status=$?
            # Debug: show actual error
            if [[ -s "$error_output" ]]; then
                echo -e "\n        ${RED}Curl error for $file_path: $(cat "$error_output")${NC}" >&2
            fi
            # If download failed, remove any partial file
            rm -f "$target_file" 2>/dev/null
        fi
        rm -f "$error_output"
    else
        # Try with wget
        if ! wget -q "$file_url" -O "$target_file" 2>/dev/null; then
            status=$?
            # If download failed, remove any partial file
            rm -f "$target_file" 2>/dev/null
        fi
    fi
    
    return $status
}

show_progress_bar() {
    local current="$1"
    local total="$2"
    local prefix="$3"
    local bar_color="$4"
    local width=40
    
    # Default color if not specified
    if [[ -z "$bar_color" ]]; then
        bar_color=$ORANGE
    fi
    
    # Calculate percentage
    local percent=$((current * 100 / total))
    local filled=$((current * width / total))
    
    # Build progress bar
    local bar=""
    for ((i=0; i<filled; i++)); do
        bar+="█"
    done
    for ((i=filled; i<width; i++)); do
        bar+="░"
    done
    
    # Print progress bar with carriage return (overwrites same line)
    printf "\r${prefix}${bar_color}$bar${NC} $current/$total files (${percent}%%)"
    
    # Add newline when complete
    if [[ "$current" -eq "$total" ]]; then
        echo ""
    fi
}

download_and_show_file() {
    local file_path="$1"
    local dir_path="$2"
    local relative_path="${file_path#$dir_path/}"
    local target_file="$file_path"
    local target_dir=$(dirname "$target_file")
    
    # Show directory creation
    if [[ ! -d "$target_dir" ]]; then
        mkdir -p "$target_dir"
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
        *.txt) file_icon="📄" ;;
    esac
    
    echo -e "    ${file_icon} Downloaded: ${CYAN}$display_file${NC}"
}

download_bmad_fallback() {
    # Hardcoded list of known bmad-agent files (current as of latest commit)
    local files=(
        "bmad-agent/checklists/api-design-checklist.md"
        "bmad-agent/checklists/architect-checklist.md"
        "bmad-agent/checklists/change-checklist.md"
        "bmad-agent/checklists/debug-process-checklist.md"
        "bmad-agent/checklists/deployment-pipeline-checklist.md"
        "bmad-agent/checklists/frontend-architecture-checklist.md"
        "bmad-agent/checklists/implementation-quality-checklist.md"
        "bmad-agent/checklists/pm-checklist.md"
        "bmad-agent/checklists/po-master-checklist.md"
        "bmad-agent/checklists/security-threat-model-checklist.md"
        "bmad-agent/checklists/story-dod-checklist.md"
        "bmad-agent/checklists/story-draft-checklist.md"
        "bmad-agent/checklists/test-suite-quality-checklist.md"
        "bmad-agent/data/bmad-kb.md"
        "bmad-agent/data/technical-preferences.txt"
        "bmad-agent/personas/analyst.md"
        "bmad-agent/personas/architect.md"
        "bmad-agent/personas/data-engineer.md"
        "bmad-agent/personas/designer.md"
        "bmad-agent/personas/developer.md"
        "bmad-agent/personas/devops.md"
        "bmad-agent/personas/orchestrator.md"
        "bmad-agent/personas/pm.md"
        "bmad-agent/personas/qa.md"
        "bmad-agent/tasks/checklist-run-task.md"
        "bmad-agent/tasks/coordinate-multi-persona-feature.md"
        "bmad-agent/tasks/core-dump.md"
        "bmad-agent/tasks/correct-course.md"
        "bmad-agent/tasks/create-api-specification.md"
        "bmad-agent/tasks/create-architecture.md"
        "bmad-agent/tasks/create-data-migration-strategy.md"
        "bmad-agent/tasks/create-database-design.md"
        "bmad-agent/tasks/create-deep-research.md"
        "bmad-agent/tasks/create-deployment-pipeline.md"
        "bmad-agent/tasks/create-frontend-architecture.md"
        "bmad-agent/tasks/create-next-story.md"
        "bmad-agent/tasks/create-prd.md"
        "bmad-agent/tasks/create-test-strategy.md"
        "bmad-agent/tasks/create-ui-specification.md"
        "bmad-agent/tasks/debug-issue.md"
        "bmad-agent/tasks/generate-mvp-dashboard.md"
        "bmad-agent/tasks/generate-tests.md"
        "bmad-agent/tasks/implement-story.md"
        "bmad-agent/tasks/manage-mvp-scope.md"
        "bmad-agent/tasks/security-threat-model.md"
        "bmad-agent/templates/architecture-tmpl.md"
        "bmad-agent/templates/doc-sharding-tmpl.md"
        "bmad-agent/templates/front-end-architecture-tmpl.md"
        "bmad-agent/templates/front-end-spec-tmpl.md"
        "bmad-agent/templates/planning-journal-tmpl.md"
        "bmad-agent/templates/prd-tmpl.md"
        "bmad-agent/templates/project-brief-tmpl.md"
        "bmad-agent/templates/session-state-tmpl.md"
        "bmad-agent/templates/story-tmpl.md"
        "bmad-agent/templates/test-strategy-tmpl.md"
    )
    
    # Group files by directory for progress bars
    declare -A fallback_dir_files
    local total_fallback_files=${#files[@]}
    
    for file_path in "${files[@]}"; do
        local file_dir=$(dirname "$file_path")
        fallback_dir_files["$file_dir"]=$((${fallback_dir_files["$file_dir"]:-0} + 1))
    done
    
    # Download with progress bars
    local current_dir=""
    local dir_file_count=0
    local dir_current=0
    local dir_failed=0
    local color_index=0
    local colors=($DARK_ORANGE $CYAN)
    
    for file_path in "${files[@]}"; do
        local file_dir=$(dirname "$file_path")
        
        # Check if we're entering a new directory
        if [[ "$file_dir" != "$current_dir" ]]; then
            # Add newline if not the first directory
            if [[ -n "$current_dir" ]]; then
                echo ""  # Ensure previous progress bar line is complete
                # Show failed files if any
                if [[ $dir_failed -gt 0 ]]; then
                    echo -e "      ${RED}⚠ Failed to download $dir_failed file(s)${NC}"
                fi
            fi
            current_dir="$file_dir"
            dir_current=0
            dir_failed=0
            dir_file_count=${fallback_dir_files["$file_dir"]}
            echo -e "    ${CYAN}📦${NC} Creating: ${GRAY}${file_dir#./}/${NC}"
            # Move to next color in rotation
            color_index=$(( (color_index + 1) % ${#colors[@]} ))
        fi
        
        # Download file silently
        if download_file_silent "$file_path"; then
            # Update progress only if download succeeded
            dir_current=$((dir_current + 1))
        else
            # Track failed downloads
            dir_failed=$((dir_failed + 1))
        fi
        
        # Show progress bar for current directory with rotating colors
        local bar_color=${colors[$color_index]}
        show_progress_bar "$dir_current" "$dir_file_count" "      " "$bar_color"
    done
    
    # Ensure final progress bar has a newline and show final failed count
    if [[ -n "$current_dir" ]]; then
        echo ""
        if [[ $dir_failed -gt 0 ]]; then
            echo -e "      ${RED}⚠ Failed to download $dir_failed file(s)${NC}"
        fi
    fi
}

# Copy or download files
if [[ "$SOURCE_MODE" == "local" ]]; then
    echo -e "\n${CYAN}▶${NC} ${BRIGHT_ORANGE}Copying BMAD files...${NC}"
    
    # Copy bmad-agent folder
    if [[ -d "$SCRIPT_DIR/bmad-agent" ]]; then
        cp -r "$SCRIPT_DIR/bmad-agent" .
        echo -e "  ${CYAN}✔${NC} bmad-agent/ folder copied"
    else
        echo -e "${PURPLE}  ⚠️  bmad-agent/ folder not found in $SCRIPT_DIR${NC}"
    fi
else
    echo -e "\n${CYAN}▶${NC} ${BRIGHT_ORANGE}Downloading BMAD files from GitHub...${NC}"
    
    # Download bmad-agent folder
    echo -e "  ${CYAN}◐${NC} Downloading bmad-agent/ folder..."
    echo ""
    download_directory "bmad-agent"
    echo ""
    echo -e "  ${CYAN}✔${NC} bmad-agent/ folder complete"
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
        echo -e "  📝 ${CYAN}CLAUDE.md${NC} (basic version)"
    elif [[ -f "$SCRIPT_DIR/CLAUDE-ENHANCED.md" ]]; then
        cp "$SCRIPT_DIR/CLAUDE-ENHANCED.md" ./CLAUDE.md
        echo -e "  📝 ${CYAN}CLAUDE.md${NC} (enhanced version)"
    elif [[ -f "$SCRIPT_DIR/CLAUDE.md" ]]; then
        cp "$SCRIPT_DIR/CLAUDE.md" ./CLAUDE.md
        echo -e "  📝 ${CYAN}CLAUDE.md${NC}"
    fi
else
    if [[ "$claude_choice" == "2" ]]; then
        download_file "CLAUDE.md" "./CLAUDE.md"
        echo -e "  📝 ${CYAN}CLAUDE.md${NC} (basic version)"
    else
        download_file "CLAUDE-ENHANCED.md" "./CLAUDE.md"
        echo -e "  📝 ${CYAN}CLAUDE.md${NC} (enhanced version)"
    fi
fi

# Copy or download guide files
if [[ "$SOURCE_MODE" == "local" ]]; then
    if [[ -f "$SCRIPT_DIR/BMAD-CLAUDE-CODE-GUIDE.md" ]]; then
        cp "$SCRIPT_DIR/BMAD-CLAUDE-CODE-GUIDE.md" .
        echo -e "  📚 ${CYAN}BMAD-CLAUDE-CODE-GUIDE.md${NC}"
    fi
    
    if [[ -f "$SCRIPT_DIR/BMAD-SESSION-CONTINUITY.md" ]]; then
        cp "$SCRIPT_DIR/BMAD-SESSION-CONTINUITY.md" .
        echo -e "  🔄 ${CYAN}BMAD-SESSION-CONTINUITY.md${NC}"
    fi
else
    download_file "BMAD-CLAUDE-CODE-GUIDE.md" "./BMAD-CLAUDE-CODE-GUIDE.md"
    echo -e "  📚 ${CYAN}BMAD-CLAUDE-CODE-GUIDE.md${NC}"
    
    download_file "BMAD-SESSION-CONTINUITY.md" "./BMAD-SESSION-CONTINUITY.md"
    echo -e "  🔄 ${CYAN}BMAD-SESSION-CONTINUITY.md${NC}"
fi

# Create docs directory structure
echo ""
echo -e "${CYAN}▶${NC} ${BRIGHT_ORANGE}Creating project structure...${NC}"

mkdir -p docs/.bmad-session
mkdir -p docs/stories
mkdir -p docs/technical

echo -e "  📁 ${CYAN}docs/${NC}"
echo -e "  📁 ${CYAN}docs/.bmad-session/${NC}"
echo -e "  📁 ${CYAN}docs/stories/${NC}"
echo -e "  📁 ${CYAN}docs/technical/${NC}"

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
    echo -e "  ${GRAY}📓${NC} ${CYAN}docs/bmad-journal.md${NC} (initialized)"
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
    echo -e "  ⚙️ ${CYAN}docs/.bmad-session/current-state.md${NC} (initialized)"
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
    echo -e "  🚫 ${CYAN}.gitignore${NC} (created)"
fi

# Optional: Install BMAD Dashboard
echo ""
echo -e "${CYAN}◆${NC} ${BRIGHT_ORANGE}Optional: BMAD Dashboard${NC}"
echo "Would you like to install the BMAD Dashboard?"
echo "This creates a Next.js app for visualizing your project progress"
read -p "Install dashboard? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${CYAN}▶${NC} ${BRIGHT_ORANGE}Setting up BMAD Dashboard...${NC}"
    
    # Copy dashboard if local, otherwise download
    if [[ "$SOURCE_MODE" == "local" ]]; then
        if [[ -d "$SCRIPT_DIR/bmad-dashboard" ]]; then
            cp -r "$SCRIPT_DIR/bmad-dashboard" .
            echo -e "  ${CYAN}✔${NC} Dashboard copied"
        else
            echo -e "  ${YELLOW}⚠️${NC} Dashboard not found in repository"
        fi
    else
        # Download dashboard files from GitHub
        echo -e "  ${ORANGE}◐${NC} Downloading dashboard from GitHub..."
        echo ""  # Add spacing before download progress
        download_directory "bmad-dashboard"
        echo -e "  ${CYAN}✔${NC} Dashboard downloaded"
    fi
    
    echo ""
    echo -e "${CYAN}◆${NC} ${BRIGHT_ORANGE}Dashboard Setup:${NC}"
    echo "To start the dashboard:"
    echo "1. cd bmad-dashboard"
    echo "2. npm install"
    echo "3. npm run dev"
    echo "4. Open http://localhost:3001"
else
    echo -e "  ${GRAY}↳${NC} Skipping dashboard installation"
fi

echo ""
echo -e "${BRIGHT_ORANGE}✨ BMAD setup complete!${NC}"
echo ""
echo -e "${CYAN}◆${NC} ${BRIGHT_ORANGE}Next Steps:${NC}"
echo "1. Open this folder in VS Code with Claude Code enabled"
echo "2. Start with: \"Let's plan a new app using BMAD\""
echo "3. Or continue planning with: \"Continue BMAD planning\""
echo ""
echo -e "${CYAN}◆${NC} ${BRIGHT_ORANGE}Documentation:${NC}"
echo "- CLAUDE.md - Main instructions for Claude Code"
echo "- BMAD-CLAUDE-CODE-GUIDE.md - Quick reference"
echo "- BMAD-SESSION-CONTINUITY.md - Session management details"
echo ""
echo -e "${BRIGHT_CYAN}Happy planning with BMAD!${NC} ${BRIGHT_ORANGE}✨${NC}"
