import express from 'express';
import { getCurrencies, convertCurrency, getHistory } from '../controllers/currencyController.js';
import { protect } from '../middleware/authMiddleware.js'; // your auth middleware

const router = express.Router();

router.get('/currencies', getCurrencies);
router.post('/convert', protect, convertCurrency);
router.get('/history', protect, getHistory);

export default router;
