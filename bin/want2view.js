#!/usr/bin/env node
import crypto from "node:crypto";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";
import readline from "node:readline/promises";

const VERSION = "0.1.0";
const DEFAULT_WORKSPACE = ".want2view";
const APP_URL = "https://app.want2view.com/register";
const API_ACCESS_URL = "https://app.want2view.com/api-access";
const DEVELOPERS_URL = "https://want2view.com/developers";
const DEMO_RECORDS = [
  {
    platform: "youtube",
    account: "Growth Lab",
    title: "I tested 50 AI video ads. These 7 hooks won.",
    url: "https://example.com/youtube/ai-video-ads-hooks",
    views: 184000,
    likes: 9200,
    comments: 684,
    published_at: "2026-07-18",
    text: "Pattern: quantified experiment, fast proof, hook teardown, before and after examples.",
  },
  {
    platform: "reddit",
    account: "r/Entrepreneur",
    title: "Which AI ad tools are actually worth paying for?",
    url: "https://example.com/reddit/ai-ad-tools-worth-it",
    views: 46000,
    likes: 812,
    comments: 231,
    published_at: "2026-07-21",
    text: "Audience pain: people want fewer tools, clearer ROI, and examples from real campaigns.",
  },
  {
    platform: "x",
    account: "@creativeops",
    title: "The best performing AI ads show the workflow, not the prompt.",
    url: "https://example.com/x/workflow-not-prompt",
    views: 91000,
    likes: 3100,
    comments: 98,
    published_at: "2026-07-25",
    text: "Pattern: show process, show asset variations, name the business outcome.",
  },
];

const RECIPES = {
  agency: {
    title: "Agency client research",
    goal: "Turn competitor exports into a client-ready content strategy brief.",
    commands: [
      "want2view import ./client-competitors.csv",
      "want2view score",
      "want2view export --for claude",
    ],
    agent_prompt: "Read claude_brief.md and evidence.jsonl. Create a client-ready brief with competitor patterns, hooks, risks, and next experiments. Cite evidence rows.",
    paid_next_step: "Order custom research or connect the client workspace in WANT2VIEW Cloud.",
  },
  founder: {
    title: "Founder niche check",
    goal: "Check whether a niche has visible content demand before spending budget.",
    commands: [
      "want2view research \"your niche\" --demo",
      "want2view catalog categories",
      "want2view catalog export ai --for codex",
    ],
    agent_prompt: "Use the newest export as source of truth. Create a niche validation brief with pains, formats, competitor signals, landing angles, and evidence gaps.",
    paid_next_step: "Create a WANT2VIEW account for deeper catalog access, private projects, and API exports.",
  },
  monitoring: {
    title: "Content team monitoring",
    goal: "Create repeatable weekly research packs from managed social sources.",
    commands: [
      "want2view login",
      "want2view cloud research \"fitness reels\" --sources youtube,tiktok,instagram,x --mode cloud",
      "want2view cloud status w2v_run_abc123",
      "want2view cloud export w2v_run_abc123 --for codex",
    ],
    agent_prompt: "Read the exported cloud run. Create a weekly monitoring memo with source warnings, new signals, opportunities, and production recommendations.",
    paid_next_step: "Schedule refreshes and share project packs with your team in WANT2VIEW Cloud.",
  },
};

function printHelp() {
  console.log(`want2view ${VERSION}

Open-source CLI for AI-ready social content research packs.

Usage:
  want2view init [--workspace .want2view]
  want2view import <file.csv|file.json|file.jsonl> [--workspace .want2view]
  want2view research "<topic>" --demo [--out .want2view]
  want2view normalize [--workspace .want2view]
  want2view score [--workspace .want2view]
  want2view export --for codex|claude [--workspace .want2view]
  want2view login [--api https://app.want2view.com] [--token w2v_...]
  want2view auth status
  want2view doctor [--json]
  want2view recipes [agency|founder|monitoring] [--json]
  want2view catalog categories [--limit 20]
  want2view catalog videos <category_key> [--limit 20]
  want2view catalog export <category_key> --for codex|claude
  want2view projects list
  want2view project export <project_id> --for codex|claude
  want2view cloud research "<topic>" --sources youtube,tiktok,instagram,x [--mode demo|cloud]
  want2view cloud status <run_id>
  want2view cloud export <run_id> --for codex|claude

Examples:
  npx want2view research "ai video ads" --demo
  npx want2view export --for codex
  npx want2view recipes founder
  npx want2view catalog categories
  WANT2VIEW_PUBLIC_API_KEY=... npx want2view projects list
  WANT2VIEW_API_TOKEN=... npx want2view cloud research "fitness reels" --sources youtube,tiktok
`);
}

function printConversionNextSteps() {
  console.log("Next: Give the export folder to Codex or Claude as the source of truth.");
  console.log(`Next: See recipes: want2view recipes`);
  console.log(`Upgrade: ${DEVELOPERS_URL}`);
  console.log(`Upgrade: ${API_ACCESS_URL}`);
}

