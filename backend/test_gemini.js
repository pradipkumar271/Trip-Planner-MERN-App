const axios = require('axios');
(async () => {
    try {
        const k = process.env.GEMINI_API_KEY;
        console.log('has key', !!k);
        const url = 'https://generativelanguage.googleapis.com/v1beta1/models/text-bison-001:generateText';
        const r = await axios.post(url, { prompt: { text: 'Hello from test' } }, { headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + k } });
        console.log('ok', r.data);
    } catch (e) {
        if (e.response) console.log('status', e.response.status, 'data', JSON.stringify(e.response.data));
        else console.error(e);
    }
})();
