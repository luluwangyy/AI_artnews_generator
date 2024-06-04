require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('@openai/node');

const app = express();
const port = process.env.PORT || 3000;

// Setup your OpenAI API key from the environment variables
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(express.static('public'));

// Generate related words based on theme
app.post('/generate-related-words', async (req, res) => {
    const theme = req.body.theme;
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `List four nouns related to the theme '${theme}' that are visually descriptive.` }
            ],
            temperature: 0.5
        });
        const responseText = response.data.choices[0].message.content.trim();
        const words = responseText.split('\n').map(line => line.trim());
        res.json({ words });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Generate a conceptual idea based on the theme and imagery
app.post('/generate-conceptual-idea', async (req, res) => {
    const { theme, imagery, referenceConceptual, referenceVisual } = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: `Please write a visual description of a conceptual artwork inspired by the concept of '${imagery}' within the theme of '${theme}'. It should be inspired by the artist statement of '${referenceConceptual}' and the visual style of '${referenceVisual}'.` }
            ],
            temperature: 0.5
        });
        const description = response.data.choices[0].message.content.trim();
        res.json({ description });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
