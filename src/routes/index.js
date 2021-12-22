const router = require('express').Router();
const passport = require('passport')

//routes
router.use('/auth', require('./auth'))

router.use('/books', passport.authenticate('jwt',{session:false}), require('./books'))

router.use('/book-recommendations', passport.authenticate('jwt',{session:false}), require('./recommendation'))

router.use('/book-shelf', passport.authenticate('jwt',{session:false}), require('./book_shelf'))

router.use('/lend', passport.authenticate('jwt',{session:false}), require('./lend'))

router.use('/borrow', passport.authenticate('jwt',{session:false}), require('./borrow'))


router.get('/test', passport.authenticate('jwt',{session:false}), (req, res)=>{
    res.status(200).json({msg: 'test endpoint'})
})
module.exports = router;

