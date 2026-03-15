// const express = require('express');
// const router = express.Router();

// router.post('/chat', async (req, res) => {
//     try {
//         const { message } = req.body;

//         if (!message || !message.trim()) {
//             return res.status(400).json({ message: 'Message is required' });
//         }

//         const prompt = `You are a friendly AI travel assistant. Provide destination suggestions, activities, budget-friendly tips, and a 4-day itinerary based on: ${message}`;
//         const modelCandidates = [
//             process.env.GEMINI_MODEL || 'gemini-1.5-flash',
//             'gemini-1.5',
//             'gemini-1.0',
//             'text-bison-001'
//         ];

//         let reply = 'I could not generate a response right now, please try again.';
//         let modelError = null;

//         const endpointBase = process.env.GEMINI_ENDPOINT_BASE || 'https://generativelanguage.googleapis.com/v1beta1';

//         for (const modelName of modelCandidates) {
//             try {
//                 const url = `${endpointBase}/models/${modelName}:generateText`;
//                 const data = {
//                     prompt: { text: prompt },
//                     temperature: 0.7,
//                     max_output_tokens: 450,
//                 };

//                 const response = await fetch(url, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
//                     },
//                     body: JSON.stringify(data),
//                 });

//                 if (!response.ok) {
//                     const errText = await response.text();
//                     const message = `HTTP ${response.status}: ${errText}`;
//                     console.warn(`Gemini model ${modelName} returned ${message}`);
//                     modelError = new Error(message);

//                     if (response.status === 404) {
//                         continue;
//                     }
//                     return res.status(502).json({ message: 'AI service error', detail: message });
//                 }

//                 const result = await response.json();
//                 const candidateText =
//                     result?.candidates?.[0]?.output ||
//                     result?.candidates?.[0]?.content?.text ||
//                     result?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join(' ');

//                 if (candidateText) {
//                     reply = candidateText;
//                     return res.json({ reply: reply.trim(), model: modelName });
//                 }

//                 modelError = new Error('Empty candidate');
//             } catch (apiErr) {
//                 console.warn(`Gemini model ${modelName} failure:`, apiErr?.message || apiErr);
//                 modelError = apiErr;

//                 if (apiErr?.message?.includes('404') || apiErr?.message?.includes('Not Found')) {
//                     continue;
//                 }

//                 return res.status(502).json({ message: 'AI service error', detail: apiErr.message || String(apiErr) });
//             }
//         }

//         if (modelError) {
//             console.error('Gemini API fallback reached:', modelError);
//             return res.status(502).json({ message: 'AI service error', detail: modelError.message || String(modelError) });
//         }

//         return res.json({ reply: reply.trim() });
//     } catch (err) {
//         console.error('AI chat route error:', err);
//         return res.status(500).json({ message: 'Server error' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ message: 'Message is required' });
        }

        const prompt = `
You are an expert AI travel planner.

Give the user:
1. Destination suggestions
2. Best activities
3. Budget travel tips
4. A 4 day itinerary

User request:
${message}
`;

        const model = "gemini-2.5-flash";

        const url =
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Gemini API error:", errorText);
            return res.status(500).json({
                message: "AI service error",
                error: errorText
            });
        }

        const data = await response.json();

        const reply =
            data?.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response generated.";

        res.json({ reply });

    } catch (error) {
        console.error("AI Chat Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;