import Record from "../models/record.js";

const postRecord = async (req, res)=> { 
    try {
        const date = req.body.date;
        const code = req.body.code;

        const newRecord = new Record({
            date: new Date(`${date}`),
            code: code,
            present: req.body.present
        });
        const existingRecord = await Record.find({
            date: new Date(`${date}`),
            code: code
        });
        if(existingRecord.length === 0){
            const savedRecord = await newRecord.save();
            return res.status(201).send(savedRecord);
        } else {
            return res.status(409).send({"409":"Document already exists"});
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteRecord = async (req, res)=> {
    try {
        const date = req.body.date;
        const code = req.body.code;
        const deletedRecord = await Record.deleteMany({
            date: new Date(`${date}`),
            code: code
        });
        return res.send(deletedRecord);
    } catch (error) {
        console.log(error());
    }
}

export {postRecord, deleteRecord};