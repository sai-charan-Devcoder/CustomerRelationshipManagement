
import mongoose from "mongoose";

//schema for document
const Schema = mongoose.Schema;

const leadsSchema = new Schema({
    lead_id: { type: Number, required: true },
    customer_name: { type: String, required: true },
    email: { type: String, required: true },
    course_interested: { type: String, required: true },
    query: { type: String, required: true },
    status: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Leads', leadsSchema, 'leads');