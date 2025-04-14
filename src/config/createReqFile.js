const fs = require('fs');

const createFiles = async ()=>{
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
}

module.exports = {
    createFiles
}