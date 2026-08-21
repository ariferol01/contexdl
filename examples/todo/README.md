# Todo Example — Context Files

These context files define the design system and data model for this todo app demo.
They are loaded automatically by the ContextDL MCP server.

## ui.ctxdl
```
theme: dark, accent=#6C63FF
font: Inter, system-ui
animation: fade-in 200ms ease
button.primary: accent-bg, white-text, rounded-md
input: border-subtle, focus-ring-accent
card: glass-morphism, border-subtle
```

## db.ctxdl
```
model.todo: {id, text, completed, priority, createdAt}
storage: localStorage
query.default: order-by=createdAt DESC
```

## How to use this example

1. Start the ContextDL MCP server
2. Connect it to your AI agent (Claude, Cursor, etc.)
3. Open `todo.ctxdl` and ask your agent: "render this"
4. The agent will generate a complete, styled todo application

The agent uses `ui.ctxdl` to match your design system and `db.ctxdl` to understand your data model — **without you explaining them again.**
