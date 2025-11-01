
import axios from 'axios';

async function test() {
  try {
    const response = await axios.post('http://localhost:3000/api/tools/getAbilityByName', { name: 'stench' });
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

test();