function parseArgs(argv) {
  const args = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) {
      args._.push(token);
      continue;
    }
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
      continue;
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

function workspacePath(args) {
  return path.resolve(String(args.workspace || args.out || DEFAULT_WORKSPACE));
}

function userConfigPath() {
  const configHome = process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config");
  return path.join(configHome, "want2view", "config.json");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function readText(filePath) {
  return fs.readFileSync(filePath, "utf8");
}

function writeJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

function writePrivateJson(filePath, value) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, { mode: 0o600 });
  try {
    fs.chmodSync(filePath, 0o600);
  } catch {
    // Best effort on platforms that support POSIX permissions.
  }
}

function writeJsonl(filePath, rows) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`);
}

function readJsonl(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return readText(filePath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function slugify(value) {
  return String(value || "research")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72) || "research";
}

function stableId(value) {
  return crypto.createHash("sha1").update(JSON.stringify(value)).digest("hex").slice(0, 16);
}

function initWorkspace(root) {
  ensureDir(path.join(root, "data"));
  ensureDir(path.join(root, "exports"));
  const configPath = path.join(root, "want2view.config.json");
  if (!fs.existsSync(configPath)) {
    writeJson(configPath, {
      version: VERSION,
      api_base_url: "https://api.want2view.com",
      token_env: "WANT2VIEW_API_TOKEN",
      public_api_key_env: "WANT2VIEW_PUBLIC_API_KEY",
      created_at: new Date().toISOString(),
    });
  }
  return configPath;
}

function readJsonIfExists(filePath) {
  if (!fs.existsSync(filePath)) return {};
  try {
    return JSON.parse(readText(filePath));
  } catch {
    return {};
  }
}

function readWorkspaceConfig(root) {
  initWorkspace(root);
  return readJsonIfExists(path.join(root, "want2view.config.json"));
}

function readUserConfig() {
  return readJsonIfExists(userConfigPath());
}

function apiBaseUrl(args, root = workspacePath(args)) {
  const workspaceConfig = readWorkspaceConfig(root);
  const userConfig = readUserConfig();
  return String(args.api || process.env.WANT2VIEW_API_BASE_URL || userConfig.api_base_url || workspaceConfig.api_base_url || "https://api.want2view.com").replace(/\/+$/, "");
}

function apiToken() {
  return process.env.WANT2VIEW_API_TOKEN || readUserConfig().api_token || "";
}

function publicApiKey() {
  return process.env.WANT2VIEW_PUBLIC_API_KEY || readUserConfig().public_api_key || "";
}

function tokenSource() {
  if (process.env.WANT2VIEW_API_TOKEN) return "env";
  if (readUserConfig().api_token) return "config";
  return "missing";
}

function maskToken(token) {
  if (!token) return "";
  return `${token.slice(0, 8)}...${token.slice(-4)}`;
}

function openUrl(url) {
  const platform = process.platform;
  const command = platform === "darwin" ? "open" : platform === "win32" ? "cmd" : "xdg-open";
  const args = platform === "win32" ? ["/c", "start", "", url] : [url];
  const child = spawn(command, args, { detached: true, stdio: "ignore" });
  child.unref();
}

async function promptLine(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

async function verifyToken(base, token) {
  return await requestJson(`${base}/api/v1/developer/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function saveUserToken(apiBase, token) {
  const userConfig = readUserConfig();
  userConfig.api_base_url = apiBase;
  userConfig.api_token = token.trim();
  writePrivateJson(userConfigPath(), userConfig);
}

async function requestJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "User-Agent": `want2view-cli/${VERSION}`,
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  if (!response.ok) {
    throw new Error(data.detail || data.message || `HTTP ${response.status}`);
  }
  return data;
}

function parseLimit(args, fallback = 20, max = 100) {
  const raw = Number(args.limit || fallback);
  if (!Number.isFinite(raw) || raw < 1) return fallback;
  return Math.min(max, Math.floor(raw));
}

function requirePublicApiKey() {
  const key = publicApiKey();
  if (!key) {
    throw new Error("Missing WANT2VIEW_PUBLIC_API_KEY. Create an API key in WANT2VIEW API Access and export WANT2VIEW_PUBLIC_API_KEY=\"...\".");
  }
  return key;
}

function parseCsv(text) {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (!lines.length) return [];
  const headers = splitCsvLine(lines[0]).map((header) => header.trim());
  return lines.slice(1).map((line) => {
    const values = splitCsvLine(line);
    return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
  });
}

function splitCsvLine(line) {
  const values = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === "\"" && quoted && next === "\"") {
      current += "\"";
      index += 1;
      continue;
    }
    if (char === "\"") {
      quoted = !quoted;
      continue;
    }
    if (char === "," && !quoted) {
      values.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  values.push(current);
  return values;
}

