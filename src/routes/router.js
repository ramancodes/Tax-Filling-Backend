const { check_api } = require('../controllers/userControllers/users')

const router = require('express').Router()

router.get('/api-check', check_api)

module.exports = {
    router
}