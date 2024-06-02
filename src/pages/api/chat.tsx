import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface OpenAIResponse {
  choices: Array<{
    text: string;
  }>;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  try {
    const response = await axios.post<OpenAIResponse>('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 100,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    res.status(200).json({ text: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch response from OpenAI' });
  }
}
