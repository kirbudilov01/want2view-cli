# GitHub Polish Checklist

Use this checklist when preparing a public launch.

## Repository Settings

- Description: `One-command WANT2VIEW connector for Codex, Claude, keyword search, channel audits, and project exports.`
- Website: `https://want2view.com/developers`
- Topics: `ai-agents`, `codex`, `claude`, `cli`, `content-research`, `social-intelligence`, `open-source`, `trend-research`, `ai-context`
- Social preview: upload `assets/github-social-preview.png`

GitHub social preview upload is a UI-only step in repository settings.

## NPM Publish

The package is prepared as `want2view@0.1.0`.

```bash
cd /Users/kirill/Desktop/want2view-cli
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm login
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm publish
```

After publish, update examples from:

```bash
npx github:kirbudilov01/want2view-cli start codex "ugc ads"
```

to:

```bash
npx want2view start codex "ugc ads"
```

## Launch Links

- GitHub: `https://github.com/kirbudilov01/want2view-cli`
- Developers: `https://want2view.com/developers`
- App: `https://app.want2view.com`
- API Access: `https://app.want2view.com/api-access`
