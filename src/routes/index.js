const router = require('express').Router();
const passport = require('passport')

//routes
router.use('/auth', require('./auth'))

router.use('/books', passport.authenticate('jwt',{session:false}), require('./books'))

router.use('/book-recommendations', require('./recommendation'))

router.use('/book-shelf', require('./book_shelf'))

router.use('/lend', require('./lend'))


router.get('/test', passport.authenticate('jwt',{session:false}), (req, res)=>{
    res.status(200).json({msg: 'test endpoint'})
})
module.exports = router;

