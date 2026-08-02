<p align="center">
  <img src="./assets/hero.svg" alt="WANT2VIEW CLI - AI content research from your terminal" />
</p>

<p align="center">
  <a href="https://github.com/kirbudilov01/want2view-cli"><img alt="GitHub repo" src="https://img.shields.io/badge/GitHub-open--source-111827?style=for-the-badge&logo=github" /></a>
  <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-28D7C7?style=for-the-badge" />
  <img alt="Node 18+" src="https://img.shields.io/badge/node-18%2B-7C5CFF?style=for-the-badge&logo=node.js" />
  <img alt="Agent ready" src="https://img.shields.io/badge/Codex%20%2B%20Claude-ready-0B0A14?style=for-the-badge" />
</p>

# WANT2VIEW CLI

Open-source AI content research packs for Codex, Claude, and terminal agents.

Start free from the terminal. Upgrade to WANT2VIEW Cloud when you need managed social connectors, scheduled refreshes, team workspaces, and production-scale content intelligence.

```bash
npx github:kirbudilov01/want2view-cli research "ai video ads" --demo
npx github:kirbudilov01/want2view-cli export --for codex
```

## Pick Your Path

| You want to... | Run this | What happens |
| --- | --- | --- |
| Try it with zero setup | `research "ai video ads" --demo` | Creates a free local AI context pack |
| Use your own data | `import ./competitors.csv` | Converts CSV/JSON/JSONL into an evidence pack |
| Give Codex better context | `export --for codex` | Writes `codex_tasks.md`, `summary.md`, `evidence.jsonl` |
| Give Claude a strategy brief | `export --for claude` | Writes `claude_brief.md` with evidence references |
| Use real social connectors | `login` then `cloud research --mode cloud` | Runs through WANT2VIEW Cloud |
| Order custom research | Open WANT2VIEW | Get a human/product-ready category research package |

## Why This Exists

Most AI agents are only as good as the context you give them. WANT2VIEW CLI turns social content evidence into clean, inspectable files that agents can use as a source of truth.

Local open-source mode gives immediate value:

- demo research;
- CSV / JSON / JSONL imports;
- basic normalization and scoring;
- Codex-ready task packs;
- Claude-ready research briefs.

WANT2VIEW Cloud adds the paid moat:

- managed YouTube, TikTok, Instagram, X, Reddit, and Threads connectors;
- provider keys, retries, source warnings, and cost controls;
- scheduled refreshes;
- team workspaces;
- historical source index;
- hosted dashboard and API.
- custom research packages for teams that want the result done for them.

<p align="center">
  <img src="./assets/architecture.svg" alt="Terminal to WANT2VIEW Cloud to AI context pack architecture" />
</p>

## One-Command Demo

Run directly from GitHub before the npm package is published:

```bash
npx github:kirbudilov01/want2view-cli research "ai video ads" --demo
npx github:kirbudilov01/want2view-cli export --for codex
npx github:kirbudilov01/want2view-cli export --for claude
```

After npm publish, the same workflow becomes:

```bash
npx want2view research "ai video ads" --demo
npx want2view export --for codex
```

## Agent Handoff

Tell Codex, Claude Code, or another terminal agent:

```text
Use the newest .want2view/exports/<pack_id> folder as the source of truth.
Read manifest.json, summary.md, evidence.jsonl, scored.csv, and codex_tasks.md.
Base recommendations only on evidence rows.
```

Generated packs contain:

```text
manifest.json
summary.md
evidence.jsonl
scored.csv
codex_tasks.md
claude_brief.md
```

## Interactive Login

Cloud mode needs a WANT2VIEW account token. The login wizard gives users three paths:

```bash
npx github:kirbudilov01/want2view-cli login
```

```text
Choose authentication method:
  1. Open browser and create/paste Developer CLI token
  2. Paste API token now
  3. Use WANT2VIEW_API_TOKEN from environment
  4. Skip for now
```

Fast paths:

