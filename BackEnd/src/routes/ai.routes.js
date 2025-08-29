const express = require('express');
const aiController = require('../controller/ai.controller');

const router = express.Router();

router.post("/review", aiController.getReview); 
router.post("/review/save", aiController.getAndSaveReview);



module.exports = router;