function normalizeRecord(row, source = "import") {
  const title = row.title || row.name || row.text || row.caption || row.description || "Untitled content";
  const platform = String(row.platform || row.source || source || "import").toLowerCase();
  const url = row.url || row.link || row.source_url || "";
  const normalized = {
    id: row.id || stableId({ platform, title, url }),
    platform,
    account: row.account || row.channel || row.author || row.username || "",
    title,
    url,
    text: row.text || row.caption || row.description || "",
    views: Number(row.views || row.view_count || 0) || 0,
    likes: Number(row.likes || row.like_count || 0) || 0,
    comments: Number(row.comments || row.comment_count || 0) || 0,
    published_at: row.published_at || row.date || "",
    imported_at: new Date().toISOString(),
  };
  return normalized;
}

function scoreRecord(row) {
  const engagement = row.likes * 2 + row.comments * 5;
  const reach = Math.log10(Math.max(row.views, 1)) * 18;
  const density = row.views > 0 ? Math.min(30, (engagement / row.views) * 1000) : 0;
  return {
    ...row,
    score: Math.round(Math.min(100, reach + density)),
    score_reason: "Weighted reach plus engagement density.",
  };
}

function loadRows(root) {
  const candidates = [
    path.join(root, "data", "scored.jsonl"),
    path.join(root, "data", "normalized.jsonl"),
    path.join(root, "data", "imported.jsonl"),
    path.join(root, "data", "demo.jsonl"),
  ];
  for (const filePath of candidates) {
    const rows = readJsonl(filePath);
    if (rows.length) return rows;
  }
  return [];
}

function toCsv(rows) {
  const headers = ["id", "platform", "account", "title", "url", "views", "likes", "comments", "score", "score_reason"];
  const escape = (value) => {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replaceAll("\"", "\"\"")}"` : text;
  };
  return `${headers.join(",")}\n${rows.map((row) => headers.map((header) => escape(row[header])).join(",")).join("\n")}\n`;
}

function buildSummary(topic, rows) {
  const topRows = [...rows].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 5);
  const platforms = [...new Set(rows.map((row) => row.platform).filter(Boolean))].join(", ") || "local import";
  return `# WANT2VIEW Research Pack: ${topic}

## What This Is

This is a local, open-source WANT2VIEW context pack for AI content research.

## Coverage

- Records: ${rows.length}
- Platforms: ${platforms}
- Generated at: ${new Date().toISOString()}

## Top Signals

${topRows.map((row, index) => `${index + 1}. ${row.title} (${row.platform}, score ${row.score ?? "n/a"})`).join("\n")}

## Upgrade Path

Use WANT2VIEW Cloud when you need managed TikTok, Instagram, X, Threads, scheduled refreshes, team workspaces, and deeper historical indexes.
`;
}

function buildCodexTasks(topic, rows) {
  return `# Codex Tasks: ${topic}

1. Inspect \`manifest.json\`, \`summary.md\`, \`evidence.jsonl\`, and \`scored.csv\`.
2. Identify the top repeated hooks, formats, pains, and creator patterns.
3. Turn the strongest findings into product copy, landing sections, scripts, or content briefs.
4. Keep every recommendation linked to evidence rows by \`id\`.

## Suggested Implementation Prompts

- "Use this pack to create a landing section for ${topic}."
- "Create 10 short-form video scripts from the strongest evidence."
- "Find gaps in the current content strategy using the scored records."

## Evidence Count

${rows.length} records.
`;
}

function buildClaudeBrief(topic, rows) {
  const topRows = [...rows].sort((a, b) => (b.score || 0) - (a.score || 0)).slice(0, 8);
  return `# Claude Brief: ${topic}

You are analyzing a WANT2VIEW source-of-truth pack. Use the evidence conservatively and separate observed patterns from recommendations.

## Objective

Create a strategic content brief from the evidence.

## Strongest Evidence

${topRows.map((row) => `- ${row.title} | ${row.platform} | score ${row.score ?? "n/a"} | ${row.url || "no url"}`).join("\n")}

## Requested Output

- audience pains;
- repeated hooks;
- content angles;
- script ideas;
- risks and evidence gaps;
- next research questions.
`;
}

function commandInit(args) {
  const root = workspacePath(args);
  const configPath = initWorkspace(root);
  console.log(`Initialized WANT2VIEW workspace: ${root}`);
  console.log(`Config: ${configPath}`);
}

