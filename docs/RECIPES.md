# Recipes

Recipes are practical onboarding paths built from existing WANT2VIEW CLI commands and WANT2VIEW product surfaces.

They do not imply that every paid workflow is fully local. The open-source CLI creates useful context packs; WANT2VIEW Cloud provides deeper catalog data, private projects, managed social connectors, scheduled refreshes, API access, and custom research.

## Agency Client Research

Use this when an agency wants a fast client-facing category or competitor brief.

```bash
npx github:kirbudilov01/want2view-cli import ./client-competitors.csv
npx github:kirbudilov01/want2view-cli score
npx github:kirbudilov01/want2view-cli export --for claude
```

Give Claude:

```text
Read .want2view/exports/<pack_id>/claude_brief.md and evidence.jsonl.
Create a client-ready content research brief with competitor patterns, repeatable hooks, risks, and recommended next experiments.
Every recommendation must cite evidence rows.
```

Next WANT2VIEW step:

- Order custom research for the client category.
- Connect private projects through API Access.
- Schedule recurring monitoring for the client account.

## Founder Niche Check

Use this when a founder wants to test whether a niche has visible content demand.

```bash
npx github:kirbudilov01/want2view-cli research "ai video ads" --demo
npx github:kirbudilov01/want2view-cli catalog categories
npx github:kirbudilov01/want2view-cli catalog export ai --for codex
```

Give Codex:

```text
Use the newest .want2view/exports/<pack_id> folder.
Turn the evidence into a niche validation brief: audience pain, content formats, competitor signals, landing page angles, and next research gaps.
Separate evidence from assumptions.
```

Next WANT2VIEW step:

- Open the full catalog in the account.
- Create a private project for the niche.
- Get API access if the founder wants an agent or workflow to keep checking the niche.

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
