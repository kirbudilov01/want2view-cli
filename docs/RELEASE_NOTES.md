# Release Notes

## v0.4.1

This release aligns the connector with the current live source coverage:

- Account research examples now default to YouTube, TikTok, and Telegram.
- `want2view install codex` tells Codex that Instagram, X, Reddit, and Threads are roadmap sources unless the API reports them as available.
- Upgrade prompts now sell deeper collection, saved projects, scheduled refreshes, teams, and subtitles without over-promising unavailable connectors.

## v0.4.0

WANT2VIEW CLI now includes a Codex-compatible MCP server:

- `want2view mcp` starts a stdio MCP server.
- Codex can connect with `codex mcp add want2view --env WANT2VIEW_API_TOKEN=w2v_... -- npx -y want2view mcp`.
- MCP tools include `doctor`, `create_research`, `get_status`, `export_pack`, `get_subtitles`, and `search_telegram`.
- API Access can generate the MCP connection command alongside the fast `codex-cloud` CLI pack command.
- CLI packs remain available for one-shot research; MCP is the live tool layer for agents that should poll, export, and deepen research themselves.

## v0.3.0

WANT2VIEW CLI now includes the Codex install path and a stronger evidence-pack contract:

- `npx want2view install codex` installs a local `want2view-research` Codex skill.
- Every export includes `agent_contract.md`, `status.md`, and `upgrade_prompt.md`.
- Account exports can be downloaded while a run is still pending, so agents know what to poll instead of failing on a 202 response.
- The agent contract separates WANT2VIEW as the data layer from Codex as the synthesis layer for hooks, themes, visual patterns, scripts, SEO/content ideas, and research briefs.
- Free/developer packs stay useful while upgrade prompts are reserved for cross-platform sources, deeper record counts, scheduled refreshes, team access, and bulk subtitle/report jobs.

## v0.2.2

WANT2VIEW CLI now supports more one-command agent entrypoints:

- `npx want2view codex "ai video ads"`
- `npx want2view claude https://youtube.com/@example --channel`
- `npx want2view cursor "b2b saas launch"`
- `npx want2view openclaw "ugc ads"`
- `npx want2view agent "content monitoring"`

Codex, Cursor, OpenClaw, and generic terminal agents receive the Codex-style task pack. Claude receives the Claude-style brief. Every path uses the same WANT2VIEW evidence folder and the same account plan across dashboard, CLI, MCP, API, and private projects.

## v0.2.1

WANT2VIEW CLI now has shorter npm-ready one-command aliases:

- `npx want2view codex "ai video ads"`
- `npx want2view claude https://youtube.com/@example --channel`

The longer `start codex|claude` form still works. These aliases make the public npm package easier to explain on the landing page, GitHub README, launch posts, and short videos.

## v0.2.0

WANT2VIEW CLI is now packaged as a production-ready one-command agent setup for Codex, Claude, and terminal agents.

Highlights:

- `want2view start codex|claude ...` creates a pack and prints the exact agent prompt.
- GitHub-first setup flow modeled around a 60-second onboarding path.
- Clear Codex, Claude, channel audit, project export, and account connector paths.
- Prompt library, workflow recipes, launch posts, npm publish guide, and GitHub polish checklist.
- Updated hero, terminal demo, product preview, GIF, and social preview assets.
- Credential safety: auth commands only use trusted WANT2VIEW hosts unless explicitly overridden.
- Stable example outputs for people who want to inspect the value before running commands.

The CLI remains open-source. WANT2VIEW account plan unlocks managed social connectors, private projects, deeper catalog access, API tokens, scheduled refreshes, team workflows, and custom research.

## v0.1.0

WANT2VIEW CLI is now a public open-source entrypoint into WANT2VIEW.

Highlights:

- local demo research
- CSV, JSON, and JSONL imports
- scoring and normalization
- Codex and Claude context-pack exports
- limited public catalog access
- private project export client
- Developer CLI token flow
- WANT2VIEW account plan research client
- workflows for keyword search, channel audits, project exports, and content teams
- demo GIF and social preview assets
- CI workflow and npm-ready package metadata

The CLI remains open-source. WANT2VIEW account plan unlocks private projects, deeper catalog access, managed social connectors, scheduled refreshes, API access, team workflows, and custom research.
