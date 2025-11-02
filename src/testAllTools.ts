import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { tools } from './tools';

interface TestResult {
  toolName: string;
  status: 'PASSED' | 'FAILED';
  error?: string;
}

async function testAllTools() {
  const dummyData: { [key: string]: any } = {
    'getAbilityByNameTool': { "name": 'stench' },
    'getBerryByNameTool': { "name": 'cheri' },
    'getBerryFirmnessByNameTool': { "name": 'soft' },
    'getBerryFlavorByNameTool': { "name": 'spicy' },
    'getCharacteristicByIdTool': { id: 1 },
    'getContestEffectByIdTool': { id: 1 },
    'getContestTypeByNameTool': { "name": 'cool' },
    'getEggGroupByNameTool': { "name": 'monster' },
    'getEncounterConditionByNameTool': { "name": 'swarm' },
    'getEncounterConditionValueByNameTool': { "name": 'swarm-yes' },
    'getEncounterMethodByNameTool': { "name": 'walk' },
    'getEvolutionChainByIdTool': { id: 1 },
    'getEvolutionTriggerByNameTool': { "name": 'level-up' },
    'getGenderByNameTool': { "name": 'female' },
    'getGenerationByNameTool': { "name": 'generation-i' },
    'getGrowthRateByNameTool': { "name": 'slow' },
    'getItemByNameTool': { "name": 'master-ball' },
    'getItemAttributeByNameTool': { "name": 'countable' },
    'getItemCategoryByNameTool': { "name": 'standard-balls' },
    'getItemFlingEffectByNameTool': { "name": 'flinch' },
    'getItemPocketByNameTool': { "name": 'misc' },
    'getLanguageByNameTool': { "name": 'en' },
    'getLocationByNameTool': { "name": 'canalave-city' },
    'getLocationAreaByNameTool': { "name": 'canalave-city-area' },
    'getMachineByIdTool': { id: 1 },
    'getMoveByNameTool': { "name": 'pound' },
    'getMoveAilmentByNameTool': { "name": 'paralysis' },
    'getMoveBattleStyleByNameTool': { "name": 'attack' },
    'getMoveCategoryByNameTool': { "name": 'ailment' },
    'getMoveDamageClassByNameTool': { "name": 'physical' },
    'getMoveLearnMethodByNameTool': { "name": 'level-up' },
    'getMoveTargetByNameTool': { "name": 'specific-move' },
    'getNatureByNameTool': { "name": 'bold' },
    'getPalParkAreaByNameTool': { "name": 'forest' },
    'getPokeathlonStatByNameTool': { "name": 'speed' },
    'getPokedexByNameTool': { "name": 'kanto' },
    'getPokemonByNameTool': { "name": 'pikachu' },
    'getPokemonColorByNameTool': { "name": 'black' },
    'getPokemonFormByNameTool': { "name": 'arceus-bug' },
    'getPokemonHabitatByNameTool': { "name": 'cave' },
    'getPokemonShapeByNameTool': { "name": 'ball' },
    'getPokemonSpeciesByNameTool': { "name": 'bulbasaur' },
    'getRegionByNameTool': { "name": 'kanto' },
    'getStatByNameTool': { "name": 'hp' },
    'getSuperContestEffectByIdTool': { id: 1 },
    'getTypeByNameTool': { "name": 'normal' },
    'getVersionByNameTool': { "name": 'red' },
    'getVersionGroupByNameTool': { "name": 'red-blue' },
  };

  const results: TestResult[] = [];

  // Retry configuration for server errors
  const MAX_RETRIES = 3;
  const RETRY_DELAY = 2000; // 2 seconds

  async function testToolWithRetry(toolName: string, url: string, data: any, retries = MAX_RETRIES): Promise<TestResult> {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await axios.post(url, data, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 second timeout
        });

        if (response.status === 200) {
          return { toolName, status: 'PASSED' };
        } else {
          return { toolName, status: 'FAILED', error: `Status: ${response.status}` };
        }
      } catch (error: any) {
        const isServerError = error.response?.status === 502 || error.response?.status === 503 || error.response?.status === 504;
        const isTimeout = error.code === 'ECONNABORTED';
        
        if ((isServerError || isTimeout) && attempt < retries) {
          // Retry for server errors (502, 503, 504) or timeouts
          console.log(`  ⚠️  ${toolName} failed (attempt ${attempt}/${retries}): ${error.response?.status || error.code}. Retrying in ${RETRY_DELAY}ms...`);
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt)); // Exponential backoff
          continue;
        }
        
        // Final attempt failed or non-retryable error
        const errorMsg = error.response?.status 
          ? `Request failed with status code ${error.response.status}`
          : error.message;
        return { toolName, status: 'FAILED', error: errorMsg };
      }
    }
    
    // Should never reach here, but TypeScript needs it
    return { toolName, status: 'FAILED', error: 'Max retries exceeded' };
  }

  for (const tool of tools) {
    const toolName = tool.name;
    const toolNameWithSuffix = `${toolName}Tool`;
    const url = `https://pokemon-mcp-server-vs8m.onrender.com/api/tools/${toolName}`;
    const data: any = dummyData[toolNameWithSuffix]; 
    
    const result = await testToolWithRetry(toolName, url, data);
    results.push(result);
    
    // Small delay between requests to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Generate summary
  const passed = results.filter(r => r.status === 'PASSED').length;
  const failed = results.filter(r => r.status === 'FAILED').length;
  const failedTools = results.filter(r => r.status === 'FAILED');

  console.log('\n=== Test Results Summary ===');
  console.log(`Total Tools: ${results.length}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  
  if (failedTools.length > 0) {
    console.log('\nFailed Tools:');
    failedTools.forEach(tool => {
      console.log(`  - ${tool.toolName}${tool.error ? ` (${tool.error})` : ''}`);
    });
  } else {
    console.log('\n✓ All tools passed!');
  }

  // Generate CSV
  const csvPath = path.join(process.cwd(), 'test-results.csv');
  const csvHeader = 'Tool Name,Status,Error\n';
  const csvRows = results.map(r => {
    const error = r.error ? `"${r.error.replace(/"/g, '""')}"` : '';
    return `${r.toolName},${r.status},${error}`;
  }).join('\n');
  const csvContent = csvHeader + csvRows;
  
  fs.writeFileSync(csvPath, csvContent, 'utf8');
  console.log(`\nResults saved to: ${csvPath}`);
}

testAllTools();
