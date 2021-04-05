module.exports = function(req, res, next) {
    if (req.user.role.name != "admin") return res.status(403).send('access denied');
    next()
}