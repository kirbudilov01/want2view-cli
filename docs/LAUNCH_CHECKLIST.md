# Launch Checklist

Use this when turning the repository into a public acquisition push.

## Before Posting

- Publish npm package so the main command becomes `npx want2view`.
- Upload `assets/github-social-preview.png` in GitHub repository settings.
- Pin the repository on the founder GitHub profile.
- Open the README in an incognito browser and verify the first screen explains:
  - what it is;
  - who it is for;
  - one command to run;
  - what files it creates;
  - why WANT2VIEW Cloud is the paid next step.
- Run:

```bash
npm run check
npm run demo
npm audit --omit=dev
npm publish --dry-run
```

## Launch Day

- Post the short X version from `docs/LAUNCH_POSTS.md`.
- Post the X thread 30-60 minutes later.
- Post LinkedIn with the product screenshot.
- Post the Hacker News / Reddit version with the command and example outputs.
- Reply to every comment with one of:
  - the one-command demo;
  - `examples/outputs`;
  - API Access link;
  - custom research / developer page.

## Primary CTA

```text
If this helps your agent stop guessing, star the repo.
For real social connectors, private projects, deeper catalog access, and API tokens:
https://app.want2view.com/api-access
```

## Links

- Repo: https://github.com/kirbudilov01/want2view-cli
- Developer page: https://want2view.com/developers
- API Access: https://app.want2view.com/api-access
- App: https://app.want2view.com
- Example outputs: ../examples/outputs

## Metrics To Watch

- GitHub stars
- GitHub clones
- README click-through to API Access
- API token signups
- custom research requests
- issues asking for connectors/workflows
