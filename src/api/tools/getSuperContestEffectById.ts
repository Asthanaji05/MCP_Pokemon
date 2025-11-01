
import { Request, Response } from 'express';
import axios from 'axios';

export const getSuperContestEffectByIdTool = {
  name: 'getSuperContestEffectById',
  description: 'Get information about a super contest effect by its ID.',
  parameters: {
    type: 'object',
    properties: {
      id: {
        type: 'integer',
        description: 'The ID of the super contest effect.',
      },
    },
    required: ['id'],
  },
};

export const getSuperContestEffectByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Missing id parameter' });
  }

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/super-contest-effect/${id}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data from PokeAPI' });
  }
};
