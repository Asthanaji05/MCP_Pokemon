
import { Request, Response } from 'express';
import axios from 'axios';

export const getItemAttributeByNameTool = {
  name: 'getItemAttributeByName',
  description: 'Get information about an item attribute by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the item attribute.',
      },
    },
    required: ['name'],
  },
};

export const getItemAttributeByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/item-attribute/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
