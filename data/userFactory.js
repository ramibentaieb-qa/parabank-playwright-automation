const base = require('./userData.json').validUser;

function createUser(overrides = {}) {
    return {...base, username: `JohnDO_${Date.now()}`, ...overrides};
}

module.exports = {createUser};