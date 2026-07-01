# Personal Knowledge Base

A private personal knowledge base rendered with [mdBook 0.5](https://github.com/rust-lang/mdBook), managed with [Pixi](https://pixi.sh), and published to **private GitHub Pages** on every push to `main`.

## Contents

| Section | Topics |
|---------|--------|
| **SPICE / circuit simulation** | Modified nodal analysis, element stamping |
| **Geometry & physics** | Minkowski spacetime, curved spacetime and GR |

Features:

- LaTeX math (inline `$...$` and display `$$...$$`) via KaTeX in [`theme/head.hbs`](theme/head.hbs)
- [Mermaid](https://mermaid.js.org/) diagrams via [mdbook-mermaid](https://github.com/badboy/mdbook-mermaid)
- Last-updated date and commit link on every page via [mdbook-last-changed](https://github.com/badboy/mdbook-last-changed) (from git history at build time)
- Markdown source lives in [`docs/`](docs/)

## Prerequisites

Install [Pixi](https://pixi.sh/latest/#installation):

```bash
curl -fsSL https://pixi.sh/install.sh | bash
```

## Setup

Install mdBook and preprocessors from conda-forge:

```bash
pixi add mdbook=0.5 mdbook-mermaid
pixi install
pixi run mdbook-mermaid install .
```

These are already declared in [`pixi.toml`](pixi.toml). After cloning, run `pixi install` and then `pixi run mdbook-mermaid install .` once to copy the Mermaid browser assets into the repo root.

The first `pixi run build` also installs `mdbook-last-changed` via Cargo (Rust is included in the Pixi environment).

## Local development

```bash
pixi run build   # static site in ./book/
pixi run serve   # live preview at http://127.0.0.1:3000
pixi run clean   # remove ./book/
```

## Project layout

```
book.toml          # mdBook configuration (source: docs/)
docs/              # Markdown chapters and SUMMARY.md
theme/             # KaTeX head template and last-updated footer styles
pixi.toml          # Pixi dependencies and tasks
pixi.lock          # Locked conda-forge environment
theme/head.hbs     # KaTeX client-side math rendering
.github/workflows/ # GitHub Pages deployment
```

## Private repository & private GitHub Pages

This site is intended to stay **private** — only you (and collaborators you explicitly add) should access it.

### 1. Make the repository private

On GitHub: **Settings → General → Danger Zone → Change repository visibility → Private**.

### 2. Enable GitHub Pages from GitHub Actions

**Settings → Pages → Build and deployment:**

- **Source:** **GitHub Actions**

The workflow [`.github/workflows/pages.yml`](.github/workflows/pages.yml) builds the mdBook site with Pixi and publishes it on every push to `main`. Source files stay in `docs/`; the built site is deployed as a Pages artifact (not committed to the branch).

### 3. Restrict Pages visibility (important)

For a **private** site (not publicly reachable):

**Settings → Pages → Visibility → Private**

> Private Pages visibility requires a [GitHub Pro, Team, or Enterprise](https://docs.github.com/en/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site) plan. Without it, Pages on a private repo may still be publicly accessible — upgrade or use an alternative (e.g. self-hosted behind auth) if that is a concern.

Only users with read access to this repository can view the published site when visibility is set to **Private**.

### 4. First deployment

After merging to `main`:

1. Push triggers the **Deploy mdBook to GitHub Pages** workflow.
2. Under **Actions**, confirm the workflow succeeded.
3. Open the URL shown under **Settings → Pages** or the deployment environment.

## Adding content

1. Add a Markdown file under `docs/`.
2. Link it in [`docs/SUMMARY.md`](docs/SUMMARY.md).
3. Push to `main` — the site rebuilds automatically.

## Configuration

Edit [`book.toml`](book.toml) to change theme, title, or preprocessor options.
