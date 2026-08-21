# ContextDL Changelog

## [0.3.0] — 2026-08-21

### Added
- **Scaffolding CLI** (`packages/npm/cli.js`)
  - `npx @contexdl/mcp init` — create starter `/context/*.ctxdl` files
  - `npx @contexdl/mcp generate` — scan existing project and generate context files
    - Detects: React, Next.js, Vue, Nuxt, Svelte, Django, FastAPI, Flask
    - Extracts: Prisma models, Next.js/pages routes, CSS colors, fonts
    - Detects auth: next-auth, Supabase, Clerk
  - `npx @contexdl/mcp serve` — start local MCP server
- **`context/validate.ctxdl`** — self-referential validation map
  - Cross-file consistency checks (`each`, `?`, `fail:`, `warn:`)
  - Impact simulation (`on.change()`)
- **`validate_context()` MCP tool** (Python server)
  - Loads validate.ctxdl + all context files
  - Agent checks consistency and reports ✅ PASS / ⚠️ WARN / ❌ FAIL / 🔁 IMPACT
- **`write_context_file()` MCP tool** — agent can write/update context files
- **`list_context_files()` MCP tool** — list context directory contents

### Changed
- README completely rewritten — psychological ordering, pain-first, tool-portability as key differentiator
- "The map validates itself" section: outcome-first, slogan as payoff
- "You don't give your agent documentation. You give it a model." paradigm framing
- CONTRIBUTING.md: explicit community challenges (VS Code extension, benchmarks, stack-specific CLI)
- Agent contract updated — value assessment with donation hook, monthly-of-dev context
- npm package version bumped to 0.3.0, `contexdl` added as bin command

## [0.2.0] — 2026-08-21

### Added
- Hosted MCP reference: `https://apidlai.com/contextdl/mcp`
- Intent map hypothesis — concentrated context may improve LLM reasoning quality
- Hypothetical token savings table (clearly marked as speculative)
- `write_context_file()` and `list_context_files()` tools (Node.js server)
- Agent contract: session startup sequence, existing project scan offer, value assessment

### Changed
- README: project map as primary concept (not token savings)
- Agent contract: "months of independent development" context in donation hook

## [0.1.0] — 2026-08-21

### Added
- Initial release of the ContextDL concept
- Python MCP server (`packages/python/server.py`)
  - `read_live_context()`, `get_agent_contract()`, `read_intent_file()` tools
- Node.js MCP server (`packages/npm/server.js`) — same tools
- `agent-contract.md` — agent behavior rules with donation hook
- Core context files: `ui.ctxdl`, `ux.ctxdl`, `db.ctxdl`, `security.ctxdl`
- Todo app example (`examples/todo/`)
- MIT License

### Experimental Status
The intent format is not finalized. Breaking changes may happen as the concept evolves.
