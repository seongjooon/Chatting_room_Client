const express = require('express');
const router = express.Router();
// const User = require('../models/user');

router.post('/register', async (req, res, next) => {
  try {
    console.log('Line 8: ', req.body);
    const userData = {
      username: req.body.username,
      password: req.body.password
    };
    // let user = await User.findOne({
    //   email: req.body.email
    // });

    // if (!user) {
    //   user = new User(userData);
    //   await user.save();
    // }

    res.send({ result: 'ok', user });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
