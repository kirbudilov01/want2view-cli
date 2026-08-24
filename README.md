<p align="center">
  <img src="./assets/hero.svg" alt="WANT2VIEW CLI - AI content research from your terminal" />
</p>

<p align="center">
  <a href="https://github.com/kirbudilov01/want2view-cli"><img alt="GitHub repo" src="https://img.shields.io/badge/GitHub-open--source-111827?style=for-the-badge&logo=github" /></a>
  <a href="https://github.com/kirbudilov01/want2view-cli/releases/latest"><img alt="Latest release" src="https://img.shields.io/github/v/release/kirbudilov01/want2view-cli?style=for-the-badge&label=release" /></a>
  <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-28D7C7?style=for-the-badge" />
  <img alt="Node 18+" src="https://img.shields.io/badge/node-18%2B-7C5CFF?style=for-the-badge&logo=node.js" />
  <img alt="Agent ready" src="https://img.shields.io/badge/Codex%20%2B%20Claude-ready-0B0A14?style=for-the-badge" />
</p>

# WANT2VIEW CLI + MCP

One command gives Codex, Claude, Cursor, OpenClaw, and terminal agents the same WANT2VIEW evidence your account can access. MCP mode gives Codex live WANT2VIEW tools for YouTube, TikTok, and Telegram research.

WANT2VIEW CLI is the open-source agent interface for your WANT2VIEW account. It turns keyword searches, channel audits, local CSV/JSON imports, public catalog samples, and WANT2VIEW projects into source-of-truth packs your agents can read directly.

Start from your WANT2VIEW account in 60 seconds. CLI and MCP do not create a separate pricing model: they are the agent interface to the same dashboard limits, sources, projects, and API access.

```bash
npx -y github:kirbudilov01/want2view-cli account research "AI SaaS avatar content factory" --sources youtube,tiktok,telegram --limit 30
```

Connect live tools to Codex:

```bash
npx -y github:kirbudilov01/want2view-cli install codex
codex mcp add want2view --env WANT2VIEW_API_TOKEN=w2v_... -- npx -y github:kirbudilov01/want2view-cli mcp
```

Pick any agent:

```bash
npx want2view claude https://youtube.com/@example --channel
npx want2view codex "b2b saas launch" # Cursor
npx want2view codex "ugc ads" # OpenClaw
```

<p align="center">
  <img src="./assets/demo-flow.gif" alt="Terminal to WANT2VIEW research pack demo" />
</p>

<p align="center">
  <img src="./assets/terminal-demo.svg" alt="WANT2VIEW CLI terminal demo" />
</p>

<p align="center">
  <a href="https://want2view.com">
    <img src="./assets/want2view-product-preview.png" alt="WANT2VIEW product landing page" />
  </a>
</p>

<p align="center">
  <strong>Open-source agent connector. Same WANT2VIEW account, same product limits.</strong><br />
  <a href="https://want2view.com">Website</a> ·
  <a href="https://app.want2view.com">Create account</a> ·
  <a href="https://app.want2view.com/api-access">Get API access</a>
</p>

<p align="center">
  <a href="./docs/RECIPES.md">Workflows</a> ·
  <a href="./examples/outputs">Example Outputs</a> ·
  <a href="./docs/LAUNCH_POSTS.md">Launch Posts</a> ·
  <a href="./docs/LAUNCH_CHECKLIST.md">Launch Checklist</a> ·
  <a href="./docs/API_ACCESS_FLOW.md">API Access Flow</a> ·
  <a href="./docs/LAUNCH_PLAYBOOK.md">Launch Playbook</a> ·
  <a href="./SUPPORT.md">Support</a>
</p>

## Setup In 60 Seconds

For Codex, install the skill once, connect MCP from API Access, then let Codex run research through your WANT2VIEW account.

```bash
npx -y github:kirbudilov01/want2view-cli install codex
```

Then pick your agent and run one command.

| Agent | One command |
| --- | --- |
| Codex MCP tools | `codex mcp add want2view --env WANT2VIEW_API_TOKEN=w2v_... -- npx -y github:kirbudilov01/want2view-cli mcp` |
| Codex setup | `npx -y github:kirbudilov01/want2view-cli install codex` |
| Codex | `npx want2view codex "ai video ads"` |
| Claude | `npx want2view claude "ugc ads"` |
| Cursor | `npx want2view codex "b2b saas launch"` |
| OpenClaw | `npx want2view codex "ugc ads"` |
| Claude channel audit | `npx want2view claude https://youtube.com/@example --channel` |
| Any terminal agent | `npx want2view codex "your keyword"` |

