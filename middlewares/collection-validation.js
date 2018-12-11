const SortingServiceException = require('../errors/SortingServiceException');

const collectionValidation = (req, res, next) => {
	
	if (!req.body || !req.body.collection || !Array.isArray(req.body.collection) ) {

		return res.status(422).json(new SortingServiceException());
	}

	next()
}

module.exports = collectionValidation;