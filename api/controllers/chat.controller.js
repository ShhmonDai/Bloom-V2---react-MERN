export const sendPrompt = async (req, res) => {
    try {
        const openAIMessages = req.body.messages;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4.1-nano',
                messages: openAIMessages,
                temperature: 0.3
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('OpenAI API Error:', data);
            return res.status(500).json({ error: data });
        }

        res.json(data.choices[0].message);
    } catch (error) {
        console.error('Error in sendPrompt:', error);
        res.status(500).json({ error: error.message || 'Something went wrong generating the response.' });
    }
  };