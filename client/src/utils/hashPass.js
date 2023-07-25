const bcrypt = require('bcryptjs');
 
const password = 'pass123';

var hash = bcrypt.hashSync(password, 8);

console.log(bcrypt.compareSync('pass123', hash));
console.log(bcrypt.compareSync("not_bacon", hash));