(async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/ai/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'I want to go to Goa' }),
        });
        const text = await response.text();
        console.log('status', response.status);
        console.log(text);
    } catch (err) {
        console.error(err);
    }
})();
