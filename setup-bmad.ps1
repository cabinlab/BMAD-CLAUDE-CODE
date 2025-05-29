# BMAD-CLAUDE-CODE Quick Setup Script for Windows
# This script sets up the BMAD Method in your project for use with Claude Code

$ErrorActionPreference = "Stop"

# Colors for output
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-ColorOutput Blue "🚀 BMAD-CLAUDE-CODE Setup Script"
Write-Output "=================================="
Write-Output ""

# Check if we're in the BMAD-CLAUDE-CODE repo or if user wants to set up in current directory
if (Test-Path "$ScriptDir\bmad-agent") {
    Write-ColorOutput Yellow "Detected BMAD-CLAUDE-CODE repository"
    Write-Output "Where would you like to set up BMAD?"
    Write-Output "1) Current directory: $(Get-Location)"
    Write-Output "2) Different directory"
    Write-Output "3) Cancel"
    $choice = Read-Host "Choose (1-3)"
    
    switch ($choice) {
        "1" {
            $TargetDir = Get-Location
        }
        "2" {
            $TargetDir = Read-Host "Enter target directory path"
            $TargetDir = [System.Environment]::ExpandEnvironmentVariables($TargetDir)
        }
        "3" {
            Write-Output "Setup cancelled"
            exit 0
        }
        default {
            Write-Output "Invalid choice"
            exit 1
        }
    }
} else {
    Write-ColorOutput Yellow "Running from: $(Get-Location)"
    $TargetDir = Get-Location
}

# Create target directory if it doesn't exist
if (!(Test-Path $TargetDir)) {
    Write-ColorOutput Blue "Creating directory: $TargetDir"
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

Set-Location $TargetDir

Write-Output ""
Write-ColorOutput Blue "Setting up BMAD in: $TargetDir"
Write-Output ""

# Check if files already exist
$Overwrite = $false
if ((Test-Path "bmad-agent") -or (Test-Path "CLAUDE.md")) {
    Write-ColorOutput Yellow "⚠️  BMAD files already exist in this directory"
    $reply = Read-Host "Overwrite existing files? (y/N)"
    if ($reply -match "^[Yy]$") {
        $Overwrite = $true
    } else {
        Write-Output "Setup cancelled"
        exit 0
    }
}

# Copy files
Write-ColorOutput Blue "📁 Copying BMAD files..."

# Copy bmad-agent folder
if (Test-Path "$ScriptDir\bmad-agent") {
    Copy-Item -Path "$ScriptDir\bmad-agent" -Destination . -Recurse -Force
    Write-Output "  ✓ bmad-agent/ folder"
} else {
    Write-ColorOutput Yellow "  ⚠️  bmad-agent/ folder not found in $ScriptDir"
}

# Copy CLAUDE.md (prefer enhanced version if user wants full features)
if (Test-Path "$ScriptDir\CLAUDE-ENHANCED.md") {
    Write-Output ""
    Write-Output "Which version of CLAUDE.md would you like?"
    Write-Output "1) Enhanced (with full planning & session continuity)"
    Write-Output "2) Basic (simpler, without session management)"
    $claude_choice = Read-Host "Choose (1-2) [1]"
    if (!$claude_choice) { $claude_choice = "1" }
    
    if (($claude_choice -eq "2") -and (Test-Path "$ScriptDir\CLAUDE.md")) {
        Copy-Item -Path "$ScriptDir\CLAUDE.md" -Destination ".\CLAUDE.md" -Force
        Write-Output "  ✓ CLAUDE.md (basic version)"
    } else {
        Copy-Item -Path "$ScriptDir\CLAUDE-ENHANCED.md" -Destination ".\CLAUDE.md" -Force
        Write-Output "  ✓ CLAUDE.md (enhanced version)"
    }
} elseif (Test-Path "$ScriptDir\CLAUDE.md") {
    Copy-Item -Path "$ScriptDir\CLAUDE.md" -Destination . -Force
    Write-Output "  ✓ CLAUDE.md"
}

# Copy guide files
if (Test-Path "$ScriptDir\BMAD-CLAUDE-CODE-GUIDE.md") {
    Copy-Item -Path "$ScriptDir\BMAD-CLAUDE-CODE-GUIDE.md" -Destination . -Force
    Write-Output "  ✓ BMAD-CLAUDE-CODE-GUIDE.md"
}

if (Test-Path "$ScriptDir\BMAD-SESSION-CONTINUITY.md") {
    Copy-Item -Path "$ScriptDir\BMAD-SESSION-CONTINUITY.md" -Destination . -Force
    Write-Output "  ✓ BMAD-SESSION-CONTINUITY.md"
}

# Create docs directory structure
Write-Output ""
Write-ColorOutput Blue "📂 Creating project structure..."

$directories = @("docs", "docs\.bmad-session", "docs\stories", "docs\technical")
foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
    }
    Write-Output "  ✓ $dir/"
}

# Initialize planning journal if it doesn't exist
if (!(Test-Path "docs\bmad-journal.md")) {
    @'
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
'@ | Out-File -FilePath "docs\bmad-journal.md" -Encoding UTF8
    Write-Output "  ✓ docs\bmad-journal.md (initialized)"
}

# Initialize session state
if (!(Test-Path "docs\.bmad-session\current-state.md")) {
    @'
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
'@ | Out-File -FilePath "docs\.bmad-session\current-state.md" -Encoding UTF8
    Write-Output "  ✓ docs\.bmad-session\current-state.md (initialized)"
}

# Create .gitignore if it doesn't exist
if (!(Test-Path ".gitignore")) {
    @'
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
'@ | Out-File -FilePath ".gitignore" -Encoding UTF8
    Write-Output "  ✓ .gitignore (created)"
}

Write-Output ""
Write-ColorOutput Green "✅ BMAD setup complete!"
Write-Output ""
Write-ColorOutput Blue "📚 Next Steps:"
Write-Output "1. Open this folder in VS Code with Claude Code enabled"
Write-Output "2. Start with: `"Let's plan a new app using BMAD`""
Write-Output "3. Or continue planning with: `"Continue BMAD planning`""
Write-Output ""
Write-ColorOutput Blue "📖 Documentation:"
Write-Output "- CLAUDE.md - Main instructions for Claude Code"
Write-Output "- BMAD-CLAUDE-CODE-GUIDE.md - Quick reference"
Write-Output "- BMAD-SESSION-CONTINUITY.md - Session management details"
Write-Output ""
Write-ColorOutput Green "Happy planning with BMAD! 🚀"