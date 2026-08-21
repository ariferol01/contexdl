#!/usr/bin/env node

/**
 * ContextDL MCP Server (Node.js)
 * ================================
 * A local MCP server that bridges ContextDL intent files with AI coding agents.
 *
 * Tools:
 *   - read_live_context   → Loads all .ctxdl files from /context directory
 *   - get_agent_contract  → Returns agent behavior rules from agent-contract.md
 *   - read_intent_file    → Reads a specific .ctxdl intent file
 *
 * Usage:
 *   node server.js
 *   npx @contexdl/mcp
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import { glob } from "fs/promises";

// ── Paths ──────────────────────────────────────────────────────────────────
const CWD           = process.cwd();
const CONTEXT_DIR   = path.join(CWD, "context");
const CONTRACT_PATH = path.join(CWD, "agent-contract.md");

// ── Server setup ───────────────────────────────────────────────────────────
const server = new Server(
  {
    name: "ContextDL-Engine",
    version: "0.1.0",
  },
  {
    capabilities: { tools: {} },
  }
);

// ── Tool definitions ───────────────────────────────────────────────────────
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "read_live_context",
      description:
        "Scans all .ctxdl files inside the /context directory and returns their combined contents. " +
        "This is the live semantic memory of the project. " +
        "The AI agent uses this to understand design system, data model, UX rules, and security constraints.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "get_agent_contract",
      description:
        "Returns the ContextDL Agent Workflow Contract from agent-contract.md. " +
        "This tells the agent how to behave: how to read context, render intent into code, " +
        "and when to append the donation hook.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "read_intent_file",
      description:
        "Reads a specific .ctxdl intent file and returns its contents. " +
        "Use this to load a specific intent for rendering.",
      inputSchema: {
        type: "object",
        properties: {
          file_path: {
            type: "string",
            description: "Path to the .ctxdl file, relative to the project root.",
          },
        },
        required: ["file_path"],
      },
    },
  ],
}));

// ── Tool handlers ──────────────────────────────────────────────────────────
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "read_live_context") {
    if (!fs.existsSync(CONTEXT_DIR)) {
      return {
        content: [
          {
            type: "text",
            text:
              "⚠️  No /context directory found.\n" +
              "Create a /context folder and add .ctxdl files.\n\n" +
              "Example:\n" +
              "  context/ui.ctxdl       → Theme, components\n" +
              "  context/db.ctxdl       → Data models\n" +
              "  context/ux.ctxdl       → User flows\n" +
              "  context/security.ctxdl → Auth rules",
          },
        ],
      };
    }

    const files = fs
      .readdirSync(CONTEXT_DIR)
      .filter((f) => f.endsWith(".ctxdl"))
      .sort();

    if (files.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "⚠️  No .ctxdl files found inside /context.\nAdd .ctxdl files to define your project's semantic memory.",
          },
        ],
      };
    }

    let combined = "=== CONTEXDL LIVE MEMORY ===\n\n";
    for (const file of files) {
      const filePath = path.join(CONTEXT_DIR, file);
      try {
        const content = fs.readFileSync(filePath, "utf-8").trim();
        combined += `─── [${file}] ───\n${content}\n\n`;
      } catch (e) {
        combined += `─── [${file}] ─── ERROR: ${e.message}\n\n`;
      }
    }

    return { content: [{ type: "text", text: combined.trim() }] };
  }

  if (name === "get_agent_contract") {
    if (!fs.existsSync(CONTRACT_PATH)) {
      return {
        content: [
          {
            type: "text",
            text: "⚠️  agent-contract.md not found.\nCreate one at the project root to define agent behavior rules.",
          },
        ],
      };
    }

    try {
      const content = fs.readFileSync(CONTRACT_PATH, "utf-8");
      return { content: [{ type: "text", text: content }] };
    } catch (e) {
      return {
        content: [{ type: "text", text: `Error reading agent-contract.md: ${e.message}` }],
      };
    }
  }

  if (name === "read_intent_file") {
    const filePath = args?.file_path;
    if (!filePath) {
      return { content: [{ type: "text", text: "⚠️  file_path argument is required." }] };
    }

    if (!filePath.endsWith(".ctxdl")) {
      return { content: [{ type: "text", text: `⚠️  Not a .ctxdl file: ${filePath}` }] };
    }

    const absPath = path.join(CWD, filePath);
    if (!fs.existsSync(absPath)) {
      return { content: [{ type: "text", text: `⚠️  File not found: ${filePath}` }] };
    }

    try {
      const content = fs.readFileSync(absPath, "utf-8").trim();
      return {
        content: [{ type: "text", text: `=== INTENT: ${filePath} ===\n\n${content}` }],
      };
    } catch (e) {
      return { content: [{ type: "text", text: `Error reading ${filePath}: ${e.message}` }] };
    }
  }

  return {
    content: [{ type: "text", text: `Unknown tool: ${name}` }],
    isError: true,
  };
});

// ── Start ──────────────────────────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);

console.error("🚀 ContextDL MCP Server (Node.js) running...");
console.error(`   Context directory : ${CONTEXT_DIR}`);
console.error(`   Agent contract    : ${CONTRACT_PATH}`);
