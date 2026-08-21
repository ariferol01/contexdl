<div align="center">

# ContextDL

### Don't write prompts, express intent. Keep your project's context alive. Model everything.

<sub>an open-source project by <a href="https://apidlai.com">apidl</a></sub>

<!-- GIF PLACEHOLDER: Replace with your demo GIF -->
<!-- ![ContextDL Demo](./assets/demo.gif) -->

[![apidl](https://img.shields.io/badge/apidl-apidlai.com-6366f1?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAyTDIgN2wxMCA1IDEwLTV6TTIgMTdsOSA1IDktNVY3bC05IDV6Ii8+PC9zdmc+)](https://apidlai.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://python.org)
[![npm](https://img.shields.io/badge/npm-%40contexdl%2Fmcp-red.svg)](https://npmjs.com/package/@contexdl/mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-purple.svg)](https://modelcontextprotocol.io)
[![Experimental](https://img.shields.io/badge/status-experimental-orange.svg)]()
[![☕ Sponsor](https://img.shields.io/badge/☕%20Sponsor-Support%20ContextDL-ff813f?style=flat)](https://github.com/sponsors/ariferol01)

</div>

---

<div align="center">
  <b><a href="#">README</a></b>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
  <b><a href="#superpowers-unlocked">SUPERPOWERS</a></b>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
  <b><a href="./CONTRIBUTING.md">CONTRIBUTING</a></b>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
  <b><a href="./LICENSE">LICENSE</a></b>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
  <b><a href="#connect-your-ai-agent">MCP</a></b>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
  <b><a href="#%E2%98%95-support-the-experiment">SUPPORT</a></b>&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;
  <b><a href="#the-map-validates-itself">WTF?</a></b>
</div>

---

## You've felt this pain

You switch AI tools. Your context is gone.

A teammate opens the same project. They start from scratch.

You start a new session. You explain the same design system. Again.

The AI generates a component with the wrong font. Again.

You write a 300-word prompt. The AI hallucinates something inconsistent with your existing code. Again.

**None of this is the AI's fault. The AI never had a map.**

---

## Superpowers Unlocked

Because your project is now a structured, living semantic map, the impossible becomes routine:

- **Massive Project Scanning:** Because the architecture is mapped, an AI can instantly comprehend a giant legacy codebase without missing details.
- **Flawless Refactoring:** Because dependencies are strictly defined, you can revise huge codebases without UI inconsistencies or logical hallucinations.
- **Multi-Agent Live Sync:** Because context is Git-versioned code, two "vibe coders" can work simultaneously on GitHub, and their AI agents will stay perfectly in sync.
- **Agent Portability:** Because the map is tool-agnostic, you can seamlessly carry your project's brain from Cursor to Copilot, or Claude to ChatGPT.
- **Impact Simulation:** Because the map reasons about itself, you can simulate the exact blast radius of adding or removing a feature *before* writing a single line of code.
- **Auto-Documentation:** Because UI, DB, and UX are structured, generating perfectly accurate, up-to-date technical documentation takes one click.
- **Architectural Stress Testing:** Because the AI sees the entire system globally, you can extract high-level optimization suggestions and stress-test scenarios instantly.

---

## What ContextDL does

ContextDL gives your project a **living semantic map** — a set of compact, human-readable `.ctxdl` files that live inside your repository and describe what your project *is*:

```
📁 context/
├── ui.ctxdl        ← design system, theme, components
├── ux.ctxdl        ← user flows, interactions, accessibility
├── db.ctxdl        ← data models, relations, storage
├── security.ctxdl  ← auth rules, rate limits, constraints
└── payment.ctxdl   ← payment flows, states, error handling
```

**What does it look like?** It's just structured semantics. For example, your `ui.ctxdl` might look like this:

```yaml
ui:
  colors:
    primary: "#6366f1"
    danger: "#ef4444"
  components:
    Button: 
      variants: [primary, outline, ghost]
      border-radius: 8px
```

An AI agent reads these files at the start of every session. In one pass. With minimal tokens. And it knows everything.

No re-explaining. No drift. No wrong font.

---

## Tool-agnostic. Forever.

This is the part that makes it different from everything else.

Cursor has `.cursorrules`. Claude has project knowledge. GitHub Copilot has workspace indexing.

**None of them travel with you.**

Switch tools? Context gone. New team member uses a different editor? Starts from scratch. Use two AI assistants at the same time? Inconsistent.

ContextDL context lives in your **git repository**.

It travels with every clone, every branch, every team member, every tool — as long as it supports MCP.

```
git clone your-project → context is there
New developer joins    → context is there
Switch from Cursor to Claude Desktop → context is there
Run two agents in parallel → same context, both
```

The map belongs to the project. Not to the tool.

---

## Write it in whatever language you already think in

ContextDL has no official syntax. No grammar to learn.

You write in the style that feels natural to *you* — whatever language you already know.

**PHP developer:**
```php
Payment::Completed::Fail::Retry(3)::NotifySupport;
```

**JavaScript / Python developer:**
```text
payment.completed.fail.retry(3).notify.support
```

**Conditional / flow thinking:**
```text
todo.add:
    if input.empty -> alert.error("Task cannot be empty")
    else -> db.save -> ui.list.prepend -> counter.update
```

**Plain English:**
```text
when a user cancels an order, release reserved inventory and notify the warehouse
```

If you know `if`, `else`, `each` — you already know ContextDL.

Everything else is just project design thinking. And that's yours.

> *"If you've written code for years, you already know ContextDL. You just didn't have a name for it."*

---

## Complete workflow

### Step 1 — Create the map (or let the agent generate it)

```
your-project/
└── context/
    ├── ui.ctxdl
    ├── ux.ctxdl
    ├── db.ctxdl
    ├── security.ctxdl
    └── validate.ctxdl   ← optional: the map that validates the map
```

### Step 2 — Connect the MCP server

### Step 3 — Agent loads everything in one call

```
read_live_context()  → full project map, one pass
get_agent_contract() → behavior rules
validate_context()   → consistency check + impact simulation
```

### Step 4 — Express intent

```text
user.signup:
    validate: email.format, password.strength
    if valid -> db.create -> email.verify -> redirect(/dashboard)
    if invalid -> alert.field-errors
```

### Step 5 — Consistent implementation, every time

Design system followed. Data model respected. UX rules applied. Automatically.

### Step 6 — Map grows with the project

New patterns → agent updates the relevant `.ctxdl` file → map stays current.

---

## Connect your AI agent

### 🌐 Option 1 — Hosted MCP (recommended, free)

No installation required.

**`https://apidlai.com/contextdl-mcp`**

Claude Desktop (`claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "contexdl": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://apidlai.com/contextdl-mcp"]
    }
  }
}
```

---

### 🐍 Option 2 — Local Python

```bash
pip install contexdl
contexdl serve
```

Or from source:
```bash
git clone https://github.com/ariferol01/contexdl.git
cd contexdl
pip install -r requirements.txt
python packages/python/server.py
```

Claude Desktop config:
```json
{
  "mcpServers": {
    "contexdl": {
      "command": "python",
      "args": ["/path/to/contexdl/packages/python/server.py"]
    }
  }
}
```

---

### 📦 Option 3 — Local npm

```bash
npx @contexdl/mcp
```

Cursor / Windsurf / VS Code:
```json
{
  "mcp": {
    "servers": {
      "contexdl": {
        "command": "npx",
        "args": ["@contexdl/mcp"]
      }
    }
  }
}
```

---

## What the map unlocks

### ⚡ Instant project understanding — for any agent, any tool

Hand any MCP-compatible AI agent your `/context` folder. Without a single explanation, it understands:
- Your entire design system
- Your data architecture
- How users flow through the application
- What your security constraints are

Switch models, switch tools, onboard a new agent — the map is always there.

### 📚 Automatic documentation — from the map you already have

```text
"Generate complete technical documentation for this project based on the context files."
```

Accurate. Consistent. No writing from scratch.

### 🤖 Chatbot and support integration — ship it with the product

After you go live, give your `.ctxdl` files to a customer-facing chatbot:

```text
"Here are the context files for this product. Answer user questions about features and behavior."
```

The chatbot instantly knows your entire product — because the map describes exactly what it does. No manual FAQ. No training on outdated docs. No hallucinations about features that don't exist.

### 👥 Zero-friction team onboarding

New developer joins:

```text
"Read /context. Ask me what's unclear."
```

They have the complete mental model of the project in minutes. Not weeks.

### 🔍 Legacy codebase archaeology

Large, undocumented project? Let the agent scan it:

```text
"Analyze this codebase and generate context files that describe the design system,
data models, user flows, and business rules."
```

Compact, machine-readable understanding of code that may have no documentation at all.

### 🔁 Impact simulation — before you write a line

Because the agent has the full project map, it can simulate:

```text
"If I change the payment model to support multi-currency,
what else in the project would be affected?"
```

The agent scans the map and reports: *"This touches ux.ctxdl (checkout flow), security.ctxdl (currency validation), and db.ctxdl (transaction schema)."*

Before you code. Before you break anything.

---

## The map validates itself

> *I discovered something fundamental: Context is a data type.*
> 
> *If context is a data type, we can encode and decode it using context itself. When we reduce context into a semantic language, it stops being abstract noise and becomes a structured entity. And because it is structured, we unlock the ultimate capability:* **We can use context to validate context.**

This philosophical foundation drives the three core pillars of ContextDL:

1. **Model Everything:** Not just code. UI, workflows, logical processes, future plans, and behaviors—all phenomena can be coded and modeled with ContextDL.
2. **Self-Validation:** Because context is structured, the map can reason about and validate itself.
3. **Live Sync Across Agents:** Context is structured ContextDL code. Through Git, it becomes a live, shared semantic brain across multiple developers and AI agents.

---

### 🧩 1. Model Everything

You don't just generate boilerplate. You model the phenomena of your project.

ContextDL allows you to map out your entire digital ecosystem. From the visual aesthetics (`ui.ctxdl`), to user journeys (`ux.ctxdl`), data structures (`db.ctxdl`), and even future roadmaps or agent behaviors. 

Everything is encoded in a lightweight, machine-readable format. If it exists in your project's universe, you can model it with ContextDL.

---

### 🛡️ 2. The Map Validates Itself

Your context files depend on each other.

If UX flows reference a component, that component should exist in `ui.ctxdl`. If a DB model changes, the UX flows that read it may need to be updated. If an endpoint is marked protected, a security rule should cover it.

ContextDL can check these dependencies — before your agent acts on them.

`validate.ctxdl` defines the rules. Written in the same syntax as everything else:

```text
# If UX references a component, it must exist in ui.ctxdl
each ux.flows.uses ->
    ? exists(ui.components[this])
    fail: "UX references '{this}' not defined in ui.ctxdl"

# Protected endpoints must have security rules
each db.endpoints.protected ->
    ? exists(security.rules[this])
    warn: "'{this}' is protected but no rule found in security.ctxdl"

# Before a DB model changes — what else would be affected?
on.change(db.models) ->
    check: ux.data.reads
    report: "DB model change — review UX flows and security rules"
```

The agent reads the full map, applies these rules, and reports:

```
✅ PASS   — ui.components covers all ux.flows references
⚠️  WARN   — /api/orders is protected, security rule missing
🔁 IMPACT — changing db.models affects: ux.ctxdl (data.reads), security.ctxdl (scoped rules)
```

This is not just validation. This is the map reasoning about itself.

> *context → validation → dependency awareness → impact analysis*

**ContextDL validates ContextDL. The map validates itself.**

---

### 🌍 3. Live Sync Across Agents

ContextDL is written in structured `.ctxdl` code files. Because they live directly in your repository, they inherit the most powerful version control system on the planet: Git.

When you use ContextDL, your context is not locked inside Cursor, Claude, or Copilot. 

**Push, Pull, and Live Sync:**
- You push your `.ctxdl` files to Git. Your teammate pulls them. Their AI agent instantly knows exactly what your AI agent knew.
- Running two agents in parallel? Both read the same `.ctxdl` map. One updates a pattern and pushes it; the other pulls it and is instantly in sync.
- **Vurucu Gerçek:** *You don't need a cloud service for context synchronization. Git is your live semantic brain, shared seamlessly across multiple agents and developers.*

---

## You don't give your agent documentation. You give it a model.

A `.ctxdl` file answers: *"What exists in this system?"*

`validate.ctxdl` answers: *"Are these things consistent with each other?"*

`on.change(...)` answers: *"If something changes, what else is affected?"*

This is the difference. You're not writing docs that the agent reads. You're giving it a model of the system — and that model can reason about itself.

Ask your agent to build this model from your existing codebase:

```text
"Scan this project and create context files:
  context/ui.ctxdl        → design system, component patterns
  context/db.ctxdl        → data models, storage strategy
  context/ux.ctxdl        → user flows, interactions
  context/security.ctxdl  → auth rules, constraints
  context/validate.ctxdl  → consistency rules between all of the above"
```

As the project evolves, the agent writes new patterns back into the map. The model grows. The reasoning improves.

> **This is the new paradigm.** Not AI as a code generator. AI as a collaborator that maintains a shared, self-aware model of your project — versioned in git, portable across every tool.

---

## A note on how LLMs process context

There's a hypothesis behind ContextDL beyond token counts.

LLMs are typically given verbose, unstructured prose as context. To use it, the model has to parse the language, extract relevant facts, resolve ambiguities, and infer structure from unstructured text.

A structured semantic map is different. The structure is already there. The intent is direct. There's less noise to filter.

This *may* mean:
- **Wider scope per session** — more of your project fits in the context window
- **Faster analysis** — less parsing, more reasoning
- **Fewer hallucinations** — less ambiguity to misinterpret
- **Easier to update** — one line changed in a `.ctxdl` file updates the entire project's context instantly

This is a hypothesis. It has not been independently proven.

---

### Hypothetical token savings — illustrative estimates only

> ⚠️ **These numbers are speculative** — rough estimates to illustrate scale, not measured benchmarks. Actual savings depend on project size, session length, model, and tokenizer.

#### Per-session (single developer, medium project)

| Context | Without ContextDL | With ContextDL |
|---|---|---|
| UI design system | ~250–400 tokens | ~30–60 tokens |
| Data model | ~150–300 tokens | ~25–50 tokens |
| UX flows | ~100–200 tokens | ~20–40 tokens |
| Security rules | ~80–150 tokens | ~15–30 tokens |
| **Total** | **~580–1050 tokens** | **~90–180 tokens** |
| **Estimated saving** | | **~75–85%** |

The real value isn't one session. It's the cumulative elimination of repetition across every session, every feature, every developer, across the entire lifetime of the project.

> **None of this has been measured. We made no claims. We ran no benchmarks.**
>
> If you test ContextDL against a baseline, your data is one of the most valuable contributions this project can receive.
>
> **[Share your benchmark →](https://github.com/ariferol01/contexdl/pulls)**

---

## The new paradigm

```
Before ContextDL:

Developer explains project → AI generates code → context lost next session
Developer explains again  → AI generates code → context lost next session
New developer joins       → explains from scratch
Switch tools              → explains from scratch
─────────────────────────────────────────────────
Repetition. Drift. Inconsistency.


With ContextDL:

        ┌─────────────────────────────────────────┐
        │          /context  (the project map)    │
        │  ui · db · ux · security · validate     │
        │  versioned in git · travels everywhere  │
        │  written by: developer + agent          │
        └──────────────┬──────────────────────────┘
                       │ loaded once per session
                       │ by any MCP-compatible tool
                       ▼
        ┌─────────────────────────────────────────┐
        │          ContextDL MCP Server           │
        │  read_live_context()                    │
        │  validate_context()   ← map validates   │
        │  write_context_file() ← agent updates   │
        └──────────────┬──────────────────────────┘
                       │
         ┌─────────────┴───────────────┐
         ▼                             ▼
   compact intent               full project map
   (what you write)             (what agent knows)
         │                             │
         └─────────────┬───────────────┘
                       ▼
                  AI Agent
                       │
         ┌─────────────┼───────────────┐
         ▼             ▼               ▼
   consistent      impact          automatic
   code output   simulation     documentation
─────────────────────────────────────────────────
One map. Every tool. Every session. Every developer.
```

---

## Who is this for?

- Developers tired of re-explaining their project every session
- Teams that want context consistency across tools and team members
- Anyone who switches AI tools and loses context each time
- Developers who want to simulate feature impact before writing code
- Anyone building on a legacy or undocumented codebase
- People interested in MCP, semantic programming, or vibe coding
- Product teams who want a chatbot that actually knows the product

**Disagreeing and testing it is a valid contribution.**

---

## ☕ Support the experiment

ContextDL is an independent open-source project — a minimal idea that took months of thinking, testing, and iteration to take shape. It lives entirely on community support.

If it saved you from repeating yourself, gave your agent a project awareness it didn't have before, or just made you think differently about how AI tools and codebases relate — a small contribution means a lot.

---

### 💳 GitHub Sponsors — card or PayPal

<div align="center">

**[☕ Sponsor on GitHub](https://github.com/sponsors/ariferol01)**

</div>

---

### 🪙 Crypto

| Network | Address |
|---|---|
| **SOL** | `Dvo8FScbFwJZ4gvPoBnfsNp1yAtAtvHVTwtJz2uqqFw7` |
| **BNB / ETH** | `0xd948866cCe0BcA79fEAF90C25D77dfBb6Db1F435` |
| **BTC** | `bc1qqdwqt25k3wex0ysh3a594l64nhq7h0f0kyj8dr` |

---

## License

[MIT](./LICENSE)

---

<div align="center">

**ContextDL** · The open-source MCP workflow of **[apidl](https://apidlai.com)**

*Your project's context belongs in your repo.*

[☕ Sponsor](https://github.com/sponsors/ariferol01) · [Issues](https://github.com/ariferol01/contexdl/issues) · [Discussions](https://github.com/ariferol01/contexdl/discussions) · [Hosted MCP](https://apidlai.com/contextdl-mcp) · [apidl](https://apidlai.com)

</div>

---

## Contributing

### What you can do today
- **Try it** — run `npx @contexdl/mcp generate` on a real project, report what worked and what didn't
- **Share benchmarks** — token counts, consistency scores, output quality compared to verbose prompts
- **Add examples** — domain-specific `.ctxdl` patterns for e-commerce, DevOps, SaaS, data pipelines
- **Improve `generate`** — the CLI detects Next.js, Prisma, Tailwind. Add support for your stack
- **Open issues, open PRs, break things**

### Community challenges — looking for contributors

🎯 **VS Code / Cursor syntax highlighting** — `.ctxdl` files have no highlighting yet. A TextMate grammar that highlights `if`, `each`, `->`, `fail:`, `warn:`, `on.change()` would be a massive DX improvement. [Claim this →](https://github.com/ariferol01/contexdl/issues)

📊 **Real benchmark data** — the README has hypothetical numbers. Replace them with real ones. Run the same task as a verbose prompt and as a ContextDL intent, measure tokens + output quality, share the table.

🔌 **Stack-specific `generate` support** — Django models, Rails routes, Laravel structure, GraphQL schemas, OpenAPI specs — if you work in these stacks, you know what to extract.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---
