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

# GitHub repository details
$GitHubRepo = "cabinlab/BMAD-CLAUDE-CODE"
$GitHubBranch = "main"
$GitHubRawUrl = "https://raw.githubusercontent.com/$GitHubRepo/$GitHubBranch"

Write-ColorOutput Blue "🚀 BMAD-CLAUDE-CODE Setup Script"
Write-Output "=================================="
Write-Output ""

# Check if we're in the BMAD-CLAUDE-CODE repo or downloading from GitHub
if (Test-Path "$ScriptDir\bmad-agent") {
    Write-ColorOutput Yellow "Detected BMAD-CLAUDE-CODE repository"
    $SourceMode = "local"
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
    Write-ColorOutput Yellow "Setting up BMAD in: $(Get-Location)"
    Write-ColorOutput Blue "Files will be downloaded from GitHub repository"
    $SourceMode = "github"
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

# Functions for downloading files from GitHub
function Download-File {
    param($FilePath, $TargetPath)
    $url = "$GitHubRawUrl/$FilePath"
    try {
        Invoke-WebRequest -Uri $url -OutFile $TargetPath -UseBasicParsing
    } catch {
        Write-ColorOutput Yellow "Error downloading $FilePath : $_"
        throw
    }
}

function Download-Directory {
    param($DirPath)
    $apiUrl = "https://api.github.com/repos/$GitHubRepo/contents/$DirPath?ref=$GitHubBranch"
    
    # Create directory
    if (!(Test-Path $DirPath)) {
        New-Item -ItemType Directory -Path $DirPath -Force | Out-Null
    }
    
    try {
        # Get directory contents from GitHub API
        $contents = Invoke-RestMethod -Uri $apiUrl -UseBasicParsing
        
        foreach ($item in $contents) {
            if ($item.type -eq "file") {
                $targetFile = Join-Path $DirPath $item.name
                $targetDir = Split-Path $targetFile -Parent
                if (!(Test-Path $targetDir)) {
                    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
                }
                Invoke-WebRequest -Uri $item.download_url -OutFile $targetFile -UseBasicParsing
            } elseif ($item.type -eq "dir") {
                # Recursively download subdirectories
                Download-Directory (Join-Path $DirPath $item.name)
            }
        }
    } catch {
        Write-ColorOutput Yellow "Error downloading directory $DirPath : $_"
        throw
    }
}

# Copy or download files
if ($SourceMode -eq "local") {
    Write-ColorOutput Blue "📁 Copying BMAD files..."
    
    # Copy bmad-agent folder
    if (Test-Path "$ScriptDir\bmad-agent") {
        Copy-Item -Path "$ScriptDir\bmad-agent" -Destination . -Recurse -Force
        Write-Output "  ✓ bmad-agent/ folder"
    } else {
        Write-ColorOutput Yellow "  ⚠️  bmad-agent/ folder not found in $ScriptDir"
    }
} else {
    Write-ColorOutput Blue "📁 Downloading BMAD files from GitHub..."
    
    # Download bmad-agent folder
    Write-Output "  📥 Downloading bmad-agent/ folder..."
    Download-Directory "bmad-agent"
    Write-Output "  ✓ bmad-agent/ folder"
}

# Copy or download CLAUDE.md
Write-Output ""
Write-Output "Which version of CLAUDE.md would you like?"
Write-Output "1) Enhanced (with full planning & session continuity)"
Write-Output "2) Basic (simpler, without session management)"
$claude_choice = Read-Host "Choose (1-2) [1]"
if (!$claude_choice) { $claude_choice = "1" }

if ($SourceMode -eq "local") {
    if (($claude_choice -eq "2") -and (Test-Path "$ScriptDir\CLAUDE.md")) {
        Copy-Item -Path "$ScriptDir\CLAUDE.md" -Destination ".\CLAUDE.md" -Force
        Write-Output "  ✓ CLAUDE.md (basic version)"
    } elseif (Test-Path "$ScriptDir\CLAUDE-ENHANCED.md") {
        Copy-Item -Path "$ScriptDir\CLAUDE-ENHANCED.md" -Destination ".\CLAUDE.md" -Force
        Write-Output "  ✓ CLAUDE.md (enhanced version)"
    } elseif (Test-Path "$ScriptDir\CLAUDE.md") {
        Copy-Item -Path "$ScriptDir\CLAUDE.md" -Destination ".\CLAUDE.md" -Force
        Write-Output "  ✓ CLAUDE.md"
    }
} else {
    if ($claude_choice -eq "2") {
        Download-File "CLAUDE.md" ".\CLAUDE.md"
        Write-Output "  ✓ CLAUDE.md (basic version)"
    } else {
        Download-File "CLAUDE-ENHANCED.md" ".\CLAUDE.md"
        Write-Output "  ✓ CLAUDE.md (enhanced version)"
    }
}

# Copy or download guide files
if ($SourceMode -eq "local") {
    if (Test-Path "$ScriptDir\BMAD-CLAUDE-CODE-GUIDE.md") {
        Copy-Item -Path "$ScriptDir\BMAD-CLAUDE-CODE-GUIDE.md" -Destination . -Force
        Write-Output "  ✓ BMAD-CLAUDE-CODE-GUIDE.md"
    }
    
    if (Test-Path "$ScriptDir\BMAD-SESSION-CONTINUITY.md") {
        Copy-Item -Path "$ScriptDir\BMAD-SESSION-CONTINUITY.md" -Destination . -Force
        Write-Output "  ✓ BMAD-SESSION-CONTINUITY.md"
    }
} else {
    Download-File "BMAD-CLAUDE-CODE-GUIDE.md" ".\BMAD-CLAUDE-CODE-GUIDE.md"
    Write-Output "  ✓ BMAD-CLAUDE-CODE-GUIDE.md"
    
    Download-File "BMAD-SESSION-CONTINUITY.md" ".\BMAD-SESSION-CONTINUITY.md"
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