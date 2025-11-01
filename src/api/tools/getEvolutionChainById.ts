
import { Request, Response } from 'express';
import axios from 'axios';

export const getEvolutionChainByIdTool = {
  name: 'getEvolutionChainById',
  description: 'Get information about an evolution chain by its ID.',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the evolution chain.',
      },
    },
    required: ['id'],
  },
};

export const getEvolutionChainByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