function commandImport(args) {
  const input = args._[1];
  if (!input) throw new Error("Missing input file. Example: want2view import ./competitors.csv");
  const root = workspacePath(args);
  initWorkspace(root);
  const inputPath = path.resolve(input);
  const ext = path.extname(inputPath).toLowerCase();
  const text = readText(inputPath);
  let rows = [];
  if (ext === ".jsonl") rows = text.split(/\r?\n/).filter(Boolean).map((line) => JSON.parse(line));
  else if (ext === ".json") rows = JSON.parse(text);
  else if (ext === ".csv") rows = parseCsv(text);
  else throw new Error(`Unsupported file type: ${ext}`);
  if (!Array.isArray(rows)) rows = rows.items || rows.records || [];
  const normalized = rows.map((row) => normalizeRecord(row, "import"));
  writeJsonl(path.join(root, "data", "imported.jsonl"), normalized);
  console.log(`Imported ${normalized.length} records into ${root}`);
}

function commandResearch(args) {
  const topic = args._[1] || "demo research";
  const root = workspacePath(args);
  initWorkspace(root);
  if (!args.demo) {
    console.log("Local live connectors are intentionally limited in the OSS skeleton.");
    console.log("Use --demo, import your own data, or run `want2view cloud research` with WANT2VIEW Cloud.");
    return;
  }
  const rows = DEMO_RECORDS.map((row) => normalizeRecord({ ...row, topic }, row.platform)).map(scoreRecord);
  writeJsonl(path.join(root, "data", "demo.jsonl"), rows);
  writeJson(path.join(root, "manifest.seed.json"), {
    topic,
    mode: "demo",
    records: rows.length,
    generated_at: new Date().toISOString(),
  });
  console.log(`Created demo research for "${topic}" with ${rows.length} records.`);
  console.log(`Workspace: ${root}`);
  console.log("Next: want2view export --for codex");
  console.log("Next: want2view export --for claude");
}

function commandNormalize(args) {
  const root = workspacePath(args);
  initWorkspace(root);
  const rows = readJsonl(path.join(root, "data", "imported.jsonl")).map((row) => normalizeRecord(row));
  writeJsonl(path.join(root, "data", "normalized.jsonl"), rows);
  console.log(`Normalized ${rows.length} records.`);
}

function commandScore(args) {
  const root = workspacePath(args);
  initWorkspace(root);
  const rows = loadRows(root).map(scoreRecord);
  writeJsonl(path.join(root, "data", "scored.jsonl"), rows);
  console.log(`Scored ${rows.length} records.`);
}

function commandExport(args) {
  const target = String(args.for || "").toLowerCase();
  if (!["codex", "claude"].includes(target)) {
    throw new Error("Missing export target. Use: want2view export --for codex|claude");
  }
  const root = workspacePath(args);
  initWorkspace(root);
  const rows = loadRows(root).map((row) => (row.score === undefined ? scoreRecord(row) : row));
  if (!rows.length) throw new Error("No records found. Run `want2view research --demo` or `want2view import` first.");
  const topic = args.topic || "local research";
  const exportId = `${slugify(topic)}-${Date.now()}`;
  const exportDir = path.join(root, "exports", exportId);
  ensureDir(exportDir);
  fs.writeFileSync(path.join(exportDir, "summary.md"), buildSummary(topic, rows));
  fs.writeFileSync(path.join(exportDir, "scored.csv"), toCsv(rows));
  writeJsonl(path.join(exportDir, "evidence.jsonl"), rows);
  fs.writeFileSync(path.join(exportDir, target === "codex" ? "codex_tasks.md" : "claude_brief.md"), target === "codex" ? buildCodexTasks(topic, rows) : buildClaudeBrief(topic, rows));
  writeJson(path.join(exportDir, "manifest.json"), {
    pack_id: exportId,
    target,
    topic,
    records: rows.length,
    artifacts: ["summary.md", "evidence.jsonl", "scored.csv", target === "codex" ? "codex_tasks.md" : "claude_brief.md"],
    generated_at: new Date().toISOString(),
    upgrade_url: APP_URL,
    developer_url: DEVELOPERS_URL,
    api_access_url: API_ACCESS_URL,
  });
  console.log(`Exported ${target} context pack: ${exportDir}`);
  printConversionNextSteps();
}

