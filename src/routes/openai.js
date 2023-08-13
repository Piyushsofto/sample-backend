import { Router } from 'express';
const router = Router();
const { Configuration, OpenAIApi } = require('openai');

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const configuration = new Configuration({
      //   apiKey: process.env.OPENAI_API_KEY,
      apiKey: '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',
    });

    const openai = new OpenAIApi(configuration);

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res
        .status(400)
        .json({ error: 'Invalid request format.' });
    }

    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const reply = completion.data.choices[0].message.content;
    // Define a regular expression to match special characters
    const regex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/g;

    // Replace the special characters with an empty string
    const cleanedString = reply.replace(regex, '');
    res.send({ cleanedString });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred.' });
  }
});

export default router;
