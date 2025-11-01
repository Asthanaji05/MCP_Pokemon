
import { Request, Response } from 'express';
import axios from 'axios';

export const getPokemonColorByNameTool = {
  name: 'getPokemonColorByName',
  description: 'Get information about a pokemon color by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the pokemon color.',
      },
    },
    required: ['name'],
  },
};

export const getPokemonColorByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-color/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
