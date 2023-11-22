
let doctors = require("../models/doctors");
let appointments = require("../models/appointments");

const docAvailability = async (req, res) => {
    try {
        let { docType, date, startTime, endTime } = req.body;

        startTime = new Date(`${date}T${startTime}`)
        endTime = new Date(`${date}T${endTime}`)
        date = new Date(date)
        console.log(startTime, endTime, date, 'req body')
        const doctorSchedule = await doctors.find({
            docType,
            date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
            startTime: { $lte: endTime },
            endTime: { $gte: startTime }
        });

        // const doctorSchedule = await doctors.aggregate([
        //     {
        //         $match: {
        //             docType,
        //             // date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        //             // startTime: { $lte: endTime },
        //             // endTime: { $gte: startTime }
        //         }
        //     },
        //     {
        //         $lookup: {
        //             from: 'appointments',
        //             let: { docId: '$docId' },
        //             pipeline: [
        //                 {
        //                     $match: {
        //                         $expr: {
        //                             $and: [
        //                                 { $eq: ['$docId', '$$docId'] },
        //                             ]
        //                         }
        //                     }
        //                 }
        //             ],
        //             as: 'appointments'
        //         }
        //     }
        // ])


        conflictingAppointments = []
        if (doctorSchedule?.length) {
            conflictingAppointments = await appointments.find({
                docId: { $in: doctorSchedule.map(appointment => appointment.docId) },
                apDate: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                apStartTime: { $lte: endTime },
                apEndTime: { $gte: startTime }
            })

        }

        res.json({ success: true, message: 'Fetching list', result: !conflictingAppointments?.length ? doctorSchedule : [] });
    } catch (error) {
        console.log(error, ' Error in docAvailability');
        res.json({ success: false, message: 'Failed fetching list' });

    }
};

module.exports = {
    docAvailability
};