let jwt = require('jsonwebtoken');
const autKey = require('../../config/auth');

exports.validateToken = (token) => {
    var validate = false
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
      }
      else {
          return validate
      }
    jwt.verify(token,autKey.SECRET,
        (error, decoded) => {
            if (error) {
                validate =  false;
            }
            else {
               validate =  true;
            }
        })
        return validate

}
exports.createToken = (_email) => {
    let token = jwt.sign({email: _email},
        autKey.SECRET,
        { expiresIn: '24h' // expires in 24 hours
        }
      );
      return token
}