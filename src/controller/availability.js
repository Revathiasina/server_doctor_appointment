
let doctors = require("../models/doctors");

const docAvailability = async (req, res) => {
    console.log(req)

    try {
        let filterQuery = {
            status: 1
        };

        if (req.body?.docType) {
            filterQuery['docType'] = req.body.docType;
        }
        if (req.body?.startTime) {
            filterQuery['startTime'] = req.body.startTime;
        }
        if (req.body?.endTime) {
            filterQuery['endTime'] = req.body.endTime;
        }
        const result = await doctors.aggregate(
            [
                {
                    $lookup: {
                        from: 'appointments', localField: 'docId',
                        foreignField: '_id', as: 'appointmentsDetails'
                    }
                },
                { $match: filterQuery }
            ]
        ).sort({ "createdAt": "desc" });
        res.json({ success: true, message: 'Fetching list', result });
    } catch (error) {
        console.log(error, ' Error in docAvailability');
        res.json({ success: false, message: 'Failed fetching list' });

    }
};

module.exports = {
    docAvailability
};