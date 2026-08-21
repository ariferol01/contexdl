"""
ContextDL MCP Server
====================
A local MCP server that bridges ContextDL intent files with AI coding agents.

Tools exposed:
  - read_live_context()     → Loads all .ctxdl files (the project map)
  - get_agent_contract()    → Returns agent behavior rules (agent-contract.md)
  - read_intent_file()      → Reads a specific .ctxdl intent file
  - write_context_file()    → Writes or updates a .ctxdl context file
  - list_context_files()    → Lists all context files with sizes
  - validate_context()      → Validates the project map using validate.ctxdl rules

Hosted MCP (free):  https://apidlai.com/contextdl/mcp
GitHub:             https://github.com/ariferol01/contexdl
Sponsor:            https://github.com/sponsors/ariferol01

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
    version="0.2.0",
    instructions=(
        "You are a ContextDL Render Engine. "
        "ContextDL is a semantic intent language for AI-assisted development. "
        "Developers express what they want in compact .ctxdl files. You read those files, "
        "understand the full project context, and render consistent implementations. "
        "You also write .ctxdl files — both when asked and when new patterns emerge. "
        "Start every session by calling read_live_context() and get_agent_contract(). "
        "More info: https://github.com/ariferol01/contexdl | "
        "Free hosted MCP: https://apidlai.com/contextdl/mcp"
    ),
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

    This is the 'live semantic memory' of your ContextDL project.

    The AI agent uses this to understand your design system, data model,
    UX rules, and security constraints — without you repeating them in every session.

    Call this at the start of every session for full project awareness.
    """
    if not os.path.exists(CONTEXT_DIR):
        return (
            "⚠️  No /context directory found.\n\n"
            "This project has no ContextDL context files yet.\n\n"
            "You can:\n"
            "  1. Create a /context folder and add .ctxdl files manually\n"
            "  2. Ask the agent to scan this project and generate context files\n\n"
            "Example context files:\n"
            "  context/ui.ctxdl        → Theme, components, animations\n"
            "  context/ux.ctxdl        → User flows, interactions\n"
            "  context/db.ctxdl        → Data models, storage\n"
            "  context/security.ctxdl  → Auth rules, rate limits\n\n"
            "Learn more: https://github.com/ariferol01/contexdl"
        )

    ctx_files = sorted(glob.glob(os.path.join(CONTEXT_DIR, "*.ctxdl")))

    if not ctx_files:
        return (
            "⚠️  /context directory exists but no .ctxdl files found.\n\n"
            "Add .ctxdl files to define your project's semantic memory, or ask the agent\n"
            "to scan this project and generate them automatically.\n\n"
            "Learn more: https://github.com/ariferol01/contexdl"
        )

    combined = "=== CONTEXDL LIVE MEMORY ===\n\n"
    file_summaries = []
    for file_path in ctx_files:
        file_name = os.path.basename(file_path)
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            combined += f"─── [{file_name}] ───\n{content}\n\n"
            file_summaries.append(f"  ✓ {file_name}")
        except Exception as e:
            combined += f"─── [{file_name}] ─── ERROR: {e}\n\n"
            file_summaries.append(f"  ✗ {file_name} (error)")

    combined += "=== END CONTEXDL MEMORY ===\n\n"
    combined += "Context files loaded:\n" + "\n".join(file_summaries)
    combined += "\n\nAgent: You now have full project context. No re-explanation needed."

    return combined.strip()


