
import { Request, Response } from 'express';
import axios from 'axios';

export const getRegionByNameTool = {
  name: 'getRegionByName',
  description: 'Get information about a region by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the region.',
      },
    },
    required: ['name'],
  },
};

export const getRegionByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/region/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
