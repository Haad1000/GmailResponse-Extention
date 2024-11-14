const express = require('express');
const bodyParser = require('body-parser');
const { EmailResponseGen } = require('./prompt.js');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/airesponse', async (req, res) => {
    try {
        const { context } = req.body;
        const generatedText = await EmailResponseGen(context);

        res.json({ response: generatedText });
    } catch (error) {
        console.error('Error generating email response:', error);
        res.status(500).json({ error: 'Failed to generate email response' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
  