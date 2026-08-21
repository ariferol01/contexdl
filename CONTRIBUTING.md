# Contributing to ContextDL

First off — thanks for being here. ContextDL is an experiment, and experiments live or die by the people willing to poke at them.

## Ways to contribute

**Try it and report back**
The simplest contribution: clone it, connect it to your AI agent, and tell us what happened. Open an issue with your findings.

**Benchmark it**
Token counts, latency, output quality — real numbers matter. Run a comparison and share the data in a PR or issue.

**Propose better intent notation**
Not a fan of dot notation? Prefer something else? Show us. Open a discussion with examples.

**Write domain-specific examples**
Authentication flows, e-commerce, DevOps, data pipelines — add an example directory with your domain's intent patterns.

**Improve the MCP server**
Better error messages, new tools, performance improvements — PRs welcome.

**Disagree with the idea**
Seriously. If you think this doesn't work or is fundamentally flawed, write it up. Concrete criticism with evidence is one of the most valuable contributions this project can receive.

---

## Development setup

```bash
git clone https://github.com/ariferol01/contexdl.git
cd contexdl
pip install -r requirements.txt
python packages/python/server.py
```

---

## Submitting a PR

1. Fork the repo
2. Create a branch: `git checkout -b your-feature`
3. Commit your changes
4. Push and open a PR

No strict format required. Just explain what you changed and why.

---

## Code of conduct

Be decent. That's it.

---

## Support

If this saved you time, consider [sponsoring the project](https://github.com/sponsors/ariferol01).
