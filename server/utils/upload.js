const multer = require('multer');
const fs = require('fs'); // Import the File System module

// const uploadDir = 'uploads/';
const uploadDir = process.env.UPLOAD_DIRECTORY;

// Check if the uploads directory exists, and create it if not.
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir); 
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + '-' + file.originalname);
	},
});

const upload = multer({ storage: storage });

module.exports = upload;
