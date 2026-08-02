# Agent Workflow Example

Use this flow when Codex, Claude Code, or another terminal agent needs WANT2VIEW research.

```bash
npx want2view login --token w2v_your_token
npx want2view doctor --json
npx want2view auth status
npx want2view cloud research "ai video ads" --sources youtube,tiktok,instagram,x --mode cloud
npx want2view cloud status w2v_run_abc123
npx want2view cloud export w2v_run_abc123 --for codex
```

Then tell your agent:

```text
Use .want2view/exports/w2v_run_abc123 as the source of truth.
Read manifest.json, summary.md, evidence.jsonl, scored.csv, and codex_tasks.md.
Create landing copy, video scripts, and implementation tasks based only on evidence rows.
```

Local free mode:

```bash
npx want2view import examples/competitors.csv
npx want2view score
npx want2view export --for claude
```
