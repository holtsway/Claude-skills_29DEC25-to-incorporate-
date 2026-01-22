# CLAUDE.md

This file provides guidance for AI assistants working with this repository.

## Repository Overview

This is Anthropic's official **Skills** repository - a collection of modular instruction packages that extend Claude's capabilities for specialized tasks. Skills are folders containing instructions, scripts, and resources that Claude loads dynamically to improve performance on specific domains.

**Key Links:**
- Agent Skills Specification: https://agentskills.io/specification
- Skills Documentation: https://support.claude.com/en/articles/12512176-what-are-skills

## Directory Structure

```
.
├── skills/                 # All skill implementations
│   ├── algorithmic-art/    # Creative: generative art
│   ├── brand-guidelines/   # Enterprise: Anthropic branding
│   ├── canvas-design/      # Creative: visual design
│   ├── doc-coauthoring/    # Enterprise: collaborative editing
│   ├── docx/               # Document: Word file processing
│   ├── frontend-design/    # Development: frontend UI
│   ├── internal-comms/     # Enterprise: internal communications
│   ├── mcp-builder/        # Development: MCP server creation
│   ├── pdf/                # Document: PDF processing
│   ├── pptx/               # Document: PowerPoint processing
│   ├── skill-creator/      # Meta: creating new skills
│   ├── slack-gif-creator/  # Creative: animated GIFs
│   ├── theme-factory/      # Creative: theme generation
│   ├── web-artifacts-builder/  # Development: web artifacts
│   ├── webapp-testing/     # Development: Playwright testing
│   └── xlsx/               # Document: Excel processing
├── spec/                   # Agent Skills specification (links to agentskills.io)
├── template/               # Skill template for creating new skills
└── .claude-plugin/         # Claude Code marketplace configuration
```

## Skill Architecture

### Required Structure

Every skill must have:

```
skill-name/
├── SKILL.md              # Required: metadata + instructions
└── [optional resources]
    ├── scripts/          # Executable code (Python/Bash)
    ├── references/       # Documentation loaded as needed
    └── assets/           # Templates, images, fonts
```

### SKILL.md Format

```markdown
---
name: skill-name
description: Complete description of what the skill does AND when to use it
license: Complete terms in LICENSE.txt  # optional
---

# Skill Title

[Instructions for Claude to follow when this skill is active]
```

**Frontmatter Fields:**
- `name` (required): Lowercase, hyphens for spaces
- `description` (required): Both functionality AND trigger conditions - this is the primary mechanism for skill activation
- `license` (optional): For proprietary skills

### Skill Categories

| Category | Skills | License |
|----------|--------|---------|
| Document | docx, pdf, pptx, xlsx | Proprietary (source-available) |
| Example | All others | Apache 2.0 (open source) |

## Key Conventions

### 1. Progressive Disclosure

Skills use a three-level loading system:
1. **Metadata** (~100 words) - Always in context
2. **SKILL.md body** (<5k words) - When skill triggers
3. **Bundled resources** - As needed by Claude

Keep SKILL.md under 500 lines. Split content into reference files when approaching this limit.

### 2. Resource Organization

**scripts/** - Executable code for deterministic operations
- Test scripts before including
- Can be executed without reading into context

**references/** - Documentation loaded on-demand
- Keep one level deep from SKILL.md
- Include table of contents for files >100 lines
- Avoid duplicating information in SKILL.md

**assets/** - Files used in output (not loaded into context)
- Templates, images, fonts, boilerplate

### 3. Writing Style

- Use imperative/infinitive form ("Run the script", not "You should run")
- Be concise - Claude is already smart, only add non-obvious information
- Prefer examples over verbose explanations
- Challenge each piece: "Does this justify its token cost?"

### 4. Degrees of Freedom

Match specificity to task fragility:
- **High freedom**: Text instructions when multiple approaches work
- **Medium freedom**: Pseudocode when patterns exist but variation is acceptable
- **Low freedom**: Specific scripts for fragile, error-prone operations

## Claude Code Plugin System

The repository includes marketplace configuration in `.claude-plugin/marketplace.json`:

**Available Plugins:**
1. `document-skills` - xlsx, docx, pptx, pdf
2. `example-skills` - All other skills

**Installation:**
```bash
/plugin marketplace add anthropics/skills
/plugin install document-skills@anthropic-agent-skills
/plugin install example-skills@anthropic-agent-skills
```

## Development Workflow

### Creating a New Skill

1. **Understand with examples** - Gather concrete usage examples
2. **Plan resources** - Identify scripts, references, assets needed
3. **Initialize** - Use `skill-creator/scripts/init_skill.py`
4. **Implement** - Create resources, write SKILL.md
5. **Package** - Use `skill-creator/scripts/package_skill.py`
6. **Iterate** - Refine based on real usage

### Skill Creation Commands

```bash
# Initialize new skill
python skills/skill-creator/scripts/init_skill.py <skill-name> --path <output-dir>

# Package skill (validates automatically)
python skills/skill-creator/scripts/package_skill.py <path/to/skill-folder>
```

### Validation Checks

The packaging script validates:
- YAML frontmatter format and required fields
- Skill naming conventions
- Description completeness
- File organization

## Testing Patterns

### For webapp-testing skill
```bash
# Run with server management
python scripts/with_server.py --server "npm run dev" --port 5173 -- python your_test.py
```

### For document skills
- docx: Use pandoc for text extraction, OOXML scripts for editing
- pdf: Use pypdf, pdfplumber, reportlab
- pptx: Use python-pptx or html2pptx patterns
- xlsx: Use openpyxl

## Common Pitfalls to Avoid

1. **Don't create unnecessary files** - No README.md, CHANGELOG.md, or auxiliary docs in skills
2. **Don't duplicate information** - Content lives in SKILL.md OR references, not both
3. **Don't nest references deeply** - Keep all reference files one level from SKILL.md
4. **Don't include "when to use" in body** - Put trigger conditions in frontmatter description
5. **Don't over-explain** - Trust Claude's baseline intelligence

## File Patterns

| Pattern | Purpose |
|---------|---------|
| `SKILL.md` | Required skill definition |
| `references/*.md` | On-demand documentation |
| `scripts/*.py` | Executable Python scripts |
| `examples/*.md` | Example content/patterns |
| `assets/*` | Output resources (templates, images) |

## Working with Document Skills

Document skills (docx, pdf, pptx, xlsx) are **proprietary/source-available**:
- Reference for complex skill patterns
- Not open source - see LICENSE.txt for terms
- Demonstrate production-quality implementations

## Git Workflow

- Branch naming: `claude/feature-name-XXXXX`
- Commit messages: Clear, descriptive
- PR format: Summary + test plan

## Quick Reference

### Skill Description Template
```
[What the skill does]. Use when [trigger conditions]: (1) [scenario 1], (2) [scenario 2], (3) [scenario 3]
```

### Example Good Description
```
Comprehensive document creation, editing, and analysis with support for tracked changes, comments, formatting preservation, and text extraction. When Claude needs to work with professional documents (.docx files) for: (1) Creating new documents, (2) Modifying or editing content, (3) Working with tracked changes, (4) Adding comments, or any other document tasks
```
