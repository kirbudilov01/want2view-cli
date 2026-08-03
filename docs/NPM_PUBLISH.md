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

## After Publish

Update launch copy from:

```bash
npx github:kirbudilov01/want2view-cli start codex "ugc ads"
```

to:

```bash
npx want2view start codex "ugc ads"
```
