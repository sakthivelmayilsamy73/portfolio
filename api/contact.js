// api/contact.js
export default async function handler(req, res) {

    // only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        const { name, email, message } = req.body;

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_key: process.env.WEB3FORMS_ACCESS_KEY,
                name,
                email,
                message,
                subject: 'New Portfolio Message — Sakthivel',
            }),
        });

        const result = await response.json();
        return res.status(200).json(result);

    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}