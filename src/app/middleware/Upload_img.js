const multer = require('multer');
module.exports = function (req, res, err ) {
        if (err instanceof multer.MulterError) {
            return res.json({message : "A Multer error occurred when uploading."});
        } else if (err) {
            return res.json({message : "An unknown error occurred when uploading."})
        }
        console.log("success")
}