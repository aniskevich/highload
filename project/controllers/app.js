index = (req, res) => {
    res.render('index')
}

info = (req, res) => {
    res.render('info', {user: req.user})
}

module.exports = {
    index,
    info,
}