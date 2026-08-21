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

</div>

---

## What is this?

ContextDL is an experimental intent language for AI-assisted development.

Instead of writing long, verbose prompts explaining *how* to build something, you express *what* you want — in as few tokens as possible.

No fixed syntax. No grammar to learn. Just meaning.

```text
payment.completed.fail.retry3.notify.support
```

That's it. The AI figures out the rest.

---

## The problem with prompts

AI coding today looks like this:

```text
"When a payment fails, show an error message to the customer.
Allow them to retry up to 3 times. After the third failure,
notify the support team via email. Log the failure reason
and timestamp. Make sure no sensitive payment data is exposed.
Keep the UI consistent with the rest of the checkout flow..."
```

ContextDL lets you say the same thing like this:

```text
payment.completed.fail.retry3.notify.support
```

The intent is the same. The token count is not.

---

## No fixed syntax — use whatever feels natural

ContextDL doesn't force you to learn a new language.

**Dot notation:**
```text
todo.add.validate
```

**Function style:**
```text
todo.add.validate()
```

**PHP-like:**
```php
Todo::Add::Validate;
```

**Natural language:**
```text
when a user adds a todo, validate the input first
```

**Conditional flow:**
```text
todo.add:
    if input.empty -> alert.error("Task cannot be empty")
    else -> db.save -> ui.list.append
```

All of these describe the same intent. ContextDL normalizes them into semantic meaning — and passes that meaning to your AI agent.

---

## Live example — Todo app

Here's a complete todo application described in ContextDL.

**`context/ui.ctxdl`** — Design rules, once:
```text
theme: dark, accent=#6C63FF
font: Inter, system-ui
animation: fade-in 200ms ease
button.primary: accent-bg, white-text, rounded-md
input: border-subtle, focus-ring-accent
```

**`context/db.ctxdl`** — Data model, once:
```text
todo: {id, text, completed, createdAt, priority}
storage: localStorage
```

**Your intent file — what you actually write:**
```text
todo.add:
    if input.empty -> alert.error("Task cannot be empty")
    else -> db.save -> ui.list.append -> input.clear

todo.complete:
    db.toggle(completed) -> ui.item.strikethrough -> ui.counter.update

todo.delete:
    confirm.yes -> db.remove -> ui.item.fade_out

todo.filter:
    tabs: [all, active, completed] -> ui.list.rerender

todo.clear_completed:
    confirm.yes -> db.removeWhere(completed=true) -> ui.list.rerender
```

You write this once. Your AI agent reads the context files, understands your design system and data model, and generates the full implementation — without you repeating yourself.

---

## How it works

```
Your .ctxdl files
       │
       ▼
 ContextDL MCP Server
       │
       ├── read_live_context()   →  loads all .ctxdl files from /context
       └── get_agent_contract()  →  loads behavior rules for the agent
       │
       ▼
  Your AI Agent (Claude / GPT / Gemini / local)
       │
       ▼
  Working implementation
```

The MCP server is the bridge. It loads your semantic context and makes it available to any MCP-compatible AI tool.

---

## Project structure

```
your-project/
│
├── context/                  ← Semantic memory (write once, reuse forever)
│   ├── ui.ctxdl              (theme, components, animations)
│   ├── ux.ctxdl              (user flows, interactions)
│   ├── db.ctxdl              (data models, relations)
│   └── security.ctxdl        (auth rules, rate limits)
│
├── agent-contract.md         ← Rules the AI agent follows
└── [your intent files]       ← What you actually write
```

---

## Quick start

### Python (pip)

```bash
pip install contexdl
```

```bash
contexdl serve
```

Or run directly:

```bash
git clone https://github.com/ariferol01/contexdl.git
cd contexdl
pip install -r requirements.txt
python packages/python/server.py
```

### npm

```bash
npx @contexdl/mcp
```

---

## Connect to your AI tool

### Claude Desktop

Add to `claude_desktop_config.json`:

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

### Cursor / Windsurf / VS Code

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

## Token efficiency

One hypothesis behind ContextDL is that high-density intent uses far fewer tokens than equivalent verbose prompts.

| Description | Tokens (approx.) |
|---|---|
| Verbose prompt for payment failure flow | ~80 tokens |
| ContextDL: `payment.completed.fail.retry3.notify.support` | ~8 tokens |

> **Note:** ContextDL has not yet been independently benchmarked.  
> We're not inventing a percentage. We want people to test it.  
> Got real numbers? **Open a PR.**

---

## Green AI — hypothesis, not a claim

If high-density intent consistently uses fewer input tokens, it *may* reduce API costs and energy consumption at scale.

Real-world impact depends on model architecture, tokenizer behavior, caching, and infrastructure.

This project treats energy efficiency as **a hypothesis to benchmark**, not a proven result.

---

## Could AI models be trained for intent?

Today most coding models are optimized for:

```
natural language → code
```

A future model could be optimized for:

```
intent → implementation
```

ContextDL is an experiment in what that interaction might look like.

---

## Who is this for?

- Developers who work with AI coding agents daily
- People experimenting with MCP, vibe coding, or local AI
- Anyone curious about semantic programming
- People who hate repeating themselves in prompts

You don't need to know ContextDL to contribute.

**Disagreeing with the idea and testing it is a valid contribution.**

---

## Contributing

- Try it with your own AI tool
- Share token benchmarks
- Propose a different intent notation
- Write domain-specific examples (auth, e-commerce, DevOps)
- Open issues, open PRs, break things

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

---

## Support the experiment

If ContextDL makes you say **"WTF, that actually worked"** — consider supporting it:

**💖 [GitHub Sponsors](https://github.com/sponsors/ariferol01)**

or crypto:

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

*Don't write prompts. Express intent.*

[GitHub Sponsors](https://github.com/sponsors/ariferol01) · [Issues](https://github.com/ariferol01/contexdl/issues) · [Discussions](https://github.com/ariferol01/contexdl/discussions)

</div>
