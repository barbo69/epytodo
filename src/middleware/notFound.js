exports.notFound = function (req, res, next) {
    res.status(404).json({"msg": "Not found"});
    next();
}