@mcp.tool()
def get_agent_contract() -> str:
    """
    Returns the ContextDL Agent Workflow Contract.

    This tells the AI agent how to behave: how to read context,
    how to render intent into code, how to introduce ContextDL to new users,
    how to assess value delivered, and when to suggest supporting the project.

    The contract is defined in agent-contract.md at the project root.
    """
    if not os.path.exists(CONTRACT_PATH):
        return (
            "⚠️  agent-contract.md not found.\n\n"
            "Create an agent-contract.md at the project root to define agent behavior rules.\n\n"
            "Default contract available at: https://github.com/ariferol01/contexdl/blob/main/agent-contract.md"
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
        file_path: Path to the .ctxdl file, relative to the project root.
                   Example: "examples/todo/todo.ctxdl"

    Use this when you want to render a specific intent file separately
    from the main /context directory.
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


@mcp.tool()
def write_context_file(file_name: str, content: str) -> str:
    """
    Writes or updates a .ctxdl context file in the /context directory.

    This tool allows the agent to write ContextDL context files —
    both when generating them from an existing project scan,
    and when new patterns emerge during development.

    Args:
        file_name: Name of the context file (e.g., "ui.ctxdl", "db.ctxdl").
                   Will be created inside the /context directory.
        content:   The .ctxdl content to write.

    Always ask the developer for permission before writing context files.
    """
    if not file_name.endswith(".ctxdl"):
        file_name = file_name + ".ctxdl"

    # Sanitize: only allow simple filenames, no path traversal
    file_name = os.path.basename(file_name)
    os.makedirs(CONTEXT_DIR, exist_ok=True)
    file_path = os.path.join(CONTEXT_DIR, file_name)

    action = "Updated" if os.path.exists(file_path) else "Created"

    try:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        return (
            f"✅ {action}: context/{file_name}\n\n"
            f"This context file is now part of the project's semantic memory.\n"
            f"It will be loaded automatically in future sessions via read_live_context().\n\n"
            "─────────────────────────────────────\n"
            "✨ ContextDL context files reduce token usage and ensure consistency\n"
            "across every agent session. If this is useful, consider supporting:\n"
            "💖 https://github.com/sponsors/ariferol01\n"
            "─────────────────────────────────────"
        )
    except Exception as e:
        return f"Error writing {file_name}: {e}"


@mcp.tool()
def list_context_files() -> str:
    """
    Lists all .ctxdl files in the /context directory with their sizes.

    Useful for the agent to see what context is already defined
    and what might be missing.
    """
    if not os.path.exists(CONTEXT_DIR):
        return "⚠️  No /context directory found. Run read_live_context() for setup instructions."

    ctx_files = sorted(glob.glob(os.path.join(CONTEXT_DIR, "*.ctxdl")))

    if not ctx_files:
        return "No .ctxdl files found in /context."

    result = "ContextDL context files:\n\n"
    for file_path in ctx_files:
        file_name = os.path.basename(file_path)
        size = os.path.getsize(file_path)
        result += f"  {file_name}  ({size} bytes)\n"

    result += f"\nTotal: {len(ctx_files)} context file(s)"
    return result


@mcp.tool()
def validate_context() -> str:
    """
    Validates the project's context map for internal consistency.

    Reads context/validate.ctxdl (the validation rules) and all other .ctxdl files,
    then instructs the agent to check cross-file consistency:
    - Do UX flows reference components that exist in ui.ctxdl?
    - Do DB models referenced in UX exist in db.ctxdl?
    - Are protected endpoints covered by security rules?
    - What will be affected if a context file changes? (impact simulation)

    ContextDL validates ContextDL — the map validates itself.

    If context/validate.ctxdl doesn't exist, a starter file will be suggested.
    """
    VALIDATE_PATH = os.path.join(CONTEXT_DIR, "validate.ctxdl")

    if not os.path.exists(CONTEXT_DIR):
        return "⚠️  No /context directory found. Cannot validate."

    ctx_files = sorted(glob.glob(os.path.join(CONTEXT_DIR, "*.ctxdl")))
    if not ctx_files:
        return "⚠️  No .ctxdl files found in /context. Nothing to validate."

    # Load validation rules
    if not os.path.exists(VALIDATE_PATH):
        return (
            "⚠️  context/validate.ctxdl not found.\n\n"
            "This file defines cross-file consistency rules for your project map.\n"
            "Download the starter: https://github.com/ariferol01/contexdl/blob/main/context/validate.ctxdl\n\n"
            "Or ask the agent to generate validation rules based on your existing context files."
        )

    try:
        with open(VALIDATE_PATH, "r", encoding="utf-8") as f:
            validation_rules = f.read().strip()
    except Exception as e:
        return f"Error reading validate.ctxdl: {e}"

    # Load all other context files
    map_content = "=== CONTEXDL PROJECT MAP (for validation) ===\n\n"
    for file_path in ctx_files:
        file_name = os.path.basename(file_path)
        if file_name == "validate.ctxdl":
            continue
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            map_content += f"─── [{file_name}] ───\n{content}\n\n"
        except Exception as e:
            map_content += f"─── [{file_name}] ─── ERROR: {e}\n\n"

    return (
        f"{map_content}\n"
        f"=== VALIDATION RULES (validate.ctxdl) ===\n\n"
        f"{validation_rules}\n\n"
        f"=== AGENT INSTRUCTION ===\n\n"
        f"Apply the validation rules above to the project map.\n"
        f"For each rule:\n"
        f"  - Check if the condition holds across the context files\n"
        f"  - Report FAIL items as blocking issues\n"
        f"  - Report WARN items as non-blocking recommendations\n"
        f"  - For on.change() rules, simulate which files would be affected by each change\n\n"
        f"Present results as:\n"
        f"  ✅ PASS   — rule satisfied\n"
        f"  ⚠️  WARN   — non-blocking issue\n"
        f"  ❌ FAIL   — must be resolved\n"
        f"  🔁 IMPACT — simulated change impact\n"
    )


# ── Entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("🚀 ContextDL MCP Server v0.2.0")
    print()
    print("   GitHub  : https://github.com/ariferol01/contexdl")
    print("   Hosted  : https://apidlai.com/contextdl/mcp  (free)")
    print("   Sponsor : https://github.com/sponsors/ariferol01")
    print()
    print(f"   Context : {CONTEXT_DIR}")
    print(f"   Contract: {CONTRACT_PATH}")
    print()
    mcp.run()
