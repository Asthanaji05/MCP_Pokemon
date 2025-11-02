
import axios from 'axios';

async function test() {
  try {
    const response = await axios.post('https://pokemon-mcp-server-vs8m.onrender.com/api/tools/getAbilityByName', { name: 'stench' });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

test();
