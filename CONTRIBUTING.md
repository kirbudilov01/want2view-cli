# Contributing

Thanks for helping build WANT2VIEW CLI.

## Local Setup

```bash
npm install
npm run check
node bin/want2view.js research "ai video ads" --demo
node bin/want2view.js export --for codex
```

## Connector Rules

- Keep local/open-source connectors safe and bounded.
- Do not commit API keys, cookies, session files, or scraped private data.
- Preserve raw evidence separately from generated insight.
- Every generated recommendation should be traceable to evidence rows.
- Managed high-risk or provider-restricted connectors belong in WANT2VIEW account plan.

## Pull Requests

Good PRs include:

- a short explanation;
- a local command used for verification;
- sample input/output when changing export format;
- no secrets or generated auth tokens.
