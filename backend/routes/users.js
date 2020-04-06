const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Joi = require('joi');
const Authorization = require('./middlewares/authorization');

router.post('/register', Authorization.redirectHome, async (req, res, next) => {
	const schema = Joi.object().keys({
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(20)
			.required(),
		password: Joi.string().required()
	});
  const result = Joi.validate(req.body, schema);
  if (result.error) {
		res.status(400);
    return;
  }
  const { username, password } = req.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
 			res.status(409).json({ error: 'Exist' });
      return;
    }
		
    const user = new User({ username });
    await user.setPassword(password);
    await user.save();
		
    user.serialize();
		req.session.userId = user._id;
		res.json({ message: 'Success! '});
  } catch (e) {
		console.log('error', e)
		next();
    res.status(500).json({ errMessage: 'Error' });
  }
});

router.post('/login', Authorization.redirectHome, async (req, res, next) => {
	console.log('fhrmdls!');
  const { username, password } = req.body;
	  // username, password 가 없으면 에러 처리
  if (!username || !password) {
    res.status(401); // Unauthorized
    return;
  }

  try {
    const user = await User.findByUsername(username);
		 // 계정이 존재하지 않으면 에러 처리
    if (!user) {
			res.json({ message: 'Fail! '});
			res.status(401); // Unauthorized
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
			res.status(401); // Unauthorized
      return;
    }
    user.serialize();
		console.log('유저 아이디!',user._id);
		req.session.userId  = user._id;
		res.json({ message: 'Success! '});
  } catch (e) {
		console.dir('error', e)
		next();
    res.status(500).json({ errMessage: 'Error' });
  }
});

router.post('/logout', Authorization.redirectLogin, async (req, res, next) => {
	req.session.destroy(err => {
		if (err)  {
			res.json({message: 'Logout'});
		}
		res.clearCookie(process.env.SESS_NAME);
		res.json({message: 'Login'});
	})
});

module.exports = router;
