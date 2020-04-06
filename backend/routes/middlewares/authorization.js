exports.redirectLogin = (req, res, next) => {
	if (!req.session.userId) {
		res.json({ isValidateSess: false });
		return;
	} else {
		next();
	}
};

exports.redirectHome = (req, res, next) => {
	if (req.session.userId) {
		res.json({ isValidateSess: true });
		return;
	} else {
		next();
	}
};

