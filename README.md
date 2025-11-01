# PokeAPI MCP Server

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

**Use with LLM Clients:**
    **Cursor IDE**: Configured via `.cursor/mcp.json`. Restart Cursor to load the configuration.
    **Gemini CLI**: Configured via `.gemini/settings.json`. Restart the CLI to load the configuration.
