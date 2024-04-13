
import mongoose from "mongoose";

//schema for document
const Schema = mongoose.Schema;

const claimlistSchema = new Schema({
    lead_id: { type: Number, required: true },
    counsellor_id: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Claimlist', claimlistSchema, 'claimlist');