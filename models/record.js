import mongoose from "mongoose";
const { Schema } = mongoose;

const recordSchema = new Schema({
    date: { type: Date, default: Date.now },
    code: String,
    present: [{type: Number, ref: 'Student'}]
});

const Record = mongoose.model('Record', recordSchema);

export default Record;