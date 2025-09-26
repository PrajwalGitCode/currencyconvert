import axios from 'axios';
import Conversion from '../models/Conversion.js';

// Get all currencies
export const getCurrencies = async (req, res) => {
    try {
        const response = await axios.get('https://api.frankfurter.app/currencies');
        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch currencies' });
    }
};

// Convert currency
export const convertCurrency = async (req, res) => {
    try {
        const { from, to, amount } = req.body;
        const response = await axios.get('https://api.frankfurter.app/latest', {
            params: { from, to, amount }
        });
        const rateForTo = response.data.rates?.[to];
        const result = typeof rateForTo === 'number' ? rateForTo : null;

        if (req.userId) {
            try {
                const conversion = new Conversion({
                    user: req.userId,
                    from,
                    to,
                    amount: Number(amount),
                    result: Number(result || 0)
                });
                await conversion.save();
            } catch (saveErr) {
                console.warn('Failed to save conversion:', saveErr.message);
            }
        }

        res.json({ from, to, amount: Number(amount), result });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Conversion failed' });
    }
};

// Get user's conversion history
export const getHistory = async (req, res) => {
    try {
        if (!req.userId) return res.json([]);
        const conversions = await Conversion.find({ user: req.userId }).sort({ createdAt: -1 });
        res.json(conversions);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};
