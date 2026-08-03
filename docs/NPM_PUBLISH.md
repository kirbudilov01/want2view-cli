# NPM Publish Checklist

The package is ready for `want2view@0.1.0`.

## Verify

```bash
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm run check
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm run demo
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm audit --omit=dev
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm publish --dry-run
```

## Publish

```bash
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm login
PATH=/Users/kirill/.nvm/versions/node/v24.14.1/bin:$PATH npm publish
```

## Published

The package is live on npm:

```bash
npx want2view codex "ugc ads"
```
