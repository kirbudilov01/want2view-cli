# vidIQ-Style UX Audit

Reviewed: 2026-08-04

## What vidIQ Does Well

vidIQ's Claude connector page makes the first action obvious:

- clear promise: connect YouTube data to Claude;
- clear speed claim: setup in 60 seconds;
- supported tools are visible early;
- one copyable server URL / setup action;
- prompt library directly below setup;
- tool list and credit model are explicit;
- security FAQ answers read-only access, quota, and data sharing.

## What Was Weak In WANT2VIEW CLI

The repository had strong substance, but the first screen asked users to understand too much:

- `search` then `export` felt like two steps before value;
- Codex and Claude were present, but not as simple tabs/paths;
- example outputs were useful but looked like raw generated folders;
- launch docs existed, but the README did not lead with one command;
- visual assets said "research" more than "one-command connector."

## Changes Made

- Added `want2view start codex|claude ...` as the primary one-command path.
- Reworked the README first screen around "Setup In 60 Seconds."
- Added a before/after table: guessing prompt vs evidence pack.
- Added a prompt library near the top.
- Updated visual assets to say "one command."
- Simplified example outputs into stable `pack/` folders.
- Updated launch posts and npm docs to lead with `start`.
- Rebuilt `docs/index.html` as a focused developer landing page.

## Product Boundary

WANT2VIEW CLI is not a separate product. It is the terminal and agent entrypoint into WANT2VIEW:

- free local packs for discovery;
- imports and public samples for immediate utility;
- API Access for private projects;
- WANT2VIEW Cloud for real social connectors, scheduled refreshes, deeper catalog access, team workspaces, and custom research.

## Remaining Manual Steps

- Publish npm so the command becomes `npx want2view codex "ai video ads"`.
- Upload `assets/github-social-preview.png` to GitHub repository settings.
- Add a short demo video/GIF that shows terminal -> pack -> Codex/Claude brief.
