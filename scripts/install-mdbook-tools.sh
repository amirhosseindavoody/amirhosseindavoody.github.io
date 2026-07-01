#!/usr/bin/env bash
# Install mdBook 0.5 and compatible preprocessors into ~/.local/bin (or $BINDIR).
set -euo pipefail

MDBOOK_VERSION="${MDBOOK_VERSION:-0.5.1}"
KATEX_VERSION="${KATEX_VERSION:-0.10.0-alpha}"
MERMAID_VERSION="${MERMAID_VERSION:-0.17.0}"
BINDIR="${BINDIR:-$HOME/.local/bin}"

mkdir -p "$BINDIR"

install_mdbook() {
  local arch="$1"
  local url="https://github.com/rust-lang/mdBook/releases/download/v${MDBOOK_VERSION}/mdbook-v${MDBOOK_VERSION}-${arch}.tar.gz"
  echo "Installing mdbook ${MDBOOK_VERSION} (${arch})..."
  curl -fsSL "$url" | tar xz -C "$BINDIR"
}

install_katex() {
  local arch="$1"
  local url="https://github.com/lzanini/mdbook-katex/releases/download/${KATEX_VERSION}-binaries/mdbook-katex-v${KATEX_VERSION}-${arch}.tar.gz"
  echo "Installing mdbook-katex ${KATEX_VERSION} (${arch})..."
  curl -fsSL "$url" | tar xz -C "$BINDIR"
}

install_mermaid() {
  local arch="$1"
  local url="https://github.com/badboy/mdbook-mermaid/releases/download/v${MERMAID_VERSION}/mdbook-mermaid-v${MERMAID_VERSION}-${arch}.tar.gz"
  echo "Installing mdbook-mermaid ${MERMAID_VERSION} (${arch})..."
  curl -fsSL "$url" | tar xz -C "$BINDIR"
}

case "$(uname -s)-$(uname -m)" in
  Linux-x86_64)
    ARCH="x86_64-unknown-linux-gnu"
    ;;
  Linux-aarch64|Linux-arm64)
    ARCH="aarch64-unknown-linux-gnu"
    ;;
  Darwin-x86_64)
    ARCH="x86_64-apple-darwin"
    ;;
  Darwin-arm64)
    ARCH="aarch64-apple-darwin"
    ;;
  *)
    echo "Unsupported platform: $(uname -s)-$(uname -m)" >&2
    exit 1
    ;;
esac

command -v mdbook >/dev/null 2>&1 || install_mdbook "$ARCH"
command -v mdbook-katex >/dev/null 2>&1 || install_katex "$ARCH"
command -v mdbook-mermaid >/dev/null 2>&1 || install_mermaid "$ARCH"

echo "Installed tools in ${BINDIR}:"
mdbook --version
mdbook-katex --version
mdbook-mermaid --version
