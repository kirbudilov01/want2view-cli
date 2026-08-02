# WANT2VIEW CLI

Open-source AI content research packs for Codex, Claude, and terminal agents.

```bash
npx want2view research "ai video ads" --demo
npx want2view export --for codex
```

Before the npm package is published, run directly from GitHub:

```bash
npx github:kirbudilov01/want2view-cli research "ai video ads" --demo
npx github:kirbudilov01/want2view-cli export --for codex
```

Open-source CLI for building AI-ready social content research packs from local data, demo datasets, and WANT2VIEW Cloud runs.

The first useful experience is local and free. Paid WANT2VIEW Cloud is for managed social connectors, scheduled refreshes, team workspaces, historical indexes, and production-scale research.

## What It Does

WANT2VIEW CLI turns social content evidence into files that AI agents can actually use:

- `manifest.json`
- `summary.md`
- `evidence.jsonl`
- `scored.csv`
- `codex_tasks.md`
- `claude_brief.md`

Use it locally with your own data, or connect it to WANT2VIEW Cloud when you need managed social parsing across YouTube, TikTok, Instagram, X, Reddit, Threads, and future sources.

## Quick Start

```bash
npx want2view init
npx want2view research "ai video ads" --demo
npx want2view export --for codex
npx want2view export --for claude
```

GitHub install path:

```bash
npx github:kirbudilov01/want2view-cli research "ai video ads" --demo
npx github:kirbudilov01/want2view-cli export --for codex
```

Agent handoff:

```text
Use the newest .want2view/exports/<pack_id> folder as the source of truth.
Read manifest.json, summary.md, evidence.jsonl, scored.csv, and codex_tasks.md.
Base recommendations only on evidence rows.
```

Local development from this repo:

```bash
node bin/want2view.js research "ai video ads" --demo
node bin/want2view.js export --for codex
```

## Bring Your Own Data

```bash
npx want2view import ./competitors.csv
npx want2view score
npx want2view export --for codex
```

Supported local inputs:

- `.csv`
- `.json`
- `.jsonl`

Recommended columns:

- `platform`
- `account`
- `title`
- `url`
- `views`
- `likes`
- `comments`
- `published_at`
- `text`

## Cloud Upgrade Path

```bash
npx want2view login
export WANT2VIEW_API_TOKEN="..."
npx want2view auth status
npx want2view cloud research "fitness reels" --sources youtube,tiktok,instagram,x
npx want2view cloud export w2v_run_abc123 --for codex
```

The CLI does not write API tokens to project files. Tokens should live in your shell, CI secret store, or another secure environment.

You can also save a token in your user-level config:

```bash
npx want2view login --token w2v_your_token
npx want2view auth status
```

Saved tokens go to `~/.config/want2view/config.json` with private file permissions where supported.

## Output

Every export creates a folder under `.want2view/exports/` with:

- `manifest.json`
- `summary.md`
- `evidence.jsonl`
- `scored.csv`
- `codex_tasks.md` or `claude_brief.md`

These files are designed to be easy for Codex, Claude, and human content teams to inspect.

## Open Core Boundary

Open-source:

- CLI runner;
- local imports;
- demo data;
- normalization;
- basic scoring;
- Codex and Claude context-pack exports.

Paid WANT2VIEW Cloud:

- managed platform connectors;
- approved API/bridge infrastructure;
- TikTok, Instagram, X, Threads production collection;
- scheduled refreshes;
- team workspaces;
- deeper scoring and historical indexes;
- dashboard and API.

## Website Commands

Use this block on the website:

```bash
npx want2view research "ai video ads" --demo
npx want2view export --for codex
npx want2view export --for claude
npx want2view login
npx want2view auth status
npx want2view cloud research "ai video ads" --sources youtube,tiktok,instagram,x
npx want2view cloud export w2v_run_abc123 --for codex
```