function commandRecipes(args) {
  const recipeKey = args._[1];
  if (args.json) {
    const payload = recipeKey ? { [recipeKey]: RECIPES[recipeKey] } : RECIPES;
    if (recipeKey && !RECIPES[recipeKey]) throw new Error(`Unknown recipe: ${recipeKey}. Use agency, founder, or monitoring.`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  if (!recipeKey) {
    console.log("WANT2VIEW CLI recipes:");
    Object.entries(RECIPES).forEach(([key, recipe]) => {
      console.log(`- ${key}: ${recipe.title}`);
      console.log(`  ${recipe.goal}`);
    });
    console.log("\nOpen a recipe: want2view recipes founder");
    console.log(`Developer page: ${DEVELOPERS_URL}`);
    return;
  }
  const recipe = RECIPES[recipeKey];
  if (!recipe) throw new Error(`Unknown recipe: ${recipeKey}. Use agency, founder, or monitoring.`);
  console.log(`# ${recipe.title}`);
  console.log(`Goal: ${recipe.goal}`);
  console.log("\nCommands:");
  recipe.commands.forEach((command) => console.log(`  ${command}`));
  console.log("\nAgent prompt:");
  console.log(`  ${recipe.agent_prompt}`);
  console.log("\nWANT2VIEW next step:");
  console.log(`  ${recipe.paid_next_step}`);
  console.log(`  ${DEVELOPERS_URL}`);
}

async function commandLogin(args) {
  const root = workspacePath(args);
  const configPath = initWorkspace(root);
  const apiBase = args.api || "https://api.want2view.com";
  const config = JSON.parse(readText(configPath));
  config.api_base_url = apiBase;
  config.token_env = "WANT2VIEW_API_TOKEN";
  writeJson(configPath, config);

  const userConfig = readUserConfig();
  userConfig.api_base_url = apiBase;
  if (args.token) {
    const token = String(args.token).trim();
    saveUserToken(apiBase, token);
    console.log(`Saved WANT2VIEW API token to ${userConfigPath()}`);
    console.log("Token file permissions were set to 0600 where supported.");
    try {
      const me = await verifyToken(apiBase, token);
      console.log(`Authenticated as ${me.username} (user ${me.user_id})`);
    } catch (error) {
      console.log(`Token saved, but verification failed: ${error.message}`);
      process.exitCode = 2;
    }
    return;
  }

  if (!process.stdin.isTTY || args.noInteractive || args["no-interactive"]) {
    console.log(`Configured WANT2VIEW API base: ${apiBase}`);
    console.log("Create an account at https://app.want2view.com/register and create a Developer API token.");
    console.log("Then run one of:");
    console.log("  export WANT2VIEW_API_TOKEN=\"w2v_...\"");
    console.log("  want2view login --token w2v_...");
    console.log("Project files never receive API tokens.");
    return;
  }

  console.log("WANT2VIEW CLI login");
  console.log(`API base: ${apiBase}`);
  console.log("");
  console.log("Choose authentication method:");
  console.log("  1. Open browser and create/paste Developer CLI token");
  console.log("  2. Paste API token now");
  console.log("  3. Use WANT2VIEW_API_TOKEN from environment");
  console.log("  4. Skip for now");
  const choice = await promptLine("Select 1-4: ");

  try {
    const loginInfo = await requestJson(`${apiBase}/api/v1/developer/cli/login`);
    if (choice === "1") {
      const targetUrl = `${loginInfo.login_url || "https://app.want2view.com/login"}?redirect=${encodeURIComponent("/api-access")}`;
      console.log(`Opening browser: ${targetUrl}`);
      try {
        openUrl(targetUrl);
      } catch {
        console.log(`Open this URL manually: ${targetUrl}`);
      }
      console.log("In WANT2VIEW, open API Access, create a Developer CLI token, then paste it below.");
      const token = await promptLine("Paste token (w2v_...): ");
      if (!token) throw new Error("No token pasted.");
      saveUserToken(apiBase, token);
      const me = await verifyToken(apiBase, token);
      console.log(`Authenticated as ${me.username} (user ${me.user_id})`);
      console.log(`Saved token to ${userConfigPath()}`);
      return;
    }
    if (choice === "2") {
      const token = await promptLine("Paste token (w2v_...): ");
      if (!token) throw new Error("No token pasted.");
      saveUserToken(apiBase, token);
      const me = await verifyToken(apiBase, token);
      console.log(`Authenticated as ${me.username} (user ${me.user_id})`);
      console.log(`Saved token to ${userConfigPath()}`);
      return;
    }
    if (choice === "3") {
      const token = process.env.WANT2VIEW_API_TOKEN || "";
      if (!token) {
        console.log("WANT2VIEW_API_TOKEN is not set.");
        console.log("Run: export WANT2VIEW_API_TOKEN=\"w2v_...\"");
        process.exitCode = 2;
        return;
      }
      const me = await verifyToken(apiBase, token);
      console.log(`Authenticated as ${me.username} (user ${me.user_id})`);
      console.log("Using token from environment; nothing was written to config.");
      return;
    }
    console.log("Skipped. You can still use local demo/import/export without authentication.");
    console.log("Run `want2view login` again when you want cloud connectors.");
  } catch (error) {
    if (choice === "1" || choice === "2" || choice === "3") {
      throw error;
    }
    console.log("Create an account at https://app.want2view.com/register and create a Developer API token.");
  }
}

async function commandAuth(args) {
  const action = args._[1] || "status";
  if (action !== "status") throw new Error(`Unknown auth command: ${action}`);
  const token = apiToken();
  if (!token) {
    console.log("Not authenticated. Run `want2view login` or set WANT2VIEW_API_TOKEN.");
    process.exitCode = 2;
    return;
  }
  const base = apiBaseUrl(args);
  const me = await requestJson(`${base}/api/v1/developer/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log(`Authenticated as ${me.username} (user ${me.user_id})`);
  if (me.token_prefix) console.log(`Token: ${me.token_prefix}...`);
}

async function commandDoctor(args) {
  const root = workspacePath(args);
  const base = apiBaseUrl(args, root);
  const token = apiToken();
  const payload = {
    version: VERSION,
    workspace: root,
    api_base_url: base,
    user_config_path: userConfigPath(),
    auth: {
      available: Boolean(token),
      source: tokenSource(),
      token_preview: token ? maskToken(token) : null,
      verified: false,
      username: null,
      user_id: null,
    },
    public_api: {
      available: Boolean(publicApiKey()),
      source: process.env.WANT2VIEW_PUBLIC_API_KEY ? "env" : (readUserConfig().public_api_key ? "config" : "missing"),
    },
    local: {
      workspace_exists: fs.existsSync(root),
      records_available: loadRows(root).length,
    },
    next_steps: [],
  };
  if (token) {
    try {
      const me = await verifyToken(base, token);
      payload.auth.verified = true;
      payload.auth.username = me.username;
      payload.auth.user_id = me.user_id;
    } catch (error) {
      payload.auth.error = error.message;
      payload.next_steps.push("Run `want2view login` or set a valid WANT2VIEW_API_TOKEN.");
    }
  } else {
    payload.next_steps.push("Run `want2view login` for cloud connectors.");
  }
  if (!payload.local.records_available) {
    payload.next_steps.push("Run `want2view research \"ai video ads\" --demo` for a local pack.");
  }
  if (!payload.public_api.available) {
    payload.next_steps.push("Set WANT2VIEW_PUBLIC_API_KEY to list/export your WANT2VIEW projects.");
  }
  if (args.json) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }
  console.log(`want2view ${payload.version}`);
  console.log(`Workspace: ${payload.workspace}`);
  console.log(`API: ${payload.api_base_url}`);
  console.log(`Auth: ${payload.auth.available ? `${payload.auth.source} (${payload.auth.verified ? "verified" : "not verified"})` : "missing"}`);
  console.log(`Public API key: ${payload.public_api.available ? payload.public_api.source : "missing"}`);
  if (payload.auth.username) console.log(`User: ${payload.auth.username}`);
  console.log(`Local records: ${payload.local.records_available}`);
  payload.next_steps.forEach((step) => console.log(`Next: ${step}`));
}

