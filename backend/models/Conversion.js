import mongoose from 'mongoose';

const conversionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    result: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Conversion = mongoose.model('Conversion', conversionSchema);

export default Conversion;
