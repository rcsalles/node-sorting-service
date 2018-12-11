const ApplicationError = require('./ApplicationError');

class SortingServiceException extends ApplicationError {
   constructor(message) {
    super(message || 'Collection is required.', 422);
  }
}
 
module.exports = SortingServiceException;