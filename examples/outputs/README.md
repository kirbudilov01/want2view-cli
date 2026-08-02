# Example Outputs

Open these folders before running anything to see what WANT2VIEW CLI creates for agents.

## Keyword Search

Command:

```bash
npx github:kirbudilov01/want2view-cli search "ai video ads" --demo
npx github:kirbudilov01/want2view-cli export --for codex
```

Output:

- `keyword-search/exports/*/manifest.json`
- `keyword-search/exports/*/summary.md`
- `keyword-search/exports/*/evidence.jsonl`
- `keyword-search/exports/*/scored.csv`
- `keyword-search/exports/*/codex_tasks.md`

## Channel Audit

Command:

```bash
npx github:kirbudilov01/want2view-cli channel https://youtube.com/@example --demo
npx github:kirbudilov01/want2view-cli export --for claude
```

Output:

- `channel-audit/exports/*/manifest.json`
- `channel-audit/exports/*/summary.md`
- `channel-audit/exports/*/evidence.jsonl`
- `channel-audit/exports/*/scored.csv`
- `channel-audit/exports/*/claude_brief.md`

## Project Export

Private project export requires a WANT2VIEW account and API access:

```bash
export WANT2VIEW_PUBLIC_API_KEY="..."
npx github:kirbudilov01/want2view-cli projects list
npx github:kirbudilov01/want2view-cli project export <project_id> --for codex
```

Expected output:

- `manifest.json`
- `summary.md`
- `evidence.jsonl`
- `scored.csv`
- `channels.json`
- `trends.json`
- `keywords.json`
- `codex_tasks.md` or `claude_brief.md`
