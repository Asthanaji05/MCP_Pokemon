
import { Request, Response } from 'express';
import axios from 'axios';

export const getEncounterConditionByNameTool = {
  name: 'getEncounterConditionByName',
  description: 'Get information about an encounter condition by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the encounter condition.',
      },
    },
    required: ['name'],
  },
};

export const getEncounterConditionByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/encounter-condition/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
