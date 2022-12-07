const errors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Page not found',
    405: 'Method not allowed',
    409: 'Conflict',
    410: 'Gone',
    429: 'Too Many Request',
    500: 'Internal server error',
    501: 'Not implemented',
    503: 'Service unavailable',
    511: 'Network authentication required',
};

export default function ErrorHandler(req, res) {
    const { method } = req;
    if (method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });
    const { code } = req.query;
    const { message } = req.body;
    if (code) {
        const error = errors[code];
        return res.status(code).json({ error, message });
    }
    return res.status(400).json({ error: 'Bad request', message: 'Error endpoint handler need http error code' });
}
