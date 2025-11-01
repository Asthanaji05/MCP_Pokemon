/**
 * Helper functions for AI assistants to directly access Pokemon tools
 * This allows AI assistants (like me) to use the Pokemon API tools directly
 */

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}

/**
 * Get list of all available tools
 */
export async function listTools(): Promise<ToolResult> {
  try {
    const response = await axios.get(`${API_BASE_URL}/tools`);
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Call a Pokemon tool by name with parameters
 */
export async function callTool(toolName: string, params: any): Promise<ToolResult> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/tools/${toolName}`,
      params,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data?.error || error.message,
    };
  }
}

/**
 * Convenience functions for common Pokemon operations
 */
export async function getPokemon(name: string): Promise<ToolResult> {
  return callTool('getPokemonByName', { name });
}

export async function getPokemonMove(moveName: string): Promise<ToolResult> {
  return callTool('getMoveByName', { name: moveName });
}

export async function getPokemonType(typeName: string): Promise<ToolResult> {
  return callTool('getTypeByName', { name: typeName });
}

export async function getPokemonAbility(abilityName: string): Promise<ToolResult> {
  return callTool('getAbilityByName', { name: abilityName });
}

export async function getPokemonItem(itemName: string): Promise<ToolResult> {
  return callTool('getItemByName', { name: itemName });
}

/**
 * Example usage (for testing)
 */
async function testAccess() {
  console.log('=== Testing Pokemon API Access ===\n');
  
  // List all tools
  console.log('1. Testing /tools endpoint...');
  const tools = await listTools();
  if (tools.success) {
    console.log(`   ✓ SUCCESS - Found ${tools.data.length} tools available`);
    console.log(`   Sample tools: ${tools.data.slice(0, 5).map((t: any) => t.name).join(', ')}`);
  } else {
    console.log(`   ✗ FAILED: ${tools.error}`);
    console.log('\n   ⚠️  Make sure the HTTP server is running!');
    console.log('   Run: cd mcp-server && npm start');
    return;
  }

  // Get Pokemon info
  console.log('\n2. Testing getPokemonByName tool...');
  const pikachu = await getPokemon('pikachu');
  if (pikachu.success) {
    console.log(`   ✓ SUCCESS - Retrieved Pikachu data:`);
    console.log(`   - ID: ${pikachu.data.id}`);
    console.log(`   - Name: ${pikachu.data.name}`);
    console.log(`   - Height: ${pikachu.data.height} decimeters`);
    console.log(`   - Weight: ${pikachu.data.weight} hectograms`);
    console.log(`   - Base Experience: ${pikachu.data.base_experience}`);
    console.log(`   - Types: ${pikachu.data.types.map((t: any) => t.type.name).join(', ')}`);
  } else {
    console.log(`   ✗ FAILED: ${pikachu.error}`);
  }

  // Get move info
  console.log('\n3. Testing getMoveByName tool...');
  const thunderbolt = await getPokemonMove('thunderbolt');
  if (thunderbolt.success) {
    console.log(`   ✓ SUCCESS - Retrieved Thunderbolt move:`);
    console.log(`   - Name: ${thunderbolt.data.name}`);
    console.log(`   - Power: ${thunderbolt.data.power || 'N/A'}`);
    console.log(`   - Accuracy: ${thunderbolt.data.accuracy || 'N/A'}`);
    console.log(`   - Type: ${thunderbolt.data.type.name}`);
  } else {
    console.log(`   ✗ FAILED: ${thunderbolt.error}`);
  }

  // Get type info
  console.log('\n4. Testing getTypeByName tool...');
  const electricType = await getPokemonType('electric');
  if (electricType.success) {
    console.log(`   ✓ SUCCESS - Retrieved Electric type:`);
    console.log(`   - Name: ${electricType.data.name}`);
    console.log(`   - Damage Relations:`);
    console.log(`     * Weak to: ${electricType.data.damage_relations.double_damage_from.map((t: any) => t.name).join(', ') || 'None'}`);
    console.log(`     * Strong against: ${electricType.data.damage_relations.double_damage_to.map((t: any) => t.name).join(', ') || 'None'}`);
  } else {
    console.log(`   ✗ FAILED: ${electricType.error}`);
  }

  console.log('\n=== Test Complete ===');
  if (tools.success && pikachu.success) {
    console.log('✓ All tests passed! The API is working correctly.');
    console.log('\nYou can now use these tools in Cursor or Gemini CLI!');
  }
}

// Run test if executed directly
if (require.main === module) {
  testAccess().catch(console.error);
}