If npm lags behind the GitHub repo, use the GitHub fallback:

```bash
npx -y github:kirbudilov01/want2view-cli account research "AI SaaS avatar content factory" --sources youtube,tiktok,telegram --limit 30 --wait 180
```

The command creates a local `.want2view/exports/<pack_id>/` folder and prints the exact prompt to paste into your agent.

MCP mode exposes WANT2VIEW as live tools:

- `doctor` checks auth and connector state.
- `create_research_plan` turns a business goal into short source queries, waits, exports, and merges one evidence pack.
- `create_research` starts a focused WANT2VIEW account research run.
- `get_status` checks source status and record counts.
- `export_pack` downloads an agent-ready evidence pack.
- `get_subtitles` queues/reads the subtitles + scenario pipeline for selected videos.
- `search_telegram` starts a Telegram-only research run and reports plan/source limits honestly.

Why do agents have different commands? They all read the same WANT2VIEW evidence folder. The command only chooses the most useful handoff file:

- Codex, Cursor, OpenClaw, and generic terminal agents can use the Codex-style task pack: `codex_tasks.md`.
- Claude gets `claude_brief.md`.
- Every pack still includes `manifest.json`, `agent_contract.md`, `status.md`, `summary.md`, `evidence.jsonl`, and `scored.csv`.

## Same Prompt. Different Intelligence.

| Without WANT2VIEW CLI | With WANT2VIEW CLI |
| --- | --- |
| Agent guesses from a vague prompt | Agent reads `evidence.jsonl`, `scored.csv`, and `summary.md` |
| No source rows | Every recommendation can cite evidence |
| Manual copy-paste research | One local pack for Codex, Claude, Cursor, OpenClaw, and other terminal agents |
| Separate tool limits | One WANT2VIEW account plan across dashboard, CLI, MCP, and API |

## TL;DR

WANT2VIEW CLI is not a separate product tier. It is the open-source agent interface for your WANT2VIEW account.

- **Free WANT2VIEW account:** create a Developer token, connect Codex/Claude, run test-depth YouTube/TikTok/Telegram research, and export evidence packs.
- **Paid WANT2VIEW account:** the same CLI/MCP commands run with higher record limits, saved projects, scheduled refreshes, project API, team workflows, bulk reports, and custom research.
- **Best use:** give Codex, Claude, and terminal agents real WANT2VIEW evidence folders instead of vague prompts.

## What The Command Creates

```bash
npx want2view codex "ai video ads"
```

Output:

```text
.want2view/exports/<pack_id>/
  manifest.json
  agent_contract.md
  status.md
  summary.md
  evidence.jsonl
  scored.csv
  codex_tasks.md
  claude_brief.md
  upgrade_prompt.md
```

Then tell your agent:

```text
Use the newest .want2view/exports/<pack_id> folder as the source of truth.
Read manifest.json, summary.md, evidence.jsonl, scored.csv, and codex_tasks.md.
Base recommendations only on evidence rows.
```

Want to inspect the output before running anything? Open [examples/outputs](./examples/outputs).

## Prompt Library

Copy these after running `start`.

| Goal | Prompt |
| --- | --- |
| Codex strategy | `Use the newest .want2view/exports folder as the source of truth. Read manifest.json, summary.md, evidence.jsonl, scored.csv, and codex_tasks.md. Recommend only from evidence rows.` |
| Claude brief | `Read claude_brief.md and evidence.jsonl. Create a decision-ready content brief with hooks, risks, gaps, and next experiments. Mark assumptions clearly.` |
| Landing page | `Use the WANT2VIEW pack to write landing copy. Tie claims to evidence rows and separate observed patterns from creative recommendations.` |
| Content scripts | `Create 10 short-form scripts from the strongest evidence. For each script, cite the row or URL that inspired it.` |

## Pick Your Path

