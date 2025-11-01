# Project Specifications

This is a Documentation for the Project-specific files

- we have documentations in the `docs` folder
- we have a `Documentation_Index.md` file that is the index of all the documentation

## Project Overview

We are creating a **Model Context Protocol (MCP) Server** that allows LLMs to make tool calls for Pokemon-related data. The project integrates with [PokeAPI](https://pokeapi.co/) to provide access to 47 Pokemon-related endpoints.

The MCP server is located in the `mcp-server` folder.

## Architecture

The project consists of three main components:

### 1. HTTP API Server (`mcp-server/src/index.ts`)

- Express.js server running on `http://localhost:3000`
- Provides REST API endpoints for Pokemon data
- Routes:
  - `GET /tools` - List all available tools
  - `POST /api/tools/{toolName}` - Execute a specific tool

### 2. MCP Protocol Wrapper (`mcp-server/src/mcp-server.ts`)

- Implements the Model Context Protocol over stdio (JSON-RPC 2.0)
- Communicates with LLM clients (Cursor, Gemini CLI)
- Forwards tool calls to the HTTP API server
- Handles:
  - `initialize` - Protocol handshake
  - `tools/list` - Lists available tools
  - `tools/call` - Executes tool calls

### 3. Pokemon Tools (`mcp-server/src/api/tools/`)

- 47 tool implementations covering all PokeAPI v2 resources
- Each tool includes:
  - Tool definition (name, description, parameters)
  - Handler function that fetches data from PokeAPI
- Categories include:
  - Pokemon data (name, species, forms, etc.)
  - Moves (moves, categories, damage classes, etc.)
  - Items (items, categories, attributes, etc.)
  - Encounters (methods, conditions, locations, etc.)
  - Game mechanics (types, stats, abilities, etc.)

## System Components

### Core Files

- **`mcp-server/src/index.ts`** - HTTP API server entry point
- **`mcp-server/src/mcp-server.ts`** - MCP protocol wrapper
- **`mcp-server/src/tools.ts`** - Tool registry (exports all tools)
- **`mcp-server/src/api/index.ts`** - API routes configuration
- **`mcp-server/src/ai-helper.ts`** - Helper functions for AI assistants

### Integration Points

- **`.cursor/mcp.json`** - Cursor IDE MCP configuration
- **`.gemini/settings.json`** - Gemini CLI MCP configuration

Both configurations point to the same MCP server wrapper, which forwards requests to the HTTP API.

## Data Flow

```text
LLM Client (Cursor/Gemini CLI)
    ↓
MCP Protocol (stdio, JSON-RPC)
    ↓
MCP Wrapper (mcp-server.ts)
    ↓
HTTP API Server (index.ts)
    ↓
Tool Handlers (api/tools/*.ts)
    ↓
PokeAPI (pokeapi.co)
    ↓
Response flows back up the chain
```

## Project Structure

```text
mcp-server/
├── src/
│   ├── index.ts              # HTTP API server
│   ├── mcp-server.ts         # MCP protocol wrapper
│   ├── tools.ts              # Tool registry
│   ├── ai-helper.ts          # AI assistant helpers
│   ├── testAllTools.ts       # Comprehensive test suite
│   ├── api/
│   │   ├── index.ts          # API routes
│   │   └── tools/            # 47 tool implementations
│   └── test.ts               # Simple test script
├── .cursor/mcp.json          # Cursor MCP config
├── .gemini/settings.json     # Gemini CLI MCP config
└── package.json              # Dependencies and scripts
```

## Available Tools

The server provides **47 Pokemon-related tools**, including:

- **Pokemon**: `getPokemonByName`, `getPokemonSpeciesByName`, `getPokemonFormByName`, etc.
- **Moves**: `getMoveByName`, `getMoveCategoryByName`, `getMoveDamageClassByName`, etc.
- **Items**: `getItemByName`, `getItemCategoryByName`, `getItemAttributeByName`, etc.
- **Game Mechanics**: `getTypeByName`, `getStatByName`, `getAbilityByName`, etc.
- **Encounters**: `getLocationByName`, `getEncounterMethodByName`, etc.
- **And 26 more endpoints** covering all PokeAPI v2 resources

## Usage

1. **Start the HTTP server**: `cd mcp-server && npm start`
2. **Use in Cursor**: Configured via `.cursor/mcp.json` - restart Cursor to load
3. **Use in Gemini CLI**: Configured via `.gemini/settings.json` - restart CLI to load
4. **Direct API access**: Make HTTP requests to `http://localhost:3000`

## Testing

- **`npm run test:ai`** - Comprehensive API test (uses `ai-helper.ts`)
- **`npm run testAllTools`** - Tests all 47 tools and generates CSV report
- **`npm start`** - Start the HTTP server
- **`npm run mcp`** - Run MCP server directly for debugging

For more details, see `MCP_USAGE_GUIDE.md`.
