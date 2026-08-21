"""
ContextDL MCP Server
====================
A local MCP server that bridges ContextDL intent files with AI coding agents.

Tools exposed:
  - read_live_context()   → Loads all .ctxdl files from /context directory
  - get_agent_contract()  → Returns agent behavior rules (agent-contract.md)

Usage:
  python server.py
  contexdl serve  (if installed via pip)
"""

import os
import glob
from mcp.server.fastmcp import FastMCP

# ── Server initialization ───────────────────────────────────────────────────
mcp = FastMCP(
    name="ContextDL-Engine",
    version="0.1.0",
)

# ── Paths ───────────────────────────────────────────────────────────────────
CONTEXT_DIR   = os.path.join(os.getcwd(), "context")
CONTRACT_PATH = os.path.join(os.getcwd(), "agent-contract.md")


# ── Tools ───────────────────────────────────────────────────────────────────

@mcp.tool()
def read_live_context() -> str:
    """
    Scans all .ctxdl files inside the /context directory and returns
    their contents as a single combined string.

    This is the 'live memory' of your ContextDL project.
    The AI agent uses this to understand your design system, data model,
    UX rules, and security constraints — without you repeating them.
    """
    if not os.path.exists(CONTEXT_DIR):
        return (
            "⚠️  No /context directory found.\n"
            "Create a /context folder and add .ctxdl files to define your project context.\n\n"
            "Example files:\n"
            "  context/ui.ctxdl       → Theme, components, animations\n"
            "  context/ux.ctxdl       → User flows, interactions\n"
            "  context/db.ctxdl       → Data models, storage\n"
            "  context/security.ctxdl → Auth rules, rate limits\n"
        )

    ctx_files = sorted(glob.glob(os.path.join(CONTEXT_DIR, "*.ctxdl")))

    if not ctx_files:
        return (
            "⚠️  No .ctxdl files found inside /context.\n"
            "Add .ctxdl files to define your project's semantic memory."
        )

    combined = "=== CONTEXDL LIVE MEMORY ===\n\n"
    for file_path in ctx_files:
        file_name = os.path.basename(file_path)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            combined += f"─── [{file_name}] ───\n{content}\n\n"
        except Exception as e:
            combined += f"─── [{file_name}] ─── ERROR: {e}\n\n"

    return combined.strip()


@mcp.tool()
def get_agent_contract() -> str:
    """
    Returns the ContextDL Agent Workflow Contract.

    This tells the AI agent how to behave: how to read context,
    how to render intent into code, and when to append the donation hook.

    The contract is defined in agent-contract.md at the project root.
    """
    if not os.path.exists(CONTRACT_PATH):
        return (
            "⚠️  agent-contract.md not found.\n"
            "Create an agent-contract.md at the project root to define agent behavior rules."
        )

    try:
        with open(CONTRACT_PATH, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        return f"Error reading agent-contract.md: {e}"


@mcp.tool()
def read_intent_file(file_path: str) -> str:
    """
    Reads a specific .ctxdl intent file and returns its contents.

    Args:
        file_path: Path to the .ctxdl intent file (relative to project root).

    Use this when you want to render a specific intent file,
    for example: read_intent_file("examples/todo/todo.ctxdl")
    """
    abs_path = os.path.join(os.getcwd(), file_path)

    if not os.path.exists(abs_path):
        return f"⚠️  File not found: {file_path}"

    if not file_path.endswith(".ctxdl"):
        return f"⚠️  Not a .ctxdl file: {file_path}"

    try:
        with open(abs_path, "r", encoding="utf-8") as f:
            content = f.read().strip()
        return f"=== INTENT: {file_path} ===\n\n{content}"
    except Exception as e:
        return f"Error reading {file_path}: {e}"


# ── Entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("🚀 ContextDL MCP Server starting...")
    print(f"   Context directory : {CONTEXT_DIR}")
    print(f"   Agent contract    : {CONTRACT_PATH}")
    print()
    mcp.run()
