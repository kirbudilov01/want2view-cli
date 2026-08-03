# Workflows

Workflows are practical onboarding paths built from existing WANT2VIEW CLI commands and WANT2VIEW product surfaces.

They do not imply that every paid workflow is fully local. The open-source CLI creates useful context packs; WANT2VIEW Cloud provides deeper catalog data, private projects, managed social connectors, scheduled refreshes, API access, and custom research.

## Keyword Search To Codex

Use this when someone wants to search by keyword, create an evidence pack, and hand it to Codex.

```bash
npx github:kirbudilov01/want2view-cli start codex "ai video ads"
```

Give Codex:

```text
Use the newest .want2view/exports/<pack_id> folder as the source of truth.
Find repeated hooks, content formats, audience pains, and evidence-backed recommendations.
Every recommendation must cite evidence rows from the pack.
```

Next WANT2VIEW step:

- Unlock deeper catalog results for the keyword.
- Save the search as a WANT2VIEW project.
- Get API access for repeatable agent handoffs.

## Channel Audit To Claude

Use this when someone sends a channel URL or creator handle and wants a Claude-ready audit.

```bash
npx github:kirbudilov01/want2view-cli start claude https://youtube.com/@example --channel
```

Give Claude:

```text
Read claude_brief.md and evidence.jsonl.
Create a channel audit with repeated formats, hooks, audience signals, gaps, risks, and next content experiments.
Separate evidence from assumptions and cite evidence rows.
```

Next WANT2VIEW step:

- Connect the real channel in WANT2VIEW Cloud.
- Compare it against competitors.
- Order custom research when the team needs a polished report.

## WANT2VIEW Project To Agent

Use this when the user already has a WANT2VIEW account and wants Codex or Claude to work from an internal project.

```bash
npx github:kirbudilov01/want2view-cli login
npx github:kirbudilov01/want2view-cli projects list
npx github:kirbudilov01/want2view-cli project export <project_id> --for codex
```

Give the agent:

```text
Use the exported WANT2VIEW project folder as the source of truth.
Read manifest.json, summary.md, evidence.jsonl, scored.csv, channels.json, trends.json, and keywords.json.
Do not invent sources outside the project export.
```

Next WANT2VIEW step:

- Add more sources to the project.
- Schedule refreshes.
- Share the project with the team.

## Content Team Monitoring

Use this when a team already knows the category and wants repeated updates.

```bash
npx github:kirbudilov01/want2view-cli login
npx github:kirbudilov01/want2view-cli cloud research "fitness reels" \
  --sources youtube,tiktok,instagram,x --mode cloud
npx github:kirbudilov01/want2view-cli cloud status w2v_run_abc123
npx github:kirbudilov01/want2view-cli cloud export w2v_run_abc123 --for codex
```

Give the agent:

```text
Read the exported cloud run folder.
Create a weekly content monitoring memo with new signals, source warnings, opportunity themes, and production recommendations.
If a platform failed or was rate-limited, state that before recommendations.
```

Next WANT2VIEW step:

- Schedule recurring refreshes.
- Share the project with the team.
- Use custom research when the team needs a client-ready or board-ready report.
