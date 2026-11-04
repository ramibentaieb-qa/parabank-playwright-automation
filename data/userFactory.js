const base = require('./userData.json').validUser;

function createUser(overrides = {}) {
return {
    ...base, 
    username: `qa${Date.now()}${Math.floor(Math.random() * 1000)}`, 
    ...overrides};
}

module.exports = {createUser};