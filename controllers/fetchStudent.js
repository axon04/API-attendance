import Student from "../models/student.js";

const fetchStudent = async (req, res)=>{
    try {
        const code = req.params.code;
        const studentsAggr = await Student.aggregate(
            [
                {
                  $lookup: {
                    from: "records",
                    localField: "roll",
                    foreignField: "present",
                    as: "present",
                  }
                },
                {
                  $unwind: {
                    path: "$present",
                    preserveNullAndEmptyArrays: true
                  }
                },
                {
                  $match: {
                    "present.code": `${code}`,
                  },
                },
                {
                  $group: {
                    _id: "$roll",
                    name: {$first: "$name"},
                    count: {
                      $sum: 1
                    }
                  }
                },
                {
                  $sort: {
                    _id: 1
                  }
                }
            ]
        );
        return res.status(200).send(studentsAggr);
            
    } catch (error) {
        console.log(error);
    }
}

export default fetchStudent;