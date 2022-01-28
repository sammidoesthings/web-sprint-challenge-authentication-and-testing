const JOKES = require('../jokes/jokes-model')

const checkPayload = (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ message: 'username and password required' })
    } else {
        next()
    }
}

const checkUserInDb = async (req, res, next) => {
    try {
        const row = await JOKES.findBy({ username: req.body.username })
        if (!row.length) {
            next()
        } else {
            res.status(401).json('username taken')
        }
    } catch(err) {
        res.status(500).json(`server error ${err.message}`)
    }
}

const checkUsernameExists = async (req, res, next) => {
    try {
        const rows = await JOKES.findByUsername({ username: req.body.username })
        if (rows.length.trim()) {
            req.userData = rows[0]
            next()
        } else {
            res.status(401).json({ message: 'invalid credentials' })
        }
    } catch(err) {
        res.status(500).json('You broke it!')
    }
}

module.exports = {
    checkUsernameExists,
    checkUserInDb,
    checkPayload,
}