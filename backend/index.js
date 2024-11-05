require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const morgan = require('morgan');
const logger = require('./logger');

const setupSwagger = require('./swagger');

const app = express();
app.use(express.json());
app.use(cors());

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to nerve center..." });
});

require('./routes/index')(app);

// Morgan to log HTTP requests
app.use(
    morgan('combined', {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );

// Initialize Swagger
setupSwagger(app);

db.sequelize
    .sync({ force: false })
    .then(() => {
        console.log('Models Synced');
    })
    .catch((err) => console.log(err));

// set port, listen for requests
const PORT = process.env.PORT || 3800;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`Swagger docs are available on http://localhost:${PORT}/api-docs`);
});