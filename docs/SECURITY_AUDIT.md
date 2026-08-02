# Security Audit

Last reviewed: 2026-08-02

## Summary

WANT2VIEW CLI is designed so a cloned repository cannot silently redirect user credentials to a third-party endpoint.

Token-bearing commands use a credential-safe API base resolver:

- project/workspace config is ignored for credentialed requests;
- credentials are sent only to trusted WANT2VIEW API hosts or localhost development endpoints by default;
- custom credential endpoints require the explicit `--allow-untrusted-api` flag;
- generated `.want2view*/` workspaces are ignored by Git;
- local token config is written with `0600` permissions where supported;
- diagnostics mask token values.

## Checked

- Tracked files were scanned for common secret patterns.
- The npm package contents were reviewed with `npm pack --dry-run`.
- Runtime syntax and demo flow passed with `npm run check` and `npm run demo`.
- Dependency audit passed with `npm audit --omit=dev`.
- A malicious workspace config regression test confirmed that credentialed commands do not use project-level `api_base_url` overrides.

## User Guidance

Do not paste real tokens into GitHub issues, terminal screenshots, shared logs, or committed config files.

Prefer:

```bash
export WANT2VIEW_API_TOKEN="w2v_..."
export WANT2VIEW_PUBLIC_API_KEY="..."
```

or:

```bash
want2view login
```

Generated packs are meant to be inspectable, but they may contain your imported content data. Review exported `.want2view*/exports/` folders before sharing them publicly.
