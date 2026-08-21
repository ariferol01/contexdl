# Contributing to ContextDL

> ContextDL is the open-source MCP workflow of **[AIDL (apidlai.com)](https://apidlai.com)**.

First off — thanks for being here. ContextDL is an experiment, and experiments live or die by the people willing to poke at them.

---

## Ways to contribute

### Try it and report back
The simplest contribution: connect it to your AI agent, run it against a real project, and tell us what happened. Open an issue with your findings — including failures.

### Share real benchmark data
Token counts. Latency. Consistency scores. Output quality. Error rates.

The README's hypothetical numbers need to be replaced with real ones. If you run a comparison against a baseline (same task, verbose prompt vs. ContextDL intent), share the data. A PR with a benchmark table is one of the most impactful things you can do for this project.

```
| Task            | Prompt tokens | ContextDL tokens | Output quality |
|-----------------|---------------|------------------|----------------|
| Your task here  | ?             | ?                | ?/10           |
```

### Generate `.ctxdl` files for your project
Run `npx @contexdl/mcp generate` on your project. Refine the output. Share what you learned about what works and what doesn't. Add it as an example in `examples/`.

### Propose or improve intent notation
Not a fan of dot notation for a specific domain? Show us a better one. Open a discussion with examples.

### Write domain-specific examples
- E-commerce flows
- SaaS onboarding
- DevOps pipelines
- Data engineering
- Mobile app UX
- API design

Add them to `examples/` with a README explaining the patterns.

### Improve the CLI (`npx @contexdl/mcp generate`)
The scaffolding CLI currently detects Prisma, Next.js routes, Tailwind, and a few auth providers. There's a lot more to detect:

- Laravel / PHP project structure
- Django models
- Ruby on Rails routes and models
- Flutter widget trees
- Rust module structure
- GraphQL schemas
- OpenAPI / Swagger specs
- Docker Compose service maps

If you work in any of these stacks, improving the `generate` command for your ecosystem is a high-value contribution.

### 🎯 Community challenge — VS Code / Cursor syntax highlighting

`.ctxdl` files currently have no syntax highlighting. A TextMate grammar (`.tmLanguage`) file that provides basic highlighting for keywords like `each`, `if`, `->`, `?`, `fail:`, `warn:` would dramatically improve the developer experience.

This is a **great first contribution** for anyone familiar with VS Code extension development. See: https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide

Open an issue to claim this if you'd like to work on it.

### Disagree with the idea
Seriously. If you think this doesn't work or is fundamentally flawed, write it up with evidence. Concrete criticism is one of the most valuable contributions this project can receive.

---

## Development setup

```bash
git clone https://github.com/ariferol01/contexdl.git
cd contexdl

# Python MCP server
pip install -r requirements.txt
python packages/python/server.py

# Node CLI / MCP server
cd packages/npm
node cli.js init
node server.js
```

---

## Submitting a PR

1. Fork the repo
2. Create a branch: `git checkout -b your-feature`
3. Commit your changes with a clear message
4. Push and open a PR

No strict format required. Just explain what you changed and why.

---

## Code of conduct

Be decent. That's it.

---

## Support

If ContextDL saves you time, consider [sponsoring the project](https://github.com/sponsors/ariferol01).
It's an independent open-source project under the **[AIDL initiative](https://apidlai.com)** that took months to develop and runs on community support.
