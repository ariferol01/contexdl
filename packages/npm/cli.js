#!/usr/bin/env node

/**
 * ContextDL CLI
 * ==============
 * Commands:
 *   init       → Create starter /context files in the current project
 *   generate   → Scan existing project and generate .ctxdl files from it
 *   serve      → Start the local MCP server
 *   validate   → Run context validation (requires MCP server)
 *
 * Usage:
 *   npx @contexdl/mcp init
 *   npx @contexdl/mcp generate
 *   npx @contexdl/mcp serve
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const CWD = process.cwd();
const CONTEXT_DIR = path.join(CWD, "context");
const args = process.argv.slice(2);
const command = args[0];

// ── ANSI colors ────────────────────────────────────────────────────────────
const c = {
  reset:  "\x1b[0m",
  bold:   "\x1b[1m",
  dim:    "\x1b[2m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  blue:   "\x1b[34m",
  cyan:   "\x1b[36m",
  red:    "\x1b[31m",
  gray:   "\x1b[90m",
};

const ok   = (msg) => console.log(`${c.green}✓${c.reset} ${msg}`);
const warn = (msg) => console.log(`${c.yellow}⚠${c.reset} ${msg}`);
const info = (msg) => console.log(`${c.cyan}→${c.reset} ${msg}`);
const err  = (msg) => console.log(`${c.red}✗${c.reset} ${msg}`);
const dim  = (msg) => console.log(`${c.gray}${msg}${c.reset}`);
const bold = (msg) => console.log(`${c.bold}${msg}${c.reset}`);

// ── Helpers ────────────────────────────────────────────────────────────────

function writeFile(filePath, content, overwrite = false) {
  if (fs.existsSync(filePath) && !overwrite) {
    warn(`Skipped (already exists): ${path.relative(CWD, filePath)}`);
    return false;
  }
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
  ok(`Created: ${path.relative(CWD, filePath)}`);
  return true;
}

function readFileSafe(filePath) {
  try { return fs.readFileSync(filePath, "utf-8"); } catch { return ""; }
}

function findFiles(dir, pattern, maxDepth = 4) {
  const results = [];
  function walk(current, depth) {
    if (depth > maxDepth) return;
    let entries;
    try { entries = fs.readdirSync(current, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      const skip = ["node_modules", ".git", ".next", "dist", "build", ".cache", "vendor"];
      if (skip.includes(entry.name)) continue;
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) walk(full, depth + 1);
      else if (pattern.test(entry.name)) results.push(full);
    }
  }
  walk(dir, 0);
  return results;
}

function detectStack() {
  const pkg = JSON.parse(readFileSafe(path.join(CWD, "package.json")) || "{}");
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const pyReq = readFileSafe(path.join(CWD, "requirements.txt"));
  const hasPyproject = fs.existsSync(path.join(CWD, "pyproject.toml"));

  return {
    // JS frameworks
    react:    !!deps["react"],
    next:     !!deps["next"],
    vue:      !!deps["vue"],
    nuxt:     !!deps["nuxt"],
    svelte:   !!deps["svelte"],
    angular:  !!deps["@angular/core"],
    vite:     !!deps["vite"],
    // CSS
    tailwind: !!deps["tailwindcss"],
    // DB
    prisma:   !!deps["@prisma/client"] || fs.existsSync(path.join(CWD, "prisma/schema.prisma")),
    mongoose: !!deps["mongoose"],
    drizzle:  !!deps["drizzle-orm"],
    // Auth
    nextauth: !!deps["next-auth"],
    supabase: !!deps["@supabase/supabase-js"],
    clerk:    !!deps["@clerk/nextjs"],
    // Python
    python:   !!pyReq || hasPyproject,
    django:   pyReq.includes("django") || pyReq.includes("Django"),
    fastapi:  pyReq.includes("fastapi"),
    flask:    pyReq.includes("flask"),
    sqlalchemy: pyReq.includes("sqlalchemy") || pyReq.includes("SQLAlchemy"),
    // General
    pkgName: pkg.name || "your-project",
    pkgDesc: pkg.description || "",
  };
}

function extractColors(cssFiles) {
  const colors = new Set();
  const fonts = new Set();
  for (const file of cssFiles.slice(0, 10)) {
    const content = readFileSafe(file);
    const colorMatches = content.match(/#[0-9a-fA-F]{3,8}|hsl\([^)]+\)|rgb\([^)]+\)/g) || [];
    colorMatches.slice(0, 5).forEach(c => colors.add(c));
    const fontMatches = content.match(/font-family:\s*([^;]+)/g) || [];
    fontMatches.forEach(f => fonts.add(f.replace("font-family:", "").trim().split(",")[0].replace(/['"]/g, "").trim()));
  }
  return { colors: [...colors].slice(0, 6), fonts: [...fonts].slice(0, 3) };
}

function extractPrismaModels(schemaPath) {
  const content = readFileSafe(schemaPath);
  const models = [];
  const matches = content.matchAll(/model\s+(\w+)\s*\{([^}]+)\}/g);
  for (const match of matches) {
    const name = match[1];
    const fields = [...match[2].matchAll(/^\s+(\w+)\s+(\w+)/gm)]
      .map(f => f[1])
      .filter(f => !["id", "createdAt", "updatedAt"].includes(f))
      .slice(0, 6);
    models.push({ name, fields });
  }
  return models;
}

function extractRoutes(stack) {
  const routes = [];
  // Next.js app router
  const appDir = path.join(CWD, "app");
  const pagesDir = path.join(CWD, "pages");

  if (fs.existsSync(appDir)) {
    findFiles(appDir, /page\.(tsx?|jsx?)$/, 3).forEach(f => {
      const route = "/" + path.relative(appDir, path.dirname(f)).replace(/\\/g, "/");
      if (route !== "/.") routes.push(route);
    });
  } else if (fs.existsSync(pagesDir)) {
    findFiles(pagesDir, /\.(tsx?|jsx?)$/, 3).forEach(f => {
      const route = "/" + path.relative(pagesDir, f).replace(/\.(tsx?|jsx?)$/, "").replace(/\\/g, "/");
      if (!route.includes("_") && !route.includes("api")) routes.push(route);
    });
  }
  return routes.slice(0, 8);
}

// ── INIT command ───────────────────────────────────────────────────────────

function cmdInit() {
  console.log();
  bold("ContextDL — Initializing project context");
  dim("https://github.com/ariferol01/contexdl");
  console.log();

  const stack = detectStack();
  info(`Detected project: ${stack.pkgName}`);
  console.log();

  const theme = stack.tailwind
    ? "tailwind\naccent: #6C63FF"
    : "dark\naccent: #6C63FF\nbackground: #0f0f13\nsurface: #1a1a24";

  const font = "Inter, system-ui, sans-serif";

  writeFile(path.join(CONTEXT_DIR, "ui.ctxdl"), `# UI Context — Design System
# Generated by: npx @contexdl/mcp init
# Edit this file to match your actual design system.

# --- Theme ---
theme: ${theme}
font: ${font}
animation: fade-in 200ms ease

# --- Components ---
button.primary: accent-bg, white-text, rounded-md, hover-scale
button.secondary: transparent, border-subtle, hover-border-accent
button.danger: transparent, red-text, hover-red-bg
input: border-subtle, rounded-md, focus-ring-accent
card: surface-bg, border-subtle, rounded-lg, shadow-sm

# --- Spacing ---
spacing: 4 | 8 | 16 | 24 | 48
radius: sm=6px md=10px lg=16px full=9999px

# --- States ---
loading: skeleton-screen (not spinner)
empty: illustration + title + cta
error: inline-field OR toast-top-center (auto-dismiss 5s)
success: toast-top-center (auto-dismiss 3s)
`);

  writeFile(path.join(CONTEXT_DIR, "ux.ctxdl"), `# UX Context — User Experience Rules
# Generated by: npx @contexdl/mcp init

# --- Navigation ---
nav: sticky top-bar
nav.mobile: bottom-bar, max-5-items
breadcrumbs: show when depth >= 2

# --- Interactions ---
hover: subtle highlight, cursor-pointer
active: scale(0.97)
confirm.destructive: modal-dialog, explicit-yes required
confirm.minor: inline + undo-5s

# --- Accessibility ---
focus: visible ring, accent color
contrast: minimum 4.5:1
keyboard: all interactive elements reachable
motion: respect prefers-reduced-motion

# --- Responsive ---
mobile: < 768px, single-column
tablet: 768–1024px
desktop: > 1024px, sidebar + main
`);

  const dbEngine = stack.prisma ? "prisma / postgresql"
    : stack.mongoose ? "mongodb / mongoose"
    : stack.drizzle ? "drizzle / postgresql"
    : stack.sqlalchemy ? "sqlalchemy"
    : "define-your-db-here";

  writeFile(path.join(CONTEXT_DIR, "db.ctxdl"), `# DB Context — Data Models
# Generated by: npx @contexdl/mcp init
# Replace example models with your actual schema.

storage: ${dbEngine}

# --- Models ---
# model.example:
#     id: uuid, auto
#     name: string, required
#     createdAt: datetime, auto

# --- Query defaults ---
# query.default: order-by=createdAt DESC

# --- Validation ---
# validate.default: trim-whitespace, no-xss, max=500
`);

  const authRules = stack.nextauth ? "provider: next-auth\nsession: jwt"
    : stack.supabase ? "provider: supabase\nsession: supabase-auth"
    : stack.clerk ? "provider: clerk"
    : "provider: define-your-auth";

  writeFile(path.join(CONTEXT_DIR, "security.ctxdl"), `# Security Context — Auth & Safety Rules
# Generated by: npx @contexdl/mcp init

# --- Authentication ---
${authRules}
auth.required: define-protected-routes-here

# --- Input Sanitization ---
input.sanitize: always
input.max-length: 500
input.xss: reject-script-tags, encode-html

# --- Storage ---
storage.sensitive: never in localStorage
storage.keys: use-prefix, avoid-collisions

# --- Rate Limiting ---
rate-limit: define per endpoint
`);

  writeFile(path.join(CONTEXT_DIR, "validate.ctxdl"), `# ContextDL Self-Validation Map
# The map validates itself.
# Edit rules to match your actual context structure.

# Every component referenced in UX must exist in ui.ctxdl
each ux.flows.uses ->
    ? exists(ui.components[this])
    fail: "UX references '{this}' not defined in ui.ctxdl"

# Protected routes must have auth rules
each db.endpoints.protected ->
    ? exists(security.rules[this])
    warn: "'{this}' is protected but has no security rule"

# Impact simulation
on.change(db.models) ->
    check: ux.data.reads
    report: "DB model change — review UX flows and security rules"

on.change(ui.components) ->
    check: ux.flows.uses
    report: "UI component change — review UX flow consistency"
`);

  // agent-contract.md at project root
  const contractPath = path.join(CWD, "agent-contract.md");
  if (!fs.existsSync(contractPath)) {
    info("Downloading agent-contract.md template...");
    writeFile(contractPath, `# ContextDL Agent Workflow Contract
# Full contract: https://github.com/ariferol01/contexdl/blob/main/agent-contract.md
# Replace this file with the full contract from the link above.

You are a ContextDL Render Engine.
Start every session by calling read_live_context() and get_agent_contract().
`);
  }

  console.log();
  bold("Done! Your project now has a ContextDL context map.");
  console.log();
  info("Next steps:");
  dim("  1. Edit context/*.ctxdl files to match your actual project");
  dim("  2. Connect the MCP server:");
  dim("       Hosted (free): https://apidlai.com/contextdl-mcp");
  dim("       Local Python:  python packages/python/server.py");
  dim("       Local Node:    npx @contexdl/mcp serve");
  dim("  3. Ask your agent: 'Load the project context and validate it'");
  console.log();
  dim("  More: https://github.com/ariferol01/contexdl");
  console.log();
}

// ── GENERATE command ───────────────────────────────────────────────────────

function cmdGenerate() {
  console.log();
  bold("ContextDL — Scanning project and generating context files");
  dim("This may take a few seconds...");
  console.log();

  const stack = detectStack();
  const cssFiles = findFiles(CWD, /\.(css|scss|sass)$/);
  const { colors, fonts } = extractColors(cssFiles);
  const routes = extractRoutes(stack);

  // ── ui.ctxdl ──────────────────────────────────────────────────────────
  let uiContent = `# UI Context — Generated by contexdl generate
# Scanned: ${new Date().toISOString().split("T")[0]}
# Review and refine this file — it's a starting point, not a final answer.

`;

  if (stack.tailwind) uiContent += `css: tailwind\n`;
  if (colors.length) uiContent += `colors-detected: ${colors.join(", ")}\n`;
  if (fonts.length) uiContent += `fonts-detected: ${fonts.join(", ")}\n`;

  uiContent += `\n# --- Define your design system below ---\n`;
  uiContent += `theme: [light|dark] # update this\n`;
  uiContent += `accent: ${colors[0] || "#6C63FF"}\n`;
  uiContent += `font: ${fonts[0] || "Inter, system-ui"}\n`;
  uiContent += `animation: fade-in 200ms ease\n\n`;
  uiContent += `button.primary: accent-bg, white-text, rounded-md\n`;
  uiContent += `input: border-subtle, focus-ring-accent\n`;
  uiContent += `card: surface-bg, border-subtle, rounded-lg\n`;

  writeFile(path.join(CONTEXT_DIR, "ui.ctxdl"), uiContent);

  // ── db.ctxdl ──────────────────────────────────────────────────────────
  let dbContent = `# DB Context — Generated by contexdl generate\n\n`;

  const prismaPath = path.join(CWD, "prisma/schema.prisma");
  if (fs.existsSync(prismaPath)) {
    const models = extractPrismaModels(prismaPath);
    dbContent += `storage: prisma\n\n`;
    if (models.length) {
      dbContent += `# --- Models (extracted from prisma/schema.prisma) ---\n`;
      for (const m of models) {
        dbContent += `model.${m.name.toLowerCase()}: {${m.fields.join(", ")}}\n`;
      }
    }
    ok(`Extracted ${models.length} Prisma models`);
  } else if (stack.mongoose) {
    dbContent += `storage: mongodb / mongoose\n\n# --- Models ---\n# (mongoose models not auto-extracted — add them manually)\n`;
  } else if (stack.sqlalchemy) {
    dbContent += `storage: sqlalchemy\n\n# --- Models ---\n# (add your SQLAlchemy models here)\n`;
  } else {
    dbContent += `storage: define-your-db\n\n# --- Models ---\n# model.example: {id, name, createdAt}\n`;
  }

  dbContent += `\n# --- Query defaults ---\nquery.default: order-by=createdAt DESC\n`;
  writeFile(path.join(CONTEXT_DIR, "db.ctxdl"), dbContent);

  // ── ux.ctxdl ──────────────────────────────────────────────────────────
  let uxContent = `# UX Context — Generated by contexdl generate\n\n`;

  if (routes.length) {
    uxContent += `# --- Routes detected ---\n`;
    for (const r of routes) uxContent += `route: ${r}\n`;
    uxContent += `\n`;
  }

  if (stack.next) uxContent += `framework: next.js\nnav: top-bar, sticky\n`;
  else if (stack.nuxt) uxContent += `framework: nuxt\nnav: top-bar, sticky\n`;
  else if (stack.vue) uxContent += `framework: vue\nnav: top-bar, sticky\n`;

  uxContent += `\n# --- Interactions ---\nconfirm.destructive: modal-dialog\nconfirm.minor: inline + undo-5s\n\n`;
  uxContent += `# --- Accessibility ---\nfocus: visible-ring\ncontrast: 4.5:1 minimum\nkeyboard: all-interactive-reachable\n`;

  writeFile(path.join(CONTEXT_DIR, "ux.ctxdl"), uxContent);

  // ── security.ctxdl ────────────────────────────────────────────────────
  let secContent = `# Security Context — Generated by contexdl generate\n\n`;

  if (stack.nextauth)  secContent += `auth.provider: next-auth\nauth.session: jwt\n`;
  else if (stack.supabase) secContent += `auth.provider: supabase\nauth.session: supabase-auth\n`;
  else if (stack.clerk) secContent += `auth.provider: clerk\n`;
  else secContent += `auth.provider: define-your-auth\n`;

  secContent += `\ninput.sanitize: always\ninput.max-length: 500\nstorage.sensitive: never-in-localStorage\n`;
  writeFile(path.join(CONTEXT_DIR, "security.ctxdl"), secContent);

  // ── validate.ctxdl ────────────────────────────────────────────────────
  writeFile(path.join(CONTEXT_DIR, "validate.ctxdl"), `# ContextDL Self-Validation Map — Generated
# ContextDL validates ContextDL. The map validates itself.

each ux.flows.uses ->
    ? exists(ui.components[this])
    fail: "UX references '{this}' not defined in ui.ctxdl"

each db.endpoints.protected ->
    ? exists(security.rules[this])
    warn: "'{this}' is protected but no security rule found"

on.change(db.models) ->
    check: ux.data.reads
    report: "DB model change — review UX and security rules"
`);

  console.log();
  bold("Done! Context files generated.");
  console.log();
  warn("These files are a starting point — review and refine them.");
  info("Run your agent and ask: 'Validate the project context'");
  dim("  Hosted MCP (free): https://apidlai.com/contextdl-mcp");
  console.log();

  // Stack summary
  const detected = Object.entries(stack)
    .filter(([k, v]) => v === true)
    .map(([k]) => k);
  if (detected.length) dim(`  Detected: ${detected.join(", ")}`);
  if (routes.length) dim(`  Routes: ${routes.join(", ")}`);
  if (colors.length) dim(`  Colors: ${colors.join(", ")}`);
  console.log();
}

// ── SERVE command ──────────────────────────────────────────────────────────

function cmdServe() {
  const serverPath = path.join(path.dirname(new URL(import.meta.url).pathname), "server.js");
  info("Starting ContextDL MCP server...");
  // Just re-run server.js — import it
  import(serverPath).catch(e => { err(e.message); process.exit(1); });
}

// ── HELP ──────────────────────────────────────────────────────────────────

function showHelp() {
  console.log();
  bold("ContextDL CLI");
  dim("  Don't write prompts. Express intent.");
  console.log();
  console.log("  Usage:");
  console.log(`  ${c.cyan}npx @contexdl/mcp${c.reset} ${c.bold}<command>${c.reset}`);
  console.log();
  console.log("  Commands:");
  console.log(`    ${c.green}init${c.reset}       Create starter /context files`);
  console.log(`    ${c.green}generate${c.reset}   Scan project and generate .ctxdl files`);
  console.log(`    ${c.green}serve${c.reset}      Start the local MCP server`);
  console.log();
  console.log("  Examples:");
  dim("    npx @contexdl/mcp init");
  dim("    npx @contexdl/mcp generate");
  dim("    npx @contexdl/mcp serve");
  console.log();
  dim("  GitHub:  https://github.com/ariferol01/contexdl");
  dim("  Hosted:  https://apidlai.com/contextdl-mcp (free)");
  dim("  Sponsor: https://github.com/sponsors/ariferol01");
  console.log();
}

// ── Router ─────────────────────────────────────────────────────────────────

switch (command) {
  case "init":     cmdInit();    break;
  case "generate": cmdGenerate(); break;
  case "serve":    cmdServe();   break;
  default:         showHelp();   break;
}
