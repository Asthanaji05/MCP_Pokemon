
import { Request, Response } from 'express';
import axios from 'axios';

export const getItemCategoryByNameTool = {
  name: 'getItemCategoryByName',
  description: 'Get information about an item category by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the item category.',
      },
    },
    required: ['name'],
  },
};

export const getItemCategoryByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/item-category/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
