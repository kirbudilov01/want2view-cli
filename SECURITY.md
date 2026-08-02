# Security

Please do not open public issues for secrets, auth bypasses, private API exposure, or provider-token leakage.

Report security concerns privately through:

- GitHub security advisory for this repository, if available.
- WANT2VIEW account support from [app.want2view.com](https://app.want2view.com).

## Secrets Policy

Never commit:

- `WANT2VIEW_API_TOKEN`
- `WANT2VIEW_PUBLIC_API_KEY`
- provider API keys
- exported cookies or browser sessions
- generated `.want2view/` workspaces

The CLI masks tokens in diagnostics and stores local token config with `0600` permissions where supported.
