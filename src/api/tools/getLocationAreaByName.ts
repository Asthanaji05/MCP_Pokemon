
import { Request, Response } from 'express';
import axios from 'axios';

export const getLocationAreaByNameTool = {
  name: 'getLocationAreaByName',
  description: 'Get information about a location area by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the location area.',
      },
    },
    required: ['name'],
  },
};

export const getLocationAreaByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/location-area/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
