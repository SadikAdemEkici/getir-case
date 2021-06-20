'use strict';
var _=require('lodash')

function isValidDate(dateString) {
    if(!dateString) return true

    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    var d = new Date(dateString);
    var dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
}

/**
 * Check request startTime and endTime format to req object
 * @return {Function} middleware
 */
function dateFormatChecker(req, res, next) {
    /**
     * Middleware
     * @param  {Object}   req  Express request
     * @param  {Object}   res  Express response
     * @param  {Function} next Express next handler
     * @returns {void}
     */

    var startTime = _.get(req, 'body.startDate');
    var endTime = _.get(req, 'body.endDate');

    var isStartTimeValid = isValidDate(startTime);
    var isEndTimeValid = isValidDate(endTime);

    if(!isStartTimeValid && !isEndTimeValid)
        next(res.status(400).send('Start Date and End Date are not valid format! The date format should be “YYYY-MM-DD”.'));

    else if(!isStartTimeValid)
        next(res.status(400).send('Start Date is not valid format! The date format should be “YYYY-MM-DD”.'))

    else if(!isEndTimeValid)
        next(res.status(400).send('End Date is not valid bad format! The date format should be “YYYY-MM-DD”.'))

    return next();
}

module.exports = dateFormatChecker;
