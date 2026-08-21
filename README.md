<div align="center">

# ContextDL

### Don't write prompts. Express intent.

<!-- GIF PLACEHOLDER: Replace with your demo GIF -->
<!-- ![ContextDL Demo](./assets/demo.gif) -->

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://python.org)
[![npm](https://img.shields.io/badge/npm-%40contexdl%2Fmcp-red.svg)](https://npmjs.com/package/@contexdl/mcp)
[![MCP Compatible](https://img.shields.io/badge/MCP-compatible-purple.svg)](https://modelcontextprotocol.io)
[![Experimental](https://img.shields.io/badge/status-experimental-orange.svg)]()
[![☕ Sponsor](https://img.shields.io/badge/☕%20Sponsor-Support%20ContextDL-ff813f?style=flat)](https://github.com/sponsors/ariferol01)

</div>

---

## What is ContextDL?

ContextDL is an experimental **semantic intent language** and **MCP workflow** that creates a **living map of your project** — readable by both humans and AI agents.

Instead of writing verbose prompts that explain your project from scratch every session, you define your design system, data models, user flows, and business logic once — in compact `.ctxdl` files. Your AI agent reads this map at the start of every session and instantly understands the full shape of your project.

**No fixed syntax. No grammar to memorize. Just meaning.**

```text
payment.completed.fail.retry3.notify.support
```

---

## The core idea — a semantic project map

The most important thing ContextDL does is not save tokens.

It gives your AI agent **a map**.

```
📁 context/
├── ui.ctxdl        ← design system, theme, components
├── ux.ctxdl        ← user flows, interactions, accessibility
├── db.ctxdl        ← data models, relations, storage
├── security.ctxdl  ← auth rules, rate limits, constraints
└── payment.ctxdl   ← payment flows, states, error handling
```

When the agent loads these files at the start of a session, it sees the entire architecture of your project — in a single pass, with minimal tokens. Not just what you said today. What your project *is*.

### Concentrated context — faster, wider, more accurate analysis

There's an important difference between giving an LLM **a lot of context** and giving it **the right context**.

Verbose prose descriptions are large, loosely structured, and full of filler. An LLM has to read through all of it to extract the facts that matter.

A semantic map is compact, structured, and dense with meaning. The LLM can scan the entire project shape in a fraction of the tokens — and reason about it more directly, with less noise.

This means:
- **Wider scope per session** — more of your project fits in the context window
- **Faster analysis** — less parsing, more reasoning
- **Easier to update** — change one line in `ui.ctxdl` and the entire project context is updated. No rewriting documentation. No re-explaining anything.

A `ui.ctxdl` update takes seconds. The equivalent change in prose documentation might take hours — and might still be misunderstood.

### What changes when the agent has a map

**Without a map (today):**
```
Session 1:  "My design system uses Inter, dark mode, accent #6C63FF..."
Session 2:  "Remember, we use Inter font and dark mode..."
Session 3:  "The color palette is — actually let me describe it again..."
Session 47: Component generated with wrong font. Again.
```

**With a ContextDL map:**
```
Session 1:   Agent loads ui.ctxdl → full design system known.
Session 47:  Agent loads ui.ctxdl → still the same. Always consistent.
Every new feature: built against the same map. Zero drift.
```

---

## What the map enables — beyond code generation

### 🗺️ Instant project understanding

Hand a new AI agent your `/context` folder. Without a single explanation, it understands:
- Your entire design system
- Your data architecture
- How users flow through the application
- What your security constraints are

This works for any agent — Claude, GPT, Gemini, local models.

### 📚 Automatic documentation

Give your `.ctxdl` files to an agent and ask:

```text
"Generate technical documentation for this project based on the context files."
```

The agent produces accurate, consistent documentation from the semantic map — not from guesses.

### 🤖 Chatbot and support integration

After you go live, give your `.ctxdl` files to a customer-facing chatbot:

```text
"Here are the context files for this application. Use them to answer
questions about what the product does, how it works, and what features it has."
```

The chatbot instantly knows your entire product's capabilities — because the map describes them precisely. No manual FAQ writing. No training on outdated docs.

### 👥 Zero-effort team onboarding

A new developer joins the team. Instead of weeks of knowledge transfer:

```text
"Read the /context folder. Ask me what's unclear."
```

The semantic map contains everything an agent — or a human — needs to understand what was built, why it works the way it does, and how to extend it consistently.

### 🔍 Codebase archaeology

Large, undocumented legacy project? Ask the agent to scan it and generate `.ctxdl` files:

```text
"Analyze this codebase and create context files that describe
the design system, data models, user flows, and business rules."
```

The agent produces a compact, machine-readable understanding of code that may have no documentation at all.

---

## Token efficiency — a consequence, not the goal

When you have a semantic map, token savings happen automatically.

But there's a deeper hypothesis here.

### The intent map hypothesis

Large language models are typically given verbose, unstructured natural language as context. The hypothesis behind ContextDL is that **a structured, high-density intent map may be genuinely easier for an LLM to reason about** than an equivalent volume of prose.

When you give an LLM a 500-token description of your UI system written in natural language, it has to:
- Parse the prose
- Extract the relevant facts
- Resolve ambiguities in phrasing
- Infer structure from unstructured text

When you give it a `ui.ctxdl` file:
```text
theme: dark, accent=#6C63FF
font: Inter, system-ui
button.primary: accent-bg, white-text, rounded-md
```

The structure is already there. The intent is direct. There's nothing to infer.

This may reduce hallucination, improve consistency, and make the model's job easier — not just cheaper.

**This is a hypothesis. It has not been proven.**

We believe it's worth testing experimentally. If you run comparisons — consistency scores, error rates, output quality — share the data.

---

### Hypothetical token savings — illustrative estimates

> ⚠️ **These numbers are speculative.** They are rough estimates meant to illustrate the scale of potential savings, not measured benchmarks. Real savings depend on your project size, team size, session length, and LLM tokenizer.

#### Per-session savings (single developer, medium project)

| Context loaded without ContextDL | Estimated tokens | With ContextDL (`.ctxdl` files) | Estimated tokens |
|---|---|---|---|
| UI design system description | ~250–400 | `ui.ctxdl` | ~30–60 |
| Data model explanation | ~150–300 | `db.ctxdl` | ~25–50 |
| UX flow description | ~100–200 | `ux.ctxdl` | ~20–40 |
| Security rules | ~80–150 | `security.ctxdl` | ~15–30 |
| **Total per session** | **~580–1050** | | **~90–180** |
| **Estimated savings per session** | | | **~75–85%** |

#### Cumulative savings (hypothetical, illustrative only)

| Scenario | Sessions/month | Est. tokens saved/session | Est. monthly savings |
|---|---|---|---|
| Solo developer | 60 | ~600 | ~36,000 tokens |
| 3-person team | 180 | ~600 | ~108,000 tokens |
| 10-person team | 600 | ~600 | ~360,000 tokens |

At GPT-4 pricing (~$0.01/1K input tokens), a 10-person team could hypothetically save ~$3.60/month in raw input costs — modest in isolation, but multiplied across a project's lifetime and combined with reduced hallucination and better consistency, potentially meaningful.

> **None of this has been measured. We made no claims. We ran no benchmarks.**
>
> If you test ContextDL against a baseline and share real numbers — token counts, latency, consistency scores, output quality ratings — **that's one of the most valuable contributions this project can receive.**
>
> **[Open a PR with your benchmark data →](https://github.com/ariferol01/contexdl/pulls)**

---

## Agents write the map too

This is the part that changes the paradigm:

**You don't write `.ctxdl` files alone.**

Ask your agent to generate them from your existing codebase:

```text
"Scan this project and create:
  context/ui.ctxdl     → extract design system, color tokens, component patterns
  context/db.ctxdl     → extract data models, schema, storage patterns
  context/ux.ctxdl     → extract user flows, interactions, navigation
  context/security.ctxdl → extract auth rules, access control, rate limits"
```

The agent analyzes your existing code and writes compact, accurate semantic files that describe what your project already is. From that point forward, every agent session starts with full awareness of everything that was already built.

As the project evolves, the agent updates the map. The shared understanding grows with the codebase.

> **This is the new paradigm:** Not AI as a code generator. AI as a collaborator that reads and writes a shared semantic memory of your project.

---

## Write in whatever syntax you already know

This is important: **ContextDL has no official syntax.**

You write in the style that feels natural to *you* — the language you already think in. A PHP developer writes PHP-like expressions. A Python developer writes Python-like flows. A product manager writes plain English. All of it is valid ContextDL.

The syntax is not the point. The intent is.

---

**PHP developer:**
```php
Payment::Completed::Fail::Retry(3)::NotifySupport;
```

**JavaScript / Python developer:**
```text
payment.completed.fail.retry(3).notify.support
```

**Ruby / method-chain style:**
```text
payment.completed.fail.retry(3).notify(:support)
```

**Conditional / flow style:**
```text
todo.add:
    if input.empty -> alert.error("Task cannot be empty")
    else -> db.save -> ui.list.append
```

**Plain natural language:**
```text
when a user cancels an order, release reserved inventory and notify the warehouse
```

**Terse dot notation:**
```text
payment.completed.fail.retry3.notify.support
```

All of these describe the same intent. ContextDL doesn't care which one you use.

Your agent normalizes them against the project map and renders the implementation.

> If you've been writing code for years in a specific language, you already know how to write ContextDL.
> You just didn't have a name for it.

---

## Complete workflow

### Step 1 — Define your project map (once)

```
your-project/
└── context/
    ├── ui.ctxdl
    ├── ux.ctxdl
    ├── db.ctxdl
    └── security.ctxdl
```

Or let the agent generate these from your existing codebase.

### Step 2 — Start the MCP server

Connect to the hosted server or run locally.

### Step 3 — Agent loads the full map

```
read_live_context() → all .ctxdl files → agent has panoramic project awareness
get_agent_contract() → behavior rules → agent knows how to act
```

### Step 4 — Express intent

```text
user.signup:
    validate: email.format, password.strength
    if valid -> db.create -> email.verify -> redirect(/dashboard)
    if invalid -> alert.field-errors
```

### Step 5 — Agent renders context-aware implementation

Every component matches your design system. Every query follows your data model. Every flow respects your UX rules. Automatically.

### Step 6 — Map grows with the project

When new patterns emerge, the agent writes them back into the relevant `.ctxdl` file. The map stays current.

---

## Live example — Todo app

**`context/ui.ctxdl`** — defined once:
```text
theme: dark, accent=#6C63FF
font: Inter, system-ui
animation: fade-in 200ms ease
button.primary: accent-bg, white-text, rounded-md
input: border-subtle, focus-ring-accent
```

**`context/db.ctxdl`** — defined once:
```text
todo: {id, text, completed, createdAt, priority}
storage: localStorage
```

**Your intent going forward:**
```text
todo.add:
    if input.empty -> alert.error("Task cannot be empty")
    else -> db.save -> ui.list.prepend -> input.clear -> counter.update

todo.complete:
    db.toggle(completed) -> ui.item.strikethrough -> counter.update

todo.delete:
    confirm.yes -> db.remove -> ui.item.fade_out

todo.filter:
    tabs: [all, active, completed] -> ui.list.rerender
```

Five intents. A complete application. The agent fills everything else from the map.

---

## Connect your AI agent

### 🌐 Option 1 — Hosted MCP (recommended, free)

No installation. Connect directly:

**`https://apidlai.com/contextdl/mcp`**

Add to Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "contexdl": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://apidlai.com/contextdl/mcp"]
    }
  }
}
```

---

### 🐍 Option 2 — Local Python server

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

### 📦 Option 3 — Local npm server

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

## The new paradigm

```
Old way:

Developer → explains project from scratch → AI → code
(Repeat. Every session. Every feature. Every developer.)


ContextDL way:

        ┌──────────────────────────────────────┐
        │       /context  (the project map)    │
        │  ui.ctxdl  db.ctxdl  ux.ctxdl  ...  │
        │  written by: developer + agent       │
        └──────────────┬───────────────────────┘
                       │ loaded once per session
                       ▼
        ┌──────────────────────────────────────┐
        │       ContextDL MCP Server           │
        │  read_live_context()                 │
        │  get_agent_contract()                │
        │  write_context_file()                │
        └──────────────┬───────────────────────┘
                       │
         ┌─────────────┴──────────────┐
         ▼                            ▼
   compact intent              full project map
   (what you write)            (what agent knows)
         │                            │
         └─────────────┬──────────────┘
                       ▼
                  AI Agent
                       │
         ┌─────────────┴──────────────┐
         ▼             ▼              ▼
   consistent      automatic       instant
   code output  documentation  chatbot context
```

---

## Who is this for?

- Developers working with AI agents daily who are tired of repeating context
- Teams who want agent consistency across sessions and members
- Anyone building on top of an undocumented or complex codebase
- People interested in MCP, semantic programming, or vibe coding
- Developers who want a chatbot that knows their product without manual FAQ writing
- Anyone curious enough to test whether this idea holds up

**Disagreeing and testing it is a valid contribution.**

---

## Contributing

- Try it and report what happened
- Generate `.ctxdl` files for your project and share the patterns
- Run token benchmarks and share real numbers
- Propose intent notation for specific domains
- Write examples: auth, e-commerce, DevOps, SaaS, data pipelines
- Open issues, open PRs, break things

See [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## ☕ Support the experiment

ContextDL is an independent open-source experiment — a minimal idea that took months of thinking, testing, and iteration to take shape. It lives entirely on community support.

If it saved you from repeating yourself — or gave your agent a project awareness it didn't have before — a small contribution means a lot:

<div align="center">

**[☕ GitHub Sponsors — Buy Me a Coffee](https://github.com/sponsors/ariferol01)**

</div>

| Network | Address |
|---|---|
| SOL | `Dvo8FScbFwJZ4gvPoBnfsNp1yAtAtvHVTwtJz2uqqFw7` |
| BNB / ETH | `0xd948866cCe0BcA79fEAF90C25D77dfBb6Db1F435` |
| BTC | `bc1qqdwqt25k3wex0ysh3a594l64nhq7h0f0kyj8dr` |

---

## License

[MIT](./LICENSE)

---

<div align="center">

**ContextDL**

*Don't write prompts. Express intent. Build the map.*

[☕ Sponsor](https://github.com/sponsors/ariferol01) · [Issues](https://github.com/ariferol01/contexdl/issues) · [Discussions](https://github.com/ariferol01/contexdl/discussions) · [Hosted MCP](https://apidlai.com/contextdl/mcp)

</div>
