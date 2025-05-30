# BMAD-CLAUDE-CODE Quick Setup Script for Windows
# This script sets up the BMAD Method in your project for use with Claude Code

$ErrorActionPreference = "Stop"

# Enhanced Color Palette
function Write-ColorOutput($ForegroundColor) {
    $fc = $host.UI.RawUI.ForegroundColor
    $host.UI.RawUI.ForegroundColor = $ForegroundColor
    if ($args) {
        Write-Output $args
    }
    $host.UI.RawUI.ForegroundColor = $fc
}

# Color definitions
$Cyan = "Cyan"
$Purple = "Magenta" 
$Green = "Green"
$Red = "Red"
$White = "White"
$Gray = "DarkGray"

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# GitHub repository details
$GitHubRepo = "cabinlab/BMAD-CLAUDE-CODE"
$GitHubBranch = "main"
$GitHubRawUrl = "https://raw.githubusercontent.com/$GitHubRepo/$GitHubBranch"

# Clear screen for better presentation
Clear-Host

# Display CLAUDE CODE style ASCII art header
Write-Output ""
Write-ColorOutput $Purple "╔══════════════════════════════════════════════════════════════╕"
Write-Host -NoNewline -ForegroundColor $Purple "║ "
Write-Host -NoNewline -ForegroundColor $Cyan "***"
Write-Host -NoNewline " "
Write-Host -NoNewline -ForegroundColor $Green "Breakthrough Method of Agile AI-Driven Development"
Write-Host -NoNewline "  "
Write-Host -NoNewline -ForegroundColor $Cyan "***"
Write-Host -ForegroundColor $Purple " ║"
Write-ColorOutput $Purple "╚══════════════════════════════════════════════════════════════╝"
Write-Output ""
Write-ColorOutput $Green "     ██████╗██╗      █████╗ ██╗   ██╗██████╗ ███████╗"
Write-ColorOutput $Green "    ██╔════╝██║     ██╔══██╗██║   ██║██╔══██╗██╔════╝"
Write-ColorOutput $Green "    ██║     ██║     ███████║██║   ██║██║  ██║█████╗  "
Write-ColorOutput $Green "    ██║     ██║     ██╔══██║██║   ██║██║  ██║██╔══╝  "
Write-ColorOutput $Green "    ╚██████╗███████╗██║  ██║╚██████╔╝██████╔╝███████╗"
Write-ColorOutput $Green "     ╚═════╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝"
Write-Output ""
Write-ColorOutput $Purple "    ██████╗ ███╗   ███╗ █████╗ ██████╗ "
Write-ColorOutput $Purple "    ██╔══██╗████╗ ████║██╔══██╗██╔══██╗"
Write-ColorOutput $Purple "    ██████╔╝██╔████╔██║███████║██║  ██║"
Write-ColorOutput $Purple "    ██╔══██╗██║╚██╔╝██║██╔══██║██║  ██║"
Write-ColorOutput $Purple "    ██████╔╝██║ ╚═╝ ██║██║  ██║██████╔╝"
Write-ColorOutput $Purple "    ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═════╝ "
Write-Output ""

# Check if we're in the BMAD-CLAUDE-CODE repo or downloading from GitHub
if (Test-Path "$ScriptDir\bmad-agent") {
    Write-Host -NoNewline -ForegroundColor $Cyan "◆"
    Write-Host " Detected BMAD-CLAUDE-CODE repository"
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
    Write-Host -NoNewline -ForegroundColor $Cyan "◆"
    Write-Host " Setting up BMAD in: " -NoNewline
    Write-ColorOutput Cyan "$(Get-Location)"
    Write-Host -NoNewline -ForegroundColor $Purple "▶"
    Write-Host " Files will be downloaded from GitHub repository"
    $SourceMode = "github"
    $TargetDir = Get-Location
}

