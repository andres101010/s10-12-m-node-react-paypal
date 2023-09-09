const express = require('express')
const {createAssociated,deleteAssociated,getAllAssociated} = require('../controllers/associated_account.controller')

const router = express.Router()

router.get('/:id/get', getAllAssociated)

router.post('/:id/create', createAssociated)

router.delete('/:id/delete', deleteAssociated)

module.exports = router;
