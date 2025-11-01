# MCP Server Usage Guide

Your Pokemon MCP Server is now configured for both **Cursor** and **Gemini CLI**!

## Configuration Files

✅ **Cursor**: `.cursor/mcp.json`  
✅ **Gemini CLI**: `.gemini/settings.json`

Both use the same configuration pointing to your MCP server.

## Prerequisites

Before using the MCP server in either tool, make sure:

1. **HTTP Server is Running**

   ```bash
   cd mcp-server
   npm start
   ```
  
   The server must be running on `http://localhost:3000` for the MCP server to work.

## Using in Cursor

### 1. Start the HTTP Server

In a terminal, start the server:

```bash
cd mcp-server
npm start
```

### 2. Restart Cursor

After configuring `.cursor/mcp.json`, restart Cursor to load the MCP server.

### 3. Use Pokemon Tools

You can now ask Cursor to use Pokemon tools:

- "Get information about Pikachu using the Pokemon MCP tools"
- "What moves does Charizard have?"
- "Get details about the Fire type"

### 4. Check MCP Status

In Cursor, you should see the MCP server status. If it shows as disconnected:

- Verify the HTTP server is running
- Check the path in `.cursor/mcp.json` is correct
- Look for error messages in Cursor's MCP panel

## Using in Gemini CLI

### Start the HTTP Server

```bash
cd mcp-server
npm start
```

### Restart Gemini CLI

Restart Gemini CLI after configuring `.gemini/settings.json`

### Use Pokemon Tools

Ask Gemini to use Pokemon tools:

- "List all available Pokemon tools"
- "Get information about Pikachu"
- "What are the stats of Bulbasaur?"

## Available Tools

Your MCP server provides access to **47 Pokemon-related tools**, including:
Tools:

- getAbilityByName
- getBerryByName
- getBerryFirmnessByName
- getBerryFlavorByName
- getCharacteristicById
- getContestEffectById
- getContestTypeByName
- getEggGroupByName
- getEncounterConditionByName
- getEncounterConditionValueByName
- getEncounterMethodByName
- getEvolutionChainById
- getEvolutionTriggerByName
- getGenerationByName
- getGrowthRateByName
- getItemAttributeByName
- getItemByName
- getItemCategoryByName
- getItemFlingEffectByName
- getItemPocketByName
- getLanguageByName
- getLocationAreaByName
- getLocationByName
- getMachineById
- getMoveAilmentByName
- getMoveBattleStyleByName
- getMoveByName
- getMoveCategoryByName
- getMoveDamageClassByName
- getMoveLearnMethodByName
- getMoveTargetByName
- getNatureByName
- getPalParkAreaByName
- getPokeathlonStatByName
- getPokedexByName
- getPokemonByName
- getPokemonColorByName
- getPokemonFormByName
- getPokemonHabitatByName
- getPokemonShapeByName
- getPokemonSpeciesByName
- getRegionByName
- getStatByName
- getSuperContestEffectById
- getTypeByName
- getVersionByName
- getVersionGroupByName

## Testing the Setup

Run the test script to verify everything works:

```bash
cd mcp-server
npm run test:mcp
```

This will:

- ✅ Test the `/tools` endpoint
- ✅ Test a tool call (getPokemonByName with "pikachu")

## Troubleshooting

### MCP Server Shows as Disconnected

1. **Check HTTP Server**: Make sure it's running on port 3000

   ```bash
   curl http://localhost:3000/tools
   ```

2. **Verify Paths**: Ensure `cwd` in the config matches your project location

3. **Check Dependencies**: Make sure ts-node is installed

   ```bash
   cd mcp-server
   npm install
   ```

4. **Test MCP Server Directly**:

   ```bash
   cd mcp-server
   node -r ts-node/register src/mcp-server.ts
   ```
  
   Should start without errors (press Ctrl+C to exit)

### Tools Not Loading

- Verify HTTP server responds: `curl http://localhost:3000/tools`
- Check server logs for errors
- Ensure the MCP server can reach `http://localhost:3000`

### TypeScript Errors

If you get TypeScript compilation errors:

- Ensure `ts-node` is in devDependencies: `npm install --save-dev ts-node`
- Try compiling first: `npx tsc src/mcp-server.ts`

## Quick Reference

### Configuration Summary

```json
{
  "mcpServers": {
    "pokemon-mcp-server": {
      "command": "node",
      "args": ["-r", "ts-node/register", "mcp-server/src/mcp-server.ts"],
      "cwd": "D:\\MCP v1",
      "env": {
        "MCP_HTTP_SERVER_URL": "http://localhost:3000"
      },
      "trust": true,
      "timeout": 30000
    }
  }
}
```

### File Locations

- **MCP Server**: `mcp-server/src/mcp-server.ts`
- **HTTP Server**: `mcp-server/src/index.ts`
- **Cursor Config**: `.cursor/mcp.json`
- **Gemini Config**: `.gemini/settings.json`
- **Test Script**: `mcp-server/test-mcp-tools.ts`

## Tips

1. **Always start the HTTP server first** before using MCP tools
2. **Keep the HTTP server running** while using Cursor/Gemini CLI
3. **Restart the IDE/CLI** after making configuration changes
4. **Check both config files** if troubleshooting - they should match

Enjoy using Pokemon tools in both Cursor and Gemini CLI! 🎮