# Create target directory if it doesn't exist
if (!(Test-Path $TargetDir)) {
    Write-Host -NoNewline -ForegroundColor $Purple "▶"
    Write-Host " Creating directory: " -NoNewline
    Write-ColorOutput Cyan "$TargetDir"
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

Set-Location $TargetDir

Write-Output ""
Write-Host -NoNewline -ForegroundColor $Cyan "◆"
Write-Host " Setting up BMAD in: " -NoNewline
Write-ColorOutput Cyan "$TargetDir"
Write-Output ""

# Check if files already exist
$Overwrite = $false
if ((Test-Path "bmad-agent") -or (Test-Path "CLAUDE.md")) {
    Write-ColorOutput $Red "⚠️  BMAD files already exist in this directory"
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
        Write-ColorOutput $Red "Error downloading $FilePath : $_"
        throw
    }
}

function Download-File-Silent {
    param($FilePath)
    
    $targetFile = $FilePath
    $targetDir = Split-Path $targetFile -Parent
    
    # Create directory if needed
    if (!(Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
    }
    
    # Download the file silently
    $fileUrl = "$GitHubRawUrl/$FilePath"
    try {
        Invoke-WebRequest -Uri $fileUrl -OutFile $targetFile -UseBasicParsing -TimeoutSec 10
    } catch {
        # Silently fail
    }
}

function Download-Directory {
    param($DirPath)
    
    # Try GitHub tree API first, with fallback to hardcoded list
    $treeUrl = "https://api.github.com/repos/$GitHubRepo/git/trees/$GitHubBranch" + "?recursive=1"
    $apiSuccess = $false
    $treeData = $null
    
    # Show spinner while fetching file list
    Write-Host -NoNewline "  "
    Write-Host -NoNewline -ForegroundColor $Purple "◐"
    Write-Host " Fetching file list from GitHub..."
    
    try {
        # Attempt to get tree data from GitHub API with timeout
        $treeData = Invoke-RestMethod -Uri $treeUrl -UseBasicParsing -TimeoutSec 10
        if ($treeData -and $treeData.tree) {
            $apiSuccess = $true
            Write-Host -NoNewline "`r  "
            Write-Host -NoNewline -ForegroundColor $Green "✔"
            Write-Host " File list retrieved successfully    "
        }
    } catch {
        # API failed, will use fallback
        $apiSuccess = $false
        Write-Host -NoNewline "`r  "
        Write-Host -NoNewline -ForegroundColor $Red "✗"
        Write-Host " GitHub API unavailable              "
    }
    
    if ($apiSuccess) {
        # Use API data with color rotation
        $files = @()
        foreach ($item in $treeData.tree) {
            if ($item.path -like "$DirPath/*" -and $item.type -eq "blob") {
                $files += $item.path
            }
        }
        
        # Group files by directory
        $dirGroups = $files | Group-Object { Split-Path $_ -Parent }
        $colorIndex = 0
        $colors = @($Cyan, $Purple, $Green)
        
        foreach ($group in $dirGroups) {
            $dirName = $group.Name
            $dirFiles = $group.Group
            
            Write-Host -NoNewline "    "
            Write-Host -NoNewline -ForegroundColor $Cyan "📦"
            Write-Host " Creating: " -NoNewline
            Write-ColorOutput $Gray "$dirName/"
            
            # Download files with progress bar
            $fileCount = 0
            $totalFiles = $dirFiles.Count
            $barColor = $colors[$colorIndex]
            
            foreach ($filePath in $dirFiles) {
                Download-File-Silent $filePath
                $fileCount++
                Show-ProgressBar -Current $fileCount -Total $totalFiles -Prefix "      " -BarColor $barColor
            }
            
            # Move to next color
            $colorIndex = ($colorIndex + 1) % $colors.Length
        }
    } else {
        # Fallback: Use hardcoded file list
        Write-ColorOutput $Red "    ⚠️  GitHub API unavailable, using fallback file list"
        Download-Bmad-Fallback
    }
}

function Download-And-Show-File {
    param($FilePath, $DirPath)
    
    $relativePath = $FilePath.Substring($DirPath.Length + 1)
    $targetFile = $FilePath
    $targetDir = Split-Path $targetFile -Parent
    
    # Show directory creation
    if (!(Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        $displayDir = $targetDir.Replace(".\", "")
        if ($displayDir -ne $DirPath) {
            Write-Host -NoNewline "    "
            Write-Host -NoNewline -ForegroundColor $Cyan "📦"
            Write-Host " Creating: " -NoNewline
            Write-ColorOutput $Gray "$displayDir/"
        }
    }
    
    # Download the file
    $fileUrl = "$GitHubRawUrl/$FilePath"
    try {
        Invoke-WebRequest -Uri $fileUrl -OutFile $targetFile -UseBasicParsing -TimeoutSec 10
    } catch {
        Write-ColorOutput $Red "    ⚠️  Failed to download: $relativePath"
        return
    }
    
    # Show file download with proper formatting
    $fileIcon = "📄"
    switch -Regex ($relativePath) {
        "\.md$" { $fileIcon = "📝" }
        "\.(yml|yaml)$" { $fileIcon = "⚙️" }
        "\.json$" { $fileIcon = "🔧" }
        "\.sh$" { $fileIcon = "🔨" }
        "\.py$" { $fileIcon = "🐍" }
        "\.(js|ts)$" { $fileIcon = "⚡" }
        "\.txt$" { $fileIcon = "📄" }
    }
    
    Write-ColorOutput Green "    $fileIcon Downloaded: $relativePath"
}

function Download-Bmad-Fallback {
    # Hardcoded list of known bmad-agent files (matches bash script)
    $files = @(
        "bmad-agent/checklists/api-design-checklist.md",
        "bmad-agent/checklists/architect-checklist.md",
        "bmad-agent/checklists/change-checklist.md",
        "bmad-agent/checklists/debug-process-checklist.md",
        "bmad-agent/checklists/deployment-pipeline-checklist.md",
        "bmad-agent/checklists/frontend-architecture-checklist.md",
        "bmad-agent/checklists/implementation-quality-checklist.md",
        "bmad-agent/checklists/pm-checklist.md",
        "bmad-agent/checklists/po-master-checklist.md",
        "bmad-agent/checklists/security-threat-model-checklist.md",
        "bmad-agent/checklists/story-dod-checklist.md",
        "bmad-agent/checklists/story-draft-checklist.md",
        "bmad-agent/checklists/test-suite-quality-checklist.md",
        "bmad-agent/data/bmad-kb.md",
        "bmad-agent/data/technical-preferences.txt",
        "bmad-agent/personas/analyst.md",
        "bmad-agent/personas/architect.md",
        "bmad-agent/personas/data-engineer.md",
        "bmad-agent/personas/designer.md",
        "bmad-agent/personas/developer.md",
        "bmad-agent/personas/devops.md",
        "bmad-agent/personas/orchestrator.md",
        "bmad-agent/personas/pm.md",
        "bmad-agent/personas/qa.md",
        "bmad-agent/tasks/checklist-run-task.md",
        "bmad-agent/tasks/coordinate-multi-persona-feature.md",
        "bmad-agent/tasks/core-dump.md",
        "bmad-agent/tasks/correct-course.md",
        "bmad-agent/tasks/create-api-specification.md",
        "bmad-agent/tasks/create-architecture.md",
        "bmad-agent/tasks/create-data-migration-strategy.md",
        "bmad-agent/tasks/create-database-design.md",
        "bmad-agent/tasks/create-deep-research.md",
        "bmad-agent/tasks/create-deployment-pipeline.md",
        "bmad-agent/tasks/create-frontend-architecture.md",
        "bmad-agent/tasks/create-next-story.md",
        "bmad-agent/tasks/create-prd.md",
        "bmad-agent/tasks/create-test-strategy.md",
        "bmad-agent/tasks/create-ui-specification.md",
        "bmad-agent/tasks/debug-issue.md",
        "bmad-agent/tasks/generate-mvp-dashboard.md",
        "bmad-agent/tasks/generate-tests.md",
        "bmad-agent/tasks/implement-story.md",
        "bmad-agent/tasks/manage-mvp-scope.md",
        "bmad-agent/tasks/security-threat-model.md",
        "bmad-agent/templates/architecture-tmpl.md",
        "bmad-agent/templates/doc-sharding-tmpl.md",
        "bmad-agent/templates/front-end-architecture-tmpl.md",
        "bmad-agent/templates/front-end-spec-tmpl.md",
        "bmad-agent/templates/planning-journal-tmpl.md",
        "bmad-agent/templates/prd-tmpl.md",
        "bmad-agent/templates/project-brief-tmpl.md",
        "bmad-agent/templates/session-state-tmpl.md",
        "bmad-agent/templates/story-tmpl.md",
        "bmad-agent/templates/test-strategy-tmpl.md"
    )
    
    # Group files by directory for progress bars
    $dirGroups = $files | Group-Object { Split-Path $_ -Parent }
    $colorIndex = 0
    $colors = @($Cyan, $Purple, $Green)
    
    foreach ($group in $dirGroups) {
        $dirName = $group.Name
        $dirFiles = $group.Group
        
        Write-Host -NoNewline "    "
        Write-Host -NoNewline -ForegroundColor $Cyan "📦"
        Write-Host " Creating: " -NoNewline
        Write-ColorOutput $Gray "$dirName/"
        
        # Download files with progress bar
        $fileCount = 0
        $totalFiles = $dirFiles.Count
        $barColor = $colors[$colorIndex]
        
        foreach ($filePath in $dirFiles) {
            Download-File-Silent $filePath
            $fileCount++
            Show-ProgressBar -Current $fileCount -Total $totalFiles -Prefix "      " -BarColor $barColor
        }
        
        # Move to next color
        $colorIndex = ($colorIndex + 1) % $colors.Length
    }
}

# Copy or download files
if ($SourceMode -eq "local") {
    Write-Output ""
    Write-Host -NoNewline -ForegroundColor $Cyan "▶"
    Write-Host " Copying BMAD files..."
    
    # Copy bmad-agent folder
    if (Test-Path "$ScriptDir\bmad-agent") {
        Copy-Item -Path "$ScriptDir\bmad-agent" -Destination . -Recurse -Force
        Write-Host -NoNewline "  "
        Write-Host -NoNewline -ForegroundColor $Green "✔"
        Write-Host " bmad-agent/ folder copied"
    } else {
        Write-ColorOutput $Purple "  ⚠️  bmad-agent/ folder not found in $ScriptDir"
    }
} else {
    Write-Output ""
    Write-Host -NoNewline -ForegroundColor $Cyan "▶"
    Write-Host " Downloading BMAD files from GitHub..."
    
    # Download bmad-agent folder
    Write-Output "  📥 Downloading bmad-agent/ folder..."
    Write-Output ""
    Download-Directory "bmad-agent"
    Write-Output ""
    Write-Host -NoNewline "  "
    Write-Host -NoNewline -ForegroundColor $Green "✔"
    Write-Host " bmad-agent/ folder complete"
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
Write-Host -NoNewline -ForegroundColor $Cyan "▶"
Write-Host " Creating project structure..."

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
Write-Host -NoNewline -ForegroundColor $Green "✨"
Write-Host -ForegroundColor $Green " BMAD setup complete!"
Write-Output ""
Write-Host -NoNewline -ForegroundColor $Cyan "◆"
Write-Host " Next Steps:"
Write-Output "1. Open this folder in VS Code with Claude Code enabled"
Write-Output "2. Start with: `"Let's plan a new app using BMAD`""
Write-Output "3. Or continue planning with: `"Continue BMAD planning`""
Write-Output ""
Write-Host -NoNewline -ForegroundColor $Cyan "◆"
Write-Host " Documentation:"
Write-Output "- CLAUDE.md - Main instructions for Claude Code"
Write-Output "- BMAD-CLAUDE-CODE-GUIDE.md - Quick reference"
Write-Output "- BMAD-SESSION-CONTINUITY.md - Session management details"
Write-Output ""
Write-Host -NoNewline -ForegroundColor $Cyan "Happy planning with BMAD! "
Write-Host -ForegroundColor $Green "✨"