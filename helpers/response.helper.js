exports.success = function (data) {
    // Success response template
    return {
        "code":0,
        "msg": 'Success',
        "records": data
    }
}

exports.error = function (code, message) {
    // Error response template
    return {
        "code":code,
        "msg": message
    }
}