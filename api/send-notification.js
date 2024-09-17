import axios from 'axios';

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://www.zaroorireturn.com'); // Allow your site to access
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // Allow POST and OPTIONS requests
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow the content type header

    // Handle OPTIONS preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end(); // Preflight response
    }

    if (req.method === 'POST') {
        try {
            // Extract data from the request body
            const { title, message, target_url, image, action_buttons } = req.body;

            // Make request to Webpushr API
            const response = await axios.post('https://api.webpushr.com/v1/notification/send/all', {
                title: title,
                message: message,
                target_url: target_url,
                image: image,
                user_uid: userUid,
                action_buttons: action_buttons
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'webpushrKey': 'e64811450652a664a4f9a7d2c78d2127',  // Replace with your Webpushr API key
                    'webpushrAuthToken': '95418'  // Replace with your Webpushr Auth token
                }
            });

            res.status(200).json(response.data);
        } catch (error) {
            console.error('Error sending notification:', error);
            res.status(500).json({ error: 'Failed to send push notification' });
        }
    } else {
        res.setHeader('Allow', ['POST', 'OPTIONS']); // Only allow POST and OPTIONS
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
