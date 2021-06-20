var Record = require('../models/record'),
    _ = require('lodash'),
    responseHelper = require('../helpers/response.helper');

exports.fetch_record = function (req, res) {
    var reqBody = req.body;

    var startDate = reqBody.startDate;
    var endDate = reqBody.endDate;
    var maxCount = reqBody.maxCount;
    var minCount = reqBody.minCount;

    var matchJson = {
        createdAt: {},
        totalCount: {}
    };

    // Check request body exist or not for prevent error

    if(startDate)
        matchJson.createdAt.$gte = new Date(startDate);

    if(endDate)
        matchJson.createdAt.$lt = new Date(endDate);

    if(minCount)
        matchJson.totalCount.$gte = minCount;

    if(maxCount)
        matchJson.totalCount.$lt = maxCount;

    // When date filters and counts filter are not exist in req body, response all record.

    if(!startDate && !endDate)
        delete matchJson.createdAt

    if(!minCount && !maxCount)
        delete matchJson.totalCount

    return Record.aggregate([
            {
                $addFields: {
                    totalCount: { $sum: "$counts" }
                }
            },
            {
                $project: {
                    _id: 0,
                    key: 1,
                    totalCount: 1,
                    createdAt: 1
                }
            },
            {
                $match: matchJson
            }
        ])
        .then(function (records) {
            res.send(responseHelper.success(records))
        })
        .catch(function (err) {
            res.status(err.statusCode || 500).send(responseHelper.error(err.statusCode || 500, err.message))
        });
};
