# PokeAPI MCP Server

[![npm version](https://img.shields.io/npm/v/pokeapi-mcp-server.svg)](https://www.npmjs.com/package/pokeapi-mcp-server)
[![MCP Server](https://img.shields.io/badge/MCP-Server-blue)](https://registry.modelcontextprotocol.io)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Empower your AI with Pokédex powers! Fetch and explore Pokémon data seamlessly via PokeAPI.

**Server:** `io.github.Asthanaji05/pokeapi-mcp-server`  
**npm package:** `pokeapi-mcp-server`

This project provides a Model Context Protocol (MCP) Server that enables Large Language Models (LLMs) to make tool calls for Pokémon-related data. It integrates with the [PokeAPI](https://pokeapi.co/) to offer access to 47 different Pokémon-related endpoints.

## Project Overview

The PokeAPI MCP Server acts as a bridge, allowing AI assistants to fetch and utilize comprehensive Pokémon data directly from the PokeAPI. This facilitates the development of intelligent applications that require accurate and up-to-date information about Pokémon, moves, items, game mechanics, and more.

## Available Tools

The server provides 47 Pokémon-related tools, covering a wide range of data:

* **Pokémon Data**: `getPokemonByName`, `getPokemonSpeciesByName`, `getPokemonFormByName`, `getPokemonColorByName`, `getPokemonHabitatByName`, `getPokemonShapeByName`.
* **Moves**: `getMoveByName`, `getMoveCategoryByName`, `getMoveDamageClassByName`, `getMoveAilmentByName`, `getMoveBattleStyleByName`, `getMoveLearnMethodByName`, `getMoveTargetByName`.
* **Items**: `getItemByName`, `getItemCategoryByName`, `getItemAttributeByName`, `getItemFlingEffectByName`, `getItemPocketByName`.
* **Game Mechanics**: `getTypeByName`, `getStatByName`, `getAbilityByName`, `getGrowthRateByName`, `getNatureByName`, `getEggGroupByName`, `getGenerationByName`, `getVersionByName`, `getVersionGroupByName`, `getPokedexByName`, `getLanguageByName`.
* **Encounters**: `getLocationByName`, `getLocationAreaByName`, `getEncounterMethodByName`, `getEncounterConditionByName`, `getEncounterConditionValueByName`.
* **Berries**: `getBerryByName`, `getBerryFirmnessByName`, `getBerryFlavorByName`.
* **Contests**: `getContestTypeByName`, `getContestEffectById`, `getSuperContestEffectById`.
* **Evolution**: `getEvolutionChainById`, `getEvolutionTriggerByName`.
* **Other**: `getCharacteristicById`, `getMachineById`, `getPalParkAreaByName`, `getPokeathlonStatByName`, `getRegionByName`.

## 🚀 Installation

### Global Installation

```bash
npm install -g pokeapi-mcp-server
```

## ⚙️ Configuration

After installation, add the server to your MCP client configuration:

### For Cursor IDE

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "pokemon-mcp-server": {
      "command": "npx",
      "args": [
        "pokeapi-mcp-server@1.4.0"
      ]
    }
  }
}

```

Or if installed globally:

```json
{
  "mcpServers": {
    "pokemon-mcp-server": {
      "command": "npx",
      "args": [
        "pokeapi-mcp-server@1.4.0"
      ]
    }
  }
}

```

### For Gemini CLI

Add to `.gemini/settings.json`:

```json
{
  "mcpServers": {
    "pokemon-mcp-server": {
      "command": "npx",
      "args": [
        "--yes",
        "pokeapi-mcp-server@1.4.0"
      ],
      "transport": "stdio",
      "trust": true,
      "env": {
        "MCP_HTTP_SERVER_URL": "https://pokemon-mcp-server-vs8m.onrender.com"
      }
    }
  }
}
```

> **Note:** The `env` section ensures the MCP server connects to the correct HTTP server. The remote server at `https://pokemon-mcp-server-vs8m.onrender.com` is available by default. If you're running a local HTTP server on port 3000, change the URL to `http://localhost:3000`. Restart Cursor IDE or Gemini CLI after updating the configuration to load the MCP server.

## 🔗 Links

* [npm Package](https://www.npmjs.com/package/pokeapi-mcp-server)
* [MCP Registry](https://registry.modelcontextprotocol.io)
* [GitHub Repository](https://github.com/Asthanaji05/MCP_Pokemon)
* [PokeAPI Documentation](https://pokeapi.co/docs/v2)

---

Made with ❤️ by [Asthanaji05](https://github.com/Asthanaji05)
