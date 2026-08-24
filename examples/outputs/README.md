# Example Outputs

Open these folders before running anything to see what WANT2VIEW CLI creates for agents.

## Keyword Search

Command:

```bash
npx want2view search "ai video ads" --demo
npx want2view export --for codex
```

One-command version:

```bash
npx want2view start codex "ai video ads"
```

Output:

- `keyword-search/pack/manifest.json`
- `keyword-search/pack/summary.md`
- `keyword-search/pack/evidence.jsonl`
- `keyword-search/pack/scored.csv`
- `keyword-search/pack/codex_tasks.md`

## Channel Audit

Command:

```bash
npx want2view channel https://youtube.com/@example --demo
npx want2view export --for claude
```

One-command version:

```bash
npx want2view start claude https://youtube.com/@example --channel
```

Output:

- `channel-audit/pack/manifest.json`
- `channel-audit/pack/summary.md`
- `channel-audit/pack/evidence.jsonl`
- `channel-audit/pack/scored.csv`
- `channel-audit/pack/claude_brief.md`

## Project Export

Private project export requires a WANT2VIEW account and API access:

```bash
export WANT2VIEW_PUBLIC_API_KEY="..."
npx want2view projects list
npx want2view project export <project_id> --for codex
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
