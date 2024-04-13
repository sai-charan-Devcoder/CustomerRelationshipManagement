
import mongoose from "mongoose";

//schema for document
const Schema = mongoose.Schema;

const counsellorSchema = new Schema({
    counsellor_id: { type: Number, required: true },
    counsellor_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Counsellor", counsellorSchema);