import Record from "../models/record.js";

const fetchRecord = async (req, res)=>{
    try {
        const date = req.params.date;
        const code = req.params.code;
        const recordsAggr = await Record.aggregate(
            [
                {
                  $match: {
                    date: new Date(`${date}`),
                    code: `${code}`
                  }
                },
                {
                  $unwind: "$present"
                },
                {
                  $lookup: {
                    from: "students",
                    localField: "present",
                    foreignField: "roll",
                    as: "student_details"
                  }
                },
                {
                  $unwind: "$student_details"
                },
                {
                  $group: {
                    _id: "$student_details.roll",
                    name: {$first: "$student_details.name"},
                    present: {$first: true}
                  }
                },
                {
                  $unionWith: {
                    coll: 'students',
                    pipeline: [
                      {
                        $project: {
                          "_id": "$roll",
                          "name": "$name",
                        }
                      },
                      {
                        $addFields: {present: false}
                      }
                    ]
                  }
                },
                {
                  $group: {
                    _id: "$_id",
                    name: {$first: "$name"},
                    present: {$first: "$present"}
                  }
                },
                {
                    $sort: {
                      "_id": 1
                    }
                }
            ]
        );
        return res.status(200).send(recordsAggr);
    } catch (error) {
        res.send(error);
    }
}

export default fetchRecord;