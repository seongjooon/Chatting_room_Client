const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async ctx => {
  const { username, password } = ctx.request.body;
  try {
    // username  이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflict
      return;
    }

    const user = new User({ username });
    await user.setPassword(password); // 비밀번호 설정
    await user.save(); // 데이터베이스에 저장

    ctx.body = user.serialize();

  } catch (e) {
    ctx.throw(500, e);
  }
});

module.exports = router;
