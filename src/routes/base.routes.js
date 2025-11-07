const router = require('express').Router();
const { protect } = require('../utils/verifyToken');
const authRoutes = require('./auth.routes');
const chatRoutes = require('./chat.routes');


router.use('/auth', authRoutes);
router.use('/chat',protect, chatRoutes);


module.exports = router;