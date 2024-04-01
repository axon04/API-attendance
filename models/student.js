import mongoose from "mongoose";
const { Schema } = mongoose;

const studentSchema = new Schema({
    roll: {type: Number, required: true, unique: true},
    name: String
});

const Student = mongoose.model('Student', studentSchema);

export default Student;