| You want to... | Run this | What happens |
| --- | --- | --- |
| Install Codex workflow | `install codex` | Adds the WANT2VIEW research skill to local Codex |
| Connect Codex live tools | `mcp` through `codex mcp add` | Lets Codex call WANT2VIEW research/status/export/subtitle/Telegram tools |
| Start with Codex in one command | `start codex "ai video ads"` | Creates a pack and prints the Codex prompt |
| Start with Claude in one command | `start claude https://youtube.com/@example --channel` | Creates a channel pack and prints the Claude prompt |
| Try without a token | `search "ai video ads" --demo` | Creates a local sample pack so an agent can inspect the file format |
| Try a channel-shaped pack | `channel https://youtube.com/@example --demo` | Creates a local channel-shaped sample pack |
| Use your own data | `import ./competitors.csv` | Converts CSV/JSON/JSONL into an evidence pack |
| Give Codex better context | `export --for codex` | Writes `codex_tasks.md`, `summary.md`, `evidence.jsonl` |
| Give Claude a strategy brief | `export --for claude` | Writes `claude_brief.md` with evidence references |
| Browse the public catalog | `catalog categories` | Shows a limited public sample of WANT2VIEW categories |
| Export public catalog evidence | `catalog export ai --for codex` | Gives an agent-readable sample pack from public catalog data |
| Use your own WANT2VIEW projects | `projects list` | Requires `WANT2VIEW_PUBLIC_API_KEY` from API Access |
| Export a project to an agent | `project export <id> --for codex` | Turns your internal project into an AI-readable pack |
| Run account research | `login` then `account research "goal"` | Splits broad goals into short queries, waits, exports, and merges one pack inside your account limits |
| Order custom research | Open WANT2VIEW | Get a human/product-ready category research package |
| Pick a ready workflow | `workflows keyword` | Shows commands, agent prompt, and WANT2VIEW next step |

## One Account Plan

| Surface | Free WANT2VIEW account | Paid WANT2VIEW account |
| --- | --- | --- |
| Dashboard | Free catalog, onboarding, API Access, Developer token | Saved projects, reports, history, team workflows |
| CLI | Local packs, CSV/JSON imports, test-depth account research | Higher record limits and project exports through the same commands |
| MCP | Codex can call WANT2VIEW research/status/export/subtitle/Telegram tools | Codex can run deeper repeated research inside paid limits |
| Sources | YouTube, TikTok, Telegram test depth | Deeper YouTube/TikTok/Telegram collection and roadmap sources when enabled |
| Upgrade reason | When the first pack proves value | More records, scheduled refresh, project API, bulk reports, team access |

## Why This Exists

Most AI agents are only as good as the context you give them. WANT2VIEW CLI turns social content evidence into clean, inspectable files that agents can use as a source of truth.

Without an account token, the CLI still gives immediate local value for format testing:

- sample research packs;
- CSV / JSON / JSONL imports;
- basic normalization and scoring;
- Codex-ready task packs;
- Claude-ready research briefs.

Your WANT2VIEW account plan controls the connected product:

- test-depth YouTube/TikTok/Telegram research through Developer tokens on free accounts;
- deeper catalog data and higher record limits on paid plans;
- private project exports from the WANT2VIEW dashboard;
- managed YouTube, TikTok, and Telegram connectors;
- roadmap source expansion only when enabled by plan/API;
- provider keys, retries, source warnings, and cost controls;
- scheduled refreshes;
- team workspaces;
- historical source index;
- hosted dashboard and API;
- custom research packages for teams that want the result done for them.

<p align="center">
  <img src="./assets/architecture.svg" alt="Terminal to WANT2VIEW account to AI context pack architecture" />
</p>

## One-Command Agent Interface

Npm command:

```bash
npx want2view codex "ai video ads"
npx want2view claude https://youtube.com/@example --channel
npx want2view workflows keyword
```

GitHub fallback:

```bash
npx want2view codex "ai video ads"
npx want2view claude https://youtube.com/@example --channel
```

Package status: use npm for stable installs; use the GitHub fallback when the repository has newer connector fixes before the next npm publish.