function writeCloudExport(root, payload) {
  const exportDir = path.join(root, "exports", payload.run_id);
  ensureDir(exportDir);
  for (const [fileName, content] of Object.entries(payload.files || {})) {
    fs.writeFileSync(path.join(exportDir, fileName), String(content));
  }
  return exportDir;
}

function writePack(root, packId, target, files) {
  const exportDir = path.join(root, "exports", packId);
  ensureDir(exportDir);
  for (const [fileName, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(exportDir, fileName), String(content));
  }
  console.log(`Exported ${target} context pack: ${exportDir}`);
  return exportDir;
}

function recordsToEvidence(rows) {
  return `${rows.map((row) => JSON.stringify(row)).join("\n")}\n`;
}

function packManifest(packId, target, topic, artifacts, extra = {}) {
  return JSON.stringify({
    pack_id: packId,
    target,
    topic,
    artifacts,
    generated_at: new Date().toISOString(),
    ...extra,
  }, null, 2);
}

async function commandCatalog(args) {
  const action = args._[1] || "categories";
  const root = workspacePath(args);
  initWorkspace(root);
  const base = apiBaseUrl(args, root);
  const language = args.language || "en";
  if (action === "categories") {
    const data = await requestJson(`${base}/public/api/v1/catalog/categories?language=${encodeURIComponent(language)}`);
    const items = (data.items || []).slice(0, parseLimit(args, 30, 100));
    if (args.json) {
      console.log(JSON.stringify({ items, count: items.length }, null, 2));
      return;
    }
    items.forEach((item) => {
      console.log(`${item.category_key || item.key}\t${item.title}\t${item.channel_count || 0} channels`);
    });
    return;
  }
  if (action === "videos") {
    const category = args._[2];
    if (!category) throw new Error("Missing category key. Example: want2view catalog videos ai");
    const limit = parseLimit(args, 20, 100);
    const data = await requestJson(`${base}/public/api/v1/catalog/categories/${encodeURIComponent(category)}/videos?language=${encodeURIComponent(language)}&limit=${limit}`);
    if (args.json) {
      console.log(JSON.stringify(data, null, 2));
      return;
    }
    (data.items || []).forEach((item) => {
      console.log(`${item.views || 0}\t${item.channel_title || ""}\t${item.title || ""}\t${item.url || ""}`);
    });
    return;
  }
  if (action === "export") {
    const category = args._[2];
    const target = String(args.for || "codex").toLowerCase();
    if (!category) throw new Error("Missing category key. Example: want2view catalog export ai --for codex");
    if (!["codex", "claude"].includes(target)) throw new Error("Use --for codex|claude");
    const limit = parseLimit(args, 25, 100);
    const [summary, videos] = await Promise.all([
      requestJson(`${base}/public/api/v1/catalog/categories/${encodeURIComponent(category)}/summary?language=${encodeURIComponent(language)}`).catch(() => ({})),
      requestJson(`${base}/public/api/v1/catalog/categories/${encodeURIComponent(category)}/videos?language=${encodeURIComponent(language)}&limit=${limit}`).catch(() => ({ items: [] })),
    ]);
    const rows = (videos.items || []).map((item) => normalizeRecord({
      platform: "youtube",
      account: item.channel_title,
      title: item.title,
      url: item.url,
      views: item.views,
      likes: item.likes,
      comments: item.comments,
      published_at: item.published_at,
      text: item.description,
    }, "catalog")).map(scoreRecord);
    const packId = `catalog-${slugify(category)}-${Date.now()}`;
    const files = {
      "manifest.json": packManifest(packId, target, `catalog:${category}`, ["summary.md", "evidence.jsonl", "scored.csv", target === "codex" ? "codex_tasks.md" : "claude_brief.md"], { category_key: category }),
      "summary.md": `# WANT2VIEW Catalog: ${category}\n\n${summary.summary_long || summary.summary_short || "Catalog evidence exported from WANT2VIEW."}\n\nRecords: ${rows.length}\n`,
      "evidence.jsonl": recordsToEvidence(rows),
      "scored.csv": toCsv(rows),
      [target === "codex" ? "codex_tasks.md" : "claude_brief.md"]: target === "codex" ? buildCodexTasks(`catalog:${category}`, rows) : buildClaudeBrief(`catalog:${category}`, rows),
    };
    writePack(root, packId, target, files);
    return;
  }
  throw new Error("Unknown catalog command. Use `catalog categories`, `catalog videos`, or `catalog export`.");
}