```bash
npx github:kirbudilov01/want2view-cli login --token w2v_your_token
export WANT2VIEW_API_TOKEN="w2v_your_token"
```

Agent diagnostics:

```bash
npx github:kirbudilov01/want2view-cli doctor --json
```

## Cloud Social Research

Once authenticated, the CLI can ask WANT2VIEW Cloud to run managed social collection:

```bash
npx github:kirbudilov01/want2view-cli cloud research "fitness reels" \
  --sources youtube,tiktok,instagram,x --mode cloud

npx github:kirbudilov01/want2view-cli cloud status w2v_run_abc123
npx github:kirbudilov01/want2view-cli cloud export w2v_run_abc123 --for codex
```

The CLI stores exported packs locally under:

```text
.want2view/exports/<run_id>/
```

## What You Can Buy From WANT2VIEW

The open-source CLI is the free entrypoint. WANT2VIEW Cloud is for serious, repeated work:

| Product | Best for |
| --- | --- |
| Managed connectors | Teams that need YouTube, TikTok, Instagram, X, Reddit, and Threads without maintaining provider access |
| API access | Agencies, AI agents, automations, and internal tools |
| Scheduled refreshes | Weekly monitoring of a niche, creator market, product category, or competitor set |
| Custom research | Done-for-you category reports, competitor maps, content briefs, scripts, and client-ready insights |
| Team workspace | Shared source-of-truth packs, saved history, and repeatable research workflows |

Start here:

- Website: [want2view.com](https://want2view.com)
- App / API token: [app.want2view.com](https://app.want2view.com)
- Custom research: open a WANT2VIEW account and request a research package from the dashboard.

## Bring Your Own Data

```bash
npx github:kirbudilov01/want2view-cli import examples/competitors.csv
npx github:kirbudilov01/want2view-cli score
npx github:kirbudilov01/want2view-cli export --for claude
```

Supported local inputs:

- `.csv`
- `.json`
- `.jsonl`

Recommended columns:

| Column | Meaning |
| --- | --- |
| `platform` | YouTube, TikTok, Instagram, X, Reddit, Threads, or custom source |
| `account` | Creator, channel, author, subreddit, or profile |
| `title` | Content title or post headline |
| `url` | Source URL |
| `views` | Reach metric |
| `likes` | Likes or equivalent reaction count |
| `comments` | Comment count |
| `published_at` | Publication date |
| `text` | Caption, summary, or note |

## Command Map

| Command | Purpose |
| --- | --- |
| `want2view login` | Interactive auth wizard |
| `want2view doctor --json` | Agent-readable setup diagnostics |
| `want2view research "topic" --demo` | Free local demo pack |
| `want2view import ./file.csv` | Bring your own data |
| `want2view score` | Score local records |
| `want2view export --for codex` | Create Codex pack |
| `want2view export --for claude` | Create Claude brief |
| `want2view cloud research "topic" --mode cloud` | Start managed WANT2VIEW Cloud run |
| `want2view cloud status <run_id>` | Poll cloud run |
| `want2view cloud export <run_id> --for codex` | Download cloud context pack |

## Open Core Boundary

Open-source:

- CLI runner;
- local imports;
- demo data;
- normalization;
- basic scoring;
- Codex and Claude context-pack exports;
- auth wizard and cloud API client.

Paid WANT2VIEW Cloud:

- managed platform connectors;
- approved API/bridge infrastructure;
- TikTok, Instagram, X, Reddit, Threads production collection;
- scheduled refreshes;
- team workspaces;
- deeper scoring and historical indexes;
- dashboard and API.

## Local Development

```bash
node bin/want2view.js research "ai video ads" --demo
node bin/want2view.js export --for codex
node bin/want2view.js doctor --json
```

## Links

- Website: [want2view.com](https://want2view.com)
- App: [app.want2view.com](https://app.want2view.com)
- Repo: [github.com/kirbudilov01/want2view-cli](https://github.com/kirbudilov01/want2view-cli)
- Roadmap: [ROADMAP.md](./ROADMAP.md)
- Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)
