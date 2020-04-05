const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Joi = require('joi');

router.post('/register', async (req, res, next) => {
	console.log("WWWWWWWW")
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
    // username  이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
			console.log('Exist')
 			res.status(409).json({ error: 'Exist' });
      return;
    }

    const user = new User({ username });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장

    user.serialize();
		res.send('Success!')
  } catch (e) {
		console.log('error', e)
		next();
    res.status(500).json({ errMessage: 'Error' });
  }
});

module.exports = router;
