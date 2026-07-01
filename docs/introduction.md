# Introduction

This is a personal knowledge base for circuit simulation and mathematical physics. Content is written in Markdown, rendered with [mdBook 0.5](https://github.com/rust-lang/mdBook), and published privately via GitHub Pages.

## What you'll find here

| Topic | Focus |
|-------|-------|
| **SPICE / MNA** | Modified nodal analysis, matrix stamping, Newton–Raphson iteration |
| **Geometry & physics** | Minkowski spacetime, curved manifolds, and their role in relativity |

## Rendering features

Inline math like the conductance matrix entry $G_{ij}$ and display equations such as

$$
\mathbf{J} = \mathbf{G}\,\mathbf{v} + \mathbf{i}_s
$$

are rendered at build time with KaTeX. Diagrams use Mermaid:

```mermaid
flowchart LR
    A[Circuit netlist] --> B[Stamp into MNA matrix]
    B --> C[Newton-Raphson solve]
    C --> D[Node voltages & branch currents]
```

## Local development

```bash
pixi run serve   # live preview at http://127.0.0.1:3000
pixi run build   # static site in ./book/
```
