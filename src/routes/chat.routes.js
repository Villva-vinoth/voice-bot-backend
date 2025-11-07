const router = require('express').Router();
const { createChat, getChatByUserId } = require('../controllers/chat.controller');

router.post('/createChat',createChat);
router.get('/getChat/:userId',getChatByUserId);

module.exports = router;