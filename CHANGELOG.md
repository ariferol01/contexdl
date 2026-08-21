# ContextDL Changelog

## [0.1.0] — 2026-08-21

### Added
- Initial release of the ContextDL concept
- Python MCP server (`packages/python/server.py`)
  - `read_live_context()` tool
  - `get_agent_contract()` tool
  - `read_intent_file()` tool
- Node.js MCP server (`packages/npm/server.js`)
  - Same tools, JavaScript implementation
- `agent-contract.md` — agent behavior rules with donation hook
- Core context files (`context/*.ctxdl`)
  - `ui.ctxdl` — design system definition
  - `ux.ctxdl` — user experience rules
  - `db.ctxdl` — data models and storage
  - `security.ctxdl` — security constraints
- Todo app example (`examples/todo/`)
  - Complete intent definition in `todo.ctxdl`
  - Example context files
- README with intent vs prompt comparison
- MIT License

### Experimental Status
This is version 0.1.0. The intent format is not finalized.
Breaking changes may happen as the concept evolves.
