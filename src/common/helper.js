const { v4: uuidv4 } = require('uuid');

module.exports = {
    generate: () => uuidv4(),
}