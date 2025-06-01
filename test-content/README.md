# BMAD Test Content

This directory contains dummy content for testing the BMAD assessment dashboard. All files are fictional project briefs designed to showcase the assessment methodology across different signal strength levels and categories.

## Directory Structure

```
test-content/
├── discovery/          # 3 discovery-phase ideas with varying assessment levels
├── development/        # 3 development-ready ideas with strong signal strength
├── opportunity/        # 5 opportunity ideas with excellent validation but timing/resource constraints
└── README.md          # This file
```

## Test Content Overview

### Discovery Phase (3 ideas)
- **social-learning-platform.md** - 68% signal strength, neutral stance, technical challenges
- **voice-memo-organizer.md** - 48% signal strength, cautious stance, weak validation
- **micro-investment-tracker.md** - 82% signal strength, advocate stance, strong validation

### Development Ready (3 ideas)
- **local-event-discovery.md** - 87% signal strength, comprehensive validation
- **freelancer-expense-tracker.md** - 86% signal strength, proven market need
- **plant-care-assistant.md** - 84% signal strength, well-validated with clear monetization

### Opportunities (5 ideas)
- **remote-team-wellness.md** - 89% signal strength, excellent validation but B2B complexity
- **sustainable-gift-recommendations.md** - 83% signal strength, seasonal timing considerations
- **neighborhood-skill-exchange.md** - 83% signal strength, community-dependent success
- **senior-tech-companion.md** - 85% signal strength, requires accessibility expertise
- **child-screen-time-tracker.md** - 80% signal strength, technical platform challenges

## Assessment Dimensions Tested

Each test file includes frontmatter with assessment data covering all 8 BMAD dimensions:

1. **Problem Validation** - How well-defined and validated is the problem
2. **User Clarity** - Specificity of target users and their needs
3. **Value Definition** - Clarity of unique value proposition
4. **Technical Viability** - Feasibility of proposed technical approach
5. **Validation Approach** - Quality of success metrics and validation strategy
6. **Risk Awareness** - Recognition of key risks and mitigation strategies
7. **Scope Definition** - Clarity of MVP scope and constraints
8. **Success Measurement** - Specific, measurable success criteria

## Claude Perspective Examples

The test content demonstrates all three Claude stance types:
- **Advocate** - Strong recommendation to proceed (7 examples)
- **Neutral** - Balanced assessment with considerations (2 examples)
- **Cautious** - Significant concerns requiring address (2 examples)

## Dashboard Testing Features

This test content allows you to verify:
- ✅ Multi-category organization (discovery/development/opportunity)
- ✅ Signal strength calculation and visualization
- ✅ Dimension breakdown with persona attribution
- ✅ Claude perspective display with confidence levels
- ✅ Missing areas identification
- ✅ Assessment overview metrics
- ✅ Responsive design with varying content lengths

## Usage

The dashboard automatically scans this directory when running. To see the test content:

1. Start the dashboard: `npm run dev`
2. Visit `http://localhost:3000`
3. Use the "Refresh" button to reload test data
4. Toggle between "Overview" and "Detailed" views

The API at `/api/bmad-data` includes both real discovery documents from `/docs` and test content from this directory.

---

*Note: All project briefs are fictional and created solely for testing the BMAD assessment dashboard functionality.*