The fastest real path is account-first: open [WANT2VIEW API Access](https://app.want2view.com/api-access), create a Developer token, connect MCP once, then let Codex run inside your WANT2VIEW limits. Local sample packs are only there so an agent can inspect the format before login.

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

More copy-paste prompts live in [docs/AGENT_PROMPTS.md](./docs/AGENT_PROMPTS.md).

## Workflows

Workflows are not separate hidden features. They are practical paths that combine the same WANT2VIEW product surfaces: keyword search, channel analysis, project export, catalog access, and account connectors.

| Workflow | Start with CLI | Continue in WANT2VIEW |
| --- | --- | --- |
| Keyword search to Codex | `npx want2view codex "ai video ads"` | Connect API Access when you want live account data |
| Channel audit to Claude | `npx want2view claude https://youtube.com/@example --channel` | Connect your account for real collection or order a deeper audit |
| Keyword research to Cursor | `npx want2view codex "creator economy"` | Turn evidence into product, SEO, or content tasks |
| Research pack to OpenClaw | `npx want2view codex "ugc ads"` | Work from the same source-of-truth files |
| WANT2VIEW project export | `projects list` then `project export <id> --for codex` | Work from private projects and team workspaces |
| Content team monitoring | `account research "category"` | Run inside account limits; paid plans add refreshes and team packs |

Full copy-paste workflows live in [docs/RECIPES.md](./docs/RECIPES.md).

## Interactive Login

There are two keys because there are two product surfaces:

- `WANT2VIEW_API_TOKEN`: Developer CLI token for account research runs.
- `WANT2VIEW_PUBLIC_API_KEY`: Public API key for your WANT2VIEW projects and reports.

Account research needs a WANT2VIEW Developer CLI token. The login wizard gives users three paths:

```bash
npx want2view login
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
npx want2view login --token w2v_your_token
export WANT2VIEW_API_TOKEN="w2v_your_token"
```

Credential safety: token-bearing commands ignore project-level API base overrides. A cloned repository cannot redirect your `WANT2VIEW_API_TOKEN` or `WANT2VIEW_PUBLIC_API_KEY` to an arbitrary host through local config. Non-WANT2VIEW API endpoints require an explicit `--allow-untrusted-api` flag.

Agent diagnostics:

```bash
npx want2view doctor --json
```

Project API:

```bash
export WANT2VIEW_PUBLIC_API_KEY="your_dashboard_api_key"
npx want2view projects list
npx want2view project export <project_id> --for codex
```

## WANT2VIEW Catalog

Use catalog commands to discover a limited public sample of what WANT2VIEW already tracks:

```bash
npx want2view catalog categories
npx want2view catalog videos ai --limit 20
npx want2view catalog export ai --for claude
```

This is the bridge from GitHub discovery into the real WANT2VIEW product: the CLI can show public catalog surfaces, while authenticated users can export private projects, run account research, and unlock deeper social intelligence.

## Account Research

Once authenticated, the CLI can ask your WANT2VIEW account to run managed social collection. Use this for broad Codex/Claude tasks:

```bash
npx want2view account research "fitness reels content strategy" \
  --sources youtube,tiktok,telegram --limit 30 --wait 180
```

The account command creates a short query plan, starts several focused WANT2VIEW runs, waits for source jobs, exports the finished runs, and merges one evidence pack for the agent.

Low-level run commands remain available when you already know the exact keyword:

```bash
npx want2view cloud status w2v_run_abc123
npx want2view cloud export w2v_run_abc123 --for codex
```

The CLI stores exported packs locally under:

```text
.want2view/exports/<run_id>/
```

## Account Capabilities

The CLI/MCP connector follows your WANT2VIEW account plan:

| Plan capability | Best for |
| --- | --- |
| Account connector | First Codex research run, up to the current account record limit, using YouTube/TikTok/Telegram |
| Project API | Agencies, AI agents, automations, and internal tools that need project data when included by the account plan |
| Managed connectors | Teams that need deeper YouTube, TikTok, and Telegram without maintaining provider access |
| Scheduled refreshes | Weekly monitoring of keywords, channels, creator markets, product categories, or competitor sets |
| Custom research | Done-for-you category reports, competitor maps, content briefs, scripts, and client-ready insights |
| Team workspace | Shared source-of-truth packs, saved history, and repeatable research workflows |

Start here:

- Website: [want2view.com](https://want2view.com)
- App / API token: [app.want2view.com](https://app.want2view.com)
- API Access: [app.want2view.com/api-access](https://app.want2view.com/api-access)
- Custom research: open a WANT2VIEW account and request a research package from the dashboard.

## Built For These Workflows

- Content teams researching a new category before filming.
- Agencies turning competitor data into client-ready strategy.
- Founders and operators checking keywords, channels, and categories before spending budget.
- AI agents that need evidence files before writing briefs, scripts, landing pages, or reports.
- Internal tools that need a clean bridge into WANT2VIEW data.

## Bring Your Own Data

```bash
npx want2view import examples/competitors.csv
npx want2view score
npx want2view export --for claude
```

Supported local inputs:

- `.csv`
- `.json`
- `.jsonl`

Recommended columns:

| Column | Meaning |
| --- | --- |
| `platform` | YouTube, TikTok, Telegram, or custom source |
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
| `want2view start codex "topic"` | One-command Codex setup |
| `want2view start claude <channel> --channel` | One-command Claude channel setup |
| `want2view login` | Interactive auth wizard |
| `want2view doctor --json` | Agent-readable setup diagnostics |
| `want2view workflows` | Show keyword, channel, project, and monitoring workflows |
| `want2view workflows keyword` | Print a copy-pasteable keyword-to-agent workflow |
| `want2view search "topic" --demo` | Local sample keyword pack |
| `want2view channel <url> --demo` | Local sample channel-shaped pack |
| `want2view catalog categories` | Browse WANT2VIEW catalog categories |
| `want2view catalog export ai --for codex` | Export catalog evidence for an agent |
| `want2view projects list` | List your WANT2VIEW projects with `WANT2VIEW_PUBLIC_API_KEY` |
| `want2view project export <id> --for codex` | Export your internal project to Codex/Claude |
| `want2view install codex` | Install the WANT2VIEW research skill into local Codex |
| `want2view account research "goal"` | Plan, run, wait, export, and merge account research for an agent |
| `want2view account status <run_id>` | Poll an underlying account research run |
| `want2view account export <run_id> --for codex` | Download an underlying account context pack |
| `want2view research "topic" --demo` | Backward-compatible alias for local demo research |
| `want2view import ./file.csv` | Bring your own data |
| `want2view score` | Score local records |
| `want2view export --for codex` | Create Codex pack |
| `want2view export --for claude` | Create Claude brief |
| `want2view cloud research "topic" --mode cloud` | Low-level focused run used by `account research` |
| `want2view cloud status <run_id>` | Backward-compatible status alias |
| `want2view cloud export <run_id> --for codex` | Backward-compatible export alias |

## Account Plan Boundary

Open-source:

- CLI runner;
- local imports;
- sample data;
- limited public catalog access;
- normalization;
- basic scoring;
- Codex and Claude context-pack exports;
- auth wizard and account API client.

WANT2VIEW account plans:

- Free account: Codex connector, Developer token, test-depth YouTube/TikTok/Telegram research, evidence packs.
- Paid account: higher limits, saved/private projects, project API, scheduled refreshes, bulk reports, team workspaces, deeper scoring, historical indexes.

## Local Development

```bash
node bin/want2view.js start codex "ai video ads"
node bin/want2view.js doctor --json
```

## Links

- Website: [want2view.com](https://want2view.com)
- App: [app.want2view.com](https://app.want2view.com)
- API Access: [app.want2view.com/api-access](https://app.want2view.com/api-access)
- Repo: [github.com/kirbudilov01/want2view-cli](https://github.com/kirbudilov01/want2view-cli)
- Roadmap: [ROADMAP.md](./ROADMAP.md)
- Contributing: [CONTRIBUTING.md](./CONTRIBUTING.md)
- Security: [SECURITY.md](./SECURITY.md)
- Support: [SUPPORT.md](./SUPPORT.md)
- Agent prompts: [docs/AGENT_PROMPTS.md](./docs/AGENT_PROMPTS.md)
- Workflows: [docs/RECIPES.md](./docs/RECIPES.md)
- Example outputs: [examples/outputs](./examples/outputs)
- API access flow: [docs/API_ACCESS_FLOW.md](./docs/API_ACCESS_FLOW.md)
- Launch ideas: [docs/LAUNCH_PLAYBOOK.md](./docs/LAUNCH_PLAYBOOK.md)
- Launch posts: [docs/LAUNCH_POSTS.md](./docs/LAUNCH_POSTS.md)
- Launch checklist: [docs/LAUNCH_CHECKLIST.md](./docs/LAUNCH_CHECKLIST.md)
- vidIQ-style UX audit: [docs/VIDIQ_STYLE_AUDIT.md](./docs/VIDIQ_STYLE_AUDIT.md)
- NPM publish checklist: [docs/NPM_PUBLISH.md](./docs/NPM_PUBLISH.md)
