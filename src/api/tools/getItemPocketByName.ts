
import { Request, Response } from 'express';
import axios from 'axios';

export const getItemPocketByNameTool = {
  name: 'getItemPocketByName',
  description: 'Get information about an item pocket by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the item pocket.',
      },
    },
    required: ['name'],
  },
};

export const getItemPocketByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/item-pocket/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
