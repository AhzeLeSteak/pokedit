
const fs = require('../../fs');

const filename = 'Pokemon_-_Version_Bleue_France_SGB_Enhanced.sav';

fs.open(filename, 'r', function(status, fd) {
    if (status) {
        console.log(status.message);
        return;
    }
    const buffer = Buffer.alloc(32000);
    fs.read(fd, buffer, 0, 100, 0, function(err, num) {
        console.log(buffer.toString('utf8', 0, num));
    });
});