async function commandProjects(args) {
  const root = workspacePath(args);
  initWorkspace(root);
  const base = apiBaseUrl(args, root);
  const key = requirePublicApiKey();
  const data = await requestJson(`${base}/public/projects`, {
    headers: { "X-API-Key": key },
  });
  if (args.json) {
    console.log(JSON.stringify(data, null, 2));
    return;
  }
  const items = Array.isArray(data) ? data : (data.items || []);
  items.forEach((item) => {
    console.log(`${item.competitor_analysis_id || item.id || item.analysis_id}\t${item.name || item.title || item.query || "Untitled project"}`);
  });
}

async function commandProject(args) {
  const action = args._[1];
  const projectId = args._[2];
  const target = String(args.for || "codex").toLowerCase();
  if (action !== "export") throw new Error("Unknown project command. Use `project export <project_id> --for codex|claude`.");
  if (!projectId) throw new Error("Missing project id.");
  if (!["codex", "claude"].includes(target)) throw new Error("Use --for codex|claude");
  const root = workspacePath(args);
  initWorkspace(root);
  const base = apiBaseUrl(args, root);
  const key = requirePublicApiKey();
  const headers = { "X-API-Key": key };
  const [overview, videos, channels, trends, keywords] = await Promise.all([
    requestJson(`${base}/public/projects/${encodeURIComponent(projectId)}/overview`, { headers }).catch(() => ({})),
    requestJson(`${base}/public/projects/${encodeURIComponent(projectId)}/videos`, { headers }).catch(() => ({ items: [] })),
    requestJson(`${base}/public/projects/${encodeURIComponent(projectId)}/channels`, { headers }).catch(() => ({ items: [] })),
    requestJson(`${base}/public/projects/${encodeURIComponent(projectId)}/trends`, { headers }).catch(() => ({ items: [] })),
    requestJson(`${base}/public/projects/${encodeURIComponent(projectId)}/keywords`, { headers }).catch(() => ({ items: [] })),
  ]);
  const videoRows = (videos.items || []).map((item) => normalizeRecord({
    platform: item.platform || "youtube",
    account: item.channel_title || item.channel || item.author,
    title: item.title,
    url: item.url,
    views: item.views,
    likes: item.likes,
    comments: item.comments,
    published_at: item.published_at,
    text: item.description || item.reason,
  }, "project")).map(scoreRecord);
  const topic = `project:${projectId}`;
  const packId = `${slugify(topic)}-${Date.now()}`;
  const summary = `# WANT2VIEW Project Export: ${projectId}\n\n## Overview\n\n${JSON.stringify(overview, null, 2)}\n\n## Counts\n\n- Videos: ${videoRows.length}\n- Channels: ${(channels.items || []).length}\n- Trends: ${(trends.items || []).length}\n- Keywords: ${(keywords.items || []).length}\n`;
  const files = {
    "manifest.json": packManifest(packId, target, topic, ["summary.md", "evidence.jsonl", "scored.csv", "channels.json", "trends.json", "keywords.json", target === "codex" ? "codex_tasks.md" : "claude_brief.md"], { project_id: projectId }),
    "summary.md": summary,
    "evidence.jsonl": recordsToEvidence(videoRows),
    "scored.csv": toCsv(videoRows),
    "channels.json": JSON.stringify(channels, null, 2),
    "trends.json": JSON.stringify(trends, null, 2),
    "keywords.json": JSON.stringify(keywords, null, 2),
    [target === "codex" ? "codex_tasks.md" : "claude_brief.md"]: target === "codex" ? buildCodexTasks(topic, videoRows) : buildClaudeBrief(topic, videoRows),
  };
  writePack(root, packId, target, files);
}

