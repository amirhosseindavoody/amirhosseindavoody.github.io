# Personal Knowledge Base

A private personal knowledge base rendered with [mdBook 0.5](https://github.com/rust-lang/mdBook), managed with [Pixi](https://pixi.sh), and published to **private GitHub Pages** on every push to `master` (or `main`).

## Contents

| Section | Topics |
|---------|--------|
| **SPICE / circuit simulation** | Modified nodal analysis, element stamping |
| **Geometry & physics** | Minkowski spacetime, curved spacetime and GR |

Features:

- LaTeX math (inline `$...$` and display `$$...$$`) via [mdbook-katex](https://github.com/lzanini/mdbook-katex)
- [Mermaid](https://mermaid.js.org/) diagrams via [mdbook-mermaid](https://github.com/badboy/mdbook-mermaid)
- Markdown source lives in [`docs/`](docs/)

## Prerequisites

Install [Pixi](https://pixi.sh/latest/#installation):

```bash
curl -fsSL https://pixi.sh/install.sh | bash
```

## Local development

```bash
# Install mdBook + preprocessors (first run only) and build
pixi run build

# Live preview at http://127.0.0.1:3000
pixi run serve

# Remove build output
pixi run clean
```

## Project layout

```
book.toml          # mdBook configuration (source: docs/)
docs/              # Markdown chapters and SUMMARY.md
pixi.toml          # Pixi tasks and Rust toolchain for local builds
.github/workflows/ # GitHub Pages deployment
```

## Private repository & private GitHub Pages

This site is intended to stay **private** — only you (and collaborators you explicitly add) should access it.

### 1. Make the repository private

On GitHub: **Settings → General → Danger Zone → Change repository visibility → Private**.

### 2. Enable GitHub Pages from Actions

**Settings → Pages → Build and deployment:**

- **Source:** GitHub Actions

The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds mdBook and deploys on every push to `master` or `main`.

### 3. Restrict Pages visibility (important)

For a **private** site (not publicly reachable):

**Settings → Pages → Visibility → Private**

> Private Pages visibility requires a [GitHub Pro, Team, or Enterprise](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site) plan. Without it, Pages on a private repo may still be publicly accessible — upgrade or use an alternative (e.g. self-hosted behind auth) if that is a concern.

Only users with read access to this repository can view the published site when visibility is set to **Private**.

### 4. First deployment

After merging to `master`:

1. Push triggers the **Deploy mdBook to GitHub Pages** workflow.
2. Under **Actions**, confirm the workflow succeeded.
3. Open the URL shown under **Settings → Pages** or the deployment environment.

## Adding content

1. Add a Markdown file under `docs/`.
2. Link it in [`docs/SUMMARY.md`](docs/SUMMARY.md).
3. Push to `master` — the site rebuilds automatically.

## Configuration

Edit [`book.toml`](book.toml) to change theme, title, or preprocessor options. Update the placeholder `git-repository-url` and `edit-url-template` fields with your actual GitHub repository path.
