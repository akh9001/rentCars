#!/bin/bash


# Create a new directory
mkdir server client

# Change directory to server

cd server

npm init -y
npm install express dotenv mongoose bcryptjs jsonwebtoken cors uuid
npm install nodemon --save-dev
# Create directories
mkdir config controllers models routes middleware

# Create files
touch app.js server.js .env .gitignore README.md

# Create subfiles
touch config/database.js config/env.js
touch controllers/userController.js controllers/productController.js
touch models/User.js models/Product.js
touch routes/api.js routes/userRoutes.js routes/productRoutes.js
touch middleware/authMiddleware.js middleware/errorMiddleware.js

# Add content to app.js and server.js
echo 'const express = require("express");
const app = express();
const port = 3000;

// Example route
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});' > app.js

echo 'const http = require("http");
const app = require("./app");

const server = http.createServer(app);

server.listen(3000);
' > server.js

# Add initial content to README.md
echo "# My Node.js/Express Project
This is my Node.js/Express project with the following directory structure:

- config/
- controllers/
- models/
- routes/
- middleware/
- app.js
- server.js
- .env
- .gitignore
- README.md

" > README.md

# Add a sample .gitignore file
echo 'node_modules
.env
' > .gitignore

# Display a completion message
echo "Project structure created successfully. You can start building your application now."