async function commandCloud(args) {
  const action = args._[1];
  const token = apiToken();
  if (!token) {
    console.log("Cloud mode needs WANT2VIEW_API_TOKEN.");
    console.log("Run `want2view login`, create an account, then set a token with env or `want2view login --token w2v_...`.");
    process.exitCode = 2;
    return;
  }
  const root = workspacePath(args);
  initWorkspace(root);
  const base = apiBaseUrl(args, root);
  if (action === "research") {
    const topic = args._[2] || "";
    if (!topic) throw new Error("Missing topic. Example: want2view cloud research \"ai video ads\"");
    const payload = {
      topic,
      sources: String(args.sources || "youtube,reddit").split(",").map((item) => item.trim()).filter(Boolean),
      mode: args.mode === "cloud" ? "cloud" : "demo",
      kind: "outliers",
      language: args.language || "en",
      region_code: args.region || args.region_code || "US",
      lookback_hours: Number(args.lookback || args.lookback_hours || 72),
      limit: Number(args.limit || 25),
      content_type: args.content_type || "all",
    };
    const result = await requestJson(`${base}/api/v1/developer/cloud/research`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    writeJson(path.join(root, "last-cloud-run.json"), result);
    console.log(`Cloud run ${result.run_id}: ${result.status}`);
    console.log(`Records: ${result.records}`);
    if (result.warnings?.length) result.warnings.forEach((warning) => console.log(`Warning: ${warning}`));
    (result.next_commands || []).forEach((command) => console.log(`Next: ${command}`));
    return;
  }
  if (action === "status") {
    const runId = args._[2];
    if (!runId) throw new Error("Missing run id. Example: want2view cloud status w2v_run_...");
    const result = await requestJson(`${base}/api/v1/developer/cloud/runs/${encodeURIComponent(runId)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(`Cloud run ${result.run_id}: ${result.status}`);
    console.log(`Topic: ${result.topic}`);
    console.log(`Records: ${result.records}`);
    if (result.source_statuses) {
      Object.entries(result.source_statuses).forEach(([source, status]) => console.log(`Source ${source}: ${status}`));
    }
    if (result.warnings?.length) result.warnings.forEach((warning) => console.log(`Warning: ${warning}`));
    (result.next_commands || []).forEach((command) => console.log(`Next: ${command}`));
    return;
  }
  if (action === "export") {
    const runId = args._[2];
    if (!runId) throw new Error("Missing run id. Example: want2view cloud export w2v_run_... --for codex");
    const target = String(args.for || "codex").toLowerCase();
    if (!["codex", "claude"].includes(target)) throw new Error("Use --for codex|claude");
    const result = await requestJson(`${base}/api/v1/developer/cloud/runs/${encodeURIComponent(runId)}/export?target=${target}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const exportDir = writeCloudExport(root, result);
    console.log(`Downloaded ${target} cloud context pack: ${exportDir}`);
    return;
  }
  throw new Error("Unknown cloud command. Use `cloud research`, `cloud status`, or `cloud export`.");
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0];
  try {
    if (!command || command === "help" || args.help) return printHelp();
    if (command === "version" || args.version) return console.log(VERSION);
    if (command === "init") return commandInit(args);
    if (command === "import") return commandImport(args);
    if (command === "research") return commandResearch(args);
    if (command === "normalize") return commandNormalize(args);
    if (command === "score") return commandScore(args);
    if (command === "export") return commandExport(args);
    if (command === "login") return await commandLogin(args);
    if (command === "auth") return await commandAuth(args);
    if (command === "doctor") return await commandDoctor(args);
    if (command === "recipes") return commandRecipes(args);
    if (command === "catalog") return await commandCatalog(args);
    if (command === "projects") return await commandProjects(args);
    if (command === "project") return await commandProject(args);
    if (command === "cloud") return await commandCloud(args);
    throw new Error(`Unknown command: ${command}`);
  } catch (error) {
    console.error(`want2view: ${error.message}`);
    process.exitCode = 1;
  }
}

await main();
