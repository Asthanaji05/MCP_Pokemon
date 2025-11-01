
import { Request, Response } from 'express';
import axios from 'axios';

export const getMoveLearnMethodByNameTool = {
  name: 'getMoveLearnMethodByName',
  description: 'Get information about a move learn method by its name.',
  parameters: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'The name of the move learn method.',
      },
    },
    required: ['name'],
  },
};

export const getMoveLearnMethodByNameHandler = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Missing name parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/move-learn-method/${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
