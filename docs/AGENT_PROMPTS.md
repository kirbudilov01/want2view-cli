# Agent Prompts

Use these prompts after running:

```bash
npx want2view codex "ai video ads"
```

## Codex

```text
Use the newest .want2view/exports/<pack_id> folder as the source of truth.
Read manifest.json, summary.md, evidence.jsonl, scored.csv, and codex_tasks.md.
Turn the evidence into a practical content research brief.
Every recommendation must cite a source row or URL from evidence.jsonl.
Do not invent platform performance claims that are not supported by the pack.
```

## Claude Code

```text
Read the newest .want2view/exports/<pack_id> folder.
Use claude_brief.md as the narrative layer and evidence.jsonl as the source layer.
Create a decision-ready content strategy with hooks, angles, risks, and next experiments.
Mark assumptions clearly when the evidence is limited.
```

## Landing Page Or Campaign Agent

```text
Read .want2view/exports/<pack_id>/summary.md and evidence.jsonl.
Create a landing page or campaign concept for this market.
Use the content patterns, audience pains, and proof points from the evidence.
Separate observed evidence from creative recommendations.
```

## When Using WANT2VIEW Cloud

```text
Use the exported cloud run folder as the source of truth.
Prioritize source_statuses and warnings before making recommendations.
If one platform failed or was rate-limited, say so in the final brief.
```
