# API Access Flow

WANT2VIEW has two auth surfaces for CLI users.

## Developer CLI Token

Use this for managed account research runs:

```bash
npx want2view login
```

The CLI token is stored locally or passed through:

```bash
export WANT2VIEW_API_TOKEN="w2v_your_token"
```

Then:

```bash
npx want2view account research "ai video ads" \
  --sources youtube,tiktok,telegram --limit 30 --wait 180
```

For broad goals, `account research` creates a short query plan, waits for the underlying runs, exports them, and merges one pack for Codex/Claude. The lower-level `cloud research/status/export` commands remain available for exact keywords.

## Public API Key

Use this for your private WANT2VIEW projects and reports:

```bash
export WANT2VIEW_PUBLIC_API_KEY="your_dashboard_api_key"
npx want2view projects list
npx want2view project export <project_id> --for codex
```

## Visual Guide

![API access flow](../assets/api-access-flow.svg)

Get a key from:

- [app.want2view.com/api-access](https://app.want2view.com/api-access)
- [app.want2view.com](https://app.want2view